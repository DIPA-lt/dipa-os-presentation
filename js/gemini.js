const GeminiChat = {
  history: [],
  isLoading: false,
  STORAGE_KEY: 'dipa-os-gemini-history',

  SYSTEM_PROMPT: `Tu esi DIPA OS AI asistentas — ekspertas pardavimų automatizacijoje, LEAN metodologijoje ir TOC (Theory of Constraints). Tu padedi DIPA komandai (Igoris, Mantas, Marija, Lauris, Greta, Eimantas) planuoti ir tobulinti jų pardavimų operacinę sistemą.

KONTEKSTAS: DIPA OS yra Next.js paremta centralizuota pardavimų valdymo platforma su:
- n8n automatizacijomis (4 pagrindiniai workflows)
- Vertex AI RAG sistema (3 sluoksniai)
- Newo AI skambučių agentu
- DIPA Co-Pilot (AI asistentu dashboarde)
- PostgreSQL + Prisma duomenų baze
- Monday.com CRM integracija
- Facebook/LinkedIn Ads API
- Plaud garso įrašų AI analize (QA Scorecards)

Komandos nariai:
- Igoris: Vadovybė, strategija
- Mantas: Vadovybė, koordinatorius (tas pats lygis kaip Igoris)
- Marija: Core Sales, closing (BOTTLENECK pagal TOC)
- Lauris: Kvalifikacija, pipeline
- Greta: Marketingas, reklamos kampanijos
- Eimantas: Lead Developer, pagrindinis programuotojas
- Newo: AI skambučių agentas (C lygio leadai)

Tu gali keisti prezentacijos turinį. Kai nori atlikti pakeitimą, PRIVALAI grąžinti JSON komandą markdown code bloke su žyme \`\`\`json-command. Galimos komandos:

1. Pridėti/keisti užduotį:
\`\`\`json-command
{"action":"MODIFY_TASK","taskId":"t-new-1","slideId":"slide-3","title":"Užduoties pavadinimas","status":"pending","assignee":"Dev Team","sprint":"1","subtasks":[{"id":"st-new-1","title":"Subužduotis","status":"pending"}]}
\`\`\`

2. Pridėti naują skaidrę:
\`\`\`json-command
{"action":"ADD_SLIDE","title":"Skaidrės pavadinimas","subtitle":"Paantraštė","description":"Trumpas aprašymas","content":"<div class=\\"slide\\"><h1>Turinys</h1><p>...</p></div>"}
\`\`\`

3. Atnaujinti skaidrės turinį:
\`\`\`json-command
{"action":"UPDATE_CONTENT","slideIndex":2,"content":"<div class=\\"slide\\">Naujas turinys</div>"}
\`\`\`

4. Pridėti diagramą:
\`\`\`json-command
{"action":"ADD_DIAGRAM","key":"newDiagram","definition":"graph TD\\n    A-->B"}
\`\`\`

TAISYKLĖS:
- Atsakyk lietuviškai, nebent prašoma kitaip
- Būk konkretus ir praktiškas
- Kai siūlai pakeitimus, visada pateik json-command bloką
- Gali pateikti ir tekstinį paaiškinimą, ir komandą tame pačiame atsakyme
- Naudok LEAN ir TOC terminus kur tinka
- Jei klausia apie konkrečią skaidrę, remkis jos turiniu`,

  init() {
    this.loadHistory();
    this.bindEvents();
    this.renderHistory();

    if (this.history.length === 0) {
      this.addSystemMessage('DIPA AI Asistentas paruoštas. Klauskite apie DIPA OS sistemą arba duokite nurodymus keisti prezentacijos turinį.');
    }
  },

  bindEvents() {
    const input = document.getElementById('gemini-input');
    const sendBtn = document.getElementById('gemini-send');
    const newChatBtn = document.getElementById('btn-new-chat');

    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    newChatBtn.addEventListener('click', () => this.clearHistory());
  },

  async sendMessage() {
    const input = document.getElementById('gemini-input');
    const text = input.value.trim();
    if (!text || this.isLoading) return;

    input.value = '';
    this.addMessage('user', text);
    this.setLoading(true);

    try {
      const slideContext = this.getCurrentSlideContext();
      const response = await this.callGeminiAPI(text, slideContext);
      this.processResponse(response);
    } catch (err) {
      const hint = err.message.includes('demand') || err.message.includes('429') || err.message.includes('overloaded')
        ? ' Serveris perkrautas — pabandykite dar kartą po minutės.'
        : ' Patikrinkite API raktą config.js faile.';
      this.addMessage('assistant', `Klaida: ${err.message}.${hint}`);
      this.setStatus('error');
    } finally {
      this.setLoading(false);
    }
  },

  getCurrentSlideContext() {
    if (typeof App === 'undefined') return '';
    const slide = App.slides[App.currentSlide];
    if (!slide) return '';
    const temp = document.createElement('div');
    temp.innerHTML = slide.content;
    const textContent = temp.textContent || temp.innerText || '';
    return `\n\nDABARTINĖ SKAIDRĖ (${App.currentSlide + 1}/${App.slides.length}): "${slide.title}"\n${textContent.substring(0, 2000)}`;
  },

  async callGeminiAPI(userMessage, slideContext) {
    const config = typeof DIPA_CONFIG !== 'undefined' ? DIPA_CONFIG.gemini : {};
    const apiKey = config.apiKey || '';
    const model = config.model || 'gemini-2.5-pro';

    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      throw new Error('Gemini API raktas nenustatytas. Atnaujinkite config.js failą.');
    }

    const conversationHistory = this.history
      .filter(m => m.role !== 'system')
      .slice(-10)
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const thinkingBudget = config.thinkingBudget || 0;

    const generationConfig = {
      temperature: config.temperature || 0.7,
      maxOutputTokens: config.maxTokens || 8192,
    };

    if (thinkingBudget > 0) {
      generationConfig.thinkingConfig = { thinkingBudget };
    }

    const body = {
      contents: [
        ...conversationHistory,
        {
          role: 'user',
          parts: [{ text: userMessage + slideContext }],
        },
      ],
      systemInstruction: {
        parts: [{ text: this.SYSTEM_PROMPT }],
      },
      generationConfig,
    };

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      throw new Error(errData.error?.message || `API klaida: ${resp.status}`);
    }

    const data = await resp.json();
    const candidate = data.candidates?.[0];
    if (!candidate?.content?.parts?.length) {
      throw new Error('Tuščias API atsakymas.');
    }

    const textParts = candidate.content.parts.filter(p => p.text && !p.thought);
    if (!textParts.length) {
      throw new Error('Tuščias API atsakymas.');
    }

    return textParts.map(p => p.text).join('\n');
  },

  pendingCommands: [],

  processResponse(responseText) {
    const commands = this.extractCommands(responseText);
    const cleanText = responseText.replace(/```json-command[\s\S]*?```/g, '').trim();

    if (cleanText) {
      this.addMessage('assistant', cleanText);
    }

    commands.forEach(cmd => this.showCommandConfirmation(cmd));
  },

  getCommandDescription(cmd) {
    switch (cmd.action) {
      case 'ADD_SLIDE': return `Pridėti naują skaidrę: "${cmd.title || 'Nauja Skaidrė'}"`;
      case 'UPDATE_CONTENT': return `Atnaujinti skaidrės #${(cmd.slideIndex || 0) + 1} turinį`;
      case 'MODIFY_TASK': return `Keisti užduotį: "${cmd.title || cmd.taskId}"`;
      case 'ADD_DIAGRAM': return `Pridėti diagramą: "${cmd.key}"`;
      default: return `Veiksmas: ${cmd.action}`;
    }
  },

  showCommandConfirmation(cmd) {
    const id = `cmd-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    this.pendingCommands.push({ id, cmd });

    const chat = document.getElementById('gemini-chat');
    const container = document.createElement('div');
    container.className = 'chat-message command-confirm';
    container.id = id;
    container.innerHTML = `
      <div class="command-desc">${this.getCommandDescription(cmd)}</div>
      <div class="command-actions">
        <button class="cmd-btn cmd-accept" data-cmd-id="${id}">Pritaikyti</button>
        <button class="cmd-btn cmd-reject" data-cmd-id="${id}">Atmesti</button>
      </div>`;
    chat.appendChild(container);
    this.scrollChatToBottom();

    container.querySelector('.cmd-accept').addEventListener('click', () => this.acceptCommand(id));
    container.querySelector('.cmd-reject').addEventListener('click', () => this.rejectCommand(id));
  },

  acceptCommand(id) {
    const entry = this.pendingCommands.find(p => p.id === id);
    if (!entry) return;
    this.executeCommand(entry.cmd);
    this.pendingCommands = this.pendingCommands.filter(p => p.id !== id);
    const el = document.getElementById(id);
    if (el) {
      el.querySelector('.command-actions').innerHTML = '<span class="cmd-applied">Pritaikyta ✓</span>';
    }
  },

  rejectCommand(id) {
    this.pendingCommands = this.pendingCommands.filter(p => p.id !== id);
    const el = document.getElementById(id);
    if (el) {
      el.querySelector('.command-actions').innerHTML = '<span class="cmd-rejected">Atmesta</span>';
    }
    this.addSystemMessage('Veiksmas atmestas.');
  },

  extractCommands(text) {
    const commands = [];
    const regex = /```json-command\s*([\s\S]*?)```/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      try {
        const parsed = JSON.parse(match[1].trim());
        commands.push(parsed);
      } catch (e) {
        console.warn('Failed to parse command:', match[1]);
      }
    }
    return commands;
  },

  executeCommand(cmd) {
    switch (cmd.action) {
      case 'MODIFY_TASK':
        this.executeModifyTask(cmd);
        break;
      case 'ADD_SLIDE':
        this.executeAddSlide(cmd);
        break;
      case 'UPDATE_CONTENT':
        this.executeUpdateContent(cmd);
        break;
      case 'ADD_DIAGRAM':
        this.executeAddDiagram(cmd);
        break;
      default:
        console.warn('Unknown command action:', cmd.action);
    }
  },

  executeModifyTask(cmd) {
    const existingTasks = TaskManager.getAllTasks();
    const exists = existingTasks.find(t => t.id === cmd.taskId);

    if (exists) {
      TaskManager.updateTask(cmd.taskId, {
        title: cmd.title || exists.title,
        status: cmd.status || exists.status,
        assignee: cmd.assignee || exists.assignee,
        sprint: cmd.sprint || exists.sprint,
        subtasks: cmd.subtasks || exists.subtasks,
      });
    } else {
      TaskManager.addTask({
        id: cmd.taskId || `t-ai-${Date.now()}`,
        slideId: cmd.slideId || App.slides[App.currentSlide]?.id || 'slide-1',
        title: cmd.title || 'Nauja užduotis',
        status: cmd.status || 'pending',
        assignee: cmd.assignee || 'Dev Team',
        sprint: cmd.sprint || '1',
        subtasks: cmd.subtasks || [],
      });
    }

    this.addSystemMessage(`Užduotis "${cmd.title || cmd.taskId}" atnaujinta.`);
    App.renderSlide();
    App.refreshGlobalTasks();
    App.populateAssigneeFilter();
  },

  executeAddSlide(cmd) {
    const newSlide = {
      id: `slide-${App.slides.length + 1}`,
      title: cmd.title || 'Nauja Skaidrė',
      subtitle: cmd.subtitle || '',
      description: cmd.description || '',
      content: cmd.content || `<div class="slide"><h1>${cmd.title || 'Nauja Skaidrė'}</h1></div>`,
      diagram: null,
      notes: '',
    };
    App.addSlide(newSlide);
    this.addSystemMessage(`Nauja skaidrė "${cmd.title}" pridėta (#${App.slides.length}).`);
  },

  executeUpdateContent(cmd) {
    const idx = cmd.slideIndex != null ? cmd.slideIndex : App.currentSlide;
    App.updateSlideContent(idx, cmd.content);
    const slideTitle = App.slides[idx]?.title || idx;
    this.addSystemMessage(`Skaidrė "${slideTitle}" atnaujinta.`);
  },

  executeAddDiagram(cmd) {
    if (cmd.key && cmd.definition) {
      App.addDiagram(cmd.key, cmd.definition);
      this.addSystemMessage(`Diagrama "${cmd.key}" pridėta.`);
    }
  },

  addMessage(role, content) {
    this.history.push({ role, content, timestamp: Date.now() });
    this.saveHistory();
    this.renderMessage(role, content);
    this.scrollChatToBottom();
  },

  addSystemMessage(content) {
    this.renderMessage('system', content);
    this.scrollChatToBottom();
  },

  renderMessage(role, content) {
    const chat = document.getElementById('gemini-chat');
    const msg = document.createElement('div');
    msg.className = `chat-message ${role}`;

    if (role === 'assistant') {
      if (typeof marked !== 'undefined') {
        msg.innerHTML = marked.parse(content);
      } else {
        msg.innerHTML = content.replace(/\n/g, '<br>');
      }
    } else {
      msg.textContent = content;
    }

    chat.appendChild(msg);
  },

  renderHistory() {
    const chat = document.getElementById('gemini-chat');
    chat.innerHTML = '';
    this.history.forEach(m => this.renderMessage(m.role, m.content));
    this.scrollChatToBottom();
  },

  scrollChatToBottom() {
    const chat = document.getElementById('gemini-chat');
    requestAnimationFrame(() => { chat.scrollTop = chat.scrollHeight; });
  },

  setLoading(loading) {
    this.isLoading = loading;
    const chat = document.getElementById('gemini-chat');
    const sendBtn = document.getElementById('gemini-send');
    sendBtn.disabled = loading;

    const existing = chat.querySelector('.chat-loading');
    if (existing) existing.remove();

    if (loading) {
      const loader = document.createElement('div');
      loader.className = 'chat-loading';
      loader.innerHTML = '<span></span><span></span><span></span>';
      chat.appendChild(loader);
      this.scrollChatToBottom();
      this.setStatus('loading');
    } else {
      this.setStatus('ready');
    }
  },

  setStatus(status) {
    const dot = document.querySelector('#gemini-status .status-dot');
    const text = document.querySelector('#gemini-status .status-text');
    if (!dot || !text) return;

    dot.className = 'status-dot';
    switch (status) {
      case 'loading':
        dot.classList.add('loading');
        text.textContent = 'Generuoja...';
        break;
      case 'error':
        dot.classList.add('error');
        text.textContent = 'Klaida';
        break;
      default:
        text.textContent = 'Paruoštas';
    }
  },

  loadHistory() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) this.history = JSON.parse(stored);
    } catch (e) { this.history = []; }
  },

  saveHistory() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.history.slice(-50)));
  },

  clearHistory() {
    this.history = [];
    this.pendingCommands = [];
    localStorage.removeItem(this.STORAGE_KEY);
    this.renderHistory();
    this.addSystemMessage('Naujas pokalbis pradėtas.');
  },
};

document.addEventListener('DOMContentLoaded', () => GeminiChat.init());

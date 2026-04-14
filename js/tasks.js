const INITIAL_TASKS = [
  // === SPRINT 1 ===
  {
    id: 't-1-1', slideId: 'slide-3', title: 'Sukurti bazinę Next.js aplikaciją (DIPA OS karkasas)',
    status: 'pending', assignee: 'Eimantas', sprint: '1',
    subtasks: [
      { id: 'st-1-1-1', title: 'Next.js projekto inicializavimas su TypeScript', status: 'pending' },
      { id: 'st-1-1-2', title: 'Tailwind CSS + Shadcn/UI konfigūracija', status: 'pending' },
      { id: 'st-1-1-3', title: 'Prisma + PostgreSQL setup', status: 'pending' },
      { id: 'st-1-1-4', title: 'Autentifikacijos sluoksnis', status: 'pending' },
    ],
  },
  {
    id: 't-1-2', slideId: 'slide-3', title: 'Monday.com ir Clockify API integracija per n8n',
    status: 'pending', assignee: 'Eimantas', sprint: '1',
    subtasks: [
      { id: 'st-1-2-1', title: 'Monday.com API prisijungimas ir Webhook konfigūracija', status: 'pending' },
      { id: 'st-1-2-2', title: 'Clockify API duomenų traukimas', status: 'pending' },
      { id: 'st-1-2-3', title: 'Duomenų sinchronizacija į PostgreSQL', status: 'pending' },
    ],
  },
  {
    id: 't-1-3', slideId: 'slide-5', title: 'Facebook / LinkedIn Ads API sujungimas',
    status: 'pending', assignee: 'Greta', sprint: '1',
    subtasks: [
      { id: 'st-1-3-1', title: 'Facebook Graph API n8n Workflow', status: 'pending' },
      { id: 'st-1-3-2', title: 'LinkedIn Ads API n8n Workflow', status: 'pending' },
      { id: 'st-1-3-3', title: 'Naktinis duomenų traukimas (Cron 00:01)', status: 'pending' },
    ],
  },
  {
    id: 't-1-4', slideId: 'slide-5', title: 'Infrastruktūros kaštų suvedimo forma',
    status: 'pending', assignee: 'Eimantas', sprint: '1',
    subtasks: [
      { id: 'st-1-4-1', title: 'UI forma kaštams suvesti', status: 'pending' },
      { id: 'st-1-4-2', title: 'FinancialMetric modelio CRUD API', status: 'pending' },
    ],
  },
  // === SPRINT 2 ===
  {
    id: 't-2-1', slideId: 'slide-6', title: 'Plaud failų atidavimas į n8n (Post-Call Pipeline)',
    status: 'pending', assignee: 'Eimantas', sprint: '2',
    subtasks: [
      { id: 'st-2-1-1', title: 'Audio upload endpointas', status: 'pending' },
      { id: 'st-2-1-2', title: 'Whisper API integracija transkripcijai', status: 'pending' },
      { id: 'st-2-1-3', title: 'n8n Webhook triggeris', status: 'pending' },
    ],
  },
  {
    id: 't-2-2', slideId: 'slide-6', title: 'LLM Promptai skambučių vertinimui (QA Scorecards)',
    status: 'pending', assignee: 'Igoris', sprint: '2',
    subtasks: [
      { id: 'st-2-2-1', title: 'Post-Call QA System Prompt sukūrimas', status: 'pending' },
      { id: 'st-2-2-2', title: 'JSON output schema validacija', status: 'pending' },
      { id: 'st-2-2-3', title: 'QA Dashboard komponentas Next.js', status: 'pending' },
    ],
  },
  {
    id: 't-2-3', slideId: 'slide-7', title: 'Newo API integracija — C lygio leadų automatizacija',
    status: 'pending', assignee: 'Eimantas', sprint: '2',
    subtasks: [
      { id: 'st-2-3-1', title: 'Newo API konfigūracija', status: 'pending' },
      { id: 'st-2-3-2', title: 'Outbound skambučių logika (Decision Tree)', status: 'pending' },
      { id: 'st-2-3-3', title: 'Inbound skambučių atpažinimas per Monday.com', status: 'pending' },
      { id: 'st-2-3-4', title: 'Newo transkriptų grąžinimas per Webhook', status: 'pending' },
    ],
  },
  {
    id: 't-2-4', slideId: 'slide-7', title: 'Newo eskalacijos kelias — live handoff į žmogų',
    status: 'pending', assignee: 'Eimantas', sprint: '2',
    subtasks: [
      { id: 'st-2-4-1', title: 'Sentiment analizės integracija į Newo', status: 'pending' },
      { id: 'st-2-4-2', title: 'Live handoff logika: Newo → Lauris/Marija', status: 'pending' },
      { id: 'st-2-4-3', title: 'Monday.com Urgent Flag automatinis sukūrimas', status: 'pending' },
    ],
  },
  {
    id: 't-2-5', slideId: 'slide-15', title: 'GDPR Compliance Layer — consent tracking',
    status: 'pending', assignee: 'Mantas', sprint: '2',
    subtasks: [
      { id: 'st-2-5-1', title: 'ConsentLog DB modelis ir API', status: 'pending' },
      { id: 'st-2-5-2', title: 'Consent forma prieš skambučio įrašymą', status: 'pending' },
      { id: 'st-2-5-3', title: 'Data retention politika ir auto-deletion', status: 'pending' },
      { id: 'st-2-5-4', title: 'Right-to-deletion workflow per n8n', status: 'pending' },
    ],
  },
  {
    id: 't-2-6', slideId: 'slide-10', title: 'Monday.com / PostgreSQL Reconciliation (WF5)',
    status: 'pending', assignee: 'Eimantas', sprint: '2',
    subtasks: [
      { id: 'st-2-6-1', title: 'n8n naktinis Cron workflow (02:00)', status: 'pending' },
      { id: 'st-2-6-2', title: 'Monday.com vs PostgreSQL palyginimo logika', status: 'pending' },
      { id: 'st-2-6-3', title: 'Slack alert neatitikimams', status: 'pending' },
    ],
  },
  // === SPRINT 3 ===
  {
    id: 't-3-1', slideId: 'slide-13', title: 'Gilieji KPI indeksai (LVR, CAC, TTR)',
    status: 'pending', assignee: 'Eimantas', sprint: '3',
    subtasks: [
      { id: 'st-3-1-1', title: 'LVR (Lead Velocity Rate) skaičiavimas', status: 'pending' },
      { id: 'st-3-1-2', title: 'CAC ir ROAS automatinė matematika', status: 'pending' },
      { id: 'st-3-1-3', title: 'TTR (Time-to-Revenue) sekimas', status: 'pending' },
      { id: 'st-3-1-4', title: 'Core Sales Efficiency Index', status: 'pending' },
      { id: 'st-3-1-5', title: 'Pipeline Conversion Rate pagal režimą', status: 'pending' },
    ],
  },
  {
    id: 't-3-2', slideId: 'slide-3', title: 'DIPA Co-Pilot — Vertex AI Chat-botas Next.js',
    status: 'pending', assignee: 'Eimantas', sprint: '3',
    subtasks: [
      { id: 'st-3-2-1', title: 'Vertex AI RAG prisijungimas', status: 'pending' },
      { id: 'st-3-2-2', title: 'Chat langas Next.js dešinėje pusėje', status: 'pending' },
      { id: 'st-3-2-3', title: 'Kontekstinės užklausos (CAC, Pipeline, etc.)', status: 'pending' },
      { id: 'st-3-2-4', title: 'Anomaly Detection įspėjimai Slack/Teams', status: 'pending' },
    ],
  },
  {
    id: 't-3-3', slideId: 'slide-3', title: 'Penktadienio ataskaitų automatinis generavimas',
    status: 'pending', assignee: 'Eimantas', sprint: '3',
    subtasks: [
      { id: 'st-3-3-1', title: 'Ataskaitos šablonas (PDF/Tekst)', status: 'pending' },
      { id: 'st-3-3-2', title: 'n8n Cron triggeris (Penktadienis 14:55)', status: 'pending' },
      { id: 'st-3-3-3', title: 'Slack integracija ataskaitai', status: 'pending' },
    ],
  },
  {
    id: 't-3-4', slideId: 'slide-8', title: 'Pre-Call Brief: dviejų etapų generavimas',
    status: 'pending', assignee: 'Eimantas', sprint: '3',
    subtasks: [
      { id: 'st-3-4-1', title: 'Naktinis Cron: vakaro brief generavimas', status: 'pending' },
      { id: 'st-3-4-2', title: 'Outlook -15 min: refresh jei nauji duomenys', status: 'pending' },
      { id: 'st-3-4-3', title: 'Slack ir Dashboard atvaizdavimas', status: 'pending' },
    ],
  },
  {
    id: 't-3-5', slideId: 'slide-15', title: 'Lead Scoring Feedback Loop',
    status: 'pending', assignee: 'Eimantas', sprint: '3',
    subtasks: [
      { id: 'st-3-5-1', title: 'ScoringFeedback DB modelis', status: 'pending' },
      { id: 'st-3-5-2', title: 'Won/Lost outcome → feedback pipeline', status: 'pending' },
      { id: 'st-3-5-3', title: 'RAG scoring modelio retraining logika', status: 'pending' },
    ],
  },
  {
    id: 't-3-6', slideId: 'slide-15', title: 'Customer Retention Metrikos (NPS, Churn, Upsell)',
    status: 'pending', assignee: 'Eimantas', sprint: '3',
    subtasks: [
      { id: 'st-3-6-1', title: 'CustomerHealth DB modelis', status: 'pending' },
      { id: 'st-3-6-2', title: 'NPS ir Churn Risk dashboard komponentai', status: 'pending' },
      { id: 'st-3-6-3', title: 'Upsell pipeline sekimas', status: 'pending' },
    ],
  },
];

const TaskManager = {
  STORAGE_KEY: 'dipa-os-tasks',

  load() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) { /* ignore */ }
    return JSON.parse(JSON.stringify(INITIAL_TASKS));
  },

  save(tasks) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  },

  reset() {
    localStorage.removeItem(this.STORAGE_KEY);
    return JSON.parse(JSON.stringify(INITIAL_TASKS));
  },

  getAllTasks() {
    return this.load();
  },

  getTasksForSlide(slideId) {
    return this.load().filter(t => t.slideId === slideId);
  },

  toggleTaskStatus(taskId) {
    const tasks = this.load();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return tasks;
    const cycle = { 'pending': 'in-progress', 'in-progress': 'done', 'done': 'pending' };
    task.status = cycle[task.status] || 'pending';
    this.save(tasks);
    return tasks;
  },

  toggleSubtaskStatus(taskId, subtaskId) {
    const tasks = this.load();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return tasks;
    const sub = task.subtasks.find(s => s.id === subtaskId);
    if (!sub) return tasks;
    const cycle = { 'pending': 'in-progress', 'in-progress': 'done', 'done': 'pending' };
    sub.status = cycle[sub.status] || 'pending';
    this.save(tasks);
    return tasks;
  },

  addTask(task) {
    const tasks = this.load();
    tasks.push(task);
    this.save(tasks);
    return tasks;
  },

  updateTask(taskId, updates) {
    const tasks = this.load();
    const idx = tasks.findIndex(t => t.id === taskId);
    if (idx === -1) return tasks;
    tasks[idx] = { ...tasks[idx], ...updates };
    this.save(tasks);
    return tasks;
  },

  removeTask(taskId) {
    let tasks = this.load();
    tasks = tasks.filter(t => t.id !== taskId);
    this.save(tasks);
    return tasks;
  },

  getStats() {
    const tasks = this.load();
    let total = 0, pending = 0, inProgress = 0, done = 0;
    tasks.forEach(t => {
      total++;
      if (t.status === 'pending') pending++;
      else if (t.status === 'in-progress') inProgress++;
      else if (t.status === 'done') done++;
      t.subtasks.forEach(s => {
        total++;
        if (s.status === 'pending') pending++;
        else if (s.status === 'in-progress') inProgress++;
        else if (s.status === 'done') done++;
      });
    });
    return { total, pending, inProgress, done };
  },

  getUniqueAssignees() {
    const tasks = this.load();
    const set = new Set();
    tasks.forEach(t => { if (t.assignee) set.add(t.assignee); });
    return Array.from(set);
  },

  renderTaskItem(task, showSlide = false) {
    const statusClass = task.status === 'done' ? 'checked' : task.status === 'in-progress' ? 'in-progress' : '';
    const textClass = task.status === 'done' ? 'done' : '';

    let html = `<div class="task-item" data-task-id="${task.id}">
      <div class="task-checkbox ${statusClass}" data-task-id="${task.id}"></div>
      <span class="task-text ${textClass}">${task.title}</span>
      <span class="task-sprint-badge">S${task.sprint}</span>
      <span class="task-assignee">${task.assignee}</span>
    </div>`;

    if (task.subtasks && task.subtasks.length > 0) {
      html += '<div class="subtask-list">';
      task.subtasks.forEach(sub => {
        const subStatus = sub.status === 'done' ? 'checked' : sub.status === 'in-progress' ? 'in-progress' : '';
        const subText = sub.status === 'done' ? 'done' : '';
        html += `<div class="subtask-item" data-task-id="${task.id}" data-subtask-id="${sub.id}">
          <div class="task-checkbox ${subStatus}" data-task-id="${task.id}" data-subtask-id="${sub.id}"></div>
          <span class="task-text ${subText}">${sub.title}</span>
        </div>`;
      });
      html += '</div>';
    }

    return html;
  },

  renderGlobalPanel(filters = {}) {
    const tasks = this.load();
    const { sprint = 'all', assignee = 'all', status = 'all' } = filters;

    const filtered = tasks.filter(t => {
      if (sprint !== 'all' && t.sprint !== sprint) return false;
      if (assignee !== 'all' && t.assignee !== assignee) return false;
      if (status !== 'all' && t.status !== status) return false;
      return true;
    });

    let html = '';
    filtered.forEach(t => { html += this.renderTaskItem(t, true); });
    if (!filtered.length) html = '<p style="color:var(--text-muted);text-align:center;padding:20px;">Nėra užduočių pagal pasirinktus filtrus.</p>';

    return html;
  },

  renderStats() {
    const s = this.getStats();
    return `
      <div class="stat-item"><span class="stat-dot pending-dot"></span> Laukia: ${s.pending}</div>
      <div class="stat-item"><span class="stat-dot progress-dot"></span> Vykdoma: ${s.inProgress}</div>
      <div class="stat-item"><span class="stat-dot done-dot"></span> Atlikta: ${s.done}</div>
    `;
  },
};

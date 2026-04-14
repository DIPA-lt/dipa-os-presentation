const App = {
  currentSlide: 0,
  slides: [],
  overviewOpen: false,
  mermaidReady: false,

  init() {
    this.slides = typeof SLIDES !== 'undefined' ? [...SLIDES] : [];
    this.initMermaid();
    this.bindEvents();
    this.buildTOC();
    this.populateAssigneeFilter();
    this.loadFromHash();
    this.render();
  },

  initMermaid() {
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          darkMode: true,
          background: '#1a2235',
          primaryColor: '#1e3a5f',
          primaryTextColor: '#e2e8f0',
          primaryBorderColor: '#3b82f6',
          lineColor: '#3b4a63',
          secondaryColor: '#2d1e5f',
          tertiaryColor: '#1e5f3a',
          clusterBkg: 'transparent',
          clusterBorder: '#3b4a63',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '13px',
        },
        flowchart: { curve: 'basis', padding: 24, nodeSpacing: 40, rankSpacing: 50, wrappingWidth: 200, htmlLabels: true },
        er: { fontSize: 12, layoutDirection: 'TB' },
      });
      this.mermaidReady = true;
    }
  },

  bindEvents() {
    document.getElementById('nav-prev').addEventListener('click', () => this.prevSlide());
    document.getElementById('nav-next').addEventListener('click', () => this.nextSlide());
    document.getElementById('btn-toc').addEventListener('click', () => this.togglePanel('toc-panel'));
    document.getElementById('btn-overview').addEventListener('click', () => this.toggleOverview());
    document.getElementById('btn-fullscreen').addEventListener('click', () => this.toggleFullscreen());
    document.getElementById('btn-gemini').addEventListener('click', () => this.togglePanel('gemini-panel'));
    document.getElementById('btn-tasks-global').addEventListener('click', () => this.togglePanel('task-panel'));

    document.querySelectorAll('.panel-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const panelId = btn.getAttribute('data-close');
        document.getElementById(panelId).classList.add('hidden');
      });
    });

    document.getElementById('filter-sprint').addEventListener('change', () => this.refreshGlobalTasks());
    document.getElementById('filter-assignee').addEventListener('change', () => this.refreshGlobalTasks());
    document.getElementById('filter-status').addEventListener('change', () => this.refreshGlobalTasks());

    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': e.preventDefault(); this.nextSlide(); break;
        case 'ArrowLeft': case 'ArrowUp': e.preventDefault(); this.prevSlide(); break;
        case 'Escape': e.preventDefault(); this.toggleOverview(); break;
        case 'f': case 'F': e.preventDefault(); this.toggleFullscreen(); break;
        case 't': case 'T': e.preventDefault(); this.togglePanel('toc-panel'); break;
        case 'g': case 'G': e.preventDefault(); this.togglePanel('gemini-panel'); break;
        case 'k': case 'K': e.preventDefault(); this.togglePanel('task-panel'); break;
      }
    });

    window.addEventListener('hashchange', () => {
      this.loadFromHash();
      this.render();
    });
  },

  loadFromHash() {
    const hash = window.location.hash;
    if (hash) {
      const match = hash.match(/slide-(\d+)/);
      if (match) {
        const idx = parseInt(match[1], 10) - 1;
        if (idx >= 0 && idx < this.slides.length) {
          this.currentSlide = idx;
        }
      }
    }
  },

  goToSlide(index) {
    if (index < 0 || index >= this.slides.length) return;
    this.currentSlide = index;
    window.location.hash = `slide-${index + 1}`;
    if (this.overviewOpen) this.toggleOverview();
    this.render();
  },

  nextSlide() {
    if (this.overviewOpen) return;
    this.goToSlide(this.currentSlide + 1);
  },

  prevSlide() {
    if (this.overviewOpen) return;
    this.goToSlide(this.currentSlide - 1);
  },

  render() {
    this.renderSlide();
    this.updateProgress();
    this.updateCounter();
    this.updateTOCActive();
    this.updateGeminiContext();
    this.updateNavButtons();
  },

  renderSlide() {
    const slide = this.slides[this.currentSlide];
    if (!slide) return;
    const viewport = document.getElementById('slide-viewport');
    viewport.style.opacity = '0';

    setTimeout(() => {
      let html = slide.content;
      const tasks = TaskManager.getTasksForSlide(slide.id);
      if (tasks.length > 0) {
        html += '<div class="slide-tasks"><h3>Užduotys</h3>';
        tasks.forEach(t => { html += TaskManager.renderTaskItem(t); });
        html += '</div>';
      }
      viewport.innerHTML = html;
      viewport.style.opacity = '1';
      viewport.scrollTop = 0;

      this.renderDiagrams();
      this.bindTaskClicks(viewport);
    }, 100);
  },

  async renderDiagrams() {
    if (!this.mermaidReady) return;
    const containers = document.querySelectorAll('.diagram-container[data-diagram]');
    for (const container of containers) {
      const key = container.getAttribute('data-diagram');
      const def = DIAGRAMS[key];
      if (!def) continue;
      const id = `mermaid-${key}-${Date.now()}`;
      try {
        const { svg } = await mermaid.render(id, def);
        container.innerHTML = svg;
      } catch (err) {
        container.innerHTML = `<p style="color:var(--red);font-size:0.85rem;">Diagram render error: ${err.message}</p>`;
      }
    }
  },

  bindTaskClicks(container) {
    container.querySelectorAll('.task-checkbox').forEach(cb => {
      cb.addEventListener('click', (e) => {
        e.stopPropagation();
        const taskId = cb.getAttribute('data-task-id');
        const subtaskId = cb.getAttribute('data-subtask-id');
        if (subtaskId) {
          TaskManager.toggleSubtaskStatus(taskId, subtaskId);
        } else {
          TaskManager.toggleTaskStatus(taskId);
        }
        this.renderSlide();
        this.refreshGlobalTasks();
      });
    });
  },

  updateProgress() {
    const pct = ((this.currentSlide + 1) / this.slides.length) * 100;
    document.getElementById('progress-fill').style.width = `${pct}%`;
  },

  updateCounter() {
    document.getElementById('current-slide-num').textContent = this.currentSlide + 1;
    document.getElementById('total-slides').textContent = this.slides.length;
  },

  updateNavButtons() {
    document.getElementById('nav-prev').style.opacity = this.currentSlide === 0 ? '0.2' : '';
    document.getElementById('nav-prev').style.pointerEvents = this.currentSlide === 0 ? 'none' : '';
    document.getElementById('nav-next').style.opacity = this.currentSlide === this.slides.length - 1 ? '0.2' : '';
    document.getElementById('nav-next').style.pointerEvents = this.currentSlide === this.slides.length - 1 ? 'none' : '';
  },

  buildTOC() {
    const list = document.getElementById('toc-list');
    list.innerHTML = '';
    this.slides.forEach((slide, i) => {
      const item = document.createElement('div');
      item.className = 'toc-item';
      item.setAttribute('data-index', i);
      item.innerHTML = `<span class="toc-num">${String(i + 1).padStart(2, '0')}</span><span>${slide.title}</span>`;
      item.addEventListener('click', () => this.goToSlide(i));
      list.appendChild(item);
    });
  },

  updateTOCActive() {
    document.querySelectorAll('.toc-item').forEach((item, i) => {
      item.classList.toggle('active', i === this.currentSlide);
    });
  },

  updateGeminiContext() {
    const slide = this.slides[this.currentSlide];
    const el = document.getElementById('gemini-current-slide');
    if (el && slide) el.textContent = `${this.currentSlide + 1}. ${slide.title}`;
  },

  togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    const isHidden = panel.classList.contains('hidden');
    document.querySelectorAll('.panel-left, .panel-right').forEach(p => p.classList.add('hidden'));
    if (isHidden) panel.classList.remove('hidden');
    if (panelId === 'task-panel' && isHidden) this.refreshGlobalTasks();
  },

  toggleOverview() {
    const grid = document.getElementById('overview-grid');
    this.overviewOpen = !this.overviewOpen;

    if (this.overviewOpen) {
      grid.classList.remove('hidden');
      grid.innerHTML = '';
      this.slides.forEach((slide, i) => {
        const card = document.createElement('div');
        card.className = `overview-card${i === this.currentSlide ? ' active' : ''}`;
        card.innerHTML = `
          <div class="overview-card-num">${String(i + 1).padStart(2, '0')}</div>
          <div class="overview-card-title">${slide.title}</div>
          <div class="overview-card-desc">${slide.description || slide.subtitle || ''}</div>`;
        card.addEventListener('click', () => this.goToSlide(i));
        grid.appendChild(card);
      });
    } else {
      grid.classList.add('hidden');
    }
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  },

  populateAssigneeFilter() {
    const select = document.getElementById('filter-assignee');
    const assignees = TaskManager.getUniqueAssignees();
    select.innerHTML = '<option value="all">Visi</option>';
    assignees.forEach(a => {
      select.innerHTML += `<option value="${a}">${a}</option>`;
    });
  },

  refreshGlobalTasks() {
    const sprint = document.getElementById('filter-sprint').value;
    const assignee = document.getElementById('filter-assignee').value;
    const status = document.getElementById('filter-status').value;

    document.getElementById('task-list-global').innerHTML = TaskManager.renderGlobalPanel({ sprint, assignee, status });
    document.getElementById('task-stats').innerHTML = TaskManager.renderStats();

    document.querySelectorAll('#task-list-global .task-checkbox').forEach(cb => {
      cb.addEventListener('click', (e) => {
        e.stopPropagation();
        const taskId = cb.getAttribute('data-task-id');
        const subtaskId = cb.getAttribute('data-subtask-id');
        if (subtaskId) {
          TaskManager.toggleSubtaskStatus(taskId, subtaskId);
        } else {
          TaskManager.toggleTaskStatus(taskId);
        }
        this.refreshGlobalTasks();
        this.renderSlide();
      });
    });
  },

  addSlide(slideData) {
    this.slides.push(slideData);
    this.buildTOC();
    document.getElementById('total-slides').textContent = this.slides.length;
  },

  updateSlideContent(slideIndex, newContent) {
    if (slideIndex >= 0 && slideIndex < this.slides.length) {
      this.slides[slideIndex].content = newContent;
      if (slideIndex === this.currentSlide) this.renderSlide();
    }
  },

  addDiagram(key, definition) {
    DIAGRAMS[key] = definition;
    if (this.currentSlide >= 0) this.renderSlide();
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());

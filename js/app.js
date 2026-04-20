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
        theme: 'default',
        themeVariables: {
          darkMode: false,
          background: '#fafaf8',
          primaryColor: '#ecfdf5',
          primaryTextColor: '#134e4a',
          primaryBorderColor: '#0f766e',
          secondaryColor: '#f0f9ff',
          secondaryTextColor: '#0c4a6e',
          tertiaryColor: '#fffbeb',
          tertiaryTextColor: '#78350f',
          lineColor: '#a8a29e',
          mainBkg: '#ffffff',
          nodeBorder: '#0d9488',
          clusterBkg: 'rgba(255,255,255,0.72)',
          clusterBorder: 'rgba(15, 118, 110, 0.2)',
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          fontSize: '14px',
        },
        themeCSS: '.flowchart .node rect { rx: 10px; ry: 10px; } .flowchart .cluster rect { rx: 14px; ry: 14px; } .edgePath .path { stroke-width: 1.65px; stroke-linecap: round; stroke-linejoin: round; }',
        flowchart: {
          curve: 'basis',
          padding: 22,
          nodeSpacing: 50,
          rankSpacing: 58,
          wrappingWidth: 200,
          htmlLabels: true,
          useMaxWidth: false,
        },
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
    document.getElementById('filter-status').addEventListener('change', () => this.refreshGlobalTasks());
    const ownerFilter = document.getElementById('filter-owner');
    if (ownerFilter) ownerFilter.addEventListener('change', () => this.refreshGlobalTasks());

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
    const svgContainers = document.querySelectorAll('.diagram-container[data-svg]');
    for (const container of svgContainers) {
      const key = container.getAttribute('data-svg');
      if (!key) continue;
      const bust = Date.now();
      const src = `assets/diagrams/${encodeURIComponent(key)}.svg?v=${bust}`;
      container.innerHTML = '';
      this.mountDiagramAsImg(container, src);
    }

    if (!this.mermaidReady) return;
    const mermaidContainers = document.querySelectorAll('.diagram-container[data-diagram]');
    for (const container of mermaidContainers) {
      const key = container.getAttribute('data-diagram');
      const def = DIAGRAMS[key];
      if (!def) continue;
      const id = `mermaid-${key}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      try {
        const { svg } = await mermaid.render(id, def);
        container.innerHTML = '';
        this.mountInlineSvgWithControls(container, svg);
      } catch (err) {
        container.innerHTML = `<p style="color:var(--red);font-size:0.85rem;">Diagram render error: ${err.message}</p>`;
      }
    }
  },

  /**
   * Graphviz SVG files: inline the SVG and expand the viewBox to the real bbox.
   * This avoids left-edge cropping and ignores stale inline width/height.
   */
  mountDiagramAsImg(container, src) {
    const viewport = document.createElement('div');
    viewport.className = 'diagram-viewport diagram-viewport--file';
    container.appendChild(viewport);
    const defaultScale = 0.49;
    let svgEl = null;
    const toolbar = document.createElement('div');
    toolbar.className = 'diagram-toolbar';
    toolbar.innerHTML = `
      <button type="button" class="diagram-btn" data-iz="out" title="Zoom out">−</button>
      <span class="diagram-zoom-pct">100%</span>
      <button type="button" class="diagram-btn" data-iz="in" title="Zoom in">+</button>
      <button type="button" class="diagram-btn" data-iz="fit" title="Fit">⊡</button>
    `;
    container.appendChild(toolbar);
    const zoomPct = toolbar.querySelector('.diagram-zoom-pct');
    let baseScale = 1;
    let userScale = 1;
    const clampScale = (val) => Math.min(1.6, Math.max(0.4, val));
    const applyFinalScale = () => {
      if (!svgEl) return;
      const finalScale = clampScale(baseScale * userScale);
      svgEl.style.width = `${finalScale * 100}%`;
      svgEl.style.margin = finalScale < 1 ? '0 auto' : '';
      if (zoomPct) zoomPct.textContent = `${Math.round(finalScale * 100)}%`;
    };

    fetch(src)
      .then((res) => res.text())
      .then((svgText) => {
        viewport.innerHTML = svgText;
        svgEl = viewport.querySelector('svg');
        if (!svgEl) throw new Error('SVG not found');
        svgEl.removeAttribute('width');
        svgEl.removeAttribute('height');
        svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svgEl.style.width = '100%';
        svgEl.style.height = 'auto';
        svgEl.style.display = 'block';

        // Remove the background polygon so whitespace is based on real content bounds.
        const bgPolygon = svgEl.querySelector('g#graph0 > polygon');
        if (bgPolygon) bgPolygon.remove();

        const pad = 6;
        const expandViewBox = () => {
          try {
            const bb = svgEl.getBBox();
            const x = bb.x - pad;
            const y = bb.y - pad;
            const w = bb.width + pad * 2;
            const h = bb.height + pad * 2;
            svgEl.setAttribute('viewBox', `${x} ${y} ${w} ${h}`);
            const dataScale = parseFloat(container.dataset.scale || '');
            baseScale = Number.isFinite(dataScale) ? dataScale : defaultScale;
            userScale = 1;
            applyFinalScale();
          } catch (err) {
            // Fallback: keep existing viewBox if getBBox is unavailable.
          }
        };

        requestAnimationFrame(() => {
          requestAnimationFrame(() => expandViewBox());
        });
      })
      .catch(() => {
        viewport.innerHTML = `<p style="color:var(--red);font-size:0.85rem;">Nepavyko įkelti diagramos.</p>`;
      });

    toolbar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-iz]');
      if (!btn) return;
      const action = btn.getAttribute('data-iz');
      if (action === 'in') {
        const target = clampScale(baseScale * userScale * 1.15);
        userScale = target / baseScale;
        applyFinalScale();
      } else if (action === 'out') {
        const target = clampScale(baseScale * userScale / 1.15);
        userScale = target / baseScale;
        applyFinalScale();
      } else if (action === 'fit') {
        userScale = 1;
        applyFinalScale();
      }
    });
  },

  /**
   * Inline SVG (Mermaid): snapshot intrinsic px ONCE — after applySize(), width/height are plain numbers
   * and must not be re-parsed as "intrinsic" or fitScale collapses to 1 and diagrams clip.
   */
  mountInlineSvgWithControls(container, svgString) {
    const viewport = document.createElement('div');
    viewport.className = 'diagram-viewport';
    const wrap = document.createElement('div');
    wrap.className = 'diagram-svg-wrap';
    wrap.innerHTML = svgString;
    viewport.appendChild(wrap);
    container.appendChild(viewport);

    const svgEl = wrap.querySelector('svg');
    if (!svgEl) return;

    const PT_TO_PX = 96 / 72;
    const readIntrinsicOnce = () => {
      const wAttr = svgEl.getAttribute('width');
      const hAttr = svgEl.getAttribute('height');
      const fromPt = (s) => {
        if (!s) return null;
        const m = String(s).match(/^([\d.]+)\s*pt$/i);
        return m ? parseFloat(m[1]) * PT_TO_PX : null;
      };
      const fromPx = (s) => {
        if (!s) return null;
        const m = String(s).match(/^([\d.]+)\s*px$/i);
        return m ? parseFloat(m[1]) : null;
      };
      let iw = fromPt(wAttr) ?? fromPx(wAttr);
      let ih = fromPt(hAttr) ?? fromPx(hAttr);
      if (iw && ih) return { w: iw, h: ih };
      const vb = svgEl.getAttribute('viewBox');
      if (vb) {
        const p = vb.trim().split(/[\s,]+/).map(Number);
        const vbW = p[2] || 800;
        const vbH = p[3] || 600;
        return { w: vbW * PT_TO_PX, h: vbH * PT_TO_PX };
      }
      return { w: 800, h: 600 };
    };

    const BASE = readIntrinsicOnce();

    let fitScale = 1;
    let userZoom = 1;

    const applySize = () => {
      const z = fitScale * userZoom;
      svgEl.removeAttribute('width');
      svgEl.removeAttribute('height');
      svgEl.setAttribute('width', Math.max(1, BASE.w * z));
      svgEl.setAttribute('height', Math.max(1, BASE.h * z));
    };

    const recomputeFitScale = () => {
      const pad = 48;
      const slideVp = document.getElementById('slide-viewport');
      const visibleW = slideVp?.clientWidth ?? viewport.clientWidth ?? 800;
      const maxW = Math.max(160, visibleW - pad);
      const maxH = Math.min(window.innerHeight * 0.68, 800) - pad;
      fitScale = Math.min(1, maxW / BASE.w, maxH / BASE.h);
      if (!Number.isFinite(fitScale) || fitScale <= 0) fitScale = 1;
    };

    const fitToViewport = () => {
      recomputeFitScale();
      userZoom = 1;
      applySize();
    };

    const toolbar = document.createElement('div');
    toolbar.className = 'diagram-toolbar';
    toolbar.innerHTML = `
      <button type="button" class="diagram-btn" data-dz="out" title="Zoom out">−</button>
      <span class="diagram-zoom-pct">100%</span>
      <button type="button" class="diagram-btn" data-dz="in" title="Zoom in">+</button>
      <button type="button" class="diagram-btn" data-dz="fit" title="Fit">⊡</button>
      <button type="button" class="diagram-btn" data-dz="reset" title="Reset zoom">↺</button>
    `;
    container.appendChild(toolbar);

    const zoomPct = toolbar.querySelector('.diagram-zoom-pct');
    const updatePct = () => {
      if (zoomPct) zoomPct.textContent = `${Math.round(userZoom * 100)}%`;
    };

    const slideVp = document.getElementById('slide-viewport');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fitToViewport();
        updatePct();
      });
    });
    const ro = new ResizeObserver(() => {
      recomputeFitScale();
      applySize();
    });
    ro.observe(slideVp || viewport);

    toolbar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-dz]');
      if (!btn) return;
      const a = btn.getAttribute('data-dz');
      if (a === 'in') {
        userZoom = Math.min(4, userZoom * 1.25);
        applySize();
        updatePct();
      } else if (a === 'out') {
        userZoom = Math.max(0.25, userZoom / 1.25);
        applySize();
        updatePct();
      } else if (a === 'fit' || a === 'reset') {
        fitToViewport();
        updatePct();
      }
    });

    container.addEventListener('wheel', (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const factor = e.deltaY > 0 ? 1 / 1.12 : 1.12;
      userZoom = Math.max(0.25, Math.min(4, userZoom * factor));
      applySize();
      updatePct();
    }, { passive: false });
  },

  /** Update checkbox + label classes from saved state (no full slide re-render). */
  applyTaskStatusToRow(checkboxEl, textEl, status) {
    if (!checkboxEl) return;
    checkboxEl.classList.remove('checked', 'in-progress');
    if (status === 'done') checkboxEl.classList.add('checked');
    else if (status === 'in-progress') checkboxEl.classList.add('in-progress');
    if (textEl) textEl.classList.toggle('done', status === 'done');
  },

  /** Sync one task/subtask row in the slide viewport after toggle (avoids diagram reload / white flash). */
  patchTaskRowInSlideViewport(taskId, subtaskId) {
    const viewport = document.getElementById('slide-viewport');
    if (!viewport) return;
    const tasks = TaskManager.load();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (subtaskId) {
      const sub = (task.subtasks || []).find(s => s.id === subtaskId);
      if (!sub) return;
      const row = viewport.querySelector(`.subtask-item[data-subtask-id="${subtaskId}"]`);
      if (!row) return;
      const cb = row.querySelector('.task-checkbox');
      const txt = row.querySelector('.task-text');
      this.applyTaskStatusToRow(cb, txt, sub.status);
    } else {
      const row = viewport.querySelector(`.task-item[data-task-id="${taskId}"]`);
      if (!row) return;
      const cb = row.querySelector('.task-checkbox');
      const txt = row.querySelector('.task-text');
      this.applyTaskStatusToRow(cb, txt, task.status);
    }
  },

  /** If the toggled task appears on the current slide, patch its row only. */
  patchSlideTasksIfVisible(taskId) {
    const slide = this.slides[this.currentSlide];
    if (!slide) return;
    const onSlide = TaskManager.getTasksForSlide(slide.id).some(t => t.id === taskId);
    if (!onSlide) return;
    const viewport = document.getElementById('slide-viewport');
    if (!viewport.querySelector('.slide-tasks')) return;
    this.patchTaskRowInSlideViewport(taskId, null);
  },

  patchSubtaskRowIfVisible(taskId, subtaskId) {
    const slide = this.slides[this.currentSlide];
    if (!slide) return;
    const onSlide = TaskManager.getTasksForSlide(slide.id).some(t => t.id === taskId);
    if (!onSlide) return;
    this.patchTaskRowInSlideViewport(taskId, subtaskId);
  },

  bindTaskClicks(container) {
    container.querySelectorAll('.task-checkbox').forEach(cb => {
      cb.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const taskId = cb.getAttribute('data-task-id');
        const subtaskId = cb.getAttribute('data-subtask-id');
        if (subtaskId) {
          TaskManager.toggleSubtaskStatus(taskId, subtaskId);
          this.patchTaskRowInSlideViewport(taskId, subtaskId);
        } else {
          TaskManager.toggleTaskStatus(taskId);
          this.patchTaskRowInSlideViewport(taskId, null);
        }
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
    const sel = document.getElementById('filter-owner');
    if (!sel) return;
    if (typeof OWNER_META === 'undefined') return;
    const current = sel.value || 'all';
    const optionsHtml = ['<option value="all">Visi savininkai</option>']
      .concat(Object.entries(OWNER_META).map(([key, meta]) => {
        return `<option value="${key}">${meta.label}</option>`;
      }))
      .join('');
    sel.innerHTML = optionsHtml;
    sel.value = current;
  },

  refreshGlobalTasks() {
    const sprint = document.getElementById('filter-sprint').value;
    const status = document.getElementById('filter-status').value;
    const ownerEl = document.getElementById('filter-owner');
    const owner = ownerEl ? ownerEl.value : 'all';

    document.getElementById('task-list-global').innerHTML = TaskManager.renderGlobalPanel({ sprint, status, owner });
    document.getElementById('task-stats').innerHTML = TaskManager.renderStats();

    document.querySelectorAll('#task-list-global .task-checkbox').forEach(cb => {
      cb.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const taskId = cb.getAttribute('data-task-id');
        const subtaskId = cb.getAttribute('data-subtask-id');
        if (subtaskId) {
          TaskManager.toggleSubtaskStatus(taskId, subtaskId);
          this.patchSubtaskRowIfVisible(taskId, subtaskId);
        } else {
          TaskManager.toggleTaskStatus(taskId);
          this.patchSlideTasksIfVisible(taskId);
        }
        this.refreshGlobalTasks();
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

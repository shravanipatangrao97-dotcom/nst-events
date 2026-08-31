/* ==========================================================================
   NST EVENTS - APP LOGIC (V3.0 ENHANCED COMPONENTS & INTERACTIVITY)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const storedAuth = localStorage.getItem('nst_auth');
  const state = {
    currentRoute: 'home',
    isAuthenticated: storedAuth === 'true',
    user: {
      name: 'Shravani Patangrao',
      id: 'NST-2026-8942',
      email: 'shravani@adypu.edu.in',
      campus: 'Newton School of Technology',
      eventsAttended: 0,
      pointsEarned: 0,
      clubs: [],
      notifications: {
        push: true,
        reminders: true,
        clubAnnouncements: false,
        attendanceAlerts: true
      }
    },
    guilds: [
      {
        id: 'sdc',
        name: 'NST Software Developers Club',
        badge: 'PRIMARY DEV GUILD',
        desc: 'Core software engineering, web architecture, and developer tools infrastructure.',
        members: 142,
        joined: true
      },
      {
        id: 'ai-guild',
        name: 'AI & LLM Systems Guild',
        badge: 'RESEARCH & AGENTS',
        desc: 'Autonomous agent frameworks, QLoRA fine-tuning, and neural network pipelines.',
        members: 98,
        joined: false
      },
      {
        id: 'devops-guild',
        name: 'DevOps & Cloud Native Guild',
        badge: 'INFRASTRUCTURE',
        desc: 'Kubernetes clusters, eBPF telemetry, CI/CD pipelines, and cloud security.',
        members: 76,
        joined: false
      },
      {
        id: 'cp-guild',
        name: 'Algorithmic Speed Run Guild',
        badge: 'COMPETITIVE CODING',
        desc: 'High-speed problem solving, algorithmic challenges, and interview prep.',
        members: 110,
        joined: false
      }
    ],
    activeCategory: 'ALL',
    searchQuery: '',
    events: [
      {
        id: 'hacknst-2026',
        title: 'HACKNST 2026: AI SYSTEMS FLAGSHIP',
        category: 'HACKATHONS',
        date: '18 SEP',
        time: '09:00 AM IST',
        location: 'Auditorium A1, Main Campus',
        organizer: 'NST Software Developers Club',
        description: 'Building next-generation autonomous AI agents, fine-tuned LLM architectures, and spatial developer tools over a 36-hour sprint.',
        registered: false,
        img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'llm-workshop',
        title: 'LLM FINE-TUNING & AGENTIC WORKSHOP',
        category: 'WORKSHOPS',
        date: '24 SEP',
        time: '02:30 PM IST',
        location: 'Lab 402, AI Cluster',
        organizer: 'NST SDC Tech Core',
        description: 'Hands-on deep dive into QLoRA fine-tuning, retrieval-augmented generation (RAG) pipelines, and multi-agent coordination.',
        registered: false,
        img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'devops-summit',
        title: 'DEVOPS & CLOUD NATIVE INFRASTRUCTURE',
        category: 'SEMINARS',
        date: '02 OCT',
        time: '11:00 AM IST',
        location: 'Seminar Hall B',
        organizer: 'DevOps Guild NST',
        description: 'Keynotes on Kubernetes orchestration, eBPF kernel observability, GitOps workflows, and production telemetry.',
        registered: false,
        img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'code-sprint',
        title: 'ALGORITHMIC SPEED RUN 2026',
        category: 'COMPETITIONS',
        date: '10 OCT',
        time: '04:00 PM IST',
        location: 'Virtual Arena',
        organizer: 'Competitive Coding Club',
        description: 'High-speed problem solving and data structure optimization contest under strict time constraints.',
        registered: false,
        img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
      }
    ]
  };

  // ------------------------------------------------------------------------
  // ROUTER LOGIC (PRESERVES PRE-LOGIN & POST-LOGIN SEPARATION)
  // ------------------------------------------------------------------------
  window.switchRoute = function(routeName, param = null) {
    if (!state.isAuthenticated && routeName !== 'login') {
      routeName = 'login';
    }

    state.currentRoute = routeName;

    const navHeader = document.querySelector('.editorial-nav');
    if (navHeader) {
      navHeader.style.display = (routeName === 'login') ? 'none' : 'flex';
    }

    document.querySelectorAll('.nav-link-item').forEach(el => el.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-link-item[data-route="${routeName}"]`);
    if (activeNav) activeNav.classList.add('active');

    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    const targetView = document.getElementById(`view-${routeName}`);
    if (targetView) targetView.classList.add('active');

    window.scrollTo(0, 0);

    if (routeName === 'discover') renderDiscover();
    if (routeName === 'my-events') renderMyEvents();
    if (routeName === 'event-detail' && param) renderEventDetail(param);
  };

  document.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      switchRoute(el.getAttribute('data-route'));
    });
  });

  // ------------------------------------------------------------------------
  // REAL-TIME COUNTDOWN TICKER (HACKNST 2026)
  // ------------------------------------------------------------------------
  const targetDate = new Date('2026-10-18T09:00:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-mins');
    const sEl = document.getElementById('cd-secs');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ------------------------------------------------------------------------
  // INTERACTIVE ANIMATED ORGANIC VECTOR MASK
  // ------------------------------------------------------------------------
  function initOrganicMask() {
    const container = document.getElementById('hero-organic-mask-container');
    const pathEl = document.getElementById('hero-blob-path');
    const shadowEl = document.getElementById('hero-blob-shadow');
    const heroWrapper = document.querySelector('.hero-collage-wrapper');

    if (!container || !pathEl || !heroWrapper) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    setTimeout(() => {
      container.classList.add('loaded');
    }, 150);

    const width = 600;
    const height = 380;
    const centerX = 280;
    const centerY = 190;
    const numPoints = 6;
    const baseRadius = 145;

    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const radiusVar = baseRadius * (0.85 + (i % 3 === 0 ? 0.28 : i % 2 === 0 ? -0.12 : 0.14));
      points.push({
        angle: angle,
        baseRadius: radiusVar,
        currentRadius: radiusVar,
        targetRadius: radiusVar,
        idlePhase: i * 1.05
      });
    }

    let currentCx = centerX;
    let currentCy = centerY;
    let targetCx = centerX;
    let targetCy = centerY;

    let mouseX = centerX;
    let mouseY = centerY;
    let isHovered = false;
    let time = 0;

    heroWrapper.addEventListener('mousemove', (e) => {
      if (prefersReducedMotion || isTouchDevice) return;
      const rect = heroWrapper.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      mouseX = relX;
      mouseY = relY;

      const offsetX = (relX - rect.width / 3) * 0.1;
      const offsetY = (relY - rect.height / 3) * 0.1;

      targetCx = centerX + Math.max(-35, Math.min(35, offsetX));
      targetCy = centerY + Math.max(-25, Math.min(25, offsetY));
      isHovered = true;
    });

    heroWrapper.addEventListener('mouseleave', () => {
      targetCx = centerX;
      targetCy = centerY;
      isHovered = false;
    });

    function pointsToSvgPath(pts, cx, cy) {
      const coords = pts.map(p => ({
        x: cx + p.currentRadius * Math.cos(p.angle),
        y: cy + p.currentRadius * Math.sin(p.angle)
      }));

      const len = coords.length;
      let d = `M ${coords[0].x.toFixed(2)} ${coords[0].y.toFixed(2)}`;

      for (let i = 0; i < len; i++) {
        const p0 = coords[(i - 1 + len) % len];
        const p1 = coords[i];
        const p2 = coords[(i + 1) % len];
        const p3 = coords[(i + 2) % len];

        const tension = 0.24;
        const cp1x = p1.x + (p2.x - p0.x) * tension;
        const cp1y = p1.y + (p2.y - p0.y) * tension;
        const cp2x = p2.x - (p3.x - p1.x) * tension;
        const cp2y = p2.y - (p3.y - p1.y) * tension;

        d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
      }

      d += ' Z';
      return d;
    }

    function animate() {
      time += 0.02;

      currentCx += (targetCx - currentCx) * 0.07;
      currentCy += (targetCy - currentCy) * 0.07;

      points.forEach((p) => {
        const idleOffset = Math.sin(time * 1.1 + p.idlePhase) * 6 + Math.cos(time * 0.7 + p.idlePhase * 0.6) * 4;

        let mouseDeform = 0;
        if (isHovered && !prefersReducedMotion && !isTouchDevice) {
          const lobeX = currentCx + (p.baseRadius + idleOffset) * Math.cos(p.angle);
          const lobeY = currentCy + (p.baseRadius + idleOffset) * Math.sin(p.angle);
          const dx = mouseX - lobeX;
          const dy = mouseY - lobeY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) {
            mouseDeform = (1 - dist / 220) * 20;
          }
        }

        p.targetRadius = p.baseRadius + idleOffset + mouseDeform;
        p.currentRadius += (p.targetRadius - p.currentRadius) * 0.08;
      });

      const pathD = pointsToSvgPath(points, currentCx, currentCy);
      pathEl.setAttribute('d', pathD);
      if (shadowEl) shadowEl.setAttribute('d', pathD);

      requestAnimationFrame(animate);
    }

    animate();
  }

  initOrganicMask();

  // ─── Interactive Wave Boundary ─────────────────────────────────────────────
  function initWaveBoundary() {
    const svg    = document.getElementById('interactive-boundary-svg');
    const path   = document.getElementById('boundary-wave-path');
    const wrapper = document.getElementById('interactive-wave-boundary-container');
    if (!svg || !path || !wrapper) return;

    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Detect touch-only devices
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    // Original clip-path polygon mapped to SVG viewBox 0 0 1200 80
    // Percentages from: 0%,0% | 15%,65% | 30%,20% | 45%,80% | 60%,30% | 75%,70% | 90%,15% | 100%,60%
    // x * 12, y * 0.8  (1200/100, 80/100)
    const BASE_POINTS = [
      { x:    0, y:  0  },
      { x:  150, y: 52  },
      { x:  300, y: 16  },
      { x:  450, y: 64  },
      { x:  600, y: 24  },
      { x:  750, y: 56  },
      { x:  900, y: 12  },
      { x: 1050, y: 48  },
      { x: 1200, y: 28  },
    ];

    // Add 5 interpolated intermediate points between each pair for smooth deformation
    const POINTS = [];
    for (let i = 0; i < BASE_POINTS.length - 1; i++) {
      const a = BASE_POINTS[i];
      const b = BASE_POINTS[i + 1];
      POINTS.push({ ...a });
      for (let s = 1; s <= 2; s++) {
        const t = s / 3;
        POINTS.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      }
    }
    POINTS.push({ ...BASE_POINTS[BASE_POINTS.length - 1] });

    const N = POINTS.length;
    const baseY   = POINTS.map(p => p.y);
    const currentY = POINTS.map(p => p.y);
    const velY    = new Array(N).fill(0);

    // Build SVG path (cubic bezier) closing with a bottom rectangle
    function buildPath(pts) {
      if (pts.length < 2) return '';
      let d = `M ${pts[0].x},${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const cx = (pts[i].x + pts[i + 1].x) / 2;
        d += ` C ${cx},${pts[i].y} ${cx},${pts[i + 1].y} ${pts[i + 1].x},${pts[i + 1].y}`;
      }
      d += ` L 1200,80 L 0,80 Z`;
      return d;
    }

    // Static path (no interaction)
    function setStaticPath() {
      path.setAttribute('d', buildPath(POINTS.map((p, i) => ({ x: p.x, y: baseY[i] }))));
    }

    if (reducedMotion || isTouch) {
      setStaticPath();
      return;
    }

    let mouseX = -9999;
    let mouseY = -9999;
    let rafId  = null;
    let active = false; // cursor is near boundary

    // Tablet: reduce max displacement
    const isTablet = window.matchMedia('(max-width: 1024px) and (hover: hover)').matches;
    const MAX_DISP  = isTablet ? 14 : 28; // px in SVG coords (viewBox 80px tall)
    const SIGMA     = 200; // Gaussian width in SVG x-coords
    const SPRING    = 0.09;
    const DAMP      = 0.72;
    const PROXIMITY = 180; // px from boundary center to start reacting

    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true });

    function animate() {
      rafId = requestAnimationFrame(animate);

      // Map mouseX to SVG x-space
      const rect = wrapper.getBoundingClientRect();
      const svgX = ((mouseX - rect.left) / rect.width) * 1200;
      const boundaryCenterY = rect.top + rect.height / 2;
      const dyPx = mouseY - boundaryCenterY;

      // Amplitude falls off with vertical distance
      const vertFalloff = Math.max(0, 1 - Math.abs(dyPx) / PROXIMITY);
      active = vertFalloff > 0.01;

      let anyMoving = false;
      for (let i = 0; i < N; i++) {
        const dxSvg = POINTS[i].x - svgX;
        const gaussian = active
          ? Math.exp(-(dxSvg * dxSvg) / (2 * SIGMA * SIGMA)) * vertFalloff
          : 0;
        // Displace upward (negative Y = up in SVG)
        const targetY = baseY[i] - MAX_DISP * gaussian;
        velY[i] = velY[i] * DAMP + (targetY - currentY[i]) * SPRING;
        currentY[i] += velY[i];
        if (Math.abs(velY[i]) > 0.01) anyMoving = true;
      }

      path.setAttribute('d', buildPath(POINTS.map((p, i) => ({ x: p.x, y: currentY[i] }))));
    }

    setStaticPath();
    animate();
  }

  initWaveBoundary();

  // Render Poster Cards on Home Page Wall
  function renderHomePosters() {
    const wallGrid = document.getElementById('home-poster-wall-grid');
    if (!wallGrid) return;

    wallGrid.innerHTML = state.events.map(ev => `
      <div class="poster-card-item" onclick="switchRoute('event-detail', '${ev.id}')">
        <div class="poster-card-header">
          <span class="poster-date-badge">${ev.date} &bull; 2026</span>
          <span class="micro-annotation" style="color:#000;">${ev.category}</span>
        </div>
        
        <h3 class="poster-title-text">${ev.title}</h3>

        <div class="poster-photo-frame">
          <img src="${ev.img}" alt="${ev.title}">
        </div>

        <p style="font-family: var(--font-body); font-size: 13px; color: #333; line-height: 1.4; margin-bottom: 14px;">
          ${ev.description}
        </p>

        <div class="poster-meta-footer">
          <span>${ev.location}</span>
          <button class="poster-register-btn" onclick="event.stopPropagation(); toggleRegistration('${ev.id}')">
            ${ev.registered ? 'REGISTERED ✓' : 'REGISTER ↗'}
          </button>
        </div>
      </div>
    `).join('');
  }

  renderHomePosters();

  // Render Developer Guilds Roster Grid
  window.renderGuildsGrid = function() {
    const gridEl = document.getElementById('developer-guilds-grid');
    if (!gridEl) return;

    gridEl.innerHTML = state.guilds.map(g => `
      <div class="guild-card">
        <span class="guild-tag-badge">${g.badge}</span>
        <h4 class="guild-title">${g.name}</h4>
        <p class="guild-desc">${g.desc}</p>
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--electric-blue); font-weight: 700; margin-bottom: 14px;">
          ${g.members} ENROLLED DEVELOPERS
        </div>
        <button onclick="toggleGuildJoin('${g.id}')" class="guild-action-btn">
          ${g.joined ? 'MEMBER &bull; ACTIVE ✓' : 'JOIN GUILD &rarr;'}
        </button>
      </div>
    `).join('');
  };

  window.toggleGuildJoin = function(guildId) {
    const g = state.guilds.find(x => x.id === guildId);
    if (!g) return;
    g.joined = !g.joined;
    if (g.joined) g.members += 1;
    else g.members -= 1;

    showToast(g.joined ? `✅ Joined ${g.name}` : `Left ${g.name}`);
    renderGuildsGrid();
  };

  renderGuildsGrid();

  // ------------------------------------------------------------------------
  // DIGITAL ATTENDANCE PASS QR MODAL
  // ------------------------------------------------------------------------
  window.openQrPassModal = function() {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(14px);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;';
    overlay.id = 'qr-pass-modal-overlay';
    overlay.innerHTML = `
      <div class="qr-modal-card">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #000;padding-bottom:12px;margin-bottom:16px;">
          <span class="micro-annotation" style="color:#000;">INSTITUTIONAL QR PASS // LIVE</span>
          <button onclick="document.getElementById('qr-pass-modal-overlay').remove()" style="background:transparent;border:none;font-size:24px;cursor:pointer;font-weight:700;">&times;</button>
        </div>

        <div style="text-align:center;">
          <div style="font-family:var(--font-display);font-size:22px;font-weight:900;">${state.user.name}</div>
          <div style="font-family:var(--font-mono);font-size:11px;color:#555;margin-top:2px;">ID: ${state.user.id} &bull; ${state.user.email}</div>
        </div>

        <div class="qr-scanner-frame">
          <div class="qr-laser-line"></div>
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="#000">
            <rect x="0" y="0" width="30" height="30" fill="#000"/><rect x="5" y="5" width="20" height="20" fill="#fff"/><rect x="10" y="10" width="10" height="10" fill="#000"/>
            <rect x="70" y="0" width="30" height="30" fill="#000"/><rect x="75" y="5" width="20" height="20" fill="#fff"/><rect x="80" y="10" width="10" height="10" fill="#000"/>
            <rect x="0" y="70" width="30" height="30" fill="#000"/><rect x="5" y="75" width="20" height="20" fill="#fff"/><rect x="10" y="80" width="10" height="10" fill="#000"/>
            <rect x="40" y="10" width="10" height="20"/><rect x="40" y="40" width="20" height="20"/><rect x="10" y="40" width="20" height="10"/>
            <rect x="70" y="40" width="20" height="30"/><rect x="40" y="70" width="30" height="20"/><rect x="80" y="80" width="10" height="10"/>
          </svg>
        </div>

        <div style="font-family:var(--font-mono);font-size:11px;text-align:center;font-weight:700;color:var(--electric-blue);">
          SCAN AT CAMPUS TURNSTILE OR VENUE SCANNER
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  };

  // ------------------------------------------------------------------------
  // DISCOVER RENDER & SEARCH
  // ------------------------------------------------------------------------
  const discoverGrid = document.getElementById('discover-events-grid');
  const searchInput = document.getElementById('discover-search-input');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderDiscover();
    });
  }

  window.setCategoryFilter = function(cat) {
    state.activeCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    const b = document.getElementById(`cat-btn-${cat.toLowerCase()}`);
    if (b) b.classList.add('active');
    renderDiscover();
  };

  function renderDiscover() {
    if (!discoverGrid) return;

    const filtered = state.events.filter(ev => {
      const matchCat = state.activeCategory === 'ALL' || ev.category === state.activeCategory;
      const matchSearch = !state.searchQuery ||
        ev.title.toLowerCase().includes(state.searchQuery) ||
        ev.description.toLowerCase().includes(state.searchQuery) ||
        ev.location.toLowerCase().includes(state.searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      discoverGrid.innerHTML = `
        <div style="grid-column: 1 / -1; border: 3px solid #fff; background: var(--bg-dark-card); padding: 60px; text-align: center; box-shadow: 10px 10px 0px var(--electric-blue);">
          <div class="micro-annotation annotation-blue" style="margin-bottom: 12px;">SEARCH // UNMATCHED</div>
          <h2 class="font-display-section" style="font-size: 40px; margin-bottom: 12px;">NO EVENTS FOUND.</h2>
          <p style="font-family: var(--font-body); font-size: 14px; color: #a0a4b8; margin-bottom: 24px;">
            Try a different search query or clear your active filters.
          </p>
          <button onclick="clearSearchFilters()" class="empty-cta-btn">
            CLEAR FILTERS &rarr;
          </button>
        </div>
      `;
      return;
    }

    discoverGrid.innerHTML = filtered.map(ev => `
      <div class="poster-card-item" onclick="switchRoute('event-detail', '${ev.id}')">
        <div class="poster-card-header">
          <span class="poster-date-badge">${ev.date} &bull; 2026</span>
          <span class="micro-annotation" style="color:#000;">${ev.category}</span>
        </div>
        <h3 class="poster-title-text">${ev.title}</h3>
        <div class="poster-photo-frame">
          <img src="${ev.img}" alt="${ev.title}">
        </div>
        <p style="font-family: var(--font-body); font-size: 13px; color: #333; line-height: 1.4; margin-bottom: 14px;">
          ${ev.description}
        </p>
        <div class="poster-meta-footer">
          <span>${ev.location}</span>
          <button class="poster-register-btn">EXPLORE ↗</button>
        </div>
      </div>
    `).join('');
  }

  window.clearSearchFilters = function() {
    state.searchQuery = '';
    state.activeCategory = 'ALL';
    if (searchInput) searchInput.value = '';
    setCategoryFilter('ALL');
  };

  // ------------------------------------------------------------------------
  // MY EVENTS TIMELINE
  // ------------------------------------------------------------------------
  window.switchMyEventsTab = function(tab) {
    document.querySelectorAll('.tab-editorial-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`tab-myevents-${tab}`);
    if (btn) btn.classList.add('active');

    const container = document.getElementById('my-events-content');
    if (!container) return;

    if (tab === 'upcoming') {
      const reg = state.events.filter(e => e.registered);
      if (reg.length === 0) {
        container.innerHTML = `
          <div class="empty-poster-container">
            <div class="empty-poster-watermark">ARCHIVE</div>
            <div class="micro-annotation annotation-blue" style="margin-bottom: 12px;">SCHEDULE STATUS // 0 REGISTERED</div>
            <h2 class="font-display-section" style="font-size: 44px; margin-bottom: 12px;">
              NO UPCOMING<br>REGISTRATIONS.
            </h2>
            <p style="font-family: var(--font-body); font-size: 15px; color: #a0a4b8; margin-bottom: 28px; max-width: 500px;">
              You don't have any upcoming event registrations. Explore what's happening around campus.
            </p>
            <button onclick="switchRoute('discover')" class="empty-cta-btn">
              EXPLORE EVENTS ↗
            </button>
          </div>
        `;
      } else {
        container.innerHTML = reg.map(ev => `
          <div class="poster-card-item" style="margin-bottom: 24px;" onclick="switchRoute('event-detail', '${ev.id}')">
            <div class="poster-card-header">
              <span class="poster-date-badge">${ev.date}</span>
              <span class="micro-annotation" style="color:var(--electric-blue);">REGISTERED PASS CONFIRMED</span>
            </div>
            <h3 class="poster-title-text">${ev.title}</h3>
            <div class="micro-annotation" style="color:#000;">${ev.time} &bull; ${ev.location}</div>
          </div>
        `).join('');
      }
    } else {
      container.innerHTML = `
        <div style="border: 2px solid #fff; background: var(--bg-dark-card); padding: 48px; text-align: center;">
          <div class="micro-annotation">ARCHIVE // HISTORICAL</div>
          <h3 style="font-family: var(--font-display); font-size: 24px; font-weight: 800; margin-top: 8px;">NO HISTORICAL EVENTS</h3>
          <p style="font-family: var(--font-body); font-size: 13px; color: #a0a4b8; margin-top: 8px;">
            You haven't attended or cancelled any events yet.
          </p>
        </div>
      `;
    }
  };

  // ------------------------------------------------------------------------
  // EVENT DETAIL RENDER
  // ------------------------------------------------------------------------
  function renderEventDetail(eventId) {
    const targetView = document.getElementById('view-event-detail');
    if (!targetView) return;

    const ev = state.events.find(e => e.id === eventId) || state.events[0];

    targetView.innerHTML = `
      <div style="max-width: 1100px; margin: 0 auto; padding: 60px 32px 100px 32px;">
        <button onclick="switchRoute('discover')" style="background: var(--electric-blue); border: 2px solid #fff; color: #fff; font-family: var(--font-mono); font-size: 12px; font-weight: 700; padding: 10px 20px; cursor: pointer; text-transform: uppercase; margin-bottom: 32px;">
          &larr; BACK TO DISCOVER
        </button>

        <div style="border: 4px solid #fff; background: var(--bg-dark-card); padding: 48px; box-shadow: 16px 16px 0px var(--electric-blue); position: relative;">
          
          <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #fff; padding-bottom: 16px; margin-bottom: 24px;">
            <span class="micro-annotation annotation-green">${ev.category} // OFFICIAL EVENT</span>
            <span class="micro-annotation">${ev.date} &bull; 2026</span>
          </div>

          <h1 class="font-display-hero" style="font-size: clamp(36px, 6vw, 72px); margin-bottom: 24px;">
            ${ev.title}
          </h1>

          <div style="width: 100%; height: 320px; border: 2px solid #fff; margin-bottom: 32px; overflow: hidden;">
            <img src="${ev.img}" alt="${ev.title}" style="width: 100%; height: 100%; object-fit: cover; filter: contrast(120%);">
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 40px;">
            <div>
              <div class="micro-annotation" style="margin-bottom: 8px;">EVENT DESCRIPTION</div>
              <p style="font-family: var(--font-body); font-size: 16px; color: var(--bg-paper-white); line-height: 1.7; margin-bottom: 32px;">
                ${ev.description}
              </p>

              <div class="micro-annotation" style="margin-bottom: 8px;">ORGANIZING BODY</div>
              <div style="font-family: var(--font-mono); font-size: 15px; font-weight: 700; color: var(--electric-blue);">
                ${ev.organizer}
              </div>
            </div>

            <div style="background: var(--bg-paper-white); color: #000; border: 3px solid #000; padding: 24px; display: flex; flex-direction: column; gap: 20px; height: fit-content;">
              <div>
                <div class="micro-annotation" style="color:#000;">SCHEDULE</div>
                <div style="font-family: var(--font-mono); font-size: 14px; font-weight: 700; margin-top: 4px;">${ev.time}</div>
              </div>

              <div>
                <div class="micro-annotation" style="color:#000;">CAMPUS VENUE</div>
                <div style="font-family: var(--font-mono); font-size: 14px; font-weight: 700; margin-top: 4px;">${ev.location}</div>
              </div>

              <button onclick="toggleRegistration('${ev.id}')" class="empty-cta-btn" style="width: 100%; justify-content: center; margin-top: 12px;">
                ${ev.registered ? 'CANCEL REGISTRATION' : 'REGISTER NOW ↗'}
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  window.toggleRegistration = function(eventId) {
    const ev = state.events.find(e => e.id === eventId);
    if (!ev) return;

    ev.registered = !ev.registered;
    showToast(ev.registered ? `✅ Registered for ${ev.title}` : `Cancelled registration for ${ev.title}`);

    renderHomePosters();
    if (state.currentRoute === 'event-detail') renderEventDetail(eventId);
  };

  window.toggleNotification = function(key) {
    if (state.user.notifications.hasOwnProperty(key)) {
      state.user.notifications[key] = !state.user.notifications[key];
      showToast(`Preference updated: ${key} = ${state.user.notifications[key] ? 'ENABLED' : 'DISABLED'}`);
    }
  };

  // ------------------------------------------------------------------------
  // GOOGLE SSO AUTHENTICATION POPUP & HANDLER
  // ------------------------------------------------------------------------
  window.handleGoogleLogin = function() {
    const existingModal = document.getElementById('google-sso-modal-overlay');
    if (existingModal) existingModal.remove();

    const overlay = document.createElement('div');
    overlay.id = 'google-sso-modal-overlay';
    overlay.className = 'google-sso-modal-overlay';
    overlay.innerHTML = `
      <div class="google-sso-card">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #000; padding-bottom:14px; margin-bottom:20px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span style="font-family:var(--font-mono); font-size:14px; font-weight:800; color:#000;">Google Accounts SSO</span>
          </div>
          <button onclick="document.getElementById('google-sso-modal-overlay').remove()" style="background:transparent; border:none; font-size:24px; cursor:pointer; font-weight:800;">&times;</button>
        </div>

        <div style="margin-bottom:24px;">
          <span class="micro-annotation annotation-blue" style="margin-bottom:6px;">INSTITUTIONAL SINGLE SIGN-ON</span>
          <h3 style="font-family:var(--font-display); font-size:24px; font-weight:900; color:#000; margin-top:4px;">Sign in to NST Events</h3>
          <p style="font-family:var(--font-body); font-size:13px; color:#555; margin-top:6px;">Select your verified student or faculty Google account to continue.</p>
        </div>

        <!-- Account Selection Tile -->
        <div id="sso-account-tile" onclick="confirmGoogleSSO()" style="border:3px solid #000; padding:16px; background:#f5f5f2; display:flex; align-items:center; gap:16px; cursor:pointer; margin-bottom:20px; transition:background 0.15s, transform 0.15s; box-shadow:4px 4px 0px #000;">
          <div style="width:48px; height:48px; border-radius:50%; background:var(--electric-blue); color:#fff; font-family:var(--font-display); font-size:20px; font-weight:900; display:flex; align-items:center; justify-content:center; border:2px solid #000; flex-shrink:0;">
            SP
          </div>
          <div style="flex:1; overflow:hidden;">
            <div style="font-family:var(--font-mono); font-size:14px; font-weight:800; color:#000; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Shravani Patangrao</div>
            <div style="font-family:var(--font-mono); font-size:12px; color:var(--electric-blue); font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">shravani@adypu.edu.in</div>
          </div>
          <span style="font-family:var(--font-mono); font-size:10px; font-weight:800; background:#000; color:var(--acid-green); padding:4px 8px; flex-shrink:0;">VERIFIED</span>
        </div>

        <div style="border-top:2px dashed #000; padding-top:16px; display:flex; justify-content:space-between; align-items:center;">
          <span class="micro-annotation" style="color:#666; font-size:9px;">SEC-02 GATEWAY &bull; ADYPU</span>
          <button id="sso-confirm-btn" onclick="confirmGoogleSSO()" class="login-google-cta" style="height:46px; font-size:13px; padding:0 20px; width:auto;">
            AUTHENTICATE &rarr;
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  };

  window.confirmGoogleSSO = function() {
    const tile = document.getElementById('sso-account-tile');
    const btn = document.getElementById('sso-confirm-btn');
    if (tile) tile.style.opacity = '0.5';
    if (btn) btn.innerHTML = 'VERIFYING TOKEN...';

    setTimeout(() => {
      const modal = document.getElementById('google-sso-modal-overlay');
      if (modal) modal.remove();
      state.isAuthenticated = true;
      localStorage.setItem('nst_auth', 'true');
      switchRoute('home');
      showToast('✅ Authenticated successfully via Google SSO (shravani@adypu.edu.in)');
    }, 600);
  };

  window.handleLogout = function() {
    state.isAuthenticated = false;
    localStorage.removeItem('nst_auth');
    switchRoute('login');
    showToast('Logged out of NST Events Identity Gateway');
  };

  // Toast Helper Exposed Globally
  window.showToast = function(msg) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:10000;display:flex;flex-direction:column;gap:10px;';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.style.cssText = 'background:#0057FF;border:2px solid #fff;color:#fff;padding:14px 24px;font-family:var(--font-mono);font-size:12px;font-weight:700;box-shadow:6px 6px 0px #000;';
    toast.textContent = msg;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // Initial Route Load Trigger
  switchRoute(state.isAuthenticated ? 'home' : 'login');
});

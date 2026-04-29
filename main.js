/* ─────────────────────────────────────────────────────────────────────────
   SIGNAL BREAK · main.js
   - top reading progress bar
   - sidebar reading progress widget
   - scroll-triggered fade-in for sections, blockquotes, figures, grids
   - smooth scroll for in-page links
   ───────────────────────────────────────────────────────────────────────── */

   (function () {
    'use strict';
  
    // ── 1. Top reading progress bar ──────────────────────────────────────
    const bar = document.createElement('div');
    Object.assign(bar.style, {
      position:     'fixed',
      top:          '54px',   // flush with nav bottom edge
      left:         '0',
      height:       '2px',
      background:   'linear-gradient(90deg, #c0321e 0%, #d4820a 100%)',
      zIndex:       '100',
      width:        '0%',
      transition:   'width .1s linear',
      willChange:   'width',
      pointerEvents:'none'
    });
    document.body.appendChild(bar);
  
    // ── 2. Sidebar progress widget ───────────────────────────────────────
    const fillEl = document.getElementById('readFill');
    const pctEl  = document.getElementById('readPct');
  
    function updateProgress() {
      const docEl = document.documentElement;
      const max   = docEl.scrollHeight - docEl.clientHeight;
      const pct   = max > 0 ? (docEl.scrollTop / max) * 100 : 0;
      const val   = Math.max(0, Math.min(100, pct));
      bar.style.width = val + '%';
      if (fillEl) fillEl.style.width = val + '%';
      if (pctEl)  pctEl.textContent  = Math.round(val);
    }
  
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { updateProgress(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    updateProgress();
  
    // ── 3. Scroll-triggered fade-in ──────────────────────────────────────
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = '.body h2, .body blockquote, .body .figure, .stat-grid-wrap, .req-wrap, .body p.kicker-close';
  
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });
  
      document.querySelectorAll(targets).forEach(el => io.observe(el));
    } else {
      document.querySelectorAll(targets).forEach(el => el.classList.add('in'));
    }
  
    // ── 4. Smooth scroll for in-page anchors ─────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      const href = a.getAttribute('href');
      if (href.length <= 1) return;
      a.addEventListener('click', (ev) => {
        const target = document.querySelector(href);
        if (!target) return;
        ev.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  
  })();
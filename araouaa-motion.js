(() => {
  'use strict';

  const STYLE_ID = 'araouaa-visual-enhancements';
  const LIGHT_STYLE_ID = 'araouaa-light-engine';
  const VERSION = '20260911g';

  const loadStyle = (id, href) => {
    if (document.getElementById(id)) return Promise.resolve();
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    return Promise.resolve();
  };

  const loadStyles = () =>
    loadStyle(STYLE_ID, `araouaa-visual-enhancements.css?v=${VERSION}`)
      .then(() => loadStyle(LIGHT_STYLE_ID, `araouaa-light-engine.css?v=${VERSION}`));

  const setupThemeColor = () => {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = '#30483d';
  };

  const setupProgress = () => {
    if (document.querySelector('.ara-scroll-progress')) return;
    const progress = document.createElement('div');
    progress.className = 'ara-scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.prepend(progress);

    let ticking = false;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / max));
      document.documentElement.style.setProperty('--ara-scroll-p', ratio.toFixed(4));
      document.documentElement.style.setProperty('--ara-scroll-y', `${Math.round(window.scrollY)}px`);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  };

  const setupLightField = () => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    let ticking = false;
    let x = 72;
    let y = 18;

    const paint = () => {
      document.documentElement.style.setProperty('--ara-light-x', `${x}%`);
      document.documentElement.style.setProperty('--ara-light-y', `${y}%`);
      ticking = false;
    };

    window.addEventListener('pointermove', event => {
      x = (event.clientX / Math.max(1, window.innerWidth)) * 100;
      y = (event.clientY / Math.max(1, window.innerHeight)) * 100;
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(paint);
    }, { passive: true });
  };

  const setupExternalPageLinks = () => {
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const href = link.getAttribute('href') || '';
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      document.documentElement.classList.add('ara-page-leaving');
      window.setTimeout(() => document.documentElement.classList.remove('ara-page-leaving'), 650);
    });
  };

  const init = () => {
    loadStyles();
    setupThemeColor();
    setupProgress();
    setupLightField();
    setupExternalPageLinks();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

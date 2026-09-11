(() => {
  'use strict';

  const STYLE_ID = 'araouaa-visual-enhancements';
  const VERSION = '20260911e';

  const loadStyles = () => {
    if (document.getElementById(STYLE_ID)) return Promise.resolve();
    const link = document.createElement('link');
    link.id = STYLE_ID;
    link.rel = 'stylesheet';
    link.href = `araouaa-visual-enhancements.css?v=${VERSION}`;
    document.head.appendChild(link);
    return Promise.resolve();
  };

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
    setupExternalPageLinks();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

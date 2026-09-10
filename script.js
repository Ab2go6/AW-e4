(() => {
  const VERSION = '20260909';

  const load = src => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${src}?v=${VERSION}`;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const restoreProductHashPosition = () => {
    if (!document.body.classList.contains('products-page') || !window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    target?.scrollIntoView({ block: 'start' });
  };

  load('script-core.js')
    .then(() => load('language.js'))
    .then(() => load('catalog-language.js'))
    .then(() => load('site-content-language.js'))
    .then(() => window.requestAnimationFrame(restoreProductHashPosition))
    .catch(error => console.error('ARAOUAA scripts failed to load:', error));
})();

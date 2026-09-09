(() => {
  const VERSION = '20260909';

  const load = src => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${src}?v=${VERSION}`;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const markSharedProductHeader = () => {
    if (!document.body.classList.contains('products-page')) return;
    const header = document.querySelector('.products-header');
    if (header) header.dataset.headerFixed = 'true';
  };

  markSharedProductHeader();

  load('script-core.js')
    .then(() => load('language.js'))
    .then(() => load('catalog-language.js'))
    .then(() => load('site-content-language.js'))
    .catch(error => console.error('ARAOUAA scripts failed to load:', error));
})();

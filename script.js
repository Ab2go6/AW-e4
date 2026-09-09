(() => {
  const load = src => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  load('script-core.js')
    .then(() => load('language.js'))
    .then(() => load('catalog-language.js'))
    .then(() => load('site-content-language.js'))
    .catch(error => console.error('ARAOUAA scripts failed to load:', error));
})();

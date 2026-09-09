(() => {
  const VERSION = '20260909';

  const load = src => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${src}?v=${VERSION}`;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const cleanProductHeaderActions = () => {
    const header = document.querySelector('.products-header');
    if (!header) return;

    ['Rechercher', 'Instagram'].forEach(label => {
      const controls = [...header.querySelectorAll(`.products-icon-button[aria-label="${label}"]`)];
      controls.slice(1).forEach(control => control.remove());
    });
  };

  load('script-core.js')
    .then(() => load('language.js'))
    .then(() => load('catalog-language.js'))
    .then(() => load('site-content-language.js'))
    .then(() => cleanProductHeaderActions())
    .catch(error => console.error('ARAOUAA scripts failed to load:', error));
})();

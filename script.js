(() => {
  const VERSION = '20260911c';

  const load = src => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${src}?v=${VERSION}`;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const setupPrimaryNav = () => {
    const nav = document.querySelector('.main-nav, .products-main-nav');
    if (!nav) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = [
      ['Accueil', 'index.html#accueil', 'index.html'],
      ['Produits', 'produits.html', 'produits.html'],
      ['L’univers', 'origine.html', 'origine.html'],
      ['Les Collections', 'collections.html', 'collections.html'],
      ['Le Journal', 'journal.html', 'journal.html'],
      ['Notre savoir-faire', 'savoir-faire.html', 'savoir-faire.html'],
      ['L’Atelier', 'atelier.html', 'atelier.html']
    ];

    nav.innerHTML = links.map(([label, href, page]) => {
      const active = currentPage === page || (currentPage === '' && page === 'index.html');
      return `<a${active ? ' class="active"' : ''} href="${href}">${label}</a>`;
    }).join('');
  };

  const restoreProductHashPosition = () => {
    if (!document.body.classList.contains('products-page') || !window.location.hash || window.location.hash.startsWith('#search=')) return;
    try { document.querySelector(window.location.hash)?.scrollIntoView({ block: 'start' }); } catch {}
  };

  const isHomepage = () => !document.body.classList.contains('products-page') && !!document.querySelector('#siteHeader.search-toggle, #siteHeader .search-toggle');

  load('script-core.js')
    .then(() => load('language.js'))
    .then(() => load('catalog-language.js'))
    .then(() => load('site-content-language.js'))
    .then(() => isHomepage() ? null : load('catalog-search-index.js'))
    .then(() => isHomepage() ? null : load('site-search.js'))
    .then(() => {
      setupPrimaryNav();
      window.requestAnimationFrame(restoreProductHashPosition);
    })
    .catch(error => console.error('ARAOUAA scripts failed to load:', error));
})();

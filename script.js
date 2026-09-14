(() => {
  const VERSION = '20260914e';

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
      ['Collection', 'collections.html', 'collections.html'],
      ['Journal', 'journal.html', 'journal.html'],
      ['Notre savoir-faire', 'savoir-faire.html', 'savoir-faire.html'],
      ['L’Atelier', 'atelier.html', 'atelier.html']
    ];

    nav.innerHTML = links.map(([label, href, page]) => {
      const active = currentPage === page || (currentPage === '' && page === 'index.html');
      return `<a${active ? ' class="active"' : ''} href="${href}">${label}</a>`;
    }).join('');
  };

  const setupFooterContact = () => {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    const location = footer.querySelector('.footer-contact [aria-label="Localisation"] span');
    const phone = footer.querySelector('.footer-contact [aria-label="Téléphone"] span');
    const email = footer.querySelector('.footer-contact [aria-label="E-mail"] span');

    if (location) location.textContent = 'Tassila N° 3-39 Tikiouine, AGADIR';
    if (phone) phone.textContent = '0528264827';
    if (email) email.textContent = 'contac.araouaa@gmail.com';
  };

  const restoreProductHashPosition = () => {
    if (!document.body.classList.contains('products-page') || !window.location.hash || window.location.hash.startsWith('#search=')) return;
    try { document.querySelector(window.location.hash)?.scrollIntoView({ block: 'start' }); } catch {}
  };

  const isHomepage = () => !document.body.classList.contains('products-page') && !!document.querySelector('#siteHeader.search-toggle, #siteHeader .search-toggle');

  load('script-core.js')
    .then(() => document.body.classList.contains('products-page') ? load('product-expansion.js') : null)
    .then(() => document.body.classList.contains('products-page') ? load('product-interactions.js') : null)
    .then(() => load('language.js'))
    .then(() => load('catalog-language.js'))
    .then(() => load('site-content-language.js'))
    .then(() => isHomepage() ? null : load('catalog-search-index.js'))
    .then(() => isHomepage() ? null : load('site-search.js'))
    .then(() => load('araouaa-motion.js'))
    .then(() => {
      setupPrimaryNav();
      setupFooterContact();
      window.requestAnimationFrame(restoreProductHashPosition);
    })
    .catch(error => console.error('ARAOUAA scripts failed to load:', error));
})();

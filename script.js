(() => {
  const VERSION = '20261001products1';

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
    nav.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href') || '';
      const page = href.split('#')[0] || 'index.html';
      link.classList.toggle('active', page === currentPage || (currentPage === '' && page === 'index.html'));
    });
  };

  const setupFooterContact = () => {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    const location = footer.querySelector('.footer-contact [aria-label="Localisation"] span');
    const phone = footer.querySelector('.footer-contact [aria-label="Téléphone"] span');
    const emailRow = footer.querySelector('.footer-contact [aria-label="E-mail"]');

    if (location) location.textContent = 'Tassila N° 3-39 Tikiouine, AGADIR';
    if (phone) phone.textContent = '0528264827';
    if (emailRow) {
      const address = 'contact.araouaa@gmail.com';
      let link = emailRow.querySelector('.footer-email-link');
      if (!link) {
        const span = emailRow.querySelector('span');
        if (span) {
          link = document.createElement('a');
          link.className = 'footer-email-link';
          link.href = `mailto:${address}`;
          link.appendChild(span);
          emailRow.appendChild(link);
        }
      }
      if (link) {
        link.href = `mailto:${address}`;
        const span = link.querySelector('span');
        if (span) span.textContent = address;
      }
    }
  };

  const restoreProductHashPosition = () => {
    if (!document.body.classList.contains('products-page') || !window.location.hash || window.location.hash.startsWith('#search=')) return;
    try { document.querySelector(window.location.hash)?.scrollIntoView({ block: 'start' }); } catch {}
  };

  const isHomepage = () => !document.body.classList.contains('products-page') && !!document.querySelector('#siteHeader.search-toggle, #siteHeader .search-toggle');

  load('script-core.js')
    .then(() => document.body.classList.contains('products-page') ? load('product-expansion.js') : null)
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

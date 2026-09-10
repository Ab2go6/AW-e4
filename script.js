(() => {
  const VERSION = '20260910';

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
      ['Notre savoir-faire', 'savoir-faire.html', 'savoir-faire.html']
    ];

    nav.innerHTML = links.map(([label, href, page]) => {
      const active = currentPage === page || (currentPage === '' && page === 'index.html');
      return `<a${active ? ' class="active"' : ''} href="${href}">${label}</a>`;
    }).join('');
  };

  const restoreProductHashPosition = () => {
    if (!document.body.classList.contains('products-page') || !window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    target?.scrollIntoView({ block: 'start' });
  };

  const setupProductSearch = () => {
    if (!document.body.classList.contains('products-page')) return;

    const button = document.querySelector('.products-header .products-icon-button[aria-label="Rechercher"]');
    const originalPanel = document.querySelector('.products-search-panel');
    if (!button || !originalPanel) return;

    const cleanButton = button.cloneNode(true);
    button.replaceWith(cleanButton);
    const panel = originalPanel.cloneNode(true);
    originalPanel.replaceWith(panel);

    const input = panel.querySelector('input');
    const close = panel.querySelector('.products-search-close');
    const normalize = value => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const sections = [...document.querySelectorAll('.products-page [data-section]')];
    const filters = [...document.querySelectorAll('.catalog-filter')];

    const renderSearch = value => {
      const query = normalize(value.trim());
      const searching = Boolean(query);

      sections.forEach(section => {
        const items = [...section.querySelectorAll('.product-item')];
        let matches = 0;

        items.forEach(item => {
          const name = normalize(item.dataset.productName || item.querySelector('h3')?.textContent || '');
          const visible = !query || name.includes(query);
          item.hidden = !visible;
          matches += visible ? 1 : 0;
        });

        section.hidden = matches === 0;
        section.querySelector('.category-heading')?.toggleAttribute('hidden', searching && matches > 0);
        section.querySelector('.spice-note')?.toggleAttribute('hidden', searching && matches > 0);
        section.querySelector('.pantry-intro')?.toggleAttribute('hidden', searching && matches > 0);
      });

      filters.forEach(filter => filter.classList.toggle('active', !query && filter.dataset.category === 'all'));
    };

    const setOpen = open => {
      panel.classList.toggle('open', open);
      panel.hidden = !open;
      panel.setAttribute('aria-hidden', String(!open));
      cleanButton.setAttribute('aria-expanded', String(open));
      if (open) window.setTimeout(() => input?.focus(), 80);
    };

    cleanButton.setAttribute('aria-expanded', 'false');
    cleanButton.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
    close?.addEventListener('click', () => {
      if (input) input.value = '';
      renderSearch('');
      setOpen(false);
    });
    input?.addEventListener('input', () => renderSearch(input.value));
    input?.addEventListener('keydown', event => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      renderSearch(input.value);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && panel.classList.contains('open')) setOpen(false);
    });
  };

  load('script-core.js')
    .then(() => load('language.js'))
    .then(() => load('catalog-language.js'))
    .then(() => load('site-content-language.js'))
    .then(() => {
      setupPrimaryNav();
      setupProductSearch();
      window.requestAnimationFrame(restoreProductHashPosition);
    })
    .catch(error => console.error('ARAOUAA scripts failed to load:', error));
})();

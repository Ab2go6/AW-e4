(() => {
  const VERSION = '20260910';

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

  const setupBrandWorldNav = () => {
    const nav = document.querySelector('.main-nav, .products-main-nav');
    if (!nav || nav.querySelector('.world-nav-group')) return;

    const productsLink = [...nav.querySelectorAll('a')].find(link => link.getAttribute('href') === 'produits.html');
    if (!productsLink) return;

    const group = document.createElement('div');
    group.className = 'world-nav-group';
    group.innerHTML = `
      <button class="world-nav-trigger" type="button" aria-expanded="false">L’univers</button>
      <div class="world-nav-menu" aria-hidden="true">
        <a href="origine.html">L’Origine</a>
        <a href="collections.html">Les Collections</a>
        <a href="journal.html">Le Journal</a>
      </div>
    `;

    productsLink.insertAdjacentElement('afterend', group);

    const trigger = group.querySelector('.world-nav-trigger');
    const menu = group.querySelector('.world-nav-menu');
    const closeMenu = () => {
      group.classList.remove('world-nav-open');
      trigger?.setAttribute('aria-expanded', 'false');
      menu?.setAttribute('aria-hidden', 'true');
    };

    trigger?.addEventListener('click', () => {
      const open = group.classList.toggle('world-nav-open');
      trigger.setAttribute('aria-expanded', String(open));
      menu?.setAttribute('aria-hidden', String(!open));
    });

    menu?.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('click', event => {
      if (!group.contains(event.target)) closeMenu();
    });
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
      setupBrandWorldNav();
      setupProductSearch();
      window.requestAnimationFrame(restoreProductHashPosition);
    })
    .catch(error => console.error('ARAOUAA scripts failed to load:', error));
})();

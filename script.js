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
        section.classList.toggle('search-results-section', searching && matches > 0);
        section.querySelector('.category-heading')?.classList.toggle('search-results-hidden', searching && matches > 0);
        section.querySelector('.spice-note')?.classList.toggle('search-results-hidden', searching && matches > 0);
        section.querySelector('.pantry-intro')?.classList.toggle('search-results-hidden', searching && matches > 0);
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
  };

  load('script-core.js')
    .then(() => load('language.js'))
    .then(() => load('catalog-language.js'))
    .then(() => load('site-content-language.js'))
    .then(() => {
      setupProductSearch();
      window.requestAnimationFrame(restoreProductHashPosition);
    })
    .catch(error => console.error('ARAOUAA scripts failed to load:', error));
})();

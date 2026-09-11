(() => {
  if (window.top !== window) return;
  if (window.__ARAOUAA_SITE_SEARCH__) return;
  window.__ARAOUAA_SITE_SEARCH__ = true;

  const normalize = value => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const loadStyle = () => {
    if (document.querySelector('link[data-arraouaa-site-search-style]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'site-search.css?v=20260911b';
    link.dataset.arraouaaSiteSearchStyle = 'true';
    document.head.appendChild(link);
  };

  const getHeader = () => document.querySelector('.site-header, .products-header');
  const getButton = header => header?.querySelector('.search-toggle, .products-icon-button[aria-label="Rechercher"]');

  const cleanupLegacyProductSearch = () => {
    if (!document.body.classList.contains('products-page')) return;
    document.querySelectorAll('.products-search-panel').forEach(panel => panel.remove());
  };

  const createPanel = header => {
    let panel = header?.querySelector('.site-search-panel');
    if (panel) return panel;
    if (!header) return null;

    panel = document.createElement('div');
    panel.className = 'search-panel site-search-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = '<div class="search-inner"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4.2 4.2"></path></svg><input type="search" placeholder="Rechercher café, épices, fruits secs…" autocomplete="off"><button class="search-close" type="button" aria-label="Fermer la recherche">×</button></div>';
    header.appendChild(panel);
    return panel;
  };

  const collectIndex = root => [...root.querySelectorAll('.product-item')].map(item => {
    const name = item.dataset.productName || item.querySelector('h3')?.textContent?.trim() || '';
    const category = item.dataset.category || item.querySelector('.product-item-tag')?.textContent?.trim() || '';
    const text = item.textContent || '';
    return { name, category, key: normalize(`${name} ${category} ${text}`) };
  }).filter(item => item.name);

  const createIndex = () => {
    if (document.body.classList.contains('products-page')) return Promise.resolve(collectIndex(document));

    return new Promise(resolve => {
      let settled = false;
      let frame;
      let timeout;
      const finish = items => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        window.removeEventListener('message', onMessage);
        resolve(Array.isArray(items) ? items.map(item => ({
          name: item.name || '',
          category: item.category || '',
          key: normalize(`${item.name || ''} ${item.category || ''} ${item.text || ''}`)
        })).filter(item => item.name) : []);
      };
      const onMessage = event => {
        if (event.source !== frame.contentWindow) return;
        if (event.origin !== window.location.origin) return;
        if (event.data?.type !== 'ARAOUAA_SEARCH_INDEX') return;
        finish(event.data.items);
      };

      frame = document.createElement('iframe');
      frame.dataset.arraouaaSearchIndex = 'true';
      frame.setAttribute('aria-hidden', 'true');
      frame.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;border:0;';
      timeout = window.setTimeout(() => finish([]), 15000);

      window.addEventListener('message', onMessage);
      frame.src = new URL('produits.html?search-index=1', document.baseURI).href;
      document.body.appendChild(frame);
    });
  };

  const setup = () => {
    loadStyle();
    cleanupLegacyProductSearch();

    const header = getHeader();
    const button = getButton(header);
    const panel = createPanel(header);
    if (!header || !button || !panel) return;

    const inner = panel.querySelector('.search-inner');
    const input = panel.querySelector('input[type="search"]');
    const close = panel.querySelector('.search-close');
    if (!inner || !input || !close) return;

    let results = panel.querySelector('.site-search-results');
    if (!results) {
      results = document.createElement('div');
      results.className = 'site-search-results';
      results.hidden = true;
      inner.insertAdjacentElement('afterend', results);
    }

    const setOpen = open => {
      panel.classList.toggle('open', open);
      panel.setAttribute('aria-hidden', String(!open));
      button.setAttribute('aria-expanded', String(open));
      if (open) window.setTimeout(() => input.focus(), 50);
    };

    const render = (items, query) => {
      const clean = query.trim();
      if (!clean) {
        results.innerHTML = '';
        results.hidden = true;
        return;
      }
      if (!items.length) {
        results.innerHTML = '<div class="site-search-empty">Recherche en cours…</div>';
        results.hidden = false;
        return;
      }
      const matches = items.filter(item => item.key.includes(normalize(clean))).slice(0, 8);
      results.innerHTML = matches.length
        ? matches.map(item => `<a class="site-search-result" href="produits.html#search=${encodeURIComponent(item.name)}"><span>${item.name}</span><small>${item.category}</small></a>`).join('')
        : '<div class="site-search-empty">Aucun produit correspondant.</div>';
      results.hidden = false;
    };

    let index = [];
    createIndex().then(items => {
      index = items;
      if (input.value.trim()) render(index, input.value);
    });

    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', event => {
      event.stopImmediatePropagation();
      setOpen(!panel.classList.contains('open'));
    }, true);
    close.addEventListener('click', event => {
      event.stopImmediatePropagation();
      input.value = '';
      render(index, '');
      setOpen(false);
    }, true);
    input.addEventListener('input', event => {
      event.stopImmediatePropagation();
      render(index, input.value);
    }, true);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && panel.classList.contains('open')) setOpen(false);
    });
    document.addEventListener('click', event => {
      if (!panel.classList.contains('open')) return;
      if (header.contains(event.target)) return;
      setOpen(false);
    });

    const resolveTarget = () => {
      const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const name = params.get('search');
      if (!name || !document.body.classList.contains('products-page')) return;
      const target = [...document.querySelectorAll('.product-item')].find(item => normalize(item.dataset.productName || item.querySelector('h3')?.textContent || '') === normalize(name));
      if (!target) {
        window.setTimeout(resolveTarget, 150);
        return;
      }
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('site-search-target');
        window.setTimeout(() => target.classList.remove('site-search-target'), 1800);
      });
    };

    window.addEventListener('hashchange', resolveTarget);
    window.setTimeout(resolveTarget, 100);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
})();

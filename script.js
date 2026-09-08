(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const normalize = value => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const header = $('#siteHeader');
  const menu = $('.menu-toggle');
  const nav = $('#mainNav');
  const setMenu = open => {
    if (!menu || !nav) return;
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };
  if (menu && nav) {
    menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
    $$('.main-nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  }

  const homeSections = $$('main section[id]');
  const homeNavLinks = $$('.main-nav a');
  const updateActiveNav = () => {
    const y = window.scrollY + 150;
    let current = 'accueil';
    homeSections.forEach(section => {
      if (section.offsetTop <= y) current = section.id;
    });
    homeNavLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 25);
    $('.to-top')?.classList.toggle('show', window.scrollY > 650);
    updateActiveNav();
  }, { passive: true });
  updateActiveNav();
  $('.to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .12 });
    $$('.reveal').forEach(element => observer.observe(element));
  }

  const searchToggle = $('.search-toggle');
  const searchPanel = $('.search-panel');
  const searchInput = $('#siteSearch');
  const searchClose = $('.search-close');
  const cards = $$('.product-card');
  const setSearch = open => {
    if (!searchPanel) return;
    searchPanel.classList.toggle('open', open);
    searchPanel.setAttribute('aria-hidden', String(!open));
    searchToggle?.setAttribute('aria-expanded', String(open));
    if (open) window.setTimeout(() => searchInput?.focus(), 80);
  };
  searchToggle?.addEventListener('click', () => setSearch(!searchPanel.classList.contains('open')));
  searchClose?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    cards.forEach(card => {
      card.classList.remove('search-hidden');
      card.style.display = '';
    });
    setSearch(false);
  });
  searchInput?.addEventListener('input', () => {
    const query = normalize(searchInput.value.trim());
    cards.forEach(card => {
      const match = !query || normalize(`${card.dataset.search || ''} ${card.textContent}`).includes(query);
      card.classList.toggle('search-hidden', !match);
      card.style.display = match ? '' : 'none';
    });
  });
  $$('.filter-chip').forEach(chip => chip.addEventListener('click', () => {
    const filter = chip.dataset.filter || 'all';
    $$('.filter-chip').forEach(item => item.classList.toggle('active', item === chip));
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('search-hidden', !match);
      card.style.display = match ? '' : 'none';
    });
  }));

  const homepageFilters = $('.product-filters');
  if (homepageFilters && !$('.filter-discover', homepageFilters)) {
    const discoverLink = document.createElement('a');
    discoverLink.className = 'filter-discover';
    discoverLink.href = 'produits.html';
    discoverLink.textContent = '+ À DÉCOUVRIR';
    homepageFilters.appendChild(discoverLink);
  }

  $$('.product-link').forEach(link => link.addEventListener('click', () => {
    const target = link.dataset.product === 'argan' ? 'huiles' : link.dataset.product;
    window.location.href = `produits.html#${target}`;
  }));

  $('#contactForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const message = $('.form-message', event.currentTarget);
    if (message) message.textContent = 'Merci. Votre demande est prête à être transmise à l’équipe ARAOUAA.';
    event.currentTarget.reset();
  });

  function makeProductCard(name, label, tag, description, weights = ['250 g', '500 g', '1 kg']) {
    const article = document.createElement('article');
    article.className = 'product-item';
    article.dataset.productName = name;
    article.dataset.category = tag;
    article.innerHTML = `<div class="product-item-image"><div class="product-placeholder"><span>ARAOUAA</span><strong>${label}</strong><small>${tag}</small></div></div><div class="product-item-content"><span class="product-item-tag">${tag}</span><h3>${name}</h3><p>${description}</p><div class="product-formats"><span class="formats-label">FORMATS DISPONIBLES</span><div class="format-list">${weights.map(weight => `<button class="format-button" data-weight="${weight}">${weight}</button>`).join('')}<button class="format-button custom-format">+ Sur demande</button></div></div></div>`;
    return article;
  }

  function appendProducts(selector, products, defaults) {
    const grid = $(selector);
    if (!grid) return;
    const existing = new Set($$('h3', grid).map(element => normalize(element.textContent)));
    products.forEach(([name, label, description]) => {
      if (existing.has(normalize(name))) return;
      grid.appendChild(makeProductCard(name, label, defaults.tag, description || defaults.description, defaults.weights));
      existing.add(normalize(name));
    });
  }

  appendProducts('#epices .product-items', [
    ['Cumin', 'CUMIN'], ['Gingembre', 'GINGEMBRE'], ['Paprika', 'PAPRIKA'], ['Curcuma', 'CURCUMA'], ['Cannelle', 'CANNELLE'], ['Cayenne', 'CAYENNE'], ['Poivre noir', 'POIVRE NOIR'], ['Poivre blanc', 'POIVRE BLANC'], ['Cardamome', 'CARDAMOME'], ['Clous de girofle', 'CLOUS DE GIROFLE'], ['Muscade', 'MUSCADE'], ['Anis étoilé', 'ANIS ÉTOILÉ'], ['Laurier', 'LAURIER'], ['Origan', 'ORIGAN'], ['Thym', 'THYM'], ['Ail en poudre', 'AIL EN POUDRE'], ['Curry', 'CURRY'], ['Safran', 'SAFRAN'], ['Sumac', 'SUMAC'], ['Fenugrec', 'FENUGREC']
  ], { tag: 'ÉPICES', description: 'Une référence aromatique sélectionnée pour apporter profondeur, couleur et caractère aux recettes.', weights: ['50 g', '100 g', '250 g', '500 g', '1 kg'] });

  appendProducts('#epicerie .product-items', [
    ['Pois chiches', 'POIS CHICHES', 'Une référence essentielle pour les préparations traditionnelles et du quotidien.'],
    ['Lentilles', 'LENTILLES', 'Une base polyvalente pour les recettes familiales et professionnelles.'],
    ['Haricots blancs', 'HARICOTS BLANCS', 'Une référence généreuse adaptée à de nombreux usages culinaires.'],
    ['Haricots rouges', 'HARICOTS ROUGES', 'Une référence appréciée pour les préparations salées et professionnelles.'],
    ['Pois cassés', 'POIS CASSÉS', 'Une référence polyvalente pour les soupes, plats et préparations.'],
    ['Fèves', 'FÈVES', 'Une référence traditionnelle pour une cuisine généreuse et authentique.']
  ], { tag: 'ÉPICERIE', weights: ['50 g', '100 g', '250 g', '500 g', '1 kg', '5 kg'] });

  appendProducts('#fruits-secs .product-items', [
    ['Raisins secs', 'RAISINS SECS'], ['Abricots secs', 'ABRICOTS SECS'], ['Dattes', 'DATTES'], ['Figues', 'FIGUES'], ['Pruneaux', 'PRUNEAUX'], ['Cranberries', 'CRANBERRIES'], ['Goji', 'GOJI'], ['Mangue séchée', 'MANGUE SÉCHÉE'], ['Kiwi séché', 'KIWI SÉCHÉ'], ['Ananas séché', 'ANANAS SÉCHÉ'], ['Banane séchée', 'BANANE SÉCHÉE']
  ], { tag: 'FRUITS SECS', description: 'Une référence naturellement gourmande, adaptée aux préparations et à la dégustation.', weights: ['50 g', '100 g', '250 g', '500 g', '1 kg', '5 kg'] });

  appendProducts('#noix-graines .product-items', [
    ['Amandes', 'AMANDES'], ['Amande grillée', 'AMANDE GRILLÉE'], ['Amande effilée', 'AMANDE EFFILÉE'], ['Amande hachée', 'AMANDE HACHÉE'], ['Amande en poudre', 'AMANDE EN POUDRE'], ['Noix', 'NOIX'], ['Noix de cajou', 'NOIX DE CAJOU'], ['Pistaches', 'PISTACHES'], ['Noisettes', 'NOISETTES'], ['Sésame', 'SÉSAME'], ['Graines de tournesol', 'GRAINES DE TOURNESOL'], ['Graines de courge', 'GRAINES DE COURGE'], ['Graines de chia', 'GRAINES DE CHIA'], ['Pignons de pin', 'PIGNONS DE PIN'], ['Cacahuètes blanches', 'CACAHUÈTES BLANCHES'], ['Cacahuètes rouges', 'CACAHUÈTES ROUGES'], ['Cacahuètes grillées', 'CACAHUÈTES GRILLÉES'], ['Cacahuètes salées', 'CACAHUÈTES SALÉES'], ['Cacahuètes nature', 'CACAHUÈTES NATURE']
  ], { tag: 'NOIX & GRAINES', description: 'Une référence délicate au profil naturellement généreux et raffiné.', weights: ['50 g', '100 g', '250 g', '500 g', '1 kg', '5 kg'] });

  appendProducts('#cereales .product-items', [
    ['Riz', 'RIZ', 'Une référence essentielle, polyvalente et pensée pour différents usages culinaires.'],
    ['Riz blanc', 'RIZ BLANC', 'Un riz polyvalent à la texture légère, adapté aux préparations du quotidien.'],
    ['Riz jaune', 'RIZ JAUNE', 'Un riz au caractère généreux, apprécié pour sa couleur et sa présence dans l’assiette.'],
    ['Quinoa', 'QUINOA', 'Une référence essentielle, polyvalente et pensée pour différents usages culinaires.'],
    ['Pâtes', 'PÂTES', 'Une référence essentielle, polyvalente et pensée pour différents usages culinaires.'],
    ['Avoine', 'AVOINE', 'Une référence essentielle, polyvalente et pensée pour différents usages culinaires.']
  ], { tag: 'CÉRÉALES · RIZ · PÂTES', weights: ['50 g', '100 g', '250 g', '500 g', '1 kg', '5 kg'] });

  appendProducts('#autres .product-items', [
    ['Cacao en poudre', 'CACAO EN POUDRE', 'Une référence destinée aux préparations gourmandes, alimentaires et professionnelles.'],
    ['Noix de coco en poudre', 'NOIX DE COCO EN POUDRE', 'Une référence destinée aux préparations gourmandes, alimentaires et professionnelles.'],
    ['Levure', 'LEVURE', 'Une référence destinée aux préparations gourmandes, alimentaires et professionnelles.'],
    ['Couscous fin', 'COUSCOUS FIN', 'Une semoule de couscous fine, légère et adaptée aux préparations traditionnelles.'],
    ['Couscous moyen', 'COUSCOUS MOYEN', 'Une semoule de couscous de granulométrie moyenne, polyvalente et généreuse.'],
    ['Couscous complet', 'COUSCOUS COMPLET', 'Un couscous préparé à partir de blé dur complet, pour une référence plus rustique.'],
    ['Couscous multi-céréales', 'COUSCOUS MULTI-CÉRÉALES', 'Un couscous associant plusieurs céréales pour une texture et un profil plus variés.'],
    ['Torsades', 'TORSADES', 'Des pâtes en forme torsadée, idéales pour retenir sauces et préparations généreuses.'],
    ['Coquillettes', 'COQUILLETTES', 'Une pâte courte classique, pratique pour les préparations du quotidien.'],
    ['Spaghetti', 'SPAGHETTI', 'Une pâte longue et fine, adaptée aux recettes traditionnelles et aux sauces.'],
    ['Vermicelles', 'VERMICELLES', 'Des pâtes fines et légères, adaptées aux soupes, préparations et accompagnements.']
  ], { tag: 'AUTRES', weights: ['50 g', '100 g', '250 g', '500 g', '1 kg', '5 kg'] });

  appendProducts('#cafe .product-items', [
    ['Café moulu', 'CAFÉ MOULU', 'Un café torréfié puis moulu, pensé pour une préparation régulière et aromatique.'],
    ['Café en grains', 'CAFÉ EN GRAINS', 'Des grains torréfiés pour préserver la fraîcheur des arômes jusqu’à la mouture.'],
    ['Café 100 % Arabica', '100 % ARABICA', 'Un café Arabica au profil aromatique fin, équilibré et naturellement parfumé.'],
    ['Café Arabica & Robusta', 'ARABICA & ROBUSTA', 'Un assemblage équilibré entre rondeur, puissance et caractère.'],
    ['Café décaféiné', 'CAFÉ DÉCAFÉINÉ', 'Un café décaféiné conservant une expression aromatique riche et équilibrée.']
  ], { tag: 'CAFÉ', weights: ['250 g', '500 g', '1 kg', '5 kg'] });

  function addFamilySections() {
    const anchor = $('#autres');
    if (!anchor || document.querySelector('.catalog-family-section')) return;
    const families = [
      { id: 'huiles', number: '08', title: 'Huiles', description: 'Des huiles emblématiques du terroir marocain, sélectionnées pour leur caractère et leur qualité.', items: [['Huile d’argan', 'HUILE D’ARGAN', 'Une huile de caractère au goût délicatement torréfié, emblématique du terroir du Souss.'], ['Huile d’olive', 'HUILE D’OLIVE', 'Une huile d’olive fruitée et équilibrée, pensée pour la cuisine quotidienne et les préparations méditerranéennes.']] },
      { id: 'amlou', number: '09', title: 'Amlou', description: 'Une collection de pâtes à tartiner inspirées de l’amlou marocain : fruits secs torréfiés, miel et huile, dans un esprit généreux.', items: [['Amlou aux amandes', 'AMLOU AMANDES', 'La version traditionnelle, autour de l’amande torréfiée, du miel et de l’huile d’argan.'], ['Amlou aux cacahuètes', 'AMLOU CACAHUÈTES', 'Une version gourmande et généreuse aux cacahuètes grillées, miel et huile d’argan.'], ['Amlou aux noisettes', 'AMLOU NOISETTES', 'Une pâte aux notes naturellement pralinées, avec noisettes torréfiées, miel et huile.'], ['Amlou aux noix', 'AMLOU NOIX', 'Une interprétation riche et légèrement boisée autour de la noix, du miel et de l’huile.'], ['Amlou aux noix de cajou', 'AMLOU CAJOU', 'Une texture douce et crémeuse aux noix de cajou torréfiées, miel et huile.'], ['Amlou à la pistache', 'AMLOU PISTACHE', 'Une version raffinée à la pistache, pensée pour une finition plus délicate et gourmande.']] },
      { id: 'miel', number: '10', title: 'Miel', description: 'Des miels inspirés de la flore marocaine, avec des profils floraux, boisés ou plus intenses.', items: [['عسل حر', 'MIEL حر · MIEL PUR', 'Un miel authentique au caractère généreux, en conservant l’appellation traditionnelle حر.'], ['Miel d’oranger', 'MIEL D’ORANGER', 'Un miel floral et lumineux aux notes délicates de fleur d’oranger.'], ['Miel d’eucalyptus', 'MIEL D’EUCALYPTUS', 'Un profil aromatique plus marqué, avec des notes boisées et balsamiques.'], ['Miel de thym', 'MIEL DE THYM', 'Un miel intense et chaleureux aux notes herbacées caractéristiques du thym sauvage.'], ['Miel de jujubier', 'MIEL DE JUJUBIER', 'Un miel ambré au caractère profond et généreux, inspiré du jujubier marocain.'], ['Miel de romarin', 'MIEL DE ROMARIN', 'Un miel floral et herbacé au profil frais et élégant.'], ['Miel d’herbes', 'MIEL D’HERBES', 'Un miel aux notes florales et herbacées, issu d’une diversité de plantes et de fleurs.']] }
    ];

    let insertAfter = anchor;
    families.forEach(family => {
      const section = document.createElement('section');
      section.className = 'product-category-section catalog-family-section';
      section.id = family.id;
      section.dataset.section = family.id;
      section.innerHTML = `<div class="category-heading"><div class="category-heading-left"><span class="category-number">${family.number}</span><div><span class="product-item-tag">UNIVERS ARAOUAA</span><h2>${family.title}</h2></div></div><p>${family.description}</p></div><div class="product-items catalog-family-grid"></div>`;
      const grid = $('.product-items', section);
      family.items.forEach(([name, label, description]) => grid.appendChild(makeProductCard(name, label, family.title.toUpperCase(), description)));
      insertAfter.insertAdjacentElement('afterend', section);
      insertAfter = section;
    });
  }
  addFamilySections();

  function setupFooterUniverses() {
    $$('.footer-nav > div:last-child').forEach(universe => {
      const heading = $('strong', universe);
      if (!heading || !normalize(heading.textContent).includes('univers')) return;

      const isProductsPage = document.body.classList.contains('products-page');
      const prefix = isProductsPage ? '#' : 'produits.html#';
      const existingMore = $$('span, a', universe).find(item => normalize(item.textContent).includes('more') || normalize(item.textContent).includes('plus'));
      const moreHref = isProductsPage ? '#autres' : 'produits.html#autres';
      if (existingMore) {
        existingMore.tagName === 'A' ? existingMore.setAttribute('href', moreHref) : (() => {
          const link = document.createElement('a');
          link.href = moreHref;
          link.textContent = '+ Plus';
          existingMore.replaceWith(link);
        })();
      }

      const combined = $$('a', universe).find(link => normalize(link.textContent).includes('huile') && normalize(link.textContent).includes('miel'));
      combined?.remove();

      const links = [
        ['Huiles', `${prefix}huiles`],
        ['Amlou', `${prefix}amlou`],
        ['Miel', `${prefix}miel`]
      ];

      links.forEach(([label, href]) => {
        if ($$('a', universe).some(link => link.getAttribute('href') === href)) return;
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        universe.appendChild(link);
      });

      if (!$$('a', universe).some(link => link.getAttribute('href') === moreHref)) {
        const more = document.createElement('a');
        more.href = moreHref;
        more.textContent = '+ Plus';
        universe.appendChild(more);
      }
    });
  }
  setupFooterUniverses();

  function setupProductPage() {
    if (!document.body.classList.contains('products-page')) return;

    const categoryNav = $('.product-category-nav');
    const extraFamilies = [
      ['huiles', 'Huiles'],
      ['amlou', 'Amlou'],
      ['miel', 'Miel']
    ];

    if (categoryNav && !categoryNav.dataset.extraFamiliesBound) {
      extraFamilies.forEach(([category, label]) => {
        if ($$('.catalog-filter', categoryNav).some(button => button.dataset.category === category)) return;
        const button = document.createElement('button');
        button.className = 'catalog-filter';
        button.type = 'button';
        button.dataset.category = category;
        button.textContent = label;
        categoryNav.appendChild(button);
      });
      categoryNav.dataset.extraFamiliesBound = 'true';
    }

    const productSections = $$('.product-category-section');
    const filters = $$('.catalog-filter');
    const formatModal = $('#formatModal');
    const formatInput = $('#customWeight');
    const formatConfirmation = $('#formatConfirmation');
    let activeCategory = 'all';

    const categoryGroups = {
      plus: ['autres', 'huiles', 'amlou', 'miel']
    };

    const closeFormat = () => {
      formatModal?.classList.remove('open');
      formatModal?.setAttribute('aria-hidden', 'true');
    };

    const getProductName = item => normalize(item.dataset.productName || $('h3', item)?.textContent || '');

    const renderProducts = queryValue => {
      const query = normalize(queryValue.trim());
      const items = productSections.flatMap(section => $$('.product-item', section));
      const exactMatchExists = Boolean(query) && items.some(item => getProductName(item) === query);
      const visibleSections = categoryGroups[activeCategory] || [activeCategory];

      productSections.forEach(section => {
        let visible = 0;
        $$('.product-item', section).forEach(item => {
          const name = getProductName(item);
          const inCategory = activeCategory === 'all' || visibleSections.includes(section.dataset.section);
          const matchesSearch = !query || (exactMatchExists ? name === query : name.includes(query));
          const visibleItem = inCategory && matchesSearch;
          item.hidden = !visibleItem;
          visible += visibleItem ? 1 : 0;
        });
        section.hidden = visible === 0;
      });
    };

    const applyFilter = (category, scroll = false) => {
      activeCategory = category;
      filters.forEach(button => button.classList.toggle('active', button.dataset.category === category));
      const searchInput = $('.products-search-panel input');
      renderProducts(searchInput?.value || '');
      if (scroll) {
        const targetCategory = categoryGroups[category]?.[0] || category;
        productSections.find(section => section.dataset.section === targetCategory)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.category || 'all', button.dataset.category !== 'all')));

    $$('.format-button:not(.custom-format)').forEach(button => button.addEventListener('click', () => {
      button.classList.add('selected');
      window.setTimeout(() => button.classList.remove('selected'), 650);
    }));

    $$('.custom-format').forEach(button => button.addEventListener('click', () => {
      if (!formatModal) return;
      formatModal.classList.add('open');
      formatModal.setAttribute('aria-hidden', 'false');
      if (formatInput) {
        formatInput.value = '';
        window.setTimeout(() => formatInput.focus(), 80);
      }
      if (formatConfirmation) formatConfirmation.textContent = '';
    }));

    $('.format-modal-close')?.addEventListener('click', closeFormat);
    $('.format-modal-backdrop')?.addEventListener('click', closeFormat);
    $('#customWeightSubmit')?.addEventListener('click', () => {
      const value = formatInput?.value.trim();
      if (!value) {
        formatInput?.focus();
        return;
      }
      if (formatConfirmation) formatConfirmation.textContent = `Demande enregistrée : ${value}. Nous pourrons confirmer ce grammage selon vos besoins.`;
    });

    const productsHeader = $('.products-header');
    if (productsHeader && !productsHeader.dataset.headerFixed) {
      productsHeader.dataset.headerFixed = 'true';

      const actions = document.createElement('div');
      actions.className = 'products-header-actions';
      actions.innerHTML = `<button class="products-icon-button products-search-toggle" type="button" aria-label="Rechercher" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4.2 4.2"></path></svg></button><a class="products-icon-button products-instagram" href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.7" r=".8"></circle></svg></a>`;
      const logo = productsHeader.querySelector('.products-logo');
      logo ? logo.insertAdjacentElement('afterend', actions) : productsHeader.prepend(actions);

      const panel = document.createElement('div');
      panel.className = 'products-search-panel';
      panel.hidden = true;
      panel.setAttribute('aria-hidden', 'true');
      panel.innerHTML = `<div class="products-search-inner"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4.2 4.2"></path></svg><input type="search" aria-label="Rechercher un produit" placeholder="Rechercher un produit…" autocomplete="off"><button type="button" class="products-search-close" aria-label="Fermer la recherche">×</button></div>`;
      productsHeader.appendChild(panel);

      const toggle = $('.products-search-toggle', actions);
      const input = $('input', panel);
      const close = $('.products-search-close', panel);

      const closeSearch = () => {
        input.value = '';
        renderProducts('');
        panel.classList.remove('open');
        panel.hidden = true;
        panel.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
      };

      toggle.addEventListener('click', () => {
        const open = panel.classList.toggle('open');
        panel.hidden = !open;
        panel.setAttribute('aria-hidden', String(!open));
        toggle.setAttribute('aria-expanded', String(open));
        if (open) window.setTimeout(() => input.focus(), 80);
      });

      close.addEventListener('click', closeSearch);
      input.addEventListener('input', () => renderProducts(input.value));
    }

    const productMenu = $('.products-header .menu-toggle');
    const productNav = $('.products-main-nav');
    if (productMenu && productNav && !productMenu.dataset.bound) {
      productMenu.dataset.bound = 'true';
      productMenu.addEventListener('click', () => {
        const open = productNav.classList.toggle('open');
        productMenu.setAttribute('aria-expanded', String(open));
      });
      productNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => productNav.classList.remove('open')));
    }

    renderProducts('');
  }
  setupProductPage();

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    setSearch(false);
    setMenu(false);

    const productSearch = $('.products-search-panel');
    const productToggle = $('.products-search-toggle');
    if (productSearch) {
      productSearch.hidden = true;
      productSearch.classList.remove('open');
      productSearch.setAttribute('aria-hidden', 'true');
    }
    productToggle?.setAttribute('aria-expanded', 'false');
  });
})();

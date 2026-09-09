(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const normalize = value => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const language = () => localStorage.getItem('arraouaa-language') || 'fr';

  const home = {
    fr: {
      cards: [
        ['TORRÉFACTION & AROMES', 'Café', 'Des grains sélectionnés pour une tasse riche, expressive et chaleureuse.'],
        ['PARFUMS & CARACTÈRE', 'Épices', 'Des saveurs et des couleurs qui donnent une signature authentique à la cuisine.'],
        ['L’ÉPICERIE ARAOUAA', 'Épicerie', 'Un univers dédié aux essentiels du garde-manger marocain, sélectionnés avec exigence.'],
        ['SÉLECTION & TEXTURE', 'Fruits secs', 'Une sélection généreuse de fruits secs pour une expérience naturelle et gourmande.'],
        ['L’OR DU TERROIR', 'Huile & Miel', 'Des trésors naturels emblématiques du Maroc, présentés avec sobriété et élégance.']
      ],
      discover: 'Découvrir <span>→</span>',
      universes: ['Café', 'Épices', 'Épicerie', 'Fruits secs', 'Huiles', 'Amlou', 'Miel']
    },
    en: {
      cards: [
        ['ROASTING & AROMAS', 'Coffee', 'Selected beans for a rich, expressive and warm cup.'],
        ['AROMA & CHARACTER', 'Spices', 'Flavours and colours that give every recipe an authentic signature.'],
        ['ARAOUAA GROCERY', 'Grocery', 'An essentials collection for the Moroccan pantry, selected with care.'],
        ['SELECTION & TEXTURE', 'Dried fruits', 'A generous selection of dried fruits for a natural and indulgent experience.'],
        ['TERROIR GOLD', 'Oils & Honey', 'Natural Moroccan treasures, presented with simplicity and elegance.']
      ],
      discover: 'Discover <span>→</span>',
      universes: ['Coffee', 'Spices', 'Grocery', 'Dried fruits', 'Oils', 'Amlou', 'Honey']
    },
    ar: {
      cards: [
        ['التحميص والنكهات', 'القهوة', 'حبوب مختارة لفنجان غني بالنكهة ومتوازن ودافئ.'],
        ['العطور والشخصية', 'التوابل', 'نكهات وألوان تمنح المطبخ لمسة أصيلة ومميزة.'],
        ['بقالة أراوَا', 'مواد غذائية', 'أساسيات المطبخ المغربي المختارة بعناية وجودة.'],
        ['اختيار وقوام', 'فواكه مجففة', 'تشكيلة سخية من الفواكه المجففة لتجربة طبيعية وغنية.'],
        ['ذهب التراب المغربي', 'الزيوت والعسل', 'كنوز طبيعية مغربية تقدم ببساطة وأناقة.']
      ],
      discover: 'اكتشف <span>→</span>',
      universes: ['القهوة', 'التوابل', 'مواد غذائية', 'فواكه مجففة', 'الزيوت', 'أملو', 'العسل']
    }
  };

  const families = {
    fr: {
      huiles: ['Huiles', 'L’or du terroir', 'Des huiles emblématiques du terroir marocain, sélectionnées pour leur caractère et leur qualité.', { 'Huile d’argan': ['Huile d’argan', 'HUILE D’ARGAN', 'Une huile de caractère au goût délicatement torréfié, emblématique du terroir du Souss.'], 'Huile d’olive': ['Huile d’olive', 'HUILE D’OLIVE', 'Une huile d’olive fruitée et équilibrée, pensée pour la cuisine quotidienne et les préparations méditerranéennes.'] }],
      amlou: ['Amlou', 'Trésors du Souss', 'Une collection de pâtes à tartiner inspirées de l’amlou marocain : fruits secs torréfiés, miel et huile, dans un esprit généreux.', {}],
      miel: ['Miel', 'Fleurs du Maroc', 'Des miels inspirés de la flore marocaine, avec des profils floraux, boisés ou plus intenses.', {}]
    },
    en: {
      huiles: ['Oils', 'Terroir gold', 'Iconic Moroccan oils selected for their character and quality.', { 'Huile d’argan': ['Argan oil', 'ARGAN OIL', 'A distinctive oil with a delicate roasted taste, emblematic of the Souss terroir.'], 'Huile d’olive': ['Olive oil', 'OLIVE OIL', 'A fruity, balanced olive oil designed for everyday cooking and Mediterranean preparations.'] }],
      amlou: ['Amlou', 'Treasures of the Souss', 'A collection of spreads inspired by Moroccan amlou: roasted nuts, honey and oil in a generous style.', {}],
      miel: ['Honey', 'Moroccan flowers', 'Honeys inspired by Moroccan flora, with floral, woody and more intense profiles.', {}]
    },
    ar: {
      huiles: ['الزيوت', 'ذهب التراب المغربي', 'زيوت مغربية مميزة مختارة بعناية لما تتميز به من جودة وشخصية.', { 'Huile d’argan': ['زيت الأركان', 'زيت الأركان', 'زيت مميز بنكهة محمصة رقيقة، من رموز منطقة سوس.'], 'Huile d’olive': ['زيت الزيتون', 'زيت الزيتون', 'زيت زيتون متوازن بطابع فاكهي، مناسب للطبخ اليومي والتحضيرات المتوسطية.'] }],
      amlou: ['أملو', 'كنوز سوس', 'مجموعة من الكريمات المستوحاة من الأملو المغربي، تجمع المكسرات المحمصة والعسل والزيت.', {}],
      miel: ['العسل', 'زهور المغرب', 'أنواع من العسل مستوحاة من النباتات المغربية، بنكهات زهرية وخشبية وغنية.', {}]
    }
  };

  function translateHome(lang) {
    if (!document.querySelector('.site-header')) return;
    const t = home[lang] || home.fr;
    const cards = $$('.products .product-card');
    cards.forEach((card, index) => {
      const data = t.cards[index];
      if (!data) return;
      const kicker = $('.product-kicker', card);
      const title = $('h3', card);
      const description = $('.product-content > p:not(.product-kicker)', card);
      const link = $('.product-link', card);
      if (kicker) kicker.textContent = data[0];
      if (title) title.textContent = data[1];
      if (description) description.textContent = data[2];
      if (link) link.innerHTML = t.discover;
    });

    const footer = $('.site-footer');
    if (footer) {
      const links = $$('.footer-nav > div:last-child a', footer);
      t.universes.forEach((label, index) => {
        if (links[index]) links[index].textContent = label;
      });
    }
  }

  function translateFamilies(lang) {
    if (!document.body.classList.contains('products-page')) return;
    const t = families[lang] || families.fr;
    Object.entries(t).forEach(([id, family]) => {
      const section = document.querySelector(`#${id}`);
      if (!section) return;
      const heading = $('.category-heading', section);
      if (heading) {
        const title = $('h2', heading);
        const paragraph = $('p', heading);
        const left = $('.category-heading-left', heading);
        if (title) title.textContent = family[0];
        if (left) left.textContent = family[1];
        if (paragraph) paragraph.textContent = family[2];
      }
      const productMap = family[3] || {};
      $$('.product-item', section).forEach(item => {
        const original = item.dataset.productName || '';
        const translated = productMap[original];
        if (!translated) return;
        const tag = $('.product-item-tag', item);
        const title = $('h3', item);
        const description = $('.product-item-content > p', item);
        if (tag) tag.textContent = translated[1];
        if (title) title.textContent = translated[0];
        if (description) description.textContent = translated[2];
      });
    });
    $$('.product-item').forEach(item => {
      $('.formats-label', item)?.replaceChildren(document.createTextNode(lang === 'en' ? 'AVAILABLE FORMATS' : lang === 'ar' ? 'الأحجام المتاحة' : 'FORMATS DISPONIBLES'));
      $('.custom-format', item)?.replaceChildren(document.createTextNode(lang === 'en' ? '+ On request' : lang === 'ar' ? '+ حسب الطلب' : '+ Sur demande'));
    });
  }

  function translate(lang) {
    translateHome(lang);
    translateFamilies(lang);
  }

  translate(language());
  window.addEventListener('arraouaa:languagechange', event => translate(event.detail?.language || language()));
})();

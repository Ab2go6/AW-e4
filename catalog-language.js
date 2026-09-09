(() => {
  const copy = {
    fr: {
      heroEyebrow: 'ARAOUAA PREMIUM · CATALOGUE',
      heroTitle: 'Nos <em>produits.</em>',
      heroText: 'Une collection organisée par univers, avec des formats standards clairement identifiés et la possibilité de demander un grammage personnalisé selon vos besoins.',
      introEyebrow: 'UNIVERS ARAOUAA',
      introTitle: 'Une gamme <em>pensée par famille.</em>',
      introText: 'Chaque univers rassemble des références distinctes. Les formats proposés correspondent aux conditionnements standards, tandis que <strong>+ Sur demande</strong> permet de demander un autre grammage.',
      all: 'Tous', cafe: 'Café', spices: 'Épices', grocery: 'Épicerie', dried: 'Fruits secs', nuts: 'Noix & graines', cereals: 'Céréales · Riz · Pâtes', more: '+ Plus',
      storyEyebrow: 'NOTRE APPROCHE', storyTitle: 'Derrière chaque référence,<br><em>une attention particulière.</em>',
      ctaEyebrow: "BESOIN D'INFORMATIONS ?", ctaTitle: 'Parlons de<br><em>nos produits.</em>', ctaText: "Vous souhaitez connaître les formats disponibles, découvrir une référence ou discuter d'un besoin professionnel ? Notre équipe est à votre écoute.", contact: 'Nous contacter <span>→</span>',
      navHome: 'Accueil', navAbout: 'À propos', navProducts: 'Produits', navContact: 'Contact', navSavoir: 'Notre savoir-faire'
    },
    en: {
      heroEyebrow: 'ARAOUAA PREMIUM · CATALOGUE',
      heroTitle: 'Our <em>products.</em>',
      heroText: 'A collection organized by category, with clearly identified standard formats and the option to request a custom size for your needs.',
      introEyebrow: 'ARAOUAA COLLECTIONS',
      introTitle: 'A range <em>built by family.</em>',
      introText: 'Each collection brings together distinct references. Standard formats are clearly identified, while <strong>+ On request</strong> lets you ask for another size.',
      all: 'All', cafe: 'Coffee', spices: 'Spices', grocery: 'Grocery', dried: 'Dried fruits', nuts: 'Nuts & seeds', cereals: 'Cereals · Rice · Pasta', more: '+ More',
      storyEyebrow: 'OUR APPROACH', storyTitle: 'Behind every reference,<br><em>care in every detail.</em>',
      ctaEyebrow: 'NEED INFORMATION?', ctaTitle: 'Let’s discuss<br><em>our products.</em>', ctaText: 'Want to know available formats, discover a reference or discuss a professional need? Our team is here to help.', contact: 'Contact us <span>→</span>',
      navHome: 'Home', navAbout: 'About', navProducts: 'Products', navContact: 'Contact', navSavoir: 'Our know-how'
    },
    ar: {
      heroEyebrow: 'أراوَا بريميوم · الكتالوج',
      heroTitle: '<em>منتجاتنا.</em>',
      heroText: 'مجموعة منظمة حسب الفئات، مع أحجام قياسية واضحة وإمكانية طلب وزن مخصص حسب احتياجاتكم.',
      introEyebrow: 'فئات أراوَا',
      introTitle: 'تشكيلة <em>منظمة حسب الفئة.</em>',
      introText: 'تجمع كل فئة مراجع مختلفة. الأحجام القياسية واضحة، بينما تتيح <strong>+ حسب الطلب</strong> طلب وزن آخر.',
      all: 'الكل', cafe: 'القهوة', spices: 'التوابل', grocery: 'مواد غذائية', dried: 'فواكه مجففة', nuts: 'مكسرات وبذور', cereals: 'حبوب · أرز · معكرونة', more: '+ المزيد',
      storyEyebrow: 'منهجنا', storyTitle: 'خلف كل منتج،<br><em>عناية بكل تفصيل.</em>',
      ctaEyebrow: 'هل تحتاج معلومات؟', ctaTitle: 'لنتحدث عن<br><em>منتجاتنا.</em>', ctaText: 'ترغب في معرفة الأحجام المتاحة أو اكتشاف منتج أو مناقشة احتياج مهني؟ فريقنا في خدمتكم.', contact: 'اتصل بنا <span>→</span>',
      navHome: 'الرئيسية', navAbout: 'من نحن', navProducts: 'المنتجات', navContact: 'اتصل بنا', navSavoir: 'خبرتنا'
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  if (!document.body.classList.contains('products-page')) return;

  const set = (selector, value) => $$(selector).forEach(element => { element.innerHTML = value; });
  const translate = language => {
    const t = copy[language] || copy.fr;
    set('.products-hero-eyebrow', t.heroEyebrow);
    set('.products-hero-copy h1', t.heroTitle);
    set('.products-hero-copy>p', t.heroText);
    set('.products-intro .eyebrow', t.introEyebrow);
    set('.products-intro h2', t.introTitle);
    set('.products-intro>p:last-child', t.introText);

    const labels = { all: t.all, cafe: t.cafe, epices: t.spices, epicerie: t.grocery, 'fruits-secs': t.dried, 'noix-graines': t.nuts, cereales: t.cereals, plus: t.more };
    Object.entries(labels).forEach(([key, value]) => set(`.catalog-filter[data-category="${key}"]`, value));

    set('.product-story .eyebrow', t.storyEyebrow);
    set('.product-story-copy h2', t.storyTitle);
    set('.products-cta .eyebrow', t.ctaEyebrow);
    set('.products-cta h2', t.ctaTitle);
    set('.products-cta>p:nth-of-type(2)', t.ctaText);
    set('.products-cta .cta-button', t.contact);

    set('.products-main-nav a[href="index.html"]', t.navHome);
    set('.products-main-nav a[href="index.html#apropos"]', t.navAbout);
    set('.products-main-nav a[href="produits.html"]', t.navProducts);
    set('.products-main-nav a[href="index.html#contact"]', t.navContact);
    set('.products-main-nav [data-savoir-faire="true"]', t.navSavoir);
    set('.footer-nav>div:first-child a[href="index.html"]', t.navHome);
    set('.footer-nav>div:first-child a[href="index.html#apropos"]', t.navAbout);
    set('.footer-nav>div:first-child a[href="produits.html"]', t.navProducts);
    set('.footer-nav>div:first-child a[href="index.html#contact"]', t.navContact);
  };

  const language = localStorage.getItem('arraouaa-language') || 'fr';
  translate(language);
  window.addEventListener('arraouaa:languagechange', event => translate(event.detail?.language || 'fr'));
})();

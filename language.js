(() => {
  const LANGUAGES = ['fr', 'ar', 'en'];
  const DEFAULT_LANGUAGE = 'fr';
  const STORAGE_KEY = 'arraouaa-language';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const translations = {
    fr: {
      'nav.home': 'Accueil', 'nav.about': 'À propos', 'nav.products': 'Produits', 'nav.quality': 'Notre qualité', 'nav.contact': 'Contact', 'nav.savoir': 'Notre savoir-faire',
      'top.products': 'Produits marocains sélectionnés avec soin', 'top.quality': 'Qualité premium · Savoir-faire authentique', 'top.follow': 'Suivez-nous',
      'hero.eyebrow': 'ARAOUAA PREMIUM · MAROC', 'hero.title': 'L’excellence<br>de la <em>nature.</em>', 'hero.lead': 'Café, épices, épicerie, fruits secs, huile, miel &amp; bien plus : une sélection inspirée par la richesse du terroir marocain, présentée avec une identité premium.', 'hero.cta': 'Découvrir nos produits <span>→</span>', 'hero.more': 'En savoir plus <span>↓</span>',
      'quality.premium': 'Qualité premium', 'quality.premiumText': 'Une présentation à la hauteur du produit', 'quality.auth': 'Authenticité', 'quality.authText': 'Une identité profondément marocaine', 'quality.know': 'Savoir-faire', 'quality.knowText': 'Le respect du caractère de chaque produit', 'quality.commit': 'Engagement', 'quality.commitText': 'Une relation construite sur la confiance',
      'products.eyebrow': 'NOTRE SÉLECTION', 'products.title': 'Nos <em>Produits</em>', 'products.lead': 'Une sélection marocaine pensée pour réunir authenticité, qualité et élégance dans chaque univers.', 'filter.all': 'Tous', 'filter.cafe': 'Café', 'filter.spices': 'Épices', 'filter.grocery': 'Épicerie', 'filter.dried': 'Fruits secs', 'filter.argan': 'Huile d’argan', 'filter.discover': '+ À DÉCOUVRIR', 'discover': 'Découvrir <span>→</span>',
      'story.eyebrow': 'L’HISTOIRE ARAOUAA', 'story.title': 'Née du Maroc.<br><em>Imaginée pour rayonner.</em>', 'story.p1': 'ARAOUAA rassemble une sélection de produits marocains dans un univers où la matière, le goût et l’identité occupent la première place.', 'story.p2': 'Notre vision est simple : préserver le caractère de chaque produit tout en lui offrant une présentation contemporaine, élégante et immédiatement reconnaissable.', 'story.origin': 'Origine', 'story.originText': 'Une identité enracinée au Maroc', 'story.selection': 'Sélection', 'story.selectionText': 'Des univers choisis avec exigence', 'story.presentation': 'Présentation', 'story.presentationText': 'Une signature visuelle premium',
      'values.eyebrow': 'POURQUOI ARAOUAA', 'values.title': 'Plus qu’une collection.<br><em>Une signature.</em>', 'values.selection': 'Sélection exigeante', 'values.selectionText': 'Chaque univers est pensé autour de la qualité, du caractère et d’une présentation cohérente.', 'values.morocco': 'Esprit marocain', 'values.moroccoText': 'Des couleurs, des matières et des saveurs qui rendent hommage à la richesse du Maroc.', 'values.pro': 'Vision professionnelle', 'values.proText': 'Une image claire et premium pour accompagner les partenaires, détaillants et professionnels.',
      'partners.eyebrow': 'PARTENAIRES &amp; PROFESSIONNELS', 'partners.title': 'Le goût du Maroc,<br><em>prêt à trouver sa place.</em>', 'partners.text': 'ARAOUAA s’adresse également aux commerces, cafés, établissements d’hospitalité et partenaires qui souhaitent proposer une sélection marocaine avec une image soignée.', 'partners.cta': 'Parler de votre projet <span>→</span>',
      'contact.eyebrow': 'CONTACTEZ ARAOUAA', 'contact.title': 'Parlons de votre <em>projet.</em>', 'contact.lead': 'Une question sur nos produits, un projet professionnel ou simplement envie d’en savoir plus ? Écrivez-nous.', 'contact.name': 'Votre nom', 'contact.email': 'Votre e-mail', 'contact.request': 'Votre demande', 'contact.message': 'Votre message', 'contact.send': 'Envoyer ma demande <span>→</span>', 'contact.option.products': 'Découvrir les produits', 'contact.option.pro': 'Demande professionnelle', 'contact.option.partner': 'Partenariat', 'contact.option.other': 'Autre demande', 'contact.placeholderName': 'Votre nom', 'contact.placeholderEmail': 'vous@exemple.com', 'contact.placeholderMessage': 'Écrivez votre message…', 'contact.sent': 'Merci. Votre demande est prête à être transmise à l’équipe ARAOUAA.', 'contact.emailLabel': 'E-MAIL', 'contact.location': 'SITUATION', 'contact.activity': 'ACTIVITÉ', 'contact.country': 'Maroc', 'contact.activityText': 'Produits marocains premium', 'contact.question': 'Une question ?', 'contact.questionText': 'Nous serons ravis d’échanger avec vous et de vous présenter l’univers ARAOUAA.', 'contact.link': 'Nous contacter →',
      'footer.tagline': 'POUR PARFUMER VOS PLATS', 'footer.navigation': 'Navigation', 'footer.universes': 'Nos univers', 'footer.contact': 'Contact', 'footer.auth': 'Authenticité marocaine · Qualité premium', 'footer.more': '+ Plus',
      'savoir.eyebrow': 'ARAOUAA PREMIUM · SAVOIR-FAIRE', 'savoir.title': 'L’excellence commence<br><em>à la source.</em>', 'savoir.intro': 'Notre savoir-faire repose sur une exigence simple : respecter la matière, comprendre son origine et présenter chaque produit avec justesse.', 'savoir.approach': 'Notre approche', 'savoir.selection': 'Sélection', 'savoir.preparation': 'Préparation', 'savoir.exigence': 'Exigence', 'savoir.presentation': 'Présentation', 'savoir.morocco': 'Une identité profondément marocaine', 'savoir.cta': 'Découvrir nos produits <span>→</span>'
    },
    en: {
      'nav.home': 'Home', 'nav.about': 'About', 'nav.products': 'Products', 'nav.quality': 'Our quality', 'nav.contact': 'Contact', 'nav.savoir': 'Our know-how',
      'top.products': 'Carefully selected Moroccan products', 'top.quality': 'Premium quality · Authentic know-how', 'top.follow': 'Follow us',
      'hero.eyebrow': 'ARAOUAA PREMIUM · MOROCCO', 'hero.title': 'Excellence<br>from <em>nature.</em>', 'hero.lead': 'Coffee, spices, grocery, dried fruits, oils, honey &amp; more: a selection inspired by the richness of Moroccan terroir, presented with a premium identity.', 'hero.cta': 'Discover our products <span>→</span>', 'hero.more': 'Learn more <span>↓</span>',
      'quality.premium': 'Premium quality', 'quality.premiumText': 'A presentation worthy of the product', 'quality.auth': 'Authenticity', 'quality.authText': 'A deeply Moroccan identity', 'quality.know': 'Know-how', 'quality.knowText': 'Respect for each product’s character', 'quality.commit': 'Commitment', 'quality.commitText': 'A relationship built on trust',
      'products.eyebrow': 'OUR SELECTION', 'products.title': 'Our <em>Products</em>', 'products.lead': 'A Moroccan selection designed to bring authenticity, quality and elegance together in every collection.', 'filter.all': 'All', 'filter.cafe': 'Coffee', 'filter.spices': 'Spices', 'filter.grocery': 'Grocery', 'filter.dried': 'Dried fruits', 'filter.argan': 'Argan oil', 'filter.discover': '+ DISCOVER MORE', 'discover': 'Discover <span>→</span>',
      'story.eyebrow': 'THE ARAOUAA STORY', 'story.title': 'Born in Morocco.<br><em>Imagined to shine.</em>', 'story.p1': 'ARAOUAA brings together a selection of Moroccan products in a world where material, taste and identity come first.', 'story.p2': 'Our vision is simple: preserve each product’s character while giving it a contemporary, elegant and immediately recognizable presentation.', 'story.origin': 'Origin', 'story.originText': 'An identity rooted in Morocco', 'story.selection': 'Selection', 'story.selectionText': 'Collections chosen with care', 'story.presentation': 'Presentation', 'story.presentationText': 'A premium visual signature',
      'values.eyebrow': 'WHY ARAOUAA', 'values.title': 'More than a collection.<br><em>A signature.</em>', 'values.selection': 'Careful selection', 'values.selectionText': 'Every collection is built around quality, character and a coherent presentation.', 'values.morocco': 'Moroccan spirit', 'values.moroccoText': 'Colours, materials and flavours that celebrate the richness of Morocco.', 'values.pro': 'Professional vision', 'values.proText': 'A clear premium image designed to support partners, retailers and professionals.',
      'partners.eyebrow': 'PARTNERS &amp; PROFESSIONALS', 'partners.title': 'The taste of Morocco,<br><em>ready to find its place.</em>', 'partners.text': 'ARAOUAA also works with shops, cafés, hospitality businesses and partners looking for a Moroccan selection with a polished identity.', 'partners.cta': 'Discuss your project <span>→</span>',
      'contact.eyebrow': 'CONTACT ARAOUAA', 'contact.title': 'Let’s discuss your <em>project.</em>', 'contact.lead': 'A question about our products, a professional project or simply want to learn more? Write to us.', 'contact.name': 'Your name', 'contact.email': 'Your email', 'contact.request': 'Your request', 'contact.message': 'Your message', 'contact.send': 'Send my request <span>→</span>', 'contact.option.products': 'Discover the products', 'contact.option.pro': 'Professional request', 'contact.option.partner': 'Partnership', 'contact.option.other': 'Other request', 'contact.placeholderName': 'Your name', 'contact.placeholderEmail': 'you@example.com', 'contact.placeholderMessage': 'Write your message…', 'contact.sent': 'Thank you. Your request is ready to be sent to the ARAOUAA team.', 'contact.emailLabel': 'EMAIL', 'contact.location': 'LOCATION', 'contact.activity': 'ACTIVITY', 'contact.country': 'Morocco', 'contact.activityText': 'Premium Moroccan products', 'contact.question': 'Have a question?', 'contact.questionText': 'We would be happy to speak with you and introduce you to the ARAOUAA world.', 'contact.link': 'Contact us →',
      'footer.tagline': 'TO FLAVOUR YOUR DISHES', 'footer.navigation': 'Navigation', 'footer.universes': 'Our universes', 'footer.contact': 'Contact', 'footer.auth': 'Moroccan authenticity · Premium quality', 'footer.more': '+ More',
      'savoir.eyebrow': 'ARAOUAA PREMIUM · KNOW-HOW', 'savoir.title': 'Excellence begins<br><em>at the source.</em>', 'savoir.intro': 'Our know-how is built around one simple standard: respect the material, understand its origin and present every product with precision.', 'savoir.approach': 'Our approach', 'savoir.selection': 'Selection', 'savoir.preparation': 'Preparation', 'savoir.exigence': 'Standards', 'savoir.presentation': 'Presentation', 'savoir.morocco': 'A deeply Moroccan identity', 'savoir.cta': 'Discover our products <span>→</span>'
    },
    ar: {
      'nav.home': 'الرئيسية', 'nav.about': 'من نحن', 'nav.products': 'المنتجات', 'nav.quality': 'جودة منتجاتنا', 'nav.contact': 'اتصل بنا', 'nav.savoir': 'خبرتنا',
      'top.products': 'منتجات مغربية مختارة بعناية', 'top.quality': 'جودة راقية · خبرة أصيلة', 'top.follow': 'تابعونا',
      'hero.eyebrow': 'أراوَا بريميوم · المغرب', 'hero.title': 'تميّز<br>مستمد من <em>الطبيعة.</em>', 'hero.lead': 'القهوة والتوابل والمواد الغذائية والفواكه المجففة والزيوت والعسل وأكثر: تشكيلة مستوحاة من غنى التراث المغربي، بهوية راقية.', 'hero.cta': 'اكتشف منتجاتنا <span>→</span>', 'hero.more': 'اكتشف المزيد <span>↓</span>',
      'quality.premium': 'جودة راقية', 'quality.premiumText': 'تقديم يليق بقيمة المنتج', 'quality.auth': 'أصالة', 'quality.authText': 'هوية مغربية متجذرة', 'quality.know': 'خبرة', 'quality.knowText': 'احترام خصوصية كل منتج', 'quality.commit': 'التزام', 'quality.commitText': 'علاقة مبنية على الثقة',
      'products.eyebrow': 'اختياراتنا', 'products.title': 'منتجاتنا <em></em>', 'products.lead': 'تشكيلة مغربية تجمع بين الأصالة والجودة والأناقة في كل فئة.', 'filter.all': 'الكل', 'filter.cafe': 'القهوة', 'filter.spices': 'التوابل', 'filter.grocery': 'مواد غذائية', 'filter.dried': 'فواكه مجففة', 'filter.argan': 'زيت الأركان', 'filter.discover': '+ اكتشف المزيد', 'discover': 'اكتشف <span>→</span>',
      'story.eyebrow': 'قصة أراوَا', 'story.title': 'ولدت من المغرب.<br><em>وصُممت لتتألق.</em>', 'story.p1': 'تجمع أراوَا مجموعة من المنتجات المغربية في عالم تتصدر فيه المادة والطعم والهوية المشهد.', 'story.p2': 'رؤيتنا بسيطة: الحفاظ على شخصية كل منتج مع منحه تقديمًا عصريًا وأنيقًا يسهل تمييزه.', 'story.origin': 'الأصل', 'story.originText': 'هوية متجذرة في المغرب', 'story.selection': 'الاختيار', 'story.selectionText': 'فئات مختارة بعناية', 'story.presentation': 'التقديم', 'story.presentationText': 'هوية بصرية راقية',
      'values.eyebrow': 'لماذا أراوَا', 'values.title': 'أكثر من مجموعة.<br><em>إنها هوية.</em>', 'values.selection': 'اختيار دقيق', 'values.selectionText': 'كل فئة تقوم على الجودة والشخصية وتقديم متناسق.', 'values.morocco': 'روح مغربية', 'values.moroccoText': 'ألوان ومواد ونكهات تحتفي بغنى المغرب.', 'values.pro': 'رؤية مهنية', 'values.proText': 'صورة واضحة وراقية لخدمة الشركاء وتجار التجزئة والمهنيين.',
      'partners.eyebrow': 'الشركاء والمهنيون', 'partners.title': 'نكهة المغرب،<br><em>جاهزة لتجد مكانها.</em>', 'partners.text': 'تعمل أراوَا أيضًا مع المتاجر والمقاهي وقطاع الضيافة والشركاء الباحثين عن تشكيلة مغربية بهوية متقنة.', 'partners.cta': 'تحدث عن مشروعك <span>→</span>',
      'contact.eyebrow': 'تواصل مع أراوَا', 'contact.title': 'لنتحدث عن <em>مشروعك.</em>', 'contact.lead': 'لديك سؤال حول منتجاتنا أو مشروع مهني أو ترغب فقط في معرفة المزيد؟ اكتب لنا.', 'contact.name': 'اسمك', 'contact.email': 'بريدك الإلكتروني', 'contact.request': 'طلبك', 'contact.message': 'رسالتك', 'contact.send': 'إرسال الطلب <span>→</span>', 'contact.option.products': 'اكتشاف المنتجات', 'contact.option.pro': 'طلب مهني', 'contact.option.partner': 'شراكة', 'contact.option.other': 'طلب آخر', 'contact.placeholderName': 'اسمك', 'contact.placeholderEmail': 'you@example.com', 'contact.placeholderMessage': 'اكتب رسالتك…', 'contact.sent': 'شكرًا لك. طلبك جاهز للإرسال إلى فريق أراوَا.', 'contact.emailLabel': 'البريد الإلكتروني', 'contact.location': 'الموقع', 'contact.activity': 'النشاط', 'contact.country': 'المغرب', 'contact.activityText': 'منتجات مغربية راقية', 'contact.question': 'لديك سؤال؟', 'contact.questionText': 'يسعدنا التواصل معك وتقديم عالم أراوَا لك.', 'contact.link': 'اتصل بنا →',
      'footer.tagline': 'لتعطير أطباقكم', 'footer.navigation': 'التنقل', 'footer.universes': 'عالمنا', 'footer.contact': 'اتصل بنا', 'footer.auth': 'أصالة مغربية · جودة راقية', 'footer.more': '+ المزيد',
      'savoir.eyebrow': 'أراوَا بريميوم · خبرتنا', 'savoir.title': 'يبدأ التميز<br><em>من المصدر.</em>', 'savoir.intro': 'تقوم خبرتنا على مبدأ بسيط: احترام المادة، فهم أصلها وتقديم كل منتج بدقة.', 'savoir.approach': 'منهجنا', 'savoir.selection': 'الاختيار', 'savoir.preparation': 'التحضير', 'savoir.exigence': 'المعايير', 'savoir.presentation': 'التقديم', 'savoir.morocco': 'هوية مغربية متجذرة', 'savoir.cta': 'اكتشف منتجاتنا <span>→</span>'
    }
  };

  const selectorMap = {
    'nav.home': '.main-nav a[href="#accueil"], .products-main-nav a[href="index.html"]',
    'nav.about': '.main-nav a[href="#apropos"], .products-main-nav a[href="index.html#apropos"]',
    'nav.products': '.main-nav a[href="produits.html"], .products-main-nav a[href="produits.html"]',
    'nav.quality': '.main-nav a[href="#qualite"], .products-main-nav a[href="index.html#qualite"]',
    'nav.contact': '.main-nav a[href="#contact"], .products-main-nav a[href="index.html#contact"], .header-contact, .products-header-contact',
    'top.products': '.announcement-inner > span:first-child', 'top.quality': '.announcement-inner > span:nth-child(3)', 'top.follow': '.announcement-socials > span:first-child',
    'hero.eyebrow': '.hero-copy .eyebrow', 'hero.title': '.hero-copy h1', 'hero.lead': '.hero-lead', 'hero.cta': '.hero-actions .button-primary', 'hero.more': '.hero-actions .button-quiet',
    'products.eyebrow': '.products .section-heading .eyebrow', 'products.title': '.products .section-heading h2', 'products.lead': '.products .section-heading > p:last-child',
    'story.eyebrow': '.story-copy .eyebrow', 'story.title': '.story-copy h2', 'story.p1': '.story-copy > p:nth-of-type(1)', 'story.p2': '.story-copy > p:nth-of-type(2)',
    'values.eyebrow': '.values .section-heading .eyebrow', 'values.title': '.values .section-heading h2', 'partners.eyebrow': '.partner-copy .eyebrow', 'partners.title': '.partner-copy h2', 'partners.text': '.partner-copy > p:last-of-type', 'partners.cta': '.partner-copy .button-primary',
    'contact.eyebrow': '.contact .section-heading .eyebrow', 'contact.title': '.contact .section-heading h2', 'contact.lead': '.contact .section-heading > p:last-child', 'contact.send': '#contactForm .button-primary', 'contact.question': '.contact-highlight strong', 'contact.questionText': '.contact-highlight p', 'contact.link': '.contact-highlight a',
    'footer.tagline': '.footer-brand > p', 'footer.navigation': '.footer-nav > div:first-child strong', 'footer.universes': '.footer-nav > div:nth-child(2) strong', 'footer.contact': '.footer-nav > div:nth-child(3) strong', 'footer.auth': '.footer-bottom > span:last-child',
    'savoir.eyebrow': '.savoir-hero .eyebrow, .savoir-hero-eyebrow', 'savoir.title': '.savoir-hero h1', 'savoir.intro': '.savoir-intro', 'savoir.approach': '.savoir-approach .eyebrow', 'savoir.morocco': '.savoir-origin h2', 'savoir.cta': '.savoir-cta .button-primary'
  };

  function loadStyles() {
    if ($('#arraouaa-language-css')) return;
    const link = document.createElement('link');
    link.id = 'arraouaa-language-css'; link.rel = 'stylesheet'; link.href = 'language.css';
    document.head.appendChild(link);
  }

  function addSelector() {
    const target = $('.announcement-socials') || $('.announcement-inner') || $('.products-header');
    if (!target || $('.language-switcher')) return;
    const wrap = document.createElement('div');
    wrap.className = 'language-switcher is-rtl';
    wrap.setAttribute('aria-label', 'Language');
    LANGUAGES.forEach(lang => {
      const button = document.createElement('button');
      button.type = 'button'; button.dataset.language = lang; button.textContent = lang.toUpperCase();
      button.addEventListener('click', () => setLanguage(lang));
      wrap.appendChild(button);
    });
    target.appendChild(wrap);
  }

  function addSavoirFaireLinks() {
    const label = translations.fr['nav.savoir'];
    $$('.main-nav, .products-main-nav').forEach(nav => {
      if ([...nav.querySelectorAll('a')].some(a => a.dataset.savoirFaire === 'true')) return;
      const link = document.createElement('a');
      link.href = 'savoir-faire.html'; link.dataset.savoirFaire = 'true'; link.textContent = label;
      nav.appendChild(link);
    });
  }

  function setText(selector, value) {
    if (!value) return;
    $$(selector).forEach(element => { element.innerHTML = value; element.dataset.i18nApplied = 'true'; });
  }

  function translateForm(lang) {
    const t = translations[lang];
    const labels = $$('#contactForm label');
    if (labels[0]) labels[0].childNodes[0].nodeValue = `${t['contact.name']} `;
    if (labels[1]) labels[1].childNodes[0].nodeValue = `${t['contact.email']} `;
    if (labels[2]) labels[2].childNodes[0].nodeValue = `${t['contact.request']} `;
    if (labels[3]) labels[3].childNodes[0].nodeValue = `${t['contact.message']} `;
    $('#contactForm input[name="name"]')?.setAttribute('placeholder', t['contact.placeholderName']);
    $('#contactForm input[name="email"]')?.setAttribute('placeholder', t['contact.placeholderEmail']);
    $('#contactForm textarea[name="message"]')?.setAttribute('placeholder', t['contact.placeholderMessage']);
    const options = ['products','pro','partner','other'];
    options.forEach((key, index) => { const option = $('#contactForm select')?.options[index]; if (option) option.textContent = t[`contact.option.${key}`]; });
  }

  function translate(lang) {
    const t = translations[lang] || translations[DEFAULT_LANGUAGE];
    Object.entries(selectorMap).forEach(([key, selector]) => setText(selector, t[key]));
    const filterKeys = [['all','filter.all'],['cafe','filter.cafe'],['epices','filter.spices'],['epicerie','filter.grocery'],['fruits-secs','filter.dried'],['argan','filter.argan']];
    filterKeys.forEach(([category, key]) => $$('.filter-chip[data-filter="'+category+'"]').forEach(el => el.textContent = t[key]));
    $('.filter-discover')?.replaceChildren(document.createTextNode(t['filter.discover']));
    $$('.product-link').forEach(el => el.innerHTML = t.discover);
    translateForm(lang);
    $$('.language-switcher button').forEach(button => button.classList.toggle('active', button.dataset.language === lang));
    const savoirLinks = $$('[data-savoir-faire="true"]');
    savoirLinks.forEach(link => link.textContent = t['nav.savoir']);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('is-arabic', lang === 'ar');
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function setLanguage(lang) {
    if (!LANGUAGES.includes(lang)) return;
    translate(lang);
    window.dispatchEvent(new CustomEvent('arraouaa:languagechange', { detail: { language: lang } }));
  }

  function init() {
    loadStyles();
    addSelector();
    addSavoirFaireLinks();
    const saved = localStorage.getItem(STORAGE_KEY);
    setLanguage(LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

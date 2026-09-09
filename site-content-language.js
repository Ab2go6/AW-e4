(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const language = () => localStorage.getItem('arraouaa-language') || 'fr';

  const home = {
    fr: { cards: [['TORRÉFACTION & AROMES','Café','Des grains sélectionnés pour une tasse riche, expressive et chaleureuse.'],['PARFUMS & CARACTÈRE','Épices','Des saveurs et des couleurs qui donnent une signature authentique à la cuisine.'],['L’ÉPICERIE ARAOUAA','Épicerie','Un univers dédié aux essentiels du garde-manger marocain, sélectionnés avec exigence.'],['SÉLECTION & TEXTURE','Fruits secs','Une sélection généreuse de fruits secs pour une expérience naturelle et gourmande.'],['L’OR DU TERROIR','Huile & Miel','Des trésors naturels emblématiques du Maroc, présentés avec sobriété et élégance.']], discover:'Découvrir <span>→</span>', universes:['Café','Épices','Épicerie','Fruits secs','Huiles','Amlou','Miel'] },
    en: { cards: [['ROASTING & AROMAS','Coffee','Selected beans for a rich, expressive and warm cup.'],['AROMA & CHARACTER','Spices','Flavours and colours that give every recipe an authentic signature.'],['ARAOUAA GROCERY','Grocery','An essentials collection for the Moroccan pantry, selected with care.'],['SELECTION & TEXTURE','Dried fruits','A generous selection of dried fruits for a natural and indulgent experience.'],['TERROIR GOLD','Oils & Honey','Natural Moroccan treasures, presented with simplicity and elegance.']], discover:'Discover <span>→</span>', universes:['Coffee','Spices','Grocery','Dried fruits','Oils','Amlou','Honey'] },
    ar: { cards: [['التحميص والنكهات','القهوة','حبوب مختارة لفنجان غني بالنكهة ومتوازن ودافئ.'],['العطور والشخصية','التوابل','نكهات وألوان تمنح المطبخ لمسة أصيلة ومميزة.'],['بقالة أراوَا','مواد غذائية','أساسيات المطبخ المغربي المختارة بعناية وجودة.'],['اختيار وقوام','فواكه مجففة','تشكيلة سخية من الفواكه المجففة لتجربة طبيعية وغنية.'],['ذهب التراب المغربي','الزيوت والعسل','كنوز طبيعية مغربية تقدم ببساطة وأناقة.']], discover:'اكتشف <span>→</span>', universes:['القهوة','التوابل','مواد غذائية','فواكه مجففة','الزيوت','أملو','العسل'] }
  };

  const families = {
    fr: {
      huiles:['Huiles','L’or du terroir','Des huiles emblématiques du terroir marocain, sélectionnées pour leur caractère et leur qualité.',{'Huile d’argan':['Huile d’argan','HUILE D’ARGAN','Une huile de caractère au goût délicatement torréfié, emblématique du terroir du Souss.'],'Huile d’olive':['Huile d’olive','HUILE D’OLIVE','Une huile d’olive fruitée et équilibrée, pensée pour la cuisine quotidienne et les préparations méditerranéennes.']}],
      amlou:['Amlou','Trésors du Souss','Une collection de pâtes à tartiner inspirées de l’amlou marocain : fruits secs torréfiés, miel et huile, dans un esprit généreux.',{'Amlou aux amandes':['Amlou aux amandes','AMLOU AMANDES','La version traditionnelle, autour de l’amande torréfiée, du miel et de l’huile d’argan.'],'Amlou aux cacahuètes':['Amlou aux cacahuètes','AMLOU CACAHUÈTES','Une version gourmande et généreuse aux cacahuètes grillées, miel et huile d’argan.'],'Amlou aux noisettes':['Amlou aux noisettes','AMLOU NOISETTES','Une pâte aux notes naturellement pralinées, avec noisettes torréfiées, miel et huile.'],'Amlou aux noix':['Amlou aux noix','AMLOU NOIX','Une interprétation riche et légèrement boisée autour de la noix, du miel et de l’huile.'],'Amlou aux noix de cajou':['Amlou aux noix de cajou','AMLOU CAJOU','Une texture douce et crémeuse aux noix de cajou torréfiées, miel et huile.'],'Amlou à la pistache':['Amlou à la pistache','AMLOU PISTACHE','Une version raffinée à la pistache, pensée pour une finition plus délicate et gourmande.']}],
      miel:['Miel','Fleurs du Maroc','Des miels inspirés de la flore marocaine, avec des profils floraux, boisés ou plus intenses.',{'عسل حر':['عسل حر','MIEL حر · MIEL PUR','Un miel authentique au caractère généreux, en conservant l’appellation traditionnelle حر.'],'Miel d’oranger':['Miel d’oranger','MIEL D’ORANGER','Un miel floral et lumineux aux notes délicates de fleur d’oranger.'],'Miel d’eucalyptus':['Miel d’eucalyptus','MIEL D’EUCALYPTUS','Un profil aromatique plus marqué, avec des notes boisées et balsamiques.'],'Miel de thym':['Miel de thym','MIEL DE THYM','Un miel intense et chaleureux aux notes herbacées caractéristiques du thym sauvage.'],'Miel de jujubier':['Miel de jujubier','MIEL DE JUJUBIER','Un miel ambré au caractère profond et généreux, inspiré du jujubier marocain.'],'Miel de romarin':['Miel de romarin','MIEL DE ROMARIN','Un miel floral et herbacé au profil frais et élégant.'],'Miel d’herbes':['Miel d’herbes','MIEL D’HERBES','Un miel aux notes florales et herbacées, issu d’une diversité de plantes et de fleurs.']}]
    },
    en: {
      huiles:['Oils','Terroir gold','Iconic Moroccan oils selected for their character and quality.',{'Huile d’argan':['Argan oil','ARGAN OIL','A distinctive oil with a delicate roasted taste, emblematic of the Souss terroir.'],'Huile d’olive':['Olive oil','OLIVE OIL','A fruity, balanced olive oil designed for everyday cooking and Mediterranean preparations.']}],
      amlou:['Amlou','Treasures of the Souss','A collection of spreads inspired by Moroccan amlou: roasted nuts, honey and oil in a generous style.',{'Amlou aux amandes':['Almond Amlou','ALMOND AMLOU','The traditional version with roasted almonds, honey and argan oil.'],'Amlou aux cacahuètes':['Peanut Amlou','PEANUT AMLOU','A generous version with roasted peanuts, honey and argan oil.'],'Amlou aux noisettes':['Hazelnut Amlou','HAZELNUT AMLOU','A naturally praline-like spread with roasted hazelnuts, honey and oil.'],'Amlou aux noix':['Walnut Amlou','WALNUT AMLOU','A rich, gently woody interpretation with walnuts, honey and oil.'],'Amlou aux noix de cajou':['Cashew Amlou','CASHEW AMLOU','A smooth, creamy texture with roasted cashews, honey and oil.'],'Amlou à la pistache':['Pistachio Amlou','PISTACHIO AMLOU','A refined pistachio version designed for a delicate, indulgent finish.']}],
      miel:['Honey','Moroccan flowers','Honeys inspired by Moroccan flora, with floral, woody and more intense profiles.',{'عسل حر':['Pure traditional honey','PURE HONEY · حر','An authentic honey with a generous character, retaining the traditional حر name.'],'Miel d’oranger':['Orange blossom honey','ORANGE BLOSSOM HONEY','A bright floral honey with delicate orange blossom notes.'],'Miel d’eucalyptus':['Eucalyptus honey','EUCALYPTUS HONEY','A more pronounced aromatic profile with woody, balsamic notes.'],'Miel de thym':['Thyme honey','THYME HONEY','An intense, warm honey with the herbal notes of wild thyme.'],'Miel de jujubier':['Jujube honey','JUJUBE HONEY','An amber honey with a deep, generous character inspired by Moroccan jujube.'],'Miel de romarin':['Rosemary honey','ROSEMARY HONEY','A floral, herbal honey with a fresh and elegant profile.'],'Miel d’herbes':['Herbal honey','HERBAL HONEY','A floral and herbal honey from a diversity of plants and flowers.']}]
    },
    ar: {
      huiles:['الزيوت','ذهب التراب المغربي','زيوت مغربية مميزة مختارة بعناية لما تتميز به من جودة وشخصية.',{'Huile d’argan':['زيت الأركان','زيت الأركان','زيت مميز بنكهة محمصة رقيقة، من رموز منطقة سوس.'],'Huile d’olive':['زيت الزيتون','زيت الزيتون','زيت زيتون متوازن بطابع فاكهي، مناسب للطبخ اليومي والتحضيرات المتوسطية.']}],
      amlou:['أملو','كنوز سوس','مجموعة من الكريمات المستوحاة من الأملو المغربي، تجمع المكسرات المحمصة والعسل والزيت.',{'Amlou aux amandes':['أملو باللوز','أملو باللوز','النسخة التقليدية من اللوز المحمص والعسل وزيت الأركان.'],'Amlou aux cacahuètes':['أملو بالفول السوداني','أملو بالفول السوداني','نسخة غنية بالفول السوداني المحمص والعسل وزيت الأركان.'],'Amlou aux noisettes':['أملو بالبندق','أملو بالبندق','كريمة بنكهة غنية تشبه البرالين مع البندق المحمص والعسل والزيت.'],'Amlou aux noix':['أملو بالجوز','أملو بالجوز','وصفة غنية بطابع خشبي خفيف تجمع الجوز والعسل والزيت.'],'Amlou aux noix de cajou':['أملو بالكاجو','أملو بالكاجو','قوام ناعم وكريمي مع الكاجو المحمص والعسل والزيت.'],'Amlou à la pistache':['أملو بالفستق','أملو بالفستق','نسخة راقية بالفستق لمذاق ناعم وغني.']}],
      miel:['العسل','زهور المغرب','أنواع من العسل مستوحاة من النباتات المغربية، بنكهات زهرية وخشبية وغنية.',{'عسل حر':['عسل حر','عسل حر · عسل نقي','عسل أصيل بطابع غني مع الحفاظ على التسمية التقليدية حر.'],'Miel d’oranger':['عسل زهر البرتقال','عسل زهر البرتقال','عسل زهري مشرق بنفحات رقيقة من زهر البرتقال.'],'Miel d’eucalyptus':['عسل الأوكالبتوس','عسل الأوكالبتوس','طابع عطري قوي مع نفحات خشبية وبلسمية.'],'Miel de thym':['عسل الزعتر','عسل الزعتر','عسل قوي ودافئ بنفحات عشبية مميزة للزعتر البري.'],'Miel de jujubier':['عسل السدر','عسل السدر','عسل كهرماني بطابع عميق وغني مستوحى من السدر المغربي.'],'Miel de romarin':['عسل إكليل الجبل','عسل إكليل الجبل','عسل زهري وعشبي بطابع منعش وأنيق.'],'Miel d’herbes':['عسل الأعشاب','عسل الأعشاب','عسل بنفحات زهرية وعشبية مستخلص من تنوع النباتات والزهور.']}]
    }
  };

  function translateHome(lang) {
    if (!document.querySelector('.site-header')) return;
    const t = home[lang] || home.fr;
    $$('.products .product-card').forEach((card,index) => {
      const data = t.cards[index];
      if (!data) return;
      $('.product-kicker',card)?.replaceChildren(document.createTextNode(data[0]));
      $('h3',card)?.replaceChildren(document.createTextNode(data[1]));
      $('.product-content > p:not(.product-kicker)',card)?.replaceChildren(document.createTextNode(data[2]));
      const link = $('.product-link',card);
      if (link) link.innerHTML = t.discover;
    });
    const footer = $('.site-footer');
    if (footer) {
      const links = $$('.footer-nav > div:last-child a',footer);
      t.universes.forEach((label,index) => { if (links[index]) links[index].textContent = label; });
    }
  }

  function translateFamilies(lang) {
    if (!document.body.classList.contains('products-page')) return;
    const t = families[lang] || families.fr;
    Object.entries(t).forEach(([id,family]) => {
      const section = document.querySelector(`#${id}`);
      if (!section) return;
      const heading = $('.category-heading',section);
      if (heading) {
        $('h2',heading)?.replaceChildren(document.createTextNode(family[0]));
        $('.category-heading-left',heading)?.replaceChildren(document.createTextNode(family[1]));
        $('p',heading)?.replaceChildren(document.createTextNode(family[2]));
      }
      const productMap = family[3] || {};
      $$('.product-item',section).forEach(item => {
        const translated = productMap[item.dataset.productName || ''];
        if (!translated) return;
        $('.product-item-tag',item)?.replaceChildren(document.createTextNode(translated[1]));
        $('h3',item)?.replaceChildren(document.createTextNode(translated[0]));
        $('.product-item-content > p',item)?.replaceChildren(document.createTextNode(translated[2]));
      });
    });
    $$('.product-item').forEach(item => {
      $('.formats-label',item)?.replaceChildren(document.createTextNode(lang === 'en' ? 'AVAILABLE FORMATS' : lang === 'ar' ? 'الأحجام المتاحة' : 'FORMATS DISPONIBLES'));
      $('.custom-format',item)?.replaceChildren(document.createTextNode(lang === 'en' ? '+ On request' : lang === 'ar' ? '+ حسب الطلب' : '+ Sur demande'));
    });
  }

  function restoreHashTarget() {
    if (!document.body.classList.contains('products-page') || !window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) window.setTimeout(() => target.scrollIntoView({behavior:'smooth',block:'start'}),40);
  }

  function translate(lang) { translateHome(lang); translateFamilies(lang); }
  translate(language());
  restoreHashTarget();
  window.addEventListener('arraouaa:languagechange',event => translate(event.detail?.language || language()));
})();

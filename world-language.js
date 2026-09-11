(() => {
  const page = document.querySelector('.world-page');
  if (!page) return;

  const LANGUAGES = ['fr', 'ar', 'en'];
  const STORAGE_KEY = 'arraouaa-language';
  const html = document.documentElement;

  const common = {
    nav: {
      en: ['Home','About','Products','Our quality','Contact','Our know-how','The Workshop'],
      ar: ['الرئيسية','من نحن','المنتجات','جودة منتجاتنا','اتصل بنا','خبرتنا','الورشة']
    },
    announcement: { en:['Carefully selected Moroccan products','Premium quality · Authentic know-how','Follow us'], ar:['منتجات مغربية مختارة بعناية','جودة راقية · خبرة أصيلة','تابعونا'] },
    footer: { en:['TO FLAVOUR YOUR DISHES','Navigation','Our universes','Contact','Home','Products','The origin','Collections','The Journal','Our know-how','Coffee','Spices','Grocery','Dried fruits','Nuts & seeds','Cereals · Rice · Pasta','Oil & Honey','Amlou','& More','Location','Phone','Email','Moroccan authenticity · Premium quality'], ar:['لتعطير أطباقكم','التنقل','عالمنا','اتصل بنا','الرئيسية','المنتجات','الأصل','المجموعات','المجلة','خبرتنا','القهوة','التوابل','المواد الغذائية','الفواكه المجففة','المكسرات والبذور','الحبوب · الأرز · المعكرونة','الزيت والعسل','أملو','والمزيد','الموقع','الهاتف','البريد الإلكتروني','أصالة مغربية · جودة راقية'] }
  };

  const pages = {
    origin: {
      title:['The Origin | ARAOUAA Premium','الأصل | أراوَا بريميوم'],
      map:[
        ['.world-eyebrow',['THE ARAOUAA ORIGIN','أصل أراوَا']],
        ['.world-hero-content h1',['Morocco<br>behind <em>the matter.</em>','المغرب<br>وراء <em>المادة.</em>']],
        ['.world-hero-lead',['Before becoming a reference in our collection, every product belongs to a land, a season, a gesture and a story. We want this origin to remain visible.','قبل أن يصبح كل منتج جزءًا من مجموعتنا، فهو ينتمي إلى أرض وموسم وحركة وحكاية. نريد أن يبقى هذا الأصل حاضرًا وواضحًا.']],
        ['.world-hero-meta span',['Moroccan terroirs','Selected materials','Know-how'],['الأراضي المغربية','مواد مختارة','خبرة']],
        ['.world-section .world-kicker',['A MAP THROUGH OUR WORLDS','DU TERRITORY TO THE TABLE','GOING FURTHER'],['خريطة عبر عوالمنا','من الأرض إلى المائدة','نحو المزيد']],
        ['.world-section .world-title',['Different lands.<br><em>One identity.</em>','Different lands.<br><em>One identity.</em>'],['أراضٍ مختلفة.<br><em>هوية واحدة.</em>']],
        ['.world-intro',['ARAOUAA does not seek to make Morocco uniform. On the contrary: we want to show the differences between terroirs and the personality of their products.','لا تسعى أراوَا إلى توحيد صورة المغرب. بل نريد إبراز اختلاف الأراضي وشخصية منتجاتها.']],
        ['.world-card:nth-child(1) p',['Argan, oils and know-how linked to a landscape where the tree becomes heritage.','الأركان والزيوت وخبرة مرتبطة بمشهد يصبح فيه الشجر تراثًا.']],
        ['.world-card:nth-child(2) p',['A land emblematic of saffron and the fragrances of spices.','أرض عريقة بالزعفران وعطور التوابل.']],
        ['.world-card:nth-child(3) p',['Honey, plants, fruits and materials that carry the strength of the mountains.','عسل ونباتات وفواكه ومواد تحمل قوة الجبال.']],
        ['.world-card:nth-child(4) p',['A meeting of coast, craftsmanship and Moroccan product culture.','لقاء بين الساحل والحرفية وثقافة المنتج المغربي.']],
        ['.world-card:nth-child(5) p',['Spices, cuisine and culinary traditions passed down through generations.','توابل ومطبخ وتقاليد غذائية تناقلتها الأجيال.']],
        ['.world-card:nth-child(6) p',['Dates, honey, cereals and ancient routes that tell the trade of flavours.','تمور وعسل وحبوب وطرق قديمة تحكي تجارة النكهات.']],
        ['.world-mapline div:nth-child(1) span',['A shared origin','أصل مشترك']],['.world-mapline div:nth-child(2) span',['Territories to explore','أراضٍ تستحق الاكتشاف']],['.world-mapline div:nth-child(3) span',['Gestures & know-how','حِرف وخبرات']],['.world-mapline div:nth-child(4) span',['A selection, not uniformity','اختيار لا توحيد']],
        ['.world-feature-copy .world-kicker',['FROM TERRITORY TO TABLE','من الأرض إلى المائدة']],
        ['.world-feature-copy .world-title',['Every product<br><em>has a story to tell.</em>','Every product<br><em>has a story to tell.</em>'],['كل منتج<br><em>يحمل حكاية.</em>']],
        ['.world-feature-copy > p',['We want this story to gradually appear on product pages: origin, material, preparation, use and identity. Not to complicate the purchase, but to give meaning to the choice.','نريد أن تظهر هذه الحكاية تدريجيًا في صفحات المنتجات: الأصل والمادة والتحضير والاستخدام والهوية. ليس لتعقيد الشراء، بل لمنح الاختيار معنى.']],
        ['.world-list-item:nth-child(1) strong',['Identify the origin','تحديد الأصل']],['.world-list-item:nth-child(1) span',['The region and character that give the product its personality.','المنطقة والخصائص التي تمنح المنتج شخصيته.']],
        ['.world-list-item:nth-child(2) strong',['Understand the material','فهم المادة']],['.world-list-item:nth-child(2) span',['What we select, what we preserve and why.','ما نختاره وما نحافظ عليه ولماذا.']],
        ['.world-list-item:nth-child(3) strong',['Respect the gesture','احترام الحرفة']],['.world-list-item:nth-child(3) span',['Highlight the know-how without turning it into mere decoration.','إبراز الخبرة دون تحويلها إلى مجرد زينة.']],
        ['.world-quote p',['“Terroir is not only where a product is born. It is what gives it its character.”','«الأرض ليست فقط المكان الذي يولد فيه المنتج، بل هي ما يمنحه شخصيته.»']],['.world-quote span',['ARAOUAA vision','رؤية أراوَا']],
        ['.world-cta .world-title',['Discover the <em>collections.</em>','اكتشف <em>المجموعات.</em>']],['.world-cta > p:not(.world-kicker)',['Products by family, then selections designed around moments, uses and desires.','منتجات حسب الفئة، ثم اختيارات مصممة حسب اللحظة والاستخدام والرغبة.']],['.world-button',['Explore the collections →','استكشف المجموعات ←']]
      ]
    },
    collections: {
      title:['Collections | ARAOUAA Premium','المجموعات | أراوَا بريميوم'],
      map:[
        ['.world-eyebrow',['ARAOUAA COLLECTIONS','مجموعات أراوَا']],['.world-hero-content h1',['Choose a moment.<br><em>Compose an experience.</em>','اختر لحظة.<br><em>كوّن تجربة.</em>']],['.world-hero-lead',['Beyond product families comes another way to discover ARAOUAA: selections designed around the table, taste, sharing and the art of giving.','بعد فئات المنتجات، تأتي طريقة أخرى لاكتشاف أراوَا: اختيارات تتمحور حول المائدة والذوق والمشاركة وفن الإهداء.']],['.world-hero-meta span',['By moment','By use','By desire'],['حسب اللحظة','حسب الاستخدام','حسب الرغبة']],
        ['.world-section .world-kicker',['ARAOUAA CURATION','AT THE TABLE','ABOVE ALL, THE MATERIAL'],['تنسيق أراوَا','على المائدة','المادة أولًا']],['.world-section .world-title',['Not just categories.<br><em>Ways to experience the product.</em>','Not just categories.<br><em>Ways to experience the product.</em>'],['ليست مجرد فئات.<br><em>بل طرق لعيش المنتج.</em>']],['.world-intro',['A collection can bring together several families when their story, use or moment of consumption creates a coherent whole.','يمكن للمجموعة أن تجمع عدة فئات عندما تصنع قصتها أو استخدامها أو لحظة استهلاكها انسجامًا متكاملًا.']],
        ['.collection-feature .world-eyebrow',['COLLECTION 01','المجموعة 01']],['.collection-feature h3',['The Moroccan Breakfast','الفطور المغربي']],['.collection-feature p',['Coffee, honey, amlou, dried fruits and other essentials to start the day with the flavours of Morocco.','قهوة وعسل وأملو وفواكه مجففة وغيرها من الأساسيات لبدء اليوم بنكهات المغرب.']],
        ['.collection-small:nth-child(1) .world-eyebrow',['COLLECTION 02','المجموعة 02']],['.collection-small:nth-child(1) h3',['Tajine Flavours','نكهات الطاجين']],['.collection-small:nth-child(1) p',['Spices, oils and ingredients chosen to accompany Moroccan cuisine.','توابل وزيوت ومكونات مختارة لمرافقة المطبخ المغربي.']],['.collection-small:nth-child(2) .world-eyebrow',['COLLECTION 03','المجموعة 03']],['.collection-small:nth-child(2) h3',['The Terroir Essentials','أساسيات الأرض']],['.collection-small:nth-child(2) p',['A short selection of the references that best embody the ARAOUAA world.','اختيار مركز من المنتجات التي تجسد عالم أراوَا بأفضل صورة.']],
        ['.world-products .world-product:nth-child(1) span',['01 · MORNING','01 · الصباح']],['.world-product:nth-child(1) strong',['Coffee','القهوة']],['.world-product:nth-child(1) small',['A warm base to accompany honey, amlou and dried fruits.','قاعدة دافئة لمرافقة العسل والأملو والفواكه المجففة.']],['.world-product:nth-child(2) span',['02 · COOKING','02 · الطبخ']],['.world-product:nth-child(2) strong',['Spices','التوابل']],['.world-product:nth-child(2) small',['Aromas designed to give preparations their signature.','روائح مصممة لمنح الأطباق بصمتها الخاصة.']],['.world-product:nth-child(3) span',['03 · SHARING','03 · المشاركة']],['.world-product:nth-child(3) strong',['Dried fruits','الفواكه المجففة']],['.world-product:nth-child(3) small',['A generous selection to place at the centre of the table.','اختيار كريم يوضع في وسط المائدة.']],['.world-product:nth-child(4) span',['04 · TERROIR','04 · الأرض']],['.world-product:nth-child(4) strong',['Oil & honey','الزيت والعسل']],['.world-product:nth-child(4) small',['Two emblematic ingredients to tell Morocco in another way.','مادتان رمزيتان لرواية المغرب بطريقة مختلفة.']],
        ['.world-feature-copy .world-kicker',['COMING SOON','قريبًا']],['.world-feature-copy .world-title',['Compose your<br><em>ARAOUAA gift box.</em>','كوّن<br><em>علبة أراوَا الخاصة بك.</em>']],['.world-feature-copy > p',['The next natural evolution of this page: choose a collection, select your products, define formats and create a box to give or share.','التطور الطبيعي التالي لهذه الصفحة: اختر مجموعة، وحدد منتجاتك وأحجامها، ثم أنشئ علبة للإهداء أو المشاركة.']],['.world-list-item:nth-child(1) strong',['Choose the theme','اختر الموضوع']],['.world-list-item:nth-child(1) span',['Terroir, breakfast, cooking, discovery or occasion.','الأرض، الفطور، الطبخ، الاكتشاف أو المناسبة.']],['.world-list-item:nth-child(2) strong',['Choose the products','اختر المنتجات']],['.world-list-item:nth-child(2) span',['Combine several worlds without losing the coherence of the whole.','اجمع عدة عوالم دون فقدان انسجام المجموعة.']],['.world-list-item:nth-child(3) strong',['Choose the format','اختر الحجم']],['.world-list-item:nth-child(3) span',['Formats adapted to the use and level of the gift box.','أحجام مناسبة للاستخدام ولمستوى العلبة.']],
        ['.world-steps .world-step:nth-child(1) h3',['Discover','اكتشف']],['.world-step:nth-child(1) p',['Enter through a moment rather than a department.','ابدأ من لحظة بدلًا من قسم.']],['.world-step:nth-child(2) h3',['Combine','نسّق']],['.world-step:nth-child(2) p',['Understand how products complement one another.','افهم كيف تتكامل المنتجات.']],['.world-step:nth-child(3) h3',['Compose','كوّن']],['.world-step:nth-child(3) p',['Gradually build a personal selection.','ابنِ اختيارك الشخصي تدريجيًا.']],['.world-step:nth-child(4) h3',['Give','أهدِ']],['.world-step:nth-child(4) p',['Turn the selection into a gesture, memory or thoughtful gift.','حوّل الاختيار إلى لفتة أو ذكرى أو هدية مميزة.']],
        ['.world-cta .world-title',['Start with<br><em>our products.</em>','ابدأ بـ<br><em>منتجاتنا.</em>']],['.world-cta > p:not(.world-kicker)',['The collections will be built on the real ARAOUAA catalogue, without inventing products that do not exist.','ستعتمد المجموعات على كتالوج أراوَا الحقيقي، دون اختراع منتجات غير موجودة.']],['.world-button',['View the catalogue →','شاهد الكتالوج ←']]
      ]
    },
    journal: {
      title:['Journal | ARAOUAA Premium','المجلة | أراوَا بريميوم'],
      map:[
        ['.world-eyebrow',['ARAOUAA JOURNAL','مجلة أراوَا']],['.world-hero-content h1',['Stories<br>at the <em>table.</em>','حكايات<br>على <em>المائدة.</em>']],['.world-hero-lead',['An editorial space to talk about products, gestures, regions and uses that give depth to the ARAOUAA world.','مساحة تحريرية للحديث عن المنتجات والحِرف والمناطق والاستخدامات التي تمنح عالم أراوَا عمقه.']],['.world-hero-meta span',['Origin','Know-how','Inspiration'],['الأصل','الخبرة','الإلهام']],['.world-section .world-kicker',['ARAOUAA EDITORIAL','USEFUL CONTENT','THE CATALOGUE REMAINS AT THE HEART'],['تحرير أراوَا','محتوى مفيد','يبقى الكتالوج في القلب']],['.world-section .world-title',['The product is the beginning<br><em>of the story.</em>','The product is the beginning<br><em>of the story.</em>'],['المنتج هو بداية<br><em>الحكاية.</em>']],['.world-intro',['The Journal will not be a disguised catalogue. It should make you want to understand, learn and return: a producer story, a material, a recipe, a ritual or a region.','لن تكون المجلة كتالوجًا مقنعًا. بل يجب أن تدفعك إلى الفهم والتعلم والعودة: حكاية منتج، مادة، وصفة، طقس أو منطقة.']],
        ['.journal-card:nth-child(1) .journal-type',['TERROIR · 8 MIN','الأرض · 8 دقائق']],['.journal-card:nth-child(1) h3',['Forty women, one tree: understanding Souss-Massa argan','أربعون امرأة، شجرة واحدة: فهم أركان سوس ماسة']],['.journal-card:nth-child(1) p',['From fruit to oil, looking at the gesture behind a material that has become emblematic of Morocco.','من الثمرة إلى الزيت، نكتشف الحرفة وراء مادة أصبحت من رموز المغرب.']],['.journal-card:nth-child(1) .journal-meta',['Coming soon · Origins series','قريبًا · سلسلة الأصول']],['.journal-card:nth-child(2) .journal-type',['KNOW-HOW','الخبرة']],['.journal-card:nth-child(2) h3',['Why spices never tell the same story','لماذا لا تحكي التوابل القصة نفسها أبدًا']],['.journal-card:nth-child(2) p',['Cumin, ginger, paprika: understanding the difference between a reference and a simple blend.','الكمون والزنجبيل والفلفل الحلو: فهم الفرق بين منتج أصيل ومجرد خليط.']],['.journal-card:nth-child(2) .journal-meta',['Coming soon','قريبًا']],['.journal-card:nth-child(3) .journal-type',['TABLE','المائدة']],['.journal-card:nth-child(3) h3',['The Moroccan breakfast, differently','الفطور المغربي، بطريقة مختلفة']],['.journal-card:nth-child(3) p',['Coffee, honey, amlou and dried fruits: combinations that make you want to stay at the table.','القهوة والعسل والأملو والفواكه المجففة: توليفات تجعلك ترغب في البقاء حول المائدة.']],['.journal-card:nth-child(3) .journal-meta',['Coming soon','قريبًا']],
        ['.world-feature-copy .world-kicker',['FUTURE COLUMNS','الأبواب القادمة']],['.world-feature-copy .world-title',['A journal that<br><em>grows with the brand.</em>','مجلة<br><em>تنمو مع العلامة.</em>']],['.world-feature-copy > p',['We can gradually build a content library linked directly to the catalogue: each article can recommend the relevant products, tell their origin and extend the experience without turning the page into an advertisement.','يمكننا بناء مكتبة محتوى مرتبطة مباشرة بالكتالوج تدريجيًا: كل مقال يمكنه اقتراح المنتجات المعنية، وحكاية أصلها، وإطالة التجربة دون تحويل الصفحة إلى إعلان.']],['.world-list-item:nth-child(1) strong',['Origins','الأصول']],['.world-list-item:nth-child(1) span',['Regions, producers, materials and landscapes.','المناطق والمنتجون والمواد والمشاهد.']],['.world-list-item:nth-child(2) strong',['Gestures','الحِرف']],['.world-list-item:nth-child(2) span',['Preparation, storage, transformation and know-how.','التحضير والحفظ والتحويل والخبرة.']],['.world-list-item:nth-child(3) strong',['At the table','على المائدة']],['.world-list-item:nth-child(3) span',['Recipes, pairings and moments of consumption.','وصفات وتوليفات ولحظات الاستهلاك.']],['.world-list-item:nth-child(4) strong',['Morocco in words','المغرب بالكلمات']],['.world-list-item:nth-child(4) span',['Traditions, vocabulary and cultural details that add context.','تقاليد ومفردات وتفاصيل ثقافية تمنح السياق.']],
        ['.world-section-tight .world-title',['Every story must<br><em>lead back to the product.</em>','يجب أن تعود كل حكاية<br><em>إلى المنتج.</em>']],['.world-products .world-product:nth-child(1) span',['ARTICLE','مقال']],['.world-product:nth-child(1) strong',['Origin','الأصل']],['.world-product:nth-child(1) small',['See the territory and associated products.','اكتشف المنطقة والمنتجات المرتبطة بها.']],['.world-product:nth-child(2) span',['GUIDE','دليل']],['.world-product:nth-child(2) strong',['Choose','اختر']],['.world-product:nth-child(2) small',['Compare uses and formats without overload.','قارن الاستخدامات والأحجام دون تعقيد.']],['.world-product:nth-child(3) span',['RECIPE','وصفة']],['.world-product:nth-child(3) strong',['Prepare','حضّر']],['.world-product:nth-child(3) small',['Move from inspiration to the kitchen.','انتقل من الإلهام إلى المطبخ.']],['.world-product:nth-child(4) span',['COLLECTION','مجموعة']],['.world-product:nth-child(4) strong',['Explore','استكشف']],['.world-product:nth-child(4) small',['Find a selection built around the same moment.','اعثر على اختيار مصمم حول اللحظة نفسها.']],
        ['.world-quote p',['“Let Morocco be discovered without reducing it to an image.”','«اكتشف المغرب دون اختزاله في صورة.»']],['.world-quote span',['ARAOUAA editorial direction','التوجه التحريري لأراوَا']],['.world-cta .world-title',['Explore<br><em>ARAOUAA products.</em>','استكشف<br><em>منتجات أراوَا.</em>']],['.world-cta > p:not(.world-kicker)',['The Journal tells the story. The products provide the substance.','المجلة تحكي. والمنتجات تمنحها المادة.']],['.world-button',['Discover the products →','اكتشف المنتجات ←']]
      ]
    },
    atelier: {
      title:['The Workshop | ARAOUAA Premium','الورشة | أراوَا بريميوم'],
      map:[
        ['.world-eyebrow',['THE ARAOUAA WORKSHOP','ورشة أراوَا']],['.world-hero-content h1',['The human side<br>behind <em>the selection.</em>','الإنسان<br>وراء <em>الاختيار.</em>']],['.world-hero-lead',['Behind every product are people, gestures, tools and an organisation that bring our standards to life. The Workshop opens that door.','وراء كل منتج أشخاص وحِرف وأدوات وتنظيم يمنح معاييرنا حياتها. تفتح الورشة هذا الباب.']],['.world-hero-meta span',['The teams','The tools','Logistics'],['الفرق','الأدوات','اللوجستيات']],['.atelier-process > .world-kicker',['FROM GESTURE TO PRECISION','من الحرفة إلى الدقة']],['.atelier-process .world-title',['A selection comes to life<br><em>in the details.</em>','تنبض المجموعة بالحياة<br><em>في التفاصيل.</em>']],['.atelier-process > .world-intro',['We want to gradually show what happens behind the label: the material, control, preparation, packing and everything that lets the product reach you consistently.','نريد أن نُظهر تدريجيًا ما يحدث خلف الملصق: المادة، والمراقبة، والتحضير، والتغليف، وكل ما يتيح للمنتج الوصول إليك بجودة متناسقة.']],['.atelier-process-panel .world-kicker',['THE JOURNEY','المسار']],['.atelier-process-panel h3',['From material<br>to dispatch.','من المادة<br>إلى الشحن.']],['.atelier-process-panel > p:last-child',['A chain of gestures where human attention meets the tools that allow regularity and precision.','سلسلة من الحِرف تلتقي فيها العناية البشرية مع الأدوات التي تتيح الانتظام والدقة.']],['.atelier-step:nth-child(1) h3',['Receiving','الاستلام']],['.atelier-step:nth-child(1) p',['Receive the materials and prepare them for entry into our organisation.','استقبال المواد وتجهيزها لدخولها في منظومتنا.']],['.atelier-step:nth-child(2) h3',['Control','المراقبة']],['.atelier-step:nth-child(2) p',['Observe, verify and preserve the expected characteristics.','مراقبة الخصائص المطلوبة والتحقق منها والحفاظ عليها.']],['.atelier-step:nth-child(3) h3',['Packing','التغليف']],['.atelier-step:nth-child(3) p',['Give the product its final format with care and consistency.','منح المنتج شكله النهائي بعناية وانتظام.']],['.atelier-step:nth-child(4) h3',['Dispatch','الشحن']],['.atelier-step:nth-child(4) p',['Prepare each order for its next journey.','تجهيز كل طلب لرحلته التالية.']],
        ['.atelier-human .world-kicker',['WOMEN & MEN','النساء والرجال']],['.atelier-human .world-title',['The machine brings precision.<br><em>The human brings judgement.</em>','الآلة تمنح الدقة.<br><em>والإنسان يمنح الحكم.</em>']],['.atelier-human-copy > p:nth-of-type(1)',['ARAOUAA is also a story of people. Those who observe a material, check a detail, prepare a product, organise stock or make sure an order leaves under the right conditions.','أراوَا هي أيضًا حكاية أشخاص. أولئك الذين يراقبون مادة، ويدققون تفصيلًا، ويجهزون منتجًا، وينظمون المخزون أو يتأكدون من مغادرة الطلب في الظروف المناسبة.']],['.atelier-human-copy > p:nth-of-type(2)',['Tomorrow, this page will welcome the real faces, real gestures and real spaces of the Workshop.','غدًا ستحتضن هذه الصفحة الوجوه الحقيقية والحِرف الحقيقية والمساحات الحقيقية للورشة.']],['.atelier-quote',['“Quality is visible in the product. It begins long before.”','«الجودة تظهر في المنتج. لكنها تبدأ قبل ذلك بوقت طويل.»']],['.world-section:nth-of-type(3) .world-kicker',['THE TOOLS','الأدوات']],['.world-section:nth-of-type(3) .world-title',['Technology in service<br><em>of the gesture.</em>','التكنولوجيا في خدمة<br><em>الحرفة.</em>']],['.world-section:nth-of-type(3) .world-intro',['Tools do not replace know-how. They support it wherever they allow greater control, consistency and efficiency.','الأدوات لا تستبدل الخبرة. بل تدعمها حيث تتيح مزيدًا من التحكم والثبات والكفاءة.']],['.world-section:nth-of-type(3) .world-mapline div:nth-child(1) span',['Prepare','حضّر']],['.world-section:nth-of-type(3) .world-mapline div:nth-child(2) span',['Control','راقب']],['.world-section:nth-of-type(3) .world-mapline div:nth-child(3) span',['Pack','غلّف']],['.world-section:nth-of-type(3) .world-mapline div:nth-child(4) span',['Organise','نظّم']],
        ['.atelier-logistics .world-kicker',['THE ARAOUAA ROUTE','مسار أراوَا']],['.atelier-logistics .world-title',['From preparation<br><em>to your table.</em>','من مكان التحضير<br><em>إلى مائدتك.</em>']],['.atelier-logistics .world-intro',['Discreet logistics, designed to preserve the link between the product, its packaging and its destination.','لوجستيات هادئة مصممة للحفاظ على الصلة بين المنتج وتغليفه ووجهته.']],['.atelier-route-step:nth-child(1) strong',['Prepare','حضّر']],['.atelier-route-step:nth-child(1) span',['The product','المنتج']],['.atelier-route-step:nth-child(2) strong',['Organise','نظّم']],['.atelier-route-step:nth-child(2) span',['The order','الطلب']],['.atelier-route-step:nth-child(3) strong',['Dispatch','اشحن']],['.atelier-route-step:nth-child(3) span',['The journey','الرحلة']],['.atelier-route-step:nth-child(4) strong',['Arrive','الوصول']],['.atelier-route-step:nth-child(4) span',['At destination','إلى الوجهة']],['.atelier-manifesto .world-kicker',['THE WORKSHOP, TOMORROW','الورشة، غدًا']],['.atelier-manifesto h2',['The real teams.<br>The real tools.<br><em>The real story.</em>','الفرق الحقيقية.<br>الأدوات الحقيقية.<br><em>الحكاية الحقيقية.</em>']],['.world-cta .world-kicker',['CONTINUE EXPLORING','واصل الاستكشاف']],['.world-cta .world-title',['Return to <em>the ARAOUAA world.</em>','عد إلى <em>عالم أراوَا.</em>']],['.world-cta > p:not(.world-kicker)',['From origins to collections, from know-how to stories: discover the other chapters of our world.','من الأصول إلى المجموعات، ومن الخبرة إلى الحكايات: اكتشف الفصول الأخرى من عالمنا.']],['.world-button',['Explore the world →','استكشف العالم ←']]
      ]
    }
  };

  function pageKey(){
    return page.classList.contains('world-page--origin') ? 'origin' : page.classList.contains('world-page--collections') ? 'collections' : page.classList.contains('world-page--journal') ? 'journal' : 'atelier';
  }

  function setOne(selector, value){
    page.querySelectorAll(selector).forEach(el => { el.innerHTML = value; });
  }

  function translateCommon(lang){
    const t = common;
    const nav = page.querySelectorAll('.products-main-nav a');
    nav.forEach((a,i) => { if(t.nav[lang]?.[i]) a.textContent=t.nav[lang][i]; });
    const ann = page.querySelectorAll('.announcement-inner > span');
    if(ann[0]) ann[0].innerHTML=`<i class="dot"></i> ${lang==='fr'?'Produits marocains sélectionnés avec soin':t.announcement[lang][0]}`;
    if(ann[2]) ann[2].textContent=lang==='fr'?'Qualité premium · Savoir-faire authentique':t.announcement[lang][1];
    const follow=page.querySelector('.announcement-socials > span:first-child'); if(follow) follow.textContent=lang==='fr'?'Suivez-nous':t.announcement[lang][2];
    const contact=page.querySelector('.products-header-contact'); if(contact) contact.textContent=lang==='ar'?'اتصل بنا':lang==='en'?'Contact us':'Nous contacter';
    const footer=page.querySelector('.footer'); if(!footer)return;
    const f=footer.querySelectorAll('.footer-brand > p,.footer-nav > div:first-child > strong,.footer-nav > div:nth-child(2) > strong,.footer-contact > strong,.footer-nav > div:first-child > a,.footer-nav > div:nth-child(2) > a,.footer-contact span,.footer-bottom > span:last-child');
    if(lang==='fr') return;
    f.forEach((el,i)=>{ if(t.footer[lang]?.[i]) el.textContent=t.footer[lang][i]; });
  }

  const frenchSnapshots = new Map();
  Object.values(pages).forEach(data => data.map.forEach(([selector]) => {
    if (!frenchSnapshots.has(selector)) frenchSnapshots.set(selector, [...page.querySelectorAll(selector)].map(el => el.innerHTML));
  }));

  function apply(lang){
    if(!LANGUAGES.includes(lang)) lang='fr';
    const key=pageKey();
    const data=pages[key];
    translateCommon(lang);
    if(lang==='fr'){
      document.title=key==='origin'?'L’Origine | ARAOUAA Premium':key==='collections'?'Collections | ARAOUAA Premium':key==='journal'?'Journal | ARAOUAA Premium':'L’Atelier | ARAOUAA Premium';
      data.map.forEach(([selector])=>{
        const values=frenchSnapshots.get(selector)||[];
        page.querySelectorAll(selector).forEach((el,i)=>{ if(values[i]!==undefined) el.innerHTML=values[i]; });
      });
    }else{
      document.title=data.title[lang==='en'?0:1];
      data.map.forEach(([selector, en, ar])=>{
        let value;
        if(ar !== undefined) value = lang==='en' ? en : ar;
        else if(Array.isArray(en) && en.length===2) value = en[lang==='en'?0:1];
        else value = en;
        if(Array.isArray(value)){
          page.querySelectorAll(selector).forEach((el,i)=>{ if(value[i]!==undefined) el.innerHTML=value[i]; });
        }else setOne(selector,value);
      });
    }
    html.lang=lang;
    html.dir=lang==='ar'?'rtl':'ltr';
    document.body.classList.toggle('is-arabic',lang==='ar');
  }

  apply(localStorage.getItem(STORAGE_KEY)||'fr');
  window.addEventListener('arraouaa:languagechange',event=>apply(event.detail?.language||'fr'));
})();

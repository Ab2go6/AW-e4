(() => {
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const header = $('#siteHeader');
const menu = $('.menu-toggle');
const nav = $('#mainNav');

function setMenu(open){
  if(!menu || !nav) return;
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
}
if(menu && nav){
  menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  $$('.main-nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));
}

const sections = $$('main section[id]');
const navLinks = $$('.main-nav a');
function updateActiveNav(){
  const y = window.scrollY + 150;
  let current = 'accueil';
  sections.forEach(section => { if(section.offsetTop <= y) current = section.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 25);
  $('.to-top')?.classList.toggle('show', window.scrollY > 650);
  updateActiveNav();
}, {passive:true});
updateActiveNav();
$('.to-top')?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

const searchToggle = $('.search-toggle');
const searchPanel = $('.search-panel');
const searchInput = $('#siteSearch');
const searchClose = $('.search-close');
const cards = $$('.product-card');
function setSearch(open){
  if(!searchPanel) return;
  searchPanel.classList.toggle('open', open);
  searchPanel.setAttribute('aria-hidden', String(!open));
  searchToggle?.setAttribute('aria-expanded', String(open));
  if(open) setTimeout(() => searchInput?.focus(), 80);
}
searchToggle?.addEventListener('click', () => setSearch(!searchPanel.classList.contains('open')));
searchClose?.addEventListener('click', () => {
  if(searchInput) searchInput.value='';
  cards.forEach(c=>{c.classList.remove('search-hidden'); c.style.display='';});
  setSearch(false);
});
searchInput?.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  cards.forEach(card => {
    const hay = (card.dataset.search + ' ' + card.textContent).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const match = !q || hay.includes(q);
    card.classList.toggle('search-hidden', !match);
    card.style.display = match ? '' : 'none';
  });
});

const filterChips = $$('.filter-chip');
filterChips.forEach(chip => chip.addEventListener('click', () => {
  const filter = chip.dataset.filter || 'all';
  filterChips.forEach(c => c.classList.toggle('active', c === chip));
  cards.forEach(card => {
    const matches = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('search-hidden', !matches);
    card.style.display = matches ? '' : 'none';
  });
}));

const modal = $('#productModal');
const modalTitle = $('#modalTitle');
const modalText = $('#modalText');
const productData = {
  cafe: ['Café', 'Un univers autour du café, pensé pour mettre en avant l’arôme, la richesse et le caractère d’une sélection premium.'],
  epices: ['Épices', 'Des épices aux parfums généreux pour apporter profondeur, couleur et caractère aux recettes du quotidien.'],
  'fruits-secs': ['Fruits secs', 'Une collection gourmande autour de fruits secs soigneusement présentés, avec une attention particulière portée à la qualité et à la texture.'],
  argan: ['Huile d’argan', 'Une signature naturelle emblématique du Maroc, mise en valeur dans une présentation sobre, élégante et premium.'],
  epicerie: ['Épicerie', 'Riz, semoule, couscous et essentiels du garde-manger marocain, réunis dans une présentation à l’image de la collection ARAOUAA.']
};
function closeModal(){ modal?.classList.remove('open'); modal?.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }
$$('.product-link').forEach(button => button.addEventListener('click', () => {
  const item = productData[button.dataset.product];
  if(!item || !modal) return;
  modalTitle.textContent = item[0];
  modalText.textContent = item[1];
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}));
$('.modal-close')?.addEventListener('click', closeModal);
$('.modal-backdrop')?.addEventListener('click', closeModal);
$('.modal-contact')?.addEventListener('click', closeModal);

$('#contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const msg = $('.form-message', e.currentTarget);
  if(msg) msg.textContent = 'Merci. Votre demande est prête à être transmise à l’équipe ARAOUAA.';
  e.currentTarget.reset();
});

(function addRequestedNutProducts(){
  const grid = document.querySelector('#noix-graines .product-items');
  if(!grid) return;
  const existing = [...grid.querySelectorAll('[data-product-name], h3')].map(el => (el.dataset.productName || el.textContent).trim().toLowerCase());
  const requested = [
    ['Amande grillée','AMANDE GRILLÉE'],
    ['Amande effilée','AMANDE EFFILÉE'],
    ['Amande hachée','AMANDE HACHÉE'],
    ['Amande en poudre','AMANDE EN POUDRE'],
    ['Arachides','ARACHIDES']
  ];
  const makeCard = (name,label) => {
    const article=document.createElement('article');
    article.className='product-item catalog-added-item';
    article.dataset.productName=name;
    article.innerHTML=`<div class="product-item-image"><div class="product-placeholder"><span>ARAOUAA</span><strong>${label}</strong><small>NOIX &amp; GRAINES</small></div></div><div class="product-item-content"><span class="product-item-tag">NOIX &amp; GRAINES</span><h3>${name}</h3><p>Une référence délicate au profil naturellement généreux et raffiné.</p><div class="product-formats"><span class="formats-label">FORMATS DISPONIBLES</span><div class="format-list"><button class="format-button" data-weight="50 g">50 g</button><button class="format-button" data-weight="100 g">100 g</button><button class="format-button" data-weight="250 g">250 g</button><button class="format-button" data-weight="500 g">500 g</button><button class="format-button" data-weight="1 kg">1 kg</button><button class="format-button" data-weight="5 kg">5 kg</button><button class="format-button custom-format">+ Sur demande</button></div></div></div>`;
    return article;
  };
  requested.forEach(([name,label])=>{
    if(!existing.includes(name.toLowerCase())) grid.appendChild(makeCard(name,label));
  });
  grid.querySelectorAll('.catalog-added-item .format-button:not(.custom-format)').forEach(b=>b.addEventListener('click',()=>{b.classList.add('selected');setTimeout(()=>b.classList.remove('selected'),650);}));
})();

(function addNewProductFamilies(){
  const main = document.querySelector('.products-page main');
  if(!main || main.dataset.newFamiliesAdded === 'true') return;
  main.dataset.newFamiliesAdded = 'true';

  const nav = main.querySelector('.product-category-nav');
  const families = [
    {
      id:'huiles', number:'08', title:'Huiles',
      description:'Des huiles emblématiques du terroir marocain, sélectionnées pour leur caractère et leur qualité.',
      items:[
        ['Huile d’argan alimentaire','HUILE D’ARGAN','Une huile de caractère au goût délicatement torréfié, emblématique du terroir du Souss.'],
        ['Huile d’olive extra vierge','HUILE D’OLIVE','Une huile d’olive fruitée et équilibrée, pensée pour la cuisine quotidienne et les préparations méditerranéennes.']
      ]
    },
    {
      id:'amlou', number:'09', title:'Amlou',
      description:'Une collection de pâtes à tartiner inspirées de l’amlou marocain : fruits secs torréfiés, miel et huile, dans un esprit généreux.',
      items:[
        ['Amlou aux amandes','AMLOU AMANDES','La version traditionnelle, autour de l’amande torréfiée, du miel et de l’huile d’argan.'],
        ['Amlou aux cacahuètes','AMLOU CACAHUÈTES','Une version gourmande et généreuse aux cacahuètes grillées, miel et huile d’argan.'],
        ['Amlou aux noisettes','AMLOU NOISETTES','Une pâte aux notes naturellement pralinées, avec noisettes torréfiées, miel et huile.'],
        ['Amlou aux noix','AMLOU NOIX','Une interprétation riche et légèrement boisée autour de la noix, du miel et de l’huile.'],
        ['Amlou aux noix de cajou','AMLOU CAJOU','Une texture douce et crémeuse aux noix de cajou torréfiées, miel et huile.'],
        ['Amlou à la pistache','AMLOU PISTACHE','Une version raffinée à la pistache, pensée pour une finition plus délicate et gourmande.']
      ]
    },
    {
      id:'miel', number:'10', title:'Miel',
      description:'Des miels inspirés de la flore marocaine, avec des profils floraux, boisés ou plus intenses.',
      items:[
        ['Miel d’oranger','MIEL D’ORANGER','Un miel floral et lumineux aux notes délicates de fleur d’oranger.'],
        ['Miel d’eucalyptus','MIEL D’EUCALYPTUS','Un profil aromatique plus marqué, avec des notes boisées et balsamiques.'],
        ['Miel de thym','MIEL DE THYM','Un miel intense et chaleureux aux notes herbacées caractéristiques du thym sauvage.'],
        ['Miel de jujubier','MIEL DE JUJUBIER','Un miel ambré au caractère profond et généreux, inspiré du jujubier marocain.'],
        ['Miel de romarin','MIEL DE ROMARIN','Un miel floral et herbacé au profil frais et élégant.'],
        ['Miel toutes fleurs','MIEL TOUTES FLEURS','Une expression plus ronde et variée de la flore, avec un profil naturellement gourmand.']
      ]
    }
  ];

  const makeCard = (name,label,description) => {
    const article=document.createElement('article');
    article.className='product-item catalog-added-item';
    article.dataset.productName=name;
    article.innerHTML=`<div class="product-item-image"><div class="product-placeholder"><span>ARAOUAA</span><strong>${label}</strong><small>COLLECTION PREMIUM</small></div></div><div class="product-item-content"><span class="product-item-tag">ARAOUAA</span><h3>${name}</h3><p>${description}</p><div class="product-formats"><span class="formats-label">FORMATS DISPONIBLES</span><div class="format-list"><button class="format-button" data-weight="250 g">250 g</button><button class="format-button" data-weight="500 g">500 g</button><button class="format-button" data-weight="1 kg">1 kg</button><button class="format-button custom-format">+ Sur demande</button></div></div></div>`;
    return article;
  };

  const makeSection = family => {
    const section=document.createElement('section');
    section.className='product-category-section catalog-family-section';
    section.id=family.id;
    section.dataset.section=family.id;
    section.innerHTML=`<div class="category-heading"><div class="category-heading-left"><span class="category-number">${family.number}</span><div><span class="product-item-tag">UNIVERS ARAOUAA</span><h2>${family.title}</h2></div></div><p>${family.description}</p></div><div class="product-items catalog-family-grid"></div>`;
    const grid=section.querySelector('.product-items');
    family.items.forEach(item=>grid.appendChild(makeCard(...item)));
    return section;
  };

  const anchor = [...main.children].reverse().find(el => el.tagName === 'SECTION' && !el.classList.contains('product-categories'));
  families.forEach((family,index)=>{
    const section=makeSection(family);
    if(anchor) main.appendChild(section); else main.appendChild(section);
    if(nav){
      const button=document.createElement('button');
      button.className='catalog-filter';
      button.dataset.category=family.id;
      button.textContent=family.title;
      nav.appendChild(button);
    }
  });

  const allSections = $$('.product-category-section');
  const filters = $$('.catalog-filter');
  const setFilter = value => {
    filters.forEach(button=>button.classList.toggle('active',button.dataset.category===value));
    allSections.forEach(section=>{
      section.style.display = value==='all' || section.dataset.section===value ? '' : 'none';
    });
  };
  filters.forEach(button=>button.addEventListener('click',()=>setFilter(button.dataset.category || 'all')));
  setFilter('all');

  main.querySelectorAll('.catalog-family-section .format-button:not(.custom-format)').forEach(button=>button.addEventListener('click',()=>{
    button.classList.add('selected');
    setTimeout(()=>button.classList.remove('selected'),650);
  }));
})();

(function setupResponsiveHeaders(){
  const productsHeader = document.querySelector('.products-header');
  if(!productsHeader || productsHeader.dataset.headerFixed === 'true') return;
  productsHeader.dataset.headerFixed = 'true';

  const actions = document.createElement('div');
  actions.className = 'products-header-actions';
  actions.innerHTML = `
    <button class="products-icon-button products-search-toggle" type="button" aria-label="Rechercher" aria-expanded="false">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4.2 4.2"></path></svg>
    </button>
    <a class="products-icon-button products-instagram" href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.7" r=".8" class="fill"></circle></svg>
    </a>`;

  const logo = productsHeader.querySelector('.products-logo');
  if(logo) logo.insertAdjacentElement('afterend', actions);
  else productsHeader.prepend(actions);

  const panel = document.createElement('div');
  panel.className = 'products-search-panel';
  panel.setAttribute('aria-hidden','true');
  panel.innerHTML = `<div class="products-search-inner"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4.2 4.2"></path></svg><input type="search" aria-label="Rechercher un produit" placeholder="Rechercher un produit…" autocomplete="off"><button type="button" class="products-search-close" aria-label="Fermer la recherche">×</button></div>`;
  productsHeader.appendChild(panel);

  const toggle = actions.querySelector('.products-search-toggle');
  const input = panel.querySelector('input');
  const close = panel.querySelector('.products-search-close');
  const productItems = $$('.product-item');
  const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const runSearch = () => {
    const query = normalize(input.value.trim());
    productItems.forEach(item => {
      const haystack = normalize(item.textContent + ' ' + (item.dataset.productName || ''));
      item.style.display = !query || haystack.includes(query) ? '' : 'none';
    });
  };
  const setOpen = open => {
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    if(open) setTimeout(() => input.focus(), 50);
  };
  toggle.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
  close.addEventListener('click', () => { input.value=''; runSearch(); setOpen(false); });
  input.addEventListener('input', runSearch);
})();

document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    setSearch(false);
    closeModal();
    setMenu(false);
    const productSearch = document.querySelector('.products-search-panel');
    const productToggle = document.querySelector('.products-search-toggle');
    productSearch?.classList.remove('open');
    productSearch?.setAttribute('aria-hidden','true');
    productToggle?.setAttribute('aria-expanded','false');
  }
});
})();

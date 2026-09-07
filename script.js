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

/* Clean shared mobile header fix. Desktop structure is untouched. */
(function setupResponsiveHeaders(){
  const style = document.createElement('style');
  style.id = 'arraouaa-responsive-header-final';
  style.textContent = `
    @media (max-width:900px){
      .site-header{display:flex!important;align-items:center!important;padding-left:14px!important;padding-right:14px!important;gap:6px!important;}
      .site-header .brand-logo{flex:0 0 auto!important;}
      .site-header .main-nav{display:none!important;}
      .site-header .header-actions{position:relative!important;top:auto!important;right:auto!important;transform:none!important;margin-left:auto!important;display:flex!important;align-items:center!important;gap:2px!important;flex:0 0 auto!important;order:2!important;}
      .site-header .header-actions .search-toggle,.site-header .header-actions .instagram-link{display:grid!important;place-items:center!important;width:34px!important;height:34px!important;}
      .site-header .header-actions .cart-link,.site-header .header-actions .header-contact{display:none!important;}
      .site-header .menu-toggle{display:flex!important;align-items:center!important;justify-content:center!important;flex-direction:column!important;order:3!important;flex:0 0 38px!important;width:38px!important;height:38px!important;margin:0!important;padding:0!important;}
      .site-header .menu-toggle span{display:block!important;width:21px!important;margin:3px 0!important;}
      .site-header .search-panel{top:78px!important;left:12px!important;right:12px!important;width:auto!important;}
    }
    @media (max-width:390px){
      .site-header .brand-logo{width:104px!important;}
      .site-header .header-actions .search-toggle,.site-header .header-actions .instagram-link{width:32px!important;height:32px!important;}
      .site-header .menu-toggle{flex-basis:34px!important;width:34px!important;}
    }

    .products-header-actions{display:flex!important;align-items:center!important;gap:2px!important;margin-left:auto!important;flex:0 0 auto!important;order:2!important;}
    .products-icon-button{width:38px;height:38px;display:grid;place-items:center;border:0;background:transparent;color:var(--p-gold-light);cursor:pointer;padding:0;}
    .products-icon-button svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.6;}
    .products-icon-button svg .fill{fill:currentColor;stroke:none;}
    .products-search-panel{position:absolute;top:78px;right:5%;width:min(420px,90vw);opacity:0;pointer-events:none;transform:translateY(-8px);transition:.22s ease;z-index:80;}
    .products-search-panel.open{opacity:1;pointer-events:auto;transform:none;}
    .products-search-inner{display:flex;align-items:center;gap:9px;background:var(--p-paper);border:1px solid var(--p-line);border-radius:13px;padding:9px 11px;box-shadow:0 18px 50px rgba(0,0,0,.18);}
    .products-search-inner>svg{width:20px;height:20px;fill:none;stroke:var(--p-gold);stroke-width:1.7;flex:0 0 auto;}
    .products-search-inner input{width:100%;border:0;outline:0;background:transparent;color:var(--p-ink);font-size:12px;min-width:0;}
    .products-search-close{border:0;background:none;color:var(--p-muted);font-size:24px;line-height:1;cursor:pointer;padding:0 2px;}
    @media (max-width:850px){
      .products-header{height:78px!important;padding:0 14px!important;gap:4px!important;}
      .products-logo{width:105px!important;flex:0 0 auto!important;}
      .products-main-nav{top:78px!important;}
      .products-header-contact{display:none!important;}
      .products-header-actions{margin-left:auto!important;order:2!important;}
      .products-icon-button{width:34px;height:34px;}
      .products-search-panel{top:78px;left:12px;right:12px;width:auto;}
      .products-header .menu-toggle{display:flex!important;order:3!important;flex:0 0 38px!important;width:38px!important;height:38px!important;margin:0!important;align-items:center!important;justify-content:center!important;flex-direction:column!important;}
      .products-header .menu-toggle span{width:21px!important;margin:3px 0!important;}
    }
    @media (max-width:390px){
      .products-logo{width:96px!important;}
      .products-icon-button{width:32px;height:32px;}
      .products-header .menu-toggle{width:34px!important;flex-basis:34px!important;}
    }
  `;
  document.head.appendChild(style);

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

  /* Put the controls directly between the logo and the mobile menu. */
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
  if(e.key === 'Escape'){ setSearch(false); closeModal(); setMenu(false); document.querySelector('.products-search-panel')?.classList.remove('open'); }
});
})();

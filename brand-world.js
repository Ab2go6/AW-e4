(() => {
  const page = document.querySelector('.world-page');
  if (!page) return;

  const current = window.location.pathname.split('/').pop() || 'index.html';
  const links = [
    ['Accueil', 'index.html'], ['Produits', 'produits.html'], ['L’univers', 'origine.html'],
    ['Les Collections', 'collections.html'], ['Le Journal', 'journal.html'],
    ['Notre savoir-faire', 'savoir-faire.html'], ['L’Atelier', 'atelier.html']
  ];

  const announcement = page.querySelector('.announcement') || document.createElement('div');
  announcement.className = 'announcement';
  announcement.innerHTML = `<div class="announcement-inner"><span><i class="dot"></i> Produits marocains sélectionnés avec soin</span><span class="announcement-separator">•</span><span>Qualité premium · Savoir-faire authentique</span><div class="announcement-socials"><span>Suivez-nous</span><a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">◎</a><span class="social-divider">|</span><a href="index.html#contact" aria-label="WhatsApp">◔</a></div></div>`;
  if (!announcement.parentNode) page.prepend(announcement);

  let header = page.querySelector('.products-header');
  if (!header) { header = document.createElement('header'); header.className = 'products-header'; announcement.insertAdjacentElement('afterend', header); }
  header.innerHTML = `<a href="index.html" class="products-logo"><img src="assets/logo-crystal-4k.png" alt="ARAOUAA Premium"></a><nav class="products-main-nav">${links.map(([label, href]) => `<a href="${href}" class="${href === current ? 'active' : ''}"${href === 'savoir-faire.html' ? ' data-savoir-faire="true"' : ''}>${label}</a>`).join('')}</nav><div class="products-header-actions"><button class="products-icon-button" type="button" aria-label="Rechercher" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4.2 4.2"></path></svg></button><a class="products-icon-button" href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.7" r=".8" class="fill"></circle></svg></a><a class="products-icon-button" href="index.html#produits" aria-label="Voir le panier"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 4.5h2l2.3 12.2a2 2 0 0 0 2 1.65h7.35a2 2 0 0 0 1.97-1.65L20.5 8.3H6.2"></path><circle cx="10.2" cy="20" r="1.35" class="fill"></circle><circle cx="17" cy="20" r="1.35" class="fill"></circle></svg></a></div><a class="products-header-contact" href="index.html#contact">Nous contacter</a><button class="menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span><span></span></button>`;

  const nav = header.querySelector('.products-main-nav');
  const toggle = header.querySelector('.menu-toggle');

  let footer = page.querySelector('.footer');
  if (!footer) { footer = document.createElement('footer'); footer.className = 'footer'; page.appendChild(footer); }
  footer.innerHTML = `<div class="footer-main"><div class="footer-brand"><a class="footer-logo" href="index.html"><img src="assets/logo-crystal-4k.png" alt="ARAOUAA Premium"></a><p>POUR PARFUMER VOS PLATS</p></div><div class="footer-nav"><div><strong>Navigation</strong><a href="index.html">Accueil</a><a href="produits.html">Produits</a><a href="origine.html">L’univers</a><a href="collections.html">Les Collections</a><a href="journal.html">Le Journal</a><a href="savoir-faire.html">Notre savoir-faire</a></div><div><strong>Nos univers</strong><a href="produits.html#cafe">Café</a><a href="produits.html#epices">Épices</a><a href="produits.html#epicerie">Épicerie</a><a href="produits.html#fruits-secs">Fruits secs</a><a href="produits.html#noix-graines">Noix &amp; graines</a><a href="produits.html#cereales">Céréales · Riz · Pâtes</a><a href="produits.html#huiles">Huile &amp; Miel</a><a href="produits.html#amlou">Amlou</a><a href="produits.html#autres">&amp; Plus</a></div><div class="footer-contact"><strong>Contact</strong><div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z"></path><circle cx="12" cy="9" r="2.4"></circle></svg><span>Localisation</span></div><div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5h3.1l1.4 4.2-2 1.8a15.5 15.5 0 0 0 5.4 5.4l1.8-2 1.8 1.4v3.1c0 1-.8 1.8-1.8 1.8C10.4 19.2 4.8 13.6 4.8 6.3c0-1 .8-1.8 1.8-1.8Z"></path></svg><span>Téléphone</span></div><div><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2"></rect><path d="m4.5 7 7.5 6 7.5-6"></path></svg><span>E-mail</span></div></div></div></div><div class="footer-bottom"><span>© 2026 ARAOUAA Premium</span><span>Authenticité marocaine · Qualité premium</span></div>`;

  if (toggle && nav && toggle.dataset.worldMenuBound !== 'true') {
    toggle.dataset.worldMenuBound = 'true';
    toggle.addEventListener('click', () => { const open=toggle.getAttribute('aria-expanded')==='true'; toggle.setAttribute('aria-expanded',String(!open)); nav.classList.toggle('world-nav-open',!open); });
    nav.addEventListener('click', event => { if (!event.target.closest('a')) return; toggle.setAttribute('aria-expanded','false'); nav.classList.remove('world-nav-open'); });
  }

  const loadScript = (src, marker) => new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-${marker}]`)) { resolve(); return; }
    const script=document.createElement('script');
    script.src=src;
    script.dataset[marker]= 'true';
    script.onload=resolve;
    script.onerror=reject;
    document.body.appendChild(script);
  });

  loadScript('language.js', 'arraouaaLanguage')
    .then(() => loadScript('world-language.js', 'arraouaaWorldLanguage'))
    .then(() => loadScript('site-search.js', 'arraouaaSiteSearch'))
    .catch(error => console.error('ARAOUAA world scripts failed to load:', error));
})();

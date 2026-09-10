(() => {
  const header = document.querySelector('.world-page .products-header');
  if (!header) return;

  const nav = header.querySelector('.products-main-nav');
  const actions = header.querySelector('.products-header-actions');
  const toggle = header.querySelector('.menu-toggle');

  const links = [
    ['Accueil', 'index.html'],
    ['Produits', 'produits.html'],
    ['L’univers', 'origine.html'],
    ['Les Collections', 'collections.html'],
    ['Le Journal', 'journal.html'],
    ['Notre savoir-faire', 'savoir-faire.html'],
    ['L’Atelier', 'atelier.html']
  ];

  if (nav) {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    nav.innerHTML = links.map(([label, href]) => {
      const active = href === current;
      const savoir = href === 'savoir-faire.html' ? ' data-savoir-faire="true"' : '';
      return `<a href="${href}" class="${active ? 'active' : ''}"${savoir}>${label}</a>`;
    }).join('');
  }

  if (actions) {
    actions.querySelector('.products-icon-button[aria-label="Rechercher"]')?.remove();
  }
  header.querySelector('.products-header-contact')?.remove();

  const footer = document.querySelector('.world-page .footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-main">
        <div class="footer-brand">
          <a class="footer-logo" href="index.html"><img src="assets/logo-crystal-4k.png" alt="ARAOUAA Premium"></a>
          <p>POUR PARFUMER VOS PLATS</p>
        </div>
        <div class="footer-nav">
          <div>
            <strong>Navigation</strong>
            <a href="index.html">Accueil</a>
            <a href="produits.html">Produits</a>
            <a href="origine.html">L’univers</a>
            <a href="collections.html">Les Collections</a>
            <a href="journal.html">Le Journal</a>
            <a href="savoir-faire.html">Notre savoir-faire</a>
          </div>
          <div>
            <strong>Nos univers</strong>
            <a href="produits.html#cafe">Café</a>
            <a href="produits.html#epices">Épices</a>
            <a href="produits.html#epicerie">Épicerie</a>
            <a href="produits.html#fruits-secs">Fruits secs</a>
            <a href="produits.html#noix-graines">Noix &amp; graines</a>
            <a href="produits.html#cereales">Céréales · Riz · Pâtes</a>
            <a href="produits.html#huiles">Huile &amp; Miel</a>
            <a href="produits.html#amlou">Amlou</a>
            <a href="produits.html#autres">&amp; Plus</a>
          </div>
          <div class="footer-contact">
            <strong>Contact</strong>
            <div aria-label="Localisation"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12A7 7 0 0 0 5 9c0 5.9 7 12 7 12Z"></path><circle cx="12" cy="9" r="2.4"></circle></svg><span>Localisation</span></div>
            <div aria-label="Téléphone"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.8 10 6.6l-1.7 2.6a14.5 14.5 0 0 0 6.5 6.5l-1.7 2.6 2.8 2.8-1.8 2.7c-.5.8-1.5 1.2-2.4.9C9.6 17.9 6.1 14.4 4.6 8c-.2-.9-.1-1.9.9-2.4l1.7-1.8Z"></path></svg><span>Téléphone</span></div>
            <div aria-label="E-mail"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2"></rect><path d="m5 7 7 5.5L19 7"></path></svg><span>E-mail</span></div>
          </div>
        </div>
      </div>
      <div class="footer-bottom"><span>© 2026 ARAOUAA Premium</span><span>Authenticité marocaine · Qualité premium</span></div>`;
  }

  if (!nav || !toggle) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('world-nav-open', !open);
  });

  nav.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('world-nav-open');
  });

  if (!document.querySelector('script[data-arraouaa-language]')) {
    const script = document.createElement('script');
    script.src = 'language.js';
    script.dataset.arraouaaLanguage = 'true';
    document.body.appendChild(script);
  }
})();

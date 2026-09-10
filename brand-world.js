(() => {
  const nav = document.querySelector('.world-page .products-main-nav');
  const toggle = document.querySelector('.world-page .menu-toggle');
  if (!nav) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = [
    ['Accueil', 'index.html', 'index.html'],
    ['Produits', 'produits.html', 'produits.html'],
    ['L’univers', 'origine.html', 'origine.html'],
    ['Les Collections', 'collections.html', 'collections.html'],
    ['Le Journal', 'journal.html', 'journal.html'],
    ['Notre savoir-faire', 'savoir-faire.html', 'savoir-faire.html']
  ];

  nav.innerHTML = links.map(([label, href, page]) => {
    const active = currentPage === page;
    return `<a${active ? ' class="active"' : ''} href="${href}">${label}</a>`;
  }).join('');

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('world-nav-open', !open);
  });

  nav.addEventListener('click', event => {
    if (event.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('world-nav-open');
    }
  });
})();
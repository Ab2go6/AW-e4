(() => {
  const toggle = document.querySelector('.world-page .menu-toggle');
  const nav = document.querySelector('.world-page .products-main-nav');
  if (!toggle || !nav) return;

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

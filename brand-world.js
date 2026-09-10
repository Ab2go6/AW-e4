(() => {
  const nav = document.querySelector('.world-page .products-main-nav');
  const toggle = document.querySelector('.world-page .menu-toggle');
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
})();

(() => {
  const page = document.querySelector('.world-page');
  if (!page) return;

  const nav = page.querySelector('.products-main-nav');
  const toggle = page.querySelector('.products-header .menu-toggle');
  if (!nav || !toggle || toggle.dataset.worldMenuBound === 'true') return;

  toggle.dataset.worldMenuBound = 'true';

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

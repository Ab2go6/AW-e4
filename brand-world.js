(() => {
  const nav = document.querySelector('.world-page .products-main-nav');
  const toggle = document.querySelector('.world-page .menu-toggle');
  const header = document.querySelector('.world-page .products-header');
  if (!header) return;

  // World pages use one static navigation. Remove the catalogue-only search control.
  header.querySelector('.products-icon-button[aria-label="Rechercher"]')?.remove();

  // Language controls remain shared, but the translation script must not own navigation.
  const loadLanguage = () => {
    if (document.querySelector('script[data-arraouaa-language]')) return;
    const script = document.createElement('script');
    script.src = 'language.js';
    script.dataset.arraouaaLanguage = 'true';
    document.body.appendChild(script);
  };

  loadLanguage();

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

(() => {
  const nav = document.querySelector('.world-page .products-main-nav');
  const toggle = document.querySelector('.world-page .menu-toggle');
  const header = document.querySelector('.world-page .products-header');
  if (!header) return;

  // World pages use one static navigation. Remove the catalogue-only search control.
  header.querySelector('.products-icon-button[aria-label="Rechercher"]')?.remove();

  const removeGeneratedSavoirLink = () => {
    if (!nav) return;
    const generated = nav.querySelectorAll('[data-savoir-faire="true"]');
    generated.forEach(link => link.remove());
  };

  // Keep language controls shared while leaving navigation and header structure static.
  if (!document.querySelector('script[data-arraouaa-language]')) {
    const script = document.createElement('script');
    script.src = 'language.js';
    script.dataset.arraouaaLanguage = 'true';
    script.addEventListener('load', removeGeneratedSavoirLink, { once: true });
    document.body.appendChild(script);
  } else {
    removeGeneratedSavoirLink();
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
})();

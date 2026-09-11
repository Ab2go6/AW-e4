(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('search-index') !== '1' || window.top === window) return;

  const normalize = value => String(value || '').trim();
  let sent = false;

  const collect = () => [...document.querySelectorAll('.product-item')].map(item => {
    const name = item.dataset.productName || item.querySelector('h3')?.textContent?.trim() || '';
    const category = item.dataset.category || item.querySelector('.product-item-tag')?.textContent?.trim() || '';
    const text = item.textContent || '';
    return { name: normalize(name), category: normalize(category), text };
  }).filter(item => item.name);

  const publish = () => {
    if (sent) return true;
    const items = collect();
    if (!items.length) return false;
    window.parent.postMessage({ type: 'ARAOUAA_SEARCH_INDEX', items }, window.location.origin);
    sent = true;
    return true;
  };

  const start = () => {
    if (publish()) return;
    const observer = new MutationObserver(() => {
      if (publish()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => {
      publish();
      observer.disconnect();
    }, 15000);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();

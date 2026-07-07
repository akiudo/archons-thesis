/**
 * Re-initialize Eorzea Database tooltips after client-side navigation.
 * The official loader only scans the DOM on initial page load.
 */
function reloadEorzeaTooltips() {
  const LOADER_ID = 'eorzeadb-loader';
  const LOADER_SRC =
    'https://lds-img.finalfantasyxiv.com/pc/global/js/eorzeadb/loader.js?v3';

  const links = document.querySelectorAll('a.eorzeadb_link');
  if (links.length === 0) {
    return;
  }

  const existing = document.getElementById(LOADER_ID);
  if (existing) {
    existing.remove();
  }

  const script = document.createElement('script');
  script.id = LOADER_ID;
  script.src = LOADER_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export default {
  onRouteDidUpdate() {
    // Small delay lets React finish rendering new page content
    setTimeout(reloadEorzeaTooltips, 100);
  },
};

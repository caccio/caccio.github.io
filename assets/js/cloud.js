/**
 * cloud.js — Nuvola di tag pesata per la pagina /punti/
 *
 * Port vanilla del componente TagCloudWeighted in blog-app.jsx.
 * Legge i dati dal JSON inline #points-data (stesso del grafo).
 * Renderizza in #tag-cloud.
 */
(function () {
  'use strict';

  function renderCloud(container, tags) {
    container.innerHTML = '';

    const max  = tags[0]?.count  || 1;
    const min  = tags[tags.length - 1]?.count || 1;
    const span = Math.max(1, max - min);

    // Ordine alfabetico per ritmo visivo
    const list = tags.slice().sort((a, b) => a.name.localeCompare(b.name));

    list.forEach(t => {
      const r      = (t.count - min) / span;          // 0..1
      const size   = 13 + r * 23;                     // 13 → 36 px
      const weight = r > 0.66 ? 600 : r > 0.33 ? 500 : 400;
      const color  = r > 0.66
        ? 'var(--fg)'
        : r > 0.33 ? 'var(--fg-soft)' : 'var(--fg-mute)';

      const a = document.createElement('a');
      a.className = 'tag-w';
      a.href = '/punti/' + encodeURIComponent(t.name) + '/';
      a.style.cssText = `font-size:${size.toFixed(1)}px;font-weight:${weight};color:${color}`;
      a.setAttribute('aria-label', `${t.name}: ${t.count} post`);

      const nameSpan = document.createElement('span');
      nameSpan.textContent = t.name;

      const countSpan = document.createElement('span');
      countSpan.className = 'n';
      countSpan.textContent = t.count;

      a.appendChild(nameSpan);
      a.appendChild(countSpan);
      container.appendChild(a);
    });
  }

  function init() {
    const dataEl     = document.getElementById('points-data');
    const container  = document.getElementById('tag-cloud');
    if (!dataEl || !container) return;

    let data;
    try { data = JSON.parse(dataEl.textContent); }
    catch (e) { console.error('cloud.js: impossibile parsare points-data', e); return; }

    const { tags } = data;
    if (!tags || !tags.length) return;

    // Ordina per count desc per calcolare min/max correttamente
    tags.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    renderCloud(container, tags);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

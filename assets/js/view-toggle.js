/**
 * view-toggle.js — Toggle Grafo / Nuvola sulla pagina /punti/
 *
 * Persiste la scelta in sessionStorage['points.view'].
 * Espone la funzione globale setView(name) usata dagli onclick inline.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'points.view';

  function applyView(view) {
    const graphContainer = document.getElementById('tag-graph-container');
    const cloudContainer = document.getElementById('tag-cloud-container');
    const btnGraph       = document.getElementById('btn-graph');
    const btnCloud       = document.getElementById('btn-cloud');

    if (!graphContainer || !cloudContainer || !btnGraph || !btnCloud) return;

    if (view === 'cloud') {
      graphContainer.hidden = true;
      cloudContainer.hidden = false;
      btnGraph.classList.remove('on');
      btnCloud.classList.add('on');
      btnGraph.setAttribute('aria-selected', 'false');
      btnCloud.setAttribute('aria-selected', 'true');
    } else {
      // default: graph
      graphContainer.hidden = false;
      cloudContainer.hidden = true;
      btnGraph.classList.add('on');
      btnCloud.classList.remove('on');
      btnGraph.setAttribute('aria-selected', 'true');
      btnCloud.setAttribute('aria-selected', 'false');
    }
  }

  // Funzione globale chiamata dagli onclick nel markup
  window.setView = function (view) {
    applyView(view);
    try { sessionStorage.setItem(STORAGE_KEY, view); } catch (e) {}
  };

  function init() {
    // Ripristina vista da sessionStorage se disponibile
    let saved;
    try { saved = sessionStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === 'cloud' || saved === 'graph') {
      applyView(saved);
    }
    // Altrimenti resta il default (graph, già impostato nel markup)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

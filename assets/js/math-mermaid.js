/**
 * math-mermaid.js — Init KaTeX auto-render + conversione blocchi Mermaid
 *
 * KaTeX: il file auto-render viene caricato con `onload=renderMathInElement(...)`
 * direttamente nell'attributo HTML (head.html), quindi qui non serve init.
 *
 * Mermaid: il modulo ESM viene caricato via <script type="module"> in head.html
 * se has_mermaid: true. La conversione dei blocchi Rouge è gestita lì inline.
 *
 * Questo file resta per futuri hook e per inizializzazioni post-render
 * (es. tabelle di contenuto, lazy scroll, etc.).
 */
(function () {
  'use strict';

  // Nulla da fare qui: KaTeX e Mermaid sono già inizializzati
  // in head.html quando necessario (caricamento condizionale).

  // Eventuale future hook:
  // document.addEventListener('DOMContentLoaded', function () { ... });
})();

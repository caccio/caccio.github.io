/**
 * graph.js — Knowledge graph force-directed per la pagina /punti/
 *
 * Port vanilla del componente TagGraph in blog-app.jsx.
 * Parametri esatti dalla spec (§9.3 del README):
 *   REPEL=1800, SPRING=0.025, REST=70, CENTER=0.006, DAMP=0.82, iter=320
 *   viewport 760×520
 *
 * La simulazione è deterministica: stesso input → stessa posizione.
 * Nessun Math.random().
 */
(function () {
  'use strict';

  const W = 760, H = 520;
  const REPEL  = 1800;
  const SPRING = 0.025;
  const REST   = 70;
  const CENTER = 0.006;
  const DAMP   = 0.82;
  const ITERS  = 320;

  // ── Utility ────────────────────────────────────────────────────────
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function svgEl(tag, attrs) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v);
    return el;
  }

  // Hash deterministica del nome del tag → posizione iniziale sul cerchio
  function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  // ── Calcola layout force-directed ─────────────────────────────────
  function computeLayout(tags, posts) {
    // 1) Co-occorrenza
    const co  = {};
    const nei = {};
    posts.forEach(p => {
      const ts = p.tags;
      for (let i = 0; i < ts.length; i++) {
        for (let j = i + 1; j < ts.length; j++) {
          const [a, b] = [ts[i], ts[j]].sort();
          const k = a + '|' + b;
          co[k] = (co[k] || 0) + 1;
          (nei[a] = nei[a] || new Set()).add(b);
          (nei[b] = nei[b] || new Set()).add(a);
        }
      }
    });
    const edges = Object.entries(co).map(([k, w]) => {
      const [a, b] = k.split('|');
      return { a, b, w };
    });

    // 2) Init deterministico su cerchio
    const nodes = {};
    tags.forEach(t => {
      const seed = hashStr(t.name);
      const angle = ((seed % 997) / 997) * Math.PI * 2;
      const r = 120 + (seed % 80);
      nodes[t.name] = {
        x: W / 2 + Math.cos(angle) * r,
        y: H / 2 + Math.sin(angle) * r,
        vx: 0, vy: 0,
        mass: 1 + Math.sqrt(t.count),
      };
    });

    const names = Object.keys(nodes);

    // 3) Force simulation
    for (let iter = 0; iter < ITERS; iter++) {
      // Repulsione coulombiana
      for (let i = 0; i < names.length; i++) {
        const na = nodes[names[i]];
        for (let j = i + 1; j < names.length; j++) {
          const nb = nodes[names[j]];
          let dx = nb.x - na.x, dy = nb.y - na.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) { d2 = 1; dx = 0.5; dy = 0.5; }
          const d  = Math.sqrt(d2);
          const f  = REPEL / d2;
          const fx = (dx / d) * f, fy = (dy / d) * f;
          na.vx -= fx / na.mass; na.vy -= fy / na.mass;
          nb.vx += fx / nb.mass; nb.vy += fy / nb.mass;
        }
      }
      // Spring sugli archi
      edges.forEach(({ a, b, w }) => {
        const na = nodes[a], nb = nodes[b];
        if (!na || !nb) return;
        const dx = nb.x - na.x, dy = nb.y - na.y;
        const d  = Math.sqrt(dx * dx + dy * dy) || 1;
        const f  = SPRING * (d - REST) * Math.sqrt(w);
        const fx = (dx / d) * f, fy = (dy / d) * f;
        na.vx += fx; na.vy += fy;
        nb.vx -= fx; nb.vy -= fy;
      });
      // Gravità verso il centro + integrazione
      names.forEach(n => {
        const nd = nodes[n];
        nd.vx += (W / 2 - nd.x) * CENTER;
        nd.vy += (H / 2 - nd.y) * CENTER;
        nd.vx *= DAMP; nd.vy *= DAMP;
        nd.x  += nd.vx; nd.y  += nd.vy;
      });
    }

    // 4) Normalizza ai bounds con padding per le label
    const padX = 70, padY = 40;
    const xs = names.map(n => nodes[n].x);
    const ys = names.map(n => nodes[n].y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const pos = {};
    names.forEach(n => {
      const nd = nodes[n];
      pos[n] = {
        x: padX + ((nd.x - minX) / Math.max(1, maxX - minX)) * (W - 2 * padX),
        y: padY + ((nd.y - minY) / Math.max(1, maxY - minY)) * (H - 2 * padY),
      };
    });

    // 5) Grado per la luminosità del nodo
    const deg = {}, tagMap = {};
    let maxDeg = 0;
    tags.forEach(t => { tagMap[t.name] = t; });
    tags.forEach(t => {
      const d = (nei[t.name] && nei[t.name].size) || 0;
      deg[t.name] = d;
      if (d > maxDeg) maxDeg = d;
    });

    return { positions: pos, edges, neighbors: nei, degree: deg, maxDegree: maxDeg };
  }

  // ── Rendering SVG ─────────────────────────────────────────────────
  function renderGraph(svg, tags, layout) {
    const { positions, edges, neighbors, degree, maxDegree } = layout;
    svg.innerHTML = '';

    // Gruppo archi
    const gEdges = svgEl('g', { class: 'g-edges' });
    edges.forEach(({ a, b, w }) => {
      const pa = positions[a], pb = positions[b];
      if (!pa || !pb) return;
      const line = svgEl('line', {
        class: 'g-edge',
        x1: pa.x, y1: pa.y,
        x2: pb.x, y2: pb.y,
        'stroke-width': (0.8 + w * 0.6).toFixed(2),
        'data-a': a, 'data-b': b,
      });
      gEdges.appendChild(line);
    });
    svg.appendChild(gEdges);

    // Gruppo nodi
    const gNodes = svgEl('g', { class: 'g-nodes' });
    tags.forEach(t => {
      const p = positions[t.name];
      if (!p) return;
      const r    = 6 + Math.sqrt(t.count) * 6;
      const tone = maxDegree ? ((degree[t.name] || 0) / maxDegree) : 0;

      const g = svgEl('g', {
        class: 'g-node',
        style: `--tone: ${tone.toFixed(3)}`,
        'data-name': t.name,
        role: 'button',
        'aria-label': `${t.name} (${t.count} post)`,
        tabindex: '0',
      });

      // Halo (visibile solo su hover/active)
      const halo = svgEl('circle', { cx: p.x, cy: p.y, r: r * 1.8, class: 'g-halo' });

      // Cerchio principale
      const dot  = svgEl('circle', { cx: p.x, cy: p.y, r, class: 'g-dot' });

      // Label sopra il nodo
      const label = svgEl('text', {
        x: p.x, y: p.y - r - 7,
        'text-anchor': 'middle',
        class: 'g-label',
      });
      label.textContent = t.name;

      // Count dentro il nodo
      const num = svgEl('text', {
        x: p.x, y: p.y + 4,
        'text-anchor': 'middle',
        class: 'g-num',
      });
      num.textContent = t.count;

      g.appendChild(halo);
      g.appendChild(dot);
      g.appendChild(label);
      g.appendChild(num);
      gNodes.appendChild(g);
    });
    svg.appendChild(gNodes);

    // ── Interazione hover ────────────────────────────────────────────
    let hoveredName = null;

    function setHover(name) {
      if (name === hoveredName) return;
      hoveredName = name;

      // Reset tutti
      svg.querySelectorAll('.g-node').forEach(el => el.classList.remove('a', 'd'));
      svg.querySelectorAll('.g-edge').forEach(el => el.classList.remove('a', 'd'));

      if (!name) return;

      const nset = neighbors[name] || new Set();

      svg.querySelectorAll('.g-node').forEach(el => {
        const n = el.dataset.name;
        if (n === name)         el.classList.add('a');
        else if (!nset.has(n))  el.classList.add('d');
      });

      svg.querySelectorAll('.g-edge').forEach(el => {
        const a = el.dataset.a, b = el.dataset.b;
        if (a === name || b === name) el.classList.add('a');
        else                          el.classList.add('d');
      });
    }

    gNodes.querySelectorAll('.g-node').forEach(el => {
      el.addEventListener('mouseenter', () => setHover(el.dataset.name));
      el.addEventListener('focus',      () => setHover(el.dataset.name));
      el.addEventListener('click', () => {
        window.location.href = '/punti/' + encodeURIComponent(el.dataset.name) + '/';
      });
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = '/punti/' + encodeURIComponent(el.dataset.name) + '/';
        }
      });
    });

    svg.addEventListener('mouseleave', () => setHover(null));
    svg.addEventListener('blur', () => setHover(null), true);
  }

  // ── Entry point ───────────────────────────────────────────────────
  function init() {
    const dataEl = document.getElementById('points-data');
    const svgEl_ = document.getElementById('tag-graph');
    if (!dataEl || !svgEl_) return;

    let data;
    try { data = JSON.parse(dataEl.textContent); }
    catch (e) { console.error('graph.js: impossibile parsare points-data', e); return; }

    const { tags, posts } = data;
    if (!tags || !tags.length) return;

    // Ordina tag per count desc (coerente col cloud)
    tags.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

    const layout = computeLayout(tags, posts);
    renderGraph(svgEl_, tags, layout);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

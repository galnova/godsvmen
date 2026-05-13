(function () {
  'use strict';

  const COLS = 9;
  const ROWS = 5;

  /* ── Roster ──────────────────────────────────────────────────────
     Order matches the left-to-right, top-to-bottom layout of
     img/gvm_char_select.png (9 columns × 5 rows = 45 cells).
     slug: filename stem in img/char/[slug]_gvm_char.png
     null entries = mystery / unassigned cells
  ────────────────────────────────────────────────────────────────── */
  const ROSTER = [
    // Row 0 — cells 0–8
    null,
    { slug: 'volcanis',      name: 'Volcanis',        house: 'Hanor',   job: 'The Old God',       bio: 'characters/volcanis.html' },
    { slug: 'lem',           name: 'Lem',             house: 'Wolf',    job: 'Wolf King' },
    { slug: 'mouse',         name: 'Mouse',           house: 'Weber',   job: 'Olan Soldier',      bio: 'characters/mouse.html' },
    { slug: 'fara',          name: 'Fara',            house: 'Goth',    job: 'Celebrity Fighter', bio: 'characters/fara.html' },
    { slug: 'quint',         name: 'Quint',           house: 'None',    job: 'Relaxed Fighter',   bio: 'characters/quint.html' },
    { slug: 'mac_knight',    name: 'Macabre Soldier', house: 'Dark',    job: 'Gunner',            bio: 'characters/macabre-knight.html' },
    { slug: 'sordin',        name: 'Sordin',          house: 'Hanor',   job: 'The Plump Knight',  bio: 'characters/sordin.html' },
    { slug: 'eln-delila',    name: 'Eln-Delila',      house: 'None',    job: 'Eln Soldier',       bio: 'characters/eln-delila.html' },
    // Row 1 — cells 9–17
    { slug: 'ragnow',        name: 'Ragnow',          house: 'None',    job: '' },
    { slug: 'ifeatu',        name: 'Ifeatu',          house: 'None',    job: '' },
    { slug: 'zonovin',       name: 'Zonovin',         house: 'None',    job: '' },
    { slug: 'lem',           name: 'Lem',             house: 'Wolf',    job: 'Wolf King' },
    { slug: 'chalstolce',    name: 'Chalstolce',      house: 'Dark',    job: 'Macabre King' },
    { slug: 'wolf_knight',   name: 'Wolf',            house: 'Wolf',    job: 'Werewolf',          bio: 'characters/lunar-knight.html' },
    { slug: 'zigg',          name: 'Zigg',            house: 'None',    job: '' },
    { slug: 'taur',          name: 'Taur',            house: 'Weber',   job: 'Weber Queen',       bio: 'characters/taur.html' },
    { slug: 'sol',           name: 'Sol',             house: 'Weber',   job: 'The AllKing',       bio: 'characters/sol.html' },
    // Row 2 — cells 18–26
    { slug: 'grandle',       name: 'Grandle',         house: 'Robe',    job: 'Robe Prince',       bio: 'characters/grandle.html' },
    { slug: 'shana',         name: 'Shana',           house: 'Robe',    job: 'Robe General',      bio: 'characters/shana.html' },
    { slug: 'chris',         name: 'Christopher',     house: 'None',    job: 'Boulevard Fighter', bio: 'characters/chris.html' },
    { slug: 'seth',          name: 'Seth',            house: 'None',    job: 'Olan Soldier',      bio: 'characters/seth.html' },
    { slug: 'ripper',        name: 'Ripper',          house: 'None',    job: 'Prisoner',          bio: 'characters/ripper.html' },
    { slug: 'samson',        name: 'Samson',          house: 'None',    job: 'Boulevard Fighter', bio: 'characters/samson.html' },
    { slug: 'yosh',          name: 'Yosh',            house: 'Robe',    job: 'Robe Knight',       bio: 'characters/yosh.html' },
    { slug: 'flow',          name: 'Flow',            house: 'Dark',    job: 'Dark General',      bio: 'characters/flow.html' },
    { slug: 'ignis',         name: 'Ignis',           house: 'Weber',   job: 'The Weber Prince',  bio: 'characters/ignis.html' },
    // Row 3 — cells 27–35
    { slug: 'crin',          name: 'Crin',            house: 'Robe',    job: 'Robe King' },
    { slug: 'toth',          name: 'Tyree',           house: 'Goth',    job: 'Demon Hunter',      bio: 'characters/tyree.html' },
    { slug: 'lars',          name: 'Lars',            house: 'Wolf',    job: 'Werewolf',          bio: 'characters/lars.html' },
    { slug: 'bastion',       name: 'Bastion',         house: 'None',    job: 'Lion Exile',        bio: 'characters/bastion.html' },
    { slug: 'robe_knight',   name: 'Robe Knight',     house: 'Robe',    job: 'Robe Swordsman',    bio: 'characters/robe.html' },
    { slug: 'tesha',         name: 'Tesha',           house: 'None',    job: 'Mad Merchant',      bio: 'characters/tesha.html' },
    { slug: 'karras',        name: 'Karras',          house: 'None',    job: '' },
    { slug: 'backus',        name: 'Backus',          house: 'None',    job: '' },
    { slug: 'baldischwiler', name: 'Baldischwiler',   house: 'None',    job: '' },
    // Row 4 — cells 36–44
    { slug: 'bruno',         name: 'Bruno',           house: 'Goth',    job: 'Goth Leader',       bio: 'characters/bruno.html' },
    { slug: 'stormheart',    name: 'Stormheart',      house: 'None',    job: 'The Far Killer',    bio: 'characters/stormheart.html' },
    { slug: 'demoni',        name: 'Demoni',          house: 'None',    job: 'The Demon Lord',    bio: 'characters/demoni.html' },
    { slug: 'voorhies',      name: 'Voorhies',        house: 'Mastery', job: 'Mastery Disciple',  bio: 'characters/voorhies.html' },
    { slug: 'lit',           name: 'Lit Knight',      house: 'Weber',   job: 'Sword Mage',        bio: 'characters/lit-knight.html' },
    { slug: 'pond',          name: 'Pond',            house: 'Hanor',   job: 'The Young God',     bio: 'characters/pond.html' },
    { slug: 'maxither',      name: 'Maxither',        house: 'Hanor',   job: 'The Chosen God',    bio: 'characters/maxither.html' },
    { slug: 'franker',       name: 'Franker',         house: 'Goth',    job: 'Swift Gutter',      bio: 'characters/franker.html' },
    null
  ];

  /* ── State ───────────────────────────────────────────────────── */
  let turn     = 1;
  let p1Char   = null;
  let p2Char   = null;
  let p1CellEl = null;
  let p2CellEl = null;

  /* ── DOM refs ────────────────────────────────────────────────── */
  const grid       = document.getElementById('csGrid');
  const turnBanner = document.getElementById('csTurnBanner');
  const p1Panel    = document.getElementById('p1Panel');
  const p2Panel    = document.getElementById('p2Panel');
  const p1Img      = document.getElementById('p1Img');
  const p2Img      = document.getElementById('p2Img');
  const p1Name     = document.getElementById('p1Name');
  const p2Name     = document.getElementById('p2Name');
  const p1House    = document.getElementById('p1House');
  const p2House    = document.getElementById('p2House');
  const p1Job      = document.getElementById('p1Job');
  const p2Job      = document.getElementById('p2Job');
  const p1Bio      = document.getElementById('p1Bio');
  const p2Bio      = document.getElementById('p2Bio');
  const p1Ph       = document.getElementById('p1Placeholder');
  const p2Ph       = document.getElementById('p2Placeholder');

  /* ── Helpers ─────────────────────────────────────────────────── */

  function imgPath(slug) {
    return 'img/char/' + slug + '_gvm_char.png';
  }

  function houseLabel(house) {
    if (!house || house === 'None') return 'Independent';
    return 'House ' + house;
  }

  function updatePanel(player, char) {
    const img   = player === 1 ? p1Img   : p2Img;
    const name  = player === 1 ? p1Name  : p2Name;
    const house = player === 1 ? p1House : p2House;
    const job   = player === 1 ? p1Job   : p2Job;
    const bio   = player === 1 ? p1Bio   : p2Bio;
    const ph    = player === 1 ? p1Ph    : p2Ph;
    const panel = player === 1 ? p1Panel : p2Panel;

    if (!char) {
      img.src = '';
      img.alt = '';
      img.classList.add('cs-panel__img--hidden');
      ph.classList.remove('cs-panel__placeholder--hidden');
      name.textContent  = '---';
      house.textContent = '';
      job.textContent   = '';
      bio.setAttribute('aria-hidden', 'true');
      panel.classList.remove('cs-panel--active');
      return;
    }

    img.src = imgPath(char.slug);
    img.alt = char.name;
    img.classList.remove('cs-panel__img--hidden');
    ph.classList.add('cs-panel__placeholder--hidden');
    name.textContent  = char.name;
    house.textContent = houseLabel(char.house);
    job.textContent   = char.job || '';
    panel.classList.add('cs-panel--active');

    if (char.bio) {
      bio.href = char.bio;
      bio.removeAttribute('aria-hidden');
    } else {
      bio.setAttribute('aria-hidden', 'true');
    }
  }

  function updateTurnBanner() {
    if (p1Char && p2Char) {
      turnBanner.textContent  = p1Char.name + '  VS  ' + p2Char.name;
      turnBanner.dataset.turn = 'ready';
    } else if (turn === 1) {
      turnBanner.textContent  = 'Player 1 — Select Fighter';
      turnBanner.dataset.turn = 'p1';
    } else {
      turnBanner.textContent  = 'Player 2 — Select Fighter';
      turnBanner.dataset.turn = 'p2';
    }
  }

  /* ── Click handler ───────────────────────────────────────────── */

  function handleClick(cellEl, char) {
    if (!char) return;

    if (turn === 1) {
      if (p1CellEl) p1CellEl.classList.remove('cs-cell--p1');
      p1Char   = char;
      p1CellEl = cellEl;
      cellEl.classList.add('cs-cell--p1');
      updatePanel(1, char);
      turn = 2;
    } else {
      if (p2CellEl) p2CellEl.classList.remove('cs-cell--p2');
      p2Char   = char;
      p2CellEl = cellEl;
      cellEl.classList.add('cs-cell--p2');
      updatePanel(2, char);
      turn = 1;
    }

    updateTurnBanner();
  }

  /* ── Hover handlers ──────────────────────────────────────────── */

  function handleEnter(char) {
    if (!char) return;
    updatePanel(turn, char);
  }

  function handleLeave() {
    const locked = turn === 1 ? p1Char : p2Char;
    updatePanel(turn, locked);
  }

  /* ── Grid builder ────────────────────────────────────────────── */

  function buildGrid() {
    const frag = document.createDocumentFragment();

    for (let i = 0; i < COLS * ROWS; i++) {
      const col  = i % COLS;
      const row  = Math.floor(i / COLS);
      const char = ROSTER[i] || null;

      const cell = document.createElement('div');
      cell.className = 'cs-cell';
      cell.setAttribute('role', 'gridcell');

      /* Background slice — maps cell (col, row) to the correct
         region of gvm_char_select.png using percentage positioning.
         background-size: 900% 500% makes the whole image 9× wide
         and 5× tall relative to each cell, then we shift by the
         percentage that aligns this cell's portion. */
      const posX = COLS > 1 ? (col / (COLS - 1)) * 100 : 0;
      const posY = ROWS > 1 ? (row / (ROWS - 1)) * 100 : 0;
      cell.style.backgroundPosition = posX + '% ' + posY + '%';

      const isMystery = !char || char.locked;

      if (isMystery) {
        cell.classList.add('cs-cell--mystery');
        cell.setAttribute('aria-label', char ? char.name : 'Unknown Fighter');
        cell.setAttribute('aria-disabled', 'true');
      } else {
        cell.setAttribute('aria-label', char.name);
        cell.setAttribute('tabindex', '0');
        cell.addEventListener('click', () => handleClick(cell, char));
        cell.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(cell, char);
          }
        });
      }

      /* All cells get hover listeners so mystery cells don't break
         pointer-event hit-testing on their neighbours. */
      cell.addEventListener('mouseenter', function () {
        if (isMystery) return;
        handleEnter(char);
      });
      cell.addEventListener('mouseleave', handleLeave);

      const label = document.createElement('span');
      label.className   = 'cs-cell__label';
      label.textContent = char ? char.name : '';
      cell.appendChild(label);

      frag.appendChild(cell);
    }

    grid.appendChild(frag);
  }

  /* ── Init ────────────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    buildGrid();
    updateTurnBanner();
  });

}());

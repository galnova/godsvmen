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

  /* ── Voter identity ─────────────────────────────────────────── */

  let voterId = localStorage.getItem('gvm_voter_id');
  if (!voterId) {
    voterId = crypto.randomUUID();
    localStorage.setItem('gvm_voter_id', voterId);
  }

  let hasVoted   = !!localStorage.getItem('gvm_vote_slug');
  let myVoteSlug = localStorage.getItem('gvm_vote_slug');
  let hoveredChar = null;

  /* slug → display name lookup */
  const slugToName = {};
  ROSTER.forEach(function (c) { if (c) slugToName[c.slug] = c.name; });

  /* ── DOM refs (assigned in DOMContentLoaded) ────────────────── */
  let grid, banner, previewImg, previewName, previewHouse,
      previewJob, previewBio, previewPh, voteBtn, undoBtn, voteResults;

  /* ── Helpers ─────────────────────────────────────────────────── */

  function imgPath(slug) {
    return 'img/char/' + slug + '_gvm_char.png';
  }

  function houseLabel(house) {
    if (!house || house === 'None') return 'Independent';
    return 'House ' + house;
  }

  /* ── Preview panel ───────────────────────────────────────────── */

  function updatePreview(char) {
    hoveredChar = char;

    if (!char) {
      previewImg.src = '';
      previewImg.classList.add('cs-preview__img--hidden');
      previewPh.classList.remove('cs-preview__placeholder--hidden');
      previewName.textContent  = 'Who do you like?';
      previewHouse.textContent = '';
      previewJob.textContent   = '';
      previewBio.setAttribute('aria-hidden', 'true');
      if (!hasVoted) {
        voteBtn.disabled     = true;
        voteBtn.textContent  = 'Hover over a fighter';
      }
      return;
    }

    previewImg.classList.add('cs-preview__img--hidden');
    previewPh.classList.remove('cs-preview__placeholder--hidden');
    previewImg.alt = char.name;
    previewImg.onload = function () {
      previewImg.classList.remove('cs-preview__img--hidden');
      previewPh.classList.add('cs-preview__placeholder--hidden');
    };
    previewImg.src = imgPath(char.slug);
    previewName.textContent  = char.name;
    previewHouse.textContent = houseLabel(char.house);
    previewJob.textContent   = char.job || '';

    if (char.bio) {
      previewBio.href = char.bio;
      previewBio.removeAttribute('aria-hidden');
    } else {
      previewBio.setAttribute('aria-hidden', 'true');
    }

    if (!hasVoted) {
      voteBtn.disabled    = false;
      voteBtn.textContent = 'Vote for ' + char.name;
    } else {
      voteBtn.textContent = myVoteSlug === char.slug ? '✓ Your Vote' : 'Already Voted';
    }
  }

  /* ── Vote submission ─────────────────────────────────────────── */

  async function castVote(char) {
    if (hasVoted || !char) return;

    try {
      const res  = await fetch('/api/vote', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ character_slug: char.slug, voter_id: voterId })
      });
      const data = await res.json();

      if (data.success) {
        hasVoted   = true;
        myVoteSlug = char.slug;
        localStorage.setItem('gvm_vote_slug', char.slug);

        banner.textContent  = 'You voted for ' + char.name + '!';
        banner.dataset.state = 'voted';

        voteBtn.disabled = true;
        voteBtn.textContent = '✓ Voted!';
        voteBtn.classList.add('cs-vote-btn--voted');
        undoBtn.hidden = false;

        /* Mark the voted cell */
        grid.querySelectorAll('.cs-cell').forEach(function (cell, i) {
          if (ROSTER[i] && ROSTER[i].slug === char.slug) {
            cell.classList.add('cs-cell--voted');
          }
        });

        loadResults();
      } else if (data.error === 'already_voted') {
        hasVoted = true;
        banner.textContent   = 'You already voted!';
        banner.dataset.state = 'voted';
        voteBtn.disabled     = true;
        voteBtn.classList.add('cs-vote-btn--voted');
        undoBtn.hidden = false;
      }
    } catch (e) {
      banner.textContent = 'Could not submit vote — try again.';
    }
  }

  /* ── Undo vote ───────────────────────────────────────────────── */

  async function undoVote() {
    try {
      const res  = await fetch('/api/vote', {
        method:  'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ voter_id: voterId })
      });
      const data = await res.json();

      if (data.success) {
        hasVoted   = false;
        myVoteSlug = null;
        localStorage.removeItem('gvm_vote_slug');

        banner.textContent   = 'Hover a fighter — click to cast your vote';
        banner.dataset.state = 'idle';

        undoBtn.hidden = true;
        voteBtn.disabled = true;
        voteBtn.textContent = 'Hover a fighter';
        voteBtn.classList.remove('cs-vote-btn--voted');

        grid.querySelectorAll('.cs-cell--voted').forEach(function (cell) {
          cell.classList.remove('cs-cell--voted');
        });

        if (hoveredChar) updatePreview(hoveredChar);
        loadResults();
      }
    } catch (e) {
      banner.textContent = 'Could not undo vote — try again.';
    }
  }

  /* ── Results leaderboard ─────────────────────────────────────── */

  async function loadResults() {
    try {
      const res  = await fetch('/api/vote');
      const data = await res.json();

      if (!data.length) {
        voteResults.innerHTML = '<p class="cs-results__empty">No votes yet — be first!</p>';
        return;
      }

      const total = data.reduce(function (sum, r) { return sum + r.votes; }, 0);

      voteResults.innerHTML = data.slice(0, 10).map(function (r, i) {
        const name  = slugToName[r.character_slug] || r.character_slug;
        const pct   = Math.round((r.votes / total) * 100);
        const mine  = r.character_slug === myVoteSlug;
        return '<div class="vote-bar' + (mine ? ' vote-bar--mine' : '') + '">' +
          '<div class="vote-bar__header">' +
            '<span class="vote-bar__name">' + (i + 1) + '. ' + name + '</span>' +
            '<span class="vote-bar__pct">' + pct + '%</span>' +
          '</div>' +
          '<div class="vote-bar__track">' +
            '<div class="vote-bar__fill" style="width:' + pct + '%"></div>' +
          '</div>' +
        '</div>';
      }).join('');
    } catch (e) {
      voteResults.innerHTML = '<p class="cs-results__empty">Could not load results.</p>';
    }
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

        if (myVoteSlug && char.slug === myVoteSlug) {
          cell.classList.add('cs-cell--voted');
        }

        cell.addEventListener('click', function () { castVote(char); });
        cell.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            castVote(char);
          }
        });
      }

      cell.addEventListener('mouseenter', function () {
        if (isMystery) return;
        updatePreview(char);
      });
      cell.addEventListener('mouseleave', function () {
        updatePreview(null);
      });

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
    grid         = document.getElementById('csGrid');
    banner       = document.getElementById('csBanner');
    previewImg   = document.getElementById('previewImg');
    previewName  = document.getElementById('previewName');
    previewHouse = document.getElementById('previewHouse');
    previewJob   = document.getElementById('previewJob');
    previewBio   = document.getElementById('previewBio');
    previewPh    = document.getElementById('previewPlaceholder');
    voteBtn      = document.getElementById('voteBtn');
    undoBtn      = document.getElementById('undoBtn');
    voteResults  = document.getElementById('voteResults');

    previewImg.addEventListener('error', function () {
      previewImg.classList.add('cs-preview__img--hidden');
      previewPh.classList.remove('cs-preview__placeholder--hidden');
    });

    buildGrid();
    loadResults();

    if (hasVoted) {
      const votedName = slugToName[myVoteSlug] || myVoteSlug;
      banner.textContent   = 'You voted for ' + votedName + '. Thanks!';
      banner.dataset.state = 'voted';
      voteBtn.disabled     = true;
      voteBtn.textContent  = '✓ Voted!';
      voteBtn.classList.add('cs-vote-btn--voted');
      undoBtn.hidden = false;
    }

    voteBtn.addEventListener('click', function () {
      if (hoveredChar && !hasVoted) castVote(hoveredChar);
    });

    undoBtn.addEventListener('click', undoVote);
  });

}());

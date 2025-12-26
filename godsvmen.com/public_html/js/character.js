// character.js
window.addEventListener("load", () => {
  /* === Data (8 characters) === */
  const characters = [
    {
      id: 1,
      name: "Aria Shadowblade",
      title: "The Swift Assassin",
      class: "Rogue",
      level: 45,
      description:
        "A master of stealth and precision, Aria moves through shadows like a whisper in the night. Her dual blades have ended countless battles before they even began.",
      stats: { strength: 65, agility: 95, intelligence: 70, vitality: 60 },
      abilities: ["Shadow Step", "Backstab", "Poison Mastery", "Evasion"],
      image:
        "https://images.unsplash.com/photo-1543844481-52e5d6b93760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      wins: 87,
      losses: 23,
      quote: "Silence is my ally, shadows are my weapon.",
      allies: ["Magnus Ironheart", "The Shadow Guild"],
      enemies: ["The Iron Fist Clan", "Lord Vex"],
    },
    {
      id: 2,
      name: "Magnus Ironheart",
      title: "The Unbreakable Shield",
      class: "Warrior",
      level: 50,
      description:
        "Born in the mountains of the north, Magnus stands as an immovable force on the battlefield. His legendary strength and unwavering courage inspire allies and terrify foes.",
      stats: { strength: 98, agility: 60, intelligence: 55, vitality: 95 },
      abilities: ["Berserker Rage", "Shield Bash", "War Cry", "Titan's Grip"],
      image:
        "https://images.unsplash.com/photo-1693921978742-c93c4a3e6172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      wins: 134,
      losses: 18,
      quote: "I stand unmoved, for I am the mountain that breaks the storm.",
      allies: ["Aria Shadowblade", "Theron Lightbringer"],
      enemies: ["The Dark Horde", "Draugr the Cursed"],
    },
    {
      id: 3,
      name: "Elara Moonwhisper",
      title: "The Arcane Prodigy",
      class: "Mage",
      level: 48,
      description:
        "Gifted with an innate connection to the arcane, Elara can bend reality itself to her will. Her mastery over the elements is matched only by her thirst for knowledge.",
      stats: { strength: 40, agility: 55, intelligence: 99, vitality: 65 },
      abilities: ["Fireball", "Arcane Barrier", "Teleport", "Time Slow"],
      image:
        "https://images.unsplash.com/photo-1600637453426-7c64826b19d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      wins: 96,
      losses: 31,
      quote: "Magic is not a tool, it is the language of the universe itself.",
      allies: ["The Arcane Council", "Theron Lightbringer"],
      enemies: ["The Void Cultists", "Malachar the Corrupted"],
    },
    {
      id: 4,
      name: "Theron Lightbringer",
      title: "The Holy Champion",
      class: "Paladin",
      level: 47,
      description:
        "Blessed by the divine light, Theron serves as both protector and healer. His faith is his strength, and his conviction turns darkness into radiant hope.",
      stats: { strength: 80, agility: 65, intelligence: 75, vitality: 90 },
      abilities: ["Divine Shield", "Holy Light", "Hammer of Justice", "Blessing of Kings"],
      image:
        "https://images.unsplash.com/photo-1734122373993-36745ac6b688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      wins: 112,
      losses: 15,
      quote: "Where darkness falls, I shall be the light that never fades.",
      allies: ["Magnus Ironheart", "Elara Moonwhisper"],
      enemies: ["The Undead Legion", "Necromancer Zalth"],
    },
    {
      id: 5,
      name: "Kael Stormrider",
      title: "Warden of the Gale",
      class: "Ranger",
      level: 44,
      description:
        "A hawk-eyed tracker who reads the wind like scripture. His arrows strike before thunder answers his call.",
      stats: { strength: 70, agility: 92, intelligence: 68, vitality: 62 },
      abilities: ["Gale Arrow", "Windstep", "Falcon Bond", "Briar Trap"],
      image:
        "https://images.unsplash.com/photo-1520975922325-24c0e4df4f36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      wins: 88,
      losses: 27,
      quote: "The wind speaks. I listen.",
      allies: ["Aria Shadowblade", "Lyra Dawnsong"],
      enemies: ["Blight Wolves", "The Ash Host"],
    },
    {
      id: 6,
      name: "Sylas Nightborn",
      title: "The Veilbinder",
      class: "Warlock",
      level: 49,
      description:
        "Pacts inked in moonless ink give Sylas dominion over shade and ember. His whispers turn courage into frost.",
      stats: { strength: 52, agility: 58, intelligence: 97, vitality: 72 },
      abilities: ["Soul Ember", "Void Lash", "Umbral Ward", "Hex of Silence"],
      image:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      wins: 121,
      losses: 33,
      quote: "Power is a door; I keep the keys.",
      allies: ["Elara Moonwhisper"],
      enemies: ["Inquisitors of Dawn", "Malachar the Corrupted"],
    },
    {
      id: 7,
      name: "Lyra Dawnsong",
      title: "The Starfated Bard",
      class: "Bard",
      level: 43,
      description:
        "Her voice threads hope into steel. Lyra’s songs bend morale and matter, turning desperate stands into legends.",
      stats: { strength: 50, agility: 72, intelligence: 88, vitality: 68 },
      abilities: ["Hymn of Valor", "Starlit Shield", "Dischord", "Encore"],
      image:
        "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      wins: 77,
      losses: 29,
      quote: "Sing the world you wish to see.",
      allies: ["Kael Stormrider", "Theron Lightbringer"],
      enemies: ["Silencers of Vohl", "The Void Cultists"],
    },
    {
      id: 8,
      name: "Brakka Stoneforge",
      title: "Breaker of Anvils",
      class: "Berserker",
      level: 51,
      description:
        "A living avalanche wrapped in iron rings. Brakka’s charge shatters lines; his laugh drowns the drums.",
      stats: { strength: 99, agility: 54, intelligence: 48, vitality: 98 },
      abilities: ["Fury Rush", "Earthsplitter", "Iron Stance", "Blood Roar"],
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      wins: 141,
      losses: 22,
      quote: "Hammer, meet problem.",
      allies: ["Magnus Ironheart"],
      enemies: ["Draugr the Cursed", "The Iron Fist Clan"],
    },
  ];

  /* === State === */
  let page = 0;
  let direction = 0;
  let autoplay = true;
  let timer = null;

  // --- Anti-Stacking / Animation Guard ---
  const ANIM_MS = 500; // fallback if your animation.js doesn't emit events
  let isAnimating = false;
  let pendingStep = 0; // coalesced steps queued during animation
  let animTimeout = null;

  // Optional external lock (if animation.js dispatches these)
  let lockUI = false;

  /* === DOM === */
  const mount = document.getElementById("cardMount");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicatorsWrap = document.getElementById("indicators");
  const autoplayBtn = document.getElementById("autoplayBtn");
  const yearEl = document.getElementById("year");

  /* === Helpers === */
  const clampIndex = (i) => (i + characters.length) % characters.length;

  function iconPlay() {
    return `<svg width="22" height="22" viewBox="0 0 24 24"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg>`;
  }
  function iconPause() {
    return `<svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/></svg>`;
  }

  function setAutoplayUI() {
    autoplayBtn.innerHTML = autoplay ? iconPause() : iconPlay();
    autoplayBtn.setAttribute("aria-label", autoplay ? "Pause autoplay" : "Play autoplay");
  }

  function startTimer() {
    stopTimer();
    if (!autoplay) return;
    timer = setInterval(() => {
      paginate(1);
    }, 8000);
  }
  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // --- Controls disable (and external locks) ---
  function setControlsDisabled(disabled) {
    lockUI = disabled;
    [prevBtn, nextBtn, autoplayBtn].forEach((btn) => {
      if (!btn) return;
      btn.disabled = disabled;
      btn.setAttribute("aria-disabled", String(disabled));
    });
    indicatorsWrap.querySelectorAll("button").forEach((b) => {
      b.disabled = disabled;
      b.setAttribute("aria-disabled", String(disabled));
    });
  }

  // Listen for animation lifecycle from your animation.js (if present)
  mount.addEventListener("card-anim-start", () => {
    isAnimating = true;
    clearTimeout(animTimeout);
    setControlsDisabled(true);
  });
  mount.addEventListener("card-anim-end", () => {
    isAnimating = false;
    setControlsDisabled(false);
    clearTimeout(animTimeout);
    flushPending(); // run any queued click(s)
  });

  // Fallback if no custom events are emitted
  function armAnimFallback() {
    isAnimating = true;
    clearTimeout(animTimeout);
    setControlsDisabled(true);
    animTimeout = setTimeout(() => {
      isAnimating = false;
      setControlsDisabled(false);
      flushPending();
    }, ANIM_MS);
  }

  function flushPending() {
    if (pendingStep !== 0 && !isAnimating && !lockUI) {
      const step = pendingStep;
      pendingStep = 0; // coalesce to one jump
      paginate(step); // will re-arm animation
    }
  }

  /* === Image fallback (plus inline onerror as backup) === */
  function ensureImageFallback() {
    const img = mount.querySelector(".ratio img");
    if (!img) return;
    const fallback = "/img/placeholders/portrait-3x4.jpg";

    img.onerror = () => {
      img.onerror = null;
      img.src = fallback;
    };
    if (img.complete && img.naturalWidth === 0) {
      img.src = fallback;
    } else if (!img.complete) {
      img.addEventListener(
        "load",
        () => {
          if (img.naturalWidth === 0) img.src = fallback;
        },
        { once: true }
      );
    }
  }

  /* === Card HTML === */
  function buildCharacterCardHTML(c) {
    return `
      <article class="card-hero row g-0">
        <div class="col-md-6">
          <div class="ratio ratio-3x4 position-relative">
            <img
              src="${c.image}"
              alt="${c.name} portrait"
              class="object-fit-cover"
              loading="lazy"
              decoding="async"
              referrerpolicy="no-referrer"
              onerror="this.onerror=null; this.src='/img/placeholders/portrait-3x4.jpg';"
            />
            <div class="scanline position-absolute top-0 start-0 end-0 bottom-0"></div>
          </div>
        </div>
        <div class="col-md-6 d-flex flex-column">
          <div class="h-100 p-4 p-md-5 info">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="badge bg-light text-dark">Lv. ${c.level} • ${c.class}</span>
              <span class="small text-light-70">${c.wins}W / ${c.losses}L</span>
            </div>
            <h3 class="h2 fw-bold text-shadow mb-1">${c.name}</h3>
            <p class="text-light-70 mb-3">${c.title}</p>
            <p class="mb-3">${c.description}</p>
            <blockquote class="fst-italic border-start ps-3 mb-4">“${c.quote}”</blockquote>
            <div class="row g-3 mb-4">
              ${Object.entries(c.stats)
                .map(
                  ([label, val]) => `
                  <div class="col-6">
                    <div class="small text-light-70">${label[0].toUpperCase() + label.slice(1)}</div>
                    <div class="progress bg-light"><div class="progress-bar" style="width:${val}%"></div></div>
                  </div>`
                )
                .join("")}
            </div>
            <div class="d-flex gap-2 flex-wrap">
              ${c.abilities
                .map(
                  (a) =>
                    `<span class="badge bg-primary-subtle text-white border border-light">${a}</span>`
                )
                .join("")}
            </div>
            <div class="mt-4 d-flex gap-2">
              <button class="btn btn-glass" data-id="${c.id}" data-bs-toggle="modal" data-bs-target="#charModal">Details</button>
            </div>
          </div>
        </div>
      </article>`;
  }

  /* === Modal population (fires every open) === */
  function initModalBinding() {
    const modalEl = document.getElementById("charModal");
    if (!modalEl) return;

    modalEl.addEventListener("show.bs.modal", () => {
      const m = characters[page];
      if (!m) return;

      const nameEl = document.getElementById("charModalLabel");
      const imgEl = document.getElementById("modalImg");
      const metaEl = document.getElementById("modalMeta");
      const descEl = document.getElementById("modalDesc");
      const abilEl = document.getElementById("modalAbilities");
      const allyEl = document.getElementById("modalAllies");
      const enemEl = document.getElementById("modalEnemies");

      if (nameEl) nameEl.textContent = m.name;
      if (imgEl) {
        imgEl.src = m.image;
        imgEl.alt = `${m.name} portrait`;
        imgEl.referrerPolicy = "no-referrer";
        imgEl.onerror = () => {
          imgEl.onerror = null;
          imgEl.src = "/img/placeholders/portrait-3x4.jpg";
        };
      }
      if (metaEl) metaEl.textContent = `${m.title} • Lv. ${m.level} ${m.class} • ${m.wins}W/${m.losses}L`;
      if (descEl) descEl.textContent = m.description || "";
      if (abilEl) abilEl.textContent = (m.abilities || []).join(", ") || "—";
      if (allyEl) allyEl.textContent = (m.allies || []).join(", ") || "—";
      if (enemEl) enemEl.textContent = (m.enemies || []).join(", ") || "—";
    });
  }

  /* === Render === */
  function renderCard() {
    const c = characters[page];
    const html = buildCharacterCardHTML(c);

    if (typeof window.swapCardHTML === "function") {
      // Assume swapCardHTML will dispatch card-anim-start/end OR we arm fallback
      window.swapCardHTML(html, direction || 1);
      // Fallback guard if no events come through
      armAnimFallback();
      requestAnimationFrame(() => {
        ensureImageFallback();
        updateIndicators();
      });
    } else {
      // No animation.js; still guard briefly to prevent spam stacking
      armAnimFallback();
      mount.innerHTML = html;
      ensureImageFallback();
      updateIndicators();
    }
  }

  function renderIndicators() {
    indicatorsWrap.innerHTML = "";
    characters.forEach((c, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn p-0 position-relative";
      btn.setAttribute("aria-label", `Go to ${c.name}`);
      btn.innerHTML = `<div class="indicator${idx === page ? " active" : ""}" data-idx="${idx}" title="${c.name}"></div>`;
      btn.addEventListener("click", () => {
        // If animating, coalesce jump
        if (isAnimating || lockUI) {
          pendingStep = (idx - page); // jump directly to target when safe
          return;
        }
        direction = idx > page ? 1 : -1;
        page = idx;
        renderCard();
        startTimer();
      });
      indicatorsWrap.appendChild(btn);
    });

    if (window.bootstrap && window.bootstrap.Tooltip) {
      const tooltipList = [].slice.call(indicatorsWrap.querySelectorAll("[title]"));
      tooltipList.forEach(
        (el) =>
          new bootstrap.Tooltip(el, { trigger: "hover", title: el.getAttribute("title") })
      );
    }
  }

  function updateIndicators() {
    indicatorsWrap.querySelectorAll(".indicator").forEach((el, idx) => {
      el.classList.toggle("active", idx === page);
    });
  }

  // --- Centralized paginate with anti-stacking + coalescing ---
  function paginate(step) {
    if (isAnimating || lockUI) {
      // Coalesce successive rapid clicks into a single net step
      pendingStep += step;
      // Keep within array length to avoid huge jumps (optional)
      if (pendingStep > characters.length) pendingStep = characters.length;
      if (pendingStep < -characters.length) pendingStep = -characters.length;
      return;
    }

    direction = Math.sign(step) || 1;
    page = clampIndex(page + step);
    renderCard();
  }

  /* === Events === */
  prevBtn.addEventListener("click", () => {
    paginate(-1);
    startTimer();
  });
  nextBtn.addEventListener("click", () => {
    paginate(1);
    startTimer();
  });

  autoplayBtn.addEventListener("click", () => {
    autoplay = !autoplay;
    setAutoplayUI();
    autoplay ? startTimer() : stopTimer();
  });

  /* === Init === */
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  setAutoplayUI();
  initModalBinding();
  renderCard();
  renderIndicators();
  startTimer();
});

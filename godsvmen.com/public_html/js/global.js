(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const escHtml = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const norm = (s) => String(s ?? "").trim().toLowerCase();

  const FILTER_BTN_CLASS = "btn btn-outline-secondary";
  const BIO_BTN_CLASS = "btn btn-sm btn-outline-secondary w-100";

  const isSwordsayersPage = () => window.location.pathname.includes("/swordsayers");

  // ─── Shared helpers ────────────────────────────────────────────────────────

  // Rebuilds a filter bar: keeps its "All" button, adds one button per value,
  // and calls onPick(value) when a button is pressed.
  const buildFilters = (filtersEl, values, label, onPick) => {
    const allBtn = filtersEl.querySelector('[data-filter="all"]');
    filtersEl.replaceChildren(...(allBtn ? [allBtn] : []));
    for (const v of values) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = FILTER_BTN_CLASS;
      b.dataset.filter = v;
      b.setAttribute("aria-pressed", "false");
      b.textContent = label(v);
      filtersEl.appendChild(b);
    }
    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      $$("button[data-filter]", filtersEl).forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      onPick(btn.dataset.filter || "all");
    });
  };

  // Opens an image in one of the page's lightbox modals.
  const showImage = (modalEl, title, src) => {
    if (!modalEl || typeof bootstrap === "undefined") return false;
    const img = modalEl.querySelector(".modal-body img");
    modalEl.querySelector(".modal-title").textContent = title;
    img.alt = title;
    img.src = src;
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
    return true;
  };

  // One click handler for every image trigger on the site.
  const initImageModals = () => {
    document.addEventListener("click", (e) => {
      const card = e.target.closest("#galleryGrid [data-open], #castGrid [data-open]");
      if (card) {
        const modalEl = card.closest("#galleryGrid") ? $("#galleryModal") : ($("#castModal") || $("#bracketModal"));
        showImage(modalEl, card.dataset.title || "", card.dataset.img || "");
        return;
      }
      const bracket = e.target.closest(".bracket-open");
      if (bracket) {
        showImage($("#bracketModal"), bracket.dataset.title || "", bracket.dataset.img || "");
        return;
      }
      const world = e.target.closest(".world-open");
      if (world && showImage($("#worldModal"), world.querySelector("img")?.alt || "World Image", world.getAttribute("href") || "")) {
        e.preventDefault();
      }
    });
    // Drop the large image when a modal closes so it doesn't linger in memory.
    $$(".modal .modal-body img").forEach((img) => {
      img.closest(".modal").addEventListener("hidden.bs.modal", () => img.removeAttribute("src"));
    });
  };

  // ─── Page features ─────────────────────────────────────────────────────────

  const initFooter = () => {
    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const backTop = $("#backToTop");
    if (!backTop) return;
    const onScroll = () => backTop.classList.toggle("d-none", window.scrollY < 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const initGallery = () => {
    const filtersEl = $("#galleryFilters");
    const gridEl = $("#galleryGrid");
    const data = window.GVM?.gallery || [];
    if (!filtersEl || !gridEl || !data.length) return;

    // An entry's char may list several names, e.g. "Grandle, Ignis".
    const charsOf = (it) => String(it.char || "").split(",").map((c) => c.trim()).filter(Boolean);
    const GRID_COL = "col-12 col-sm-6 col-lg-4";

    // A featured entry gets its own centered row under "All", and joins the grid when filtered.
    const layoutFeatured = (col, ownRow) => {
      const card = col.querySelector("article");
      col.className = ownRow ? "col-12" : GRID_COL;
      if (!ownRow) { col.replaceChildren(card); return; }
      const row = document.createElement("div");
      row.className = "row justify-content-center";
      const inner = document.createElement("div");
      inner.className = "col-12 col-sm-8 col-md-6 col-lg-5";
      inner.appendChild(card);
      row.appendChild(inner);
      col.replaceChildren(row);
    };

    gridEl.replaceChildren();
    for (const it of data) {
      const col = document.createElement("div");
      col.className = GRID_COL;
      col.dataset.char = charsOf(it).map(norm).join("|");
      if (it.featured) col.dataset.featured = "1";
      const dir = `img/${it.charArtYear}/`;
      const hasExt = /\.[a-z0-9]+$/i.test(it.charArtName || "");
      const src = dir + it.charArtName + (hasExt ? "" : ".png");
      const thumb = it.charArtThumb ? dir + it.charArtThumb : src;
      const title = it.charArtTitle || it.charArtName || it.char || "Art";
      col.innerHTML = `
        <article class="card h-100 shadow-sm overflow-hidden">
          <button type="button" class="p-0 border-0 bg-transparent text-start" data-open="1"
                  data-img="${escHtml(src)}" data-title="${escHtml(title)}" aria-label="Open ${escHtml(title)} full size">
            <img src="${escHtml(thumb)}" class="img-fluid w-100" alt="" loading="lazy" decoding="async">
          </button>
          <div class="card-body text-center">
            <h3 class="h6 mb-0">${escHtml(title)}</h3>
          </div>
        </article>`;
      gridEl.appendChild(col);
    }

    const apply = (filterVal) => {
      const f = norm(filterVal);
      $$("[data-char]", gridEl).forEach((col) => {
        col.classList.toggle("d-none", !(f === "all" || col.dataset.char.split("|").includes(f)));
      });
      $$("[data-featured]", gridEl).forEach((col) => layoutFeatured(col, f === "all"));
    };

    const chars = [...new Set(data.flatMap(charsOf))].sort((a, b) => a.localeCompare(b));
    buildFilters(filtersEl, chars, (c) => c, apply);
    apply("all");
  };

  const initCast = () => {
    const filtersEl = $("#castFilters");
    const gridEl = $("#castGrid");
    if (!gridEl || gridEl.children.length) return;

    const fighters = window.GVM?.fighters || [];
    const roster = isSwordsayersPage();
    let data;
    if (roster) {
      // Swordsayers: the tournament roster
      data = window.GVM?.ofighters?.length ? window.GVM.ofighters : fighters;
    } else {
      // Story pages: fighters whose stories list includes the grid's data-story
      const story = norm(gridEl.dataset.story);
      data = story ? fighters.filter((f) => (f.stories || []).map(norm).includes(story)) : [];
    }
    if (!data.length) return;

    for (const it of data) {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-lg-3";
      col.dataset.group = norm(it.filter);
      const title = it.fullname || it.name || "Fighter";
      const subtitle = [it.house, it.cityname].filter(Boolean).join(" • ");
      const stats = [["Job", it.job], ["Style", it.style], ["Weapon", it.weapon], ["Special", it.special], ["Personality", it.personality]]
        .filter(([, v]) => v)
        .map(([k, v]) => `<li><strong>${k}:</strong> ${escHtml(v)}</li>`)
        .join("");
      // Only the Swordsayers roster links to bio pages.
      const bio = roster && it.bio
        ? `<div class="mt-3"><a class="${BIO_BTN_CLASS}" href="${escHtml(it.bio)}">${escHtml(it.name)}'s Bio</a></div>`
        : "";
      col.innerHTML = `
        <article class="card h-100 shadow-sm overflow-hidden">
          <button type="button" class="p-0 border-0 bg-transparent text-start" data-open="1"
                  data-img="${escHtml(it.img || "")}" data-title="${escHtml(title)}" aria-label="Open ${escHtml(title)} full size">
            <img src="${escHtml(it.img || "")}" class="img-fluid w-100" alt="" loading="lazy" decoding="async">
          </button>
          <div class="card-body">
            <h3 class="h5 mb-1">${escHtml(title)}</h3>
            ${subtitle ? `<p class="mb-2 text-muted small">${escHtml(subtitle)}</p>` : ""}
            <ul class="list-unstyled mb-0 small">${stats}</ul>
            ${bio}
          </div>
        </article>`;
      gridEl.appendChild(col);
    }

    // Filters are optional; story casts have none.
    if (filtersEl) {
      const groups = [...new Set(data.map((x) => (x.filter || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
      buildFilters(filtersEl, groups, (g) => g.toUpperCase(), (filterVal) => {
        const f = norm(filterVal);
        $$("[data-group]", gridEl).forEach((col) => {
          col.classList.toggle("d-none", !(f === "all" || col.dataset.group.includes(f)));
        });
      });
    }
  };

  // Round-page quote cards: the caret button swaps the first and second half of the quote.
  const initCharToggle = () => {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".nuest");
      if (!btn) return;
      const card = btn.closest(".char_wrap") || btn.parentElement;
      const expand = card.classList.toggle("is-expanded");
      btn.setAttribute("aria-expanded", String(expand));
      btn.setAttribute("aria-label", expand ? "Show the start of the quote" : "Show the rest of the quote");
    });
  };

  const initContact = () => {
    const el = $("#site-contact");
    if (el && window.GVM?.contact) el.outerHTML = window.GVM.contact;
  };

  const boot = () => {
    initContact();
    initFooter();
    initGallery();
    initCast();
    initImageModals();
    initCharToggle();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();

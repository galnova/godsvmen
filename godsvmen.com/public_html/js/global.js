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

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const backTop = $("#backToTop");
  if (backTop) {
    const onScroll = () => backTop.classList.toggle("d-none", window.scrollY < 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const FILTER_BTN_CLASS = "btn btn-outline-secondary";
  const BIO_BTN_CLASS = "btn btn-sm btn-outline-secondary w-100";

  const initGallery = () => {
    const filtersEl = $("#galleryFilters");
    const gridEl = $("#galleryGrid");
    const modalEl = $("#galleryModal");
    const modalTitleEl = $("#galleryModalTitle");
    const modalImgEl = $("#galleryModalImg");

    if (!filtersEl || !gridEl) return;
    const data = (window.GVM && Array.isArray(window.GVM.gallery)) ? window.GVM.gallery : [];
    if (!data.length) return;

    const chars = Array.from(new Set(data.map((x) => (x.char || "").trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));

    const allBtn = filtersEl.querySelector('[data-filter="all"]');
    filtersEl.innerHTML = "";
    if (allBtn) filtersEl.appendChild(allBtn);

    for (const c of chars) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = FILTER_BTN_CLASS;
      b.dataset.filter = c;
      b.setAttribute("aria-pressed", "false");
      b.textContent = c;
      filtersEl.appendChild(b);
    }

    gridEl.innerHTML = "";
    for (const it of data) {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-lg-4";
      col.dataset.char = norm(it.char);
      const base = `img/${it.charArtYear}/${it.charArtName}`;
      const hasExt = /\.[a-z0-9]+$/i.test(it.charArtName || "");
      const src = hasExt ? base : `${base}.png`;
      const title = it.charArtTitle || it.charArtName || it.char || "Art";
      col.innerHTML = `
        <article class="card h-100 shadow-sm overflow-hidden">
          <button type="button" class="p-0 border-0 bg-transparent text-start" data-open="1"
                  data-img="${escHtml(src)}" data-title="${escHtml(title)}" aria-label="Open ${escHtml(title)}">
            <img src="${escHtml(src)}" class="img-fluid w-100" alt="${escHtml(title)}" loading="lazy" decoding="async">
          </button>
          <div class="card-body text-center">
            <h3 class="h6 mb-0">${escHtml(title)}</h3>
          </div>
        </article>`;
      gridEl.appendChild(col);
    }

    const setActive = (btn) => {
      $$("#galleryFilters .btn").forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
    };

    const apply = (filterVal) => {
      const f = norm(filterVal);
      $$("[data-char]", gridEl).forEach((card) => {
        card.classList.toggle("d-none", !(f === "all" || norm(card.dataset.char) === f));
      });
    };

    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      setActive(btn);
      apply(btn.dataset.filter || "all");
    });

    apply("all");

    if (modalEl && modalTitleEl && modalImgEl && typeof bootstrap !== "undefined") {
      const modal = new bootstrap.Modal(modalEl, { focus: true });
      gridEl.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-open='1']");
        if (!btn) return;
        modalTitleEl.textContent = btn.getAttribute("data-title") || "";
        modalImgEl.alt = btn.getAttribute("data-title") || "";
        modalImgEl.src = btn.getAttribute("data-img") || "";
        modal.show();
      });
      modalEl.addEventListener("hidden.bs.modal", () => { modalImgEl.removeAttribute("src"); });
    }
  };

  const initCast = () => {
    const filtersEl = $("#castFilters");
    const gridEl = $("#castGrid");
    const modalEl = $("#castModal") || $("#bracketModal");
    const modalTitleEl = modalEl ? modalEl.querySelector(".modal-title") : null;
    const modalImgEl = modalEl ? modalEl.querySelector(".modal-body img") : null;

    if (!filtersEl || !gridEl) return;
    if (gridEl.children.length > 0) return;

    const data = (window.GVM && Array.isArray(window.GVM.ofighters) && window.GVM.ofighters.length)
      ? window.GVM.ofighters
      : ((window.GVM && Array.isArray(window.GVM.fighters)) ? window.GVM.fighters : []);
    if (!data.length) return;

    const isLiFilter = filtersEl.tagName === "UL" || filtersEl.tagName === "OL";

    if (!isLiFilter) {
      const groups = Array.from(new Set(data.map((x) => (x.filter || "").trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));
      const allBtn = filtersEl.querySelector('[data-filter="all"]');
      filtersEl.innerHTML = "";
      if (allBtn) filtersEl.appendChild(allBtn);
      for (const g of groups) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = FILTER_BTN_CLASS;
        b.dataset.filter = g;
        b.setAttribute("aria-pressed", "false");
        b.textContent = g.toUpperCase();
        filtersEl.appendChild(b);
      }
    }

    for (const it of data) {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-lg-3";
      col.dataset.group = norm(it.filter);
      const title = it.fullname || it.name || "Fighter";
      const subtitle = [it.house, it.cityname].filter(Boolean).join(" • ");
      col.innerHTML = `
        <article class="card h-100 shadow-sm overflow-hidden">
          <button type="button" class="p-0 border-0 bg-transparent text-start" data-open="1"
                  data-img="${escHtml(it.img || "")}" data-title="${escHtml(title)}" aria-label="Open ${escHtml(title)}">
            <img src="${escHtml(it.img || "")}" class="img-fluid w-100" alt="${escHtml(title)}" loading="lazy" decoding="async">
          </button>
          <div class="card-body">
            <h3 class="h5 mb-1">${escHtml(title)}</h3>
            ${subtitle ? `<p class="mb-2 text-muted small">${escHtml(subtitle)}</p>` : ""}
            <ul class="list-unstyled mb-0 small">
              ${it.job        ? `<li><strong>Job:</strong> ${escHtml(it.job)}</li>` : ""}
              ${it.style      ? `<li><strong>Style:</strong> ${escHtml(it.style)}</li>` : ""}
              ${it.weapon     ? `<li><strong>Weapon:</strong> ${escHtml(it.weapon)}</li>` : ""}
              ${it.special    ? `<li><strong>Special:</strong> ${escHtml(it.special)}</li>` : ""}
              ${it.personality? `<li><strong>Personality:</strong> ${escHtml(it.personality)}</li>` : ""}
            </ul>
            ${it.bio ? `<div class="mt-3"><a class="${BIO_BTN_CLASS}" href="${escHtml(it.bio)}">${escHtml(it.name)}'s Bio</a></div>` : ""}
          </div>
        </article>`;
      gridEl.appendChild(col);
    }

    const applyFilter = (filterVal) => {
      const f = norm(filterVal);
      $$("[data-group]", gridEl).forEach((card) => {
        const g = norm(card.dataset.group);
        card.classList.toggle("d-none", !(f === "all" || g === f || g.indexOf(f) !== -1));
      });
    };

    if (isLiFilter) {
      filtersEl.addEventListener("click", (e) => {
        const li = e.target.closest("li[data-filter]");
        if (!li) return;
        $$("li", filtersEl).forEach((el) => el.classList.remove("filter-active"));
        li.classList.add("filter-active");
        applyFilter(li.dataset.filter || "all");
      });
    } else {
      filtersEl.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-filter]");
        if (!btn) return;
        $$("#castFilters .btn").forEach((b) => {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        applyFilter(btn.dataset.filter || "all");
      });
    }

    applyFilter("all");

    if (modalEl && modalTitleEl && modalImgEl && typeof bootstrap !== "undefined") {
      const modal = new bootstrap.Modal(modalEl, { focus: true });
      gridEl.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-open='1']");
        if (!btn) return;
        modalTitleEl.textContent = btn.getAttribute("data-title") || "";
        modalImgEl.alt = btn.getAttribute("data-title") || "";
        modalImgEl.src = btn.getAttribute("data-img") || "";
        modal.show();
      });
      modalEl.addEventListener("hidden.bs.modal", () => { modalImgEl.removeAttribute("src"); });
    }
  };

  const initWorldModal = () => {
    const modalEl = $("#worldModal");
    const modalTitleEl = $("#worldModalTitle");
    const modalImgEl = $("#worldModalImg");
    if (!modalEl || !modalTitleEl || !modalImgEl || typeof bootstrap === "undefined") return;
    const modal = new bootstrap.Modal(modalEl, { focus: true });
    document.addEventListener("click", (e) => {
      const link = e.target.closest(".world-open");
      if (!link) return;
      e.preventDefault();
      const imgSrc = link.getAttribute("href") || "";
      const img = link.querySelector("img");
      const title = img?.alt || "World Image";
      modalTitleEl.textContent = title;
      modalImgEl.alt = title;
      modalImgEl.src = imgSrc;
      modal.show();
    });
    modalEl.addEventListener("hidden.bs.modal", () => { modalImgEl.removeAttribute("src"); });
  };

  const initBracketModal = () => {
    const modalEl = $("#bracketModal");
    const modalTitleEl = $("#bracketModalTitle");
    const modalImgEl = $("#bracketModalImg");
    if (!modalEl || !modalTitleEl || !modalImgEl || typeof bootstrap === "undefined") return;
    const modal = new bootstrap.Modal(modalEl, { focus: true });
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".bracket-open");
      if (!btn) return;
      const title = btn.getAttribute("data-title") || "";
      modalTitleEl.textContent = title;
      modalImgEl.alt = title;
      modalImgEl.src = btn.getAttribute("data-img") || "";
      modal.show();
    });
    modalEl.addEventListener("hidden.bs.modal", () => { modalImgEl.removeAttribute("src"); });
  };

  const initMegamenu = () => {
    const toggle = document.getElementById("tournDropdown");
    const menu = document.getElementById("swordsMegamenu");
    const header = document.getElementById("header");
    if (!toggle || !menu || !header) return;

    const isDesktop = () => window.innerWidth >= 992;

    const positionMenu = () => {
      const r = header.getBoundingClientRect();
      menu.style.cssText =
        "position:fixed !important;" +
        "top:" + r.bottom + "px !important;" +
        "left:0 !important;" +
        "width:100vw !important;" +
        "max-height:" + (window.innerHeight - r.bottom - 16) + "px !important;" +
        "overflow-y:auto !important;" +
        "z-index:1055 !important;" +
        "border-radius:0 !important;" +
        "border-left:none !important;" +
        "border-right:none !important;" +
        "border-top:solid 3px var(--gvm-primary) !important;" +
        "border-bottom:solid 3px #999 !important;" +
        "transform:none !important;";
    };

    const resetMenu = () => { menu.style.cssText = ""; };

    toggle.addEventListener("shown.bs.dropdown", () => { if (isDesktop()) positionMenu(); });
    toggle.addEventListener("hidden.bs.dropdown", () => { resetMenu(); });
    window.addEventListener("resize", () => {
      if (menu.classList.contains("show")) {
        if (isDesktop()) positionMenu(); else resetMenu();
      }
    }, { passive: true });
  };

  const boot = () => {
    initGallery();
    initCast();
    initWorldModal();
    initBracketModal();
    initMegamenu();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
// animation.js (ES Module)
import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

if (!window.Motion) window.Motion = { animate };
const { animate: motionAnimate } = window.Motion;
const mount = document.getElementById("cardMount");

// ambient background (optional)
function initBackgroundLoops() {
  try {
    motionAnimate(".blob-a", { rotate: [0, 90, 0], scale: [1, 1.2, 1] }, { duration: 20, repeat: Infinity, easing: "linear" });
    motionAnimate(".blob-b", { rotate: [90, 0, 90], scale: [1.2, 1, 1.2] }, { duration: 25, repeat: Infinity, easing: "linear" });
  } catch (_) {}
}

function enhanceCardAnimations(rootEl) {
  if (!rootEl) return;
  const hero = rootEl.querySelector(".card-hero") || rootEl.closest?.(".card-hero");
  if (hero) {
    motionAnimate(
      hero,
      { boxShadow: ["0 0 20px rgba(59,130,246,.5)", "0 0 30px rgba(168,85,247,.5)", "0 0 20px rgba(59,130,246,.5)"] },
      { duration: 2, repeat: Infinity, easing: "ease-in-out" }
    );
  }
  const scan = rootEl.querySelector(".scanline");
  if (scan) {
    motionAnimate(scan, { y: ["-100%", "200%"] }, { duration: 3, repeat: Infinity, easing: "linear" });
  }
}

// smooth slide without spring (prevents end "snap")
const EASE_OUT = "cubic-bezier(0.22,1,0.36,1)"; // quint-ish

function slideOut(el, dir) {
  return motionAnimate(
    el,
    { transform: [`translateX(0)`, `translateX(${dir < 0 ? 100 : -100}%)`], opacity: [1, 0] },
    { duration: 0.45, easing: EASE_OUT }
  ).finished;
}

function slideIn(el, dir) {
  // force a layout flush before animating to avoid a late jump
  el.style.transform = `translateX(${dir > 0 ? 100 : -100}%)`;
  el.style.opacity = "0";
  el.getBoundingClientRect(); // sync layout
  return motionAnimate(
    el,
    { transform: [`translateX(${dir > 0 ? 100 : -100}%)`, `translateX(0)`], opacity: [0, 1] },
    { duration: 0.45, easing: EASE_OUT }
  ).finished;
}

// Public API used by character.js
export async function swapCardHTML(nextHTML, direction = 1) {
  if (!mount) return;

  const current = mount.firstElementChild;

  // ENTER wrapper pinned to the stage (prevents layout shift at the end)
  const wrapper = document.createElement("div");
  wrapper.className = "character-card position-absolute w-100";
  wrapper.style.top = "0";
  wrapper.style.left = "0";
  wrapper.style.right = "0";
  wrapper.innerHTML = nextHTML;
  mount.appendChild(wrapper);

  // run ambient effects on the new card
  enhanceCardAnimations(wrapper);

  // animate both without overlapping snaps
  if (current) {
    await Promise.allSettled([slideOut(current, direction), slideIn(wrapper, direction)]);
    current.remove();
  } else {
    await slideIn(wrapper, direction);
  }
}

// Also attach to window for non-module caller convenience
window.swapCardHTML = swapCardHTML;

window.addEventListener("DOMContentLoaded", () => {
  initBackgroundLoops();
  // optional: listen for custom events if needed later
});

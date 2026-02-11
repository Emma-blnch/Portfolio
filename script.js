// --------> Ralentir vitesse de video background de section contacts (bas de page)
document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("bg-video");
    if (video) {
        video.playbackRate = 0.7;
    }
});

// --------> Toggle light/dark
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("dark-mode-toggle");
  const html = document.documentElement; // <html>

  // init depuis localStorage
  const saved = localStorage.getItem("theme");
  if (saved === "dark") html.classList.add("dark");

  toggle?.addEventListener("click", () => {
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateLogo();
  });
});

// --------> Changer img preview projet au hover + cacher quand pas hover
document.addEventListener("DOMContentLoaded", () => {
  const previewImg = document.getElementById("projectPreview");
  const links = document.querySelectorAll(".project-link");
  const list = document.querySelector("#projets .projets-right ul");

  if (!previewImg || links.length === 0) return;

  let currentSrc = "";
  let hideTimeout = null;

  function showPreview(src) {
    if (!src) return;

    // si un hide est prévu, on l'annule
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }

    // si c'est déjà la même image, on garde juste visible
    if (src === currentSrc) {
      previewImg.classList.remove("opacity-0");
      previewImg.classList.add("opacity-100");
      return;
    }

    currentSrc = src;

    // fade out rapide si image déjà visible
    previewImg.classList.add("opacity-0");

    // swap + fade in
    window.setTimeout(() => {
      previewImg.src = src;
      previewImg.classList.remove("opacity-0");
      previewImg.classList.remove("hidden");
      previewImg.classList.add("opacity-100");
    }, 180);
  }

  function hidePreview() {
    // fade out
    previewImg.classList.remove("opacity-100");
    previewImg.classList.add("opacity-0");

    // après la transition, on enlève le src => "aucune image"
    hideTimeout = window.setTimeout(() => {
      currentSrc = "";
      hideTimeout = null;
    }, 300);
  }

  links.forEach((a) => {
    a.addEventListener("mouseenter", () => showPreview(a.dataset.preview));
    a.addEventListener("focus", () => showPreview(a.dataset.preview));
  });

  // quand on quitte la liste entière, on cache l'image
  if (list) {
    list.addEventListener("mouseleave", hidePreview);

    // clavier : si focus sort de la liste
    list.addEventListener("focusout", (e) => {
      if (!list.contains(e.relatedTarget)) hidePreview();
    });
  }
});

// --------> Switch langue (redirige vers une autre page)
document.addEventListener("DOMContentLoaded", () => {
  const langBtns = document.querySelectorAll("[data-lang-href]");
  langBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const href = btn.getAttribute("data-lang-href");
      if (href) window.location.href = href;
    });
  });
});

// --------> Menu mobile (burger)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menu-toggle");
  const icon = document.getElementById("menu-icon");
  const menu = document.getElementById("mobile-menu");

  if (!btn || !icon || !menu) return;

  const burgerSVG = `
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"
        fill="currentColor"/>
    </svg>
  `;

  const closeSVG = `
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;

  // couleur pilotée par CSS (currentColor)
  btn.classList.add("text-portfolio-black");
  icon.innerHTML = burgerSVG;

  function openMenu() {
    menu.classList.remove("hidden");
    icon.innerHTML = closeSVG;
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Fermer le menu");
  }

  function closeMenu() {
    menu.classList.add("hidden");
    icon.innerHTML = burgerSVG;
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Ouvrir le menu");
  }

  function toggleMenu() {
    const isOpen = !menu.classList.contains("hidden");
    isOpen ? closeMenu() : openMenu();
  }

  btn.addEventListener("click", toggleMenu);

  menu.querySelectorAll("a[data-target]").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    const isOpen = !menu.classList.contains("hidden");
    if (!isOpen) return;
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  const mobileDark = document.getElementById("mobile-dark-toggle");
  mobileDark?.addEventListener("click", () => {
    document.getElementById("dark-mode-toggle")?.click();
  });
});

// Script pour formulaire contact php
document.addEventListener("DOMContentLoaded", () => {
  const ts = document.getElementById("ts");
  if (ts) ts.value = Math.floor(Date.now() / 1000);
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const ts = document.getElementById("ts");

  if (ts) ts.value = Math.floor(Date.now() / 1000);
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // reset message
    if (statusEl) {
      statusEl.classList.remove("hidden");
      statusEl.textContent = "";
    }

    const formData = new FormData(form);

    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data && data.ok) {
        if (statusEl) statusEl.textContent = "Message envoyé ✅ Je reviens vers vous rapidement.";
        form.reset();
        if (ts) ts.value = Math.floor(Date.now() / 1000); // nouveau ts après reset
      } else {
        const msg = (data && data.error) ? data.error : "Erreur lors de l’envoi.";
        if (statusEl) statusEl.textContent = msg;
      }
    } catch (err) {
      if (statusEl) statusEl.textContent = "Impossible d’envoyer le message (réseau).";
    }
  });
});

// --------> Reveal on scroll (animations d’apparition)
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("[data-animate]");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const delay = el.getAttribute("data-delay") || "0ms";
        el.style.transitionDelay = delay;

        el.classList.add("reveal--in");
        observer.unobserve(el);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
});

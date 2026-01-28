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
  const logo = document.getElementById("logo");

  // init depuis localStorage
  const saved = localStorage.getItem("theme");
  if (saved === "dark") html.classList.add("dark");

  function updateLogo() {
    if (!logo) return;
    const isDark = html.classList.contains("dark");
    logo.src = isDark ? "assets/img/logo/EB_Logo-light.png" : "assets/img/logo/EB_Logo-dark.png";
  }

  updateLogo();

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

// --------> Changer langue (desktop + mobile)
document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll("[data-lang-toggle]");
  const supported = ["fr", "en"];

  function getByPath(obj, path) {
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  }

  async function loadLocale(lang) {
    const res = await fetch(`./locales/${lang}.json`, { cache: "no-store" });
    if (!res.ok) throw new Error("Locale not found");
    return res.json();
  }

  async function applyLang(lang) {
    const dict = await loadLocale(lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = getByPath(dict, key);
      if (typeof value === "string") el.textContent = value;
    });

    // Traduire les placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const value = getByPath(dict, key);
      if (typeof value === "string") el.setAttribute("placeholder", value);
    });

    // mettre à jour TOUS les boutons (desktop + mobile)
    langButtons.forEach((b) => {
      b.textContent = lang === "fr" ? "EN" : "FR";
    });

    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }

  // init
  const saved = localStorage.getItem("lang");
  const browser = (navigator.language || "fr").startsWith("en") ? "en" : "fr";
  const initLang = supported.includes(saved) ? saved : browser;

  applyLang(initLang).catch(() => applyLang("fr"));

  // toggle (sur tous les boutons)
  langButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // évite que ton handler de nav li interfère
      const current = localStorage.getItem("lang") || initLang;
      const next = current === "fr" ? "en" : "fr";
      applyLang(next);
    });
  });
});

// --------> Menu mobile (burger)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menu-toggle");
  const icon = document.getElementById("menu-icon");
  const menu = document.getElementById("mobile-menu");

  if (!btn || !icon || !menu) return;

  function openMenu() {
    menu.classList.remove("hidden");
    icon.textContent = "✕";
    btn.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.classList.add("hidden");
    icon.textContent = "☰";
    btn.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = !menu.classList.contains("hidden");
    isOpen ? closeMenu() : openMenu();
  }

  btn.addEventListener("click", toggleMenu);

  // Fermer si clic sur un item
  menu.querySelectorAll("a[data-target]").forEach((li) => {
    li.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Fermer si on clique en dehors
  document.addEventListener("click", (e) => {
    const isOpen = !menu.classList.contains("hidden");
    if (!isOpen) return;
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    closeMenu();
  });

  // Fermer avec Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Optionnel : relier les boutons mobile à tes toggles existants
  const mobileDark = document.getElementById("mobile-dark-toggle");
  const mobileLang = document.getElementById("mobile-lang-toggle");

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
      const res = await fetch("./contact.php", {
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

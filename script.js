// --------> Animation pour amener au bon endroit de la page selon click sur menu
document.addEventListener("DOMContentLoaded", function() {
    // Correspondance entre les textes du menu et les IDs des sections
    const sectionMapping = {
        "Accueil": "accueil",
        "Projets": "projets",
        "À propos": "about",
        "Skills": "skills",
        "Contact": "contact"
    };
    
    // Sélectionne tous les liens du menu
    const menuLinks = document.querySelectorAll("nav ul li");

    menuLinks.forEach(link => {
        link.addEventListener("click", function() {
            const sectionId = sectionMapping[this.textContent.trim()]; // Trouve l'ID correspondant
            
            if (sectionId) {
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 50, // Ajuste le scroll pour tenir compte du menu fixe
                        behavior: "smooth"
                    });
                }
            }
        });
    });
});

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

// --------> Changer langue
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("lang-toggle");
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

    // bouton affiche la langue vers laquelle on switch
    if (btn) btn.textContent = lang === "fr" ? "EN" : "FR";

    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }

  // init
  const saved = localStorage.getItem("lang");
  const browser = (navigator.language || "fr").startsWith("en") ? "en" : "fr";
  const lang = supported.includes(saved) ? saved : browser;

  applyLang(lang).catch(() => applyLang("fr"));

  // toggle
  btn?.addEventListener("click", () => {
    const current = localStorage.getItem("lang") || lang;
    const next = current === "fr" ? "en" : "fr";
    applyLang(next);
  });
});

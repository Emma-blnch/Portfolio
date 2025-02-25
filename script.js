// --------> Animation pour amener au bon endroit de la page selon click sur menu
document.addEventListener("DOMContentLoaded", function() {
    // Correspondance entre les textes du menu et les IDs des sections
    const sectionMapping = {
        "Accueil": "accueil",
        "Projets": "projets",
        "À propos": "about",
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

// // --------> Animation cercle de statistiques
document.addEventListener("DOMContentLoaded", function() {
    // Liste des stats à afficher dans le cercle
    const statsData = [
        { value: "15+", label: "Projets réalisés" },
        { value: "300+", label: "Commits Git" },
        { value: "6+", label: "Langages maîtrisés" }
    ];

    let currentIndex = 0;
    const statCircle = document.getElementById("stat-circle");
    const dotsContainer = document.querySelector(".stat-dots");
    let autoScrollInterval;

    function startAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % statsData.length;
            updateStat(nextIndex);
        }, 5000);
    }

    // Création des points si non présents
    dotsContainer.innerHTML = "";
    statsData.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("stat-dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            updateStat(index);
            startAutoScroll(); // Réinitialise le timer après un clic
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll(".stat-dot");

    function updateStat(index) {
        if (index === currentIndex) return; // Évite les répétitions

        const nextValue = statsData[index].value;
        const nextLabel = statsData[index].label;

        // Création d'un conteneur pour l'effet de glissement
        const statContainer = document.createElement("div");
        statContainer.style.display = "flex";
        statContainer.style.position = "absolute";
        statContainer.style.width = "200%";
        statContainer.style.left = "0";
        statContainer.style.transition = "transform 0.8s ease-in-out";

        const currentStat = document.createElement("div");
        currentStat.innerHTML = `<span style="font-family: 'matter-bold'; font-size: 2rem;">${statsData[currentIndex].value}</span><p>${statsData[currentIndex].label}</p>`;
        currentStat.style.flex = "1";
        currentStat.style.textAlign = "center";

        const nextStat = document.createElement("div");
        nextStat.innerHTML = `<span style="font-family: 'matter-bold'; font-size: 2rem;">${nextValue}</span><p>${nextLabel}</p>`;
        nextStat.style.flex = "1";
        nextStat.style.textAlign = "center";

        statContainer.appendChild(currentStat);
        statContainer.appendChild(nextStat);

        // On vide le cercle AVANT l'animation pour éviter la réapparition de la première stat
        statCircle.innerHTML = "";
        statCircle.appendChild(statContainer);
        statCircle.appendChild(dotsContainer); // On garde les points visibles

        // Déclenche l'animation de glissement fluide
        setTimeout(() => {
            statContainer.style.transform = "translateX(-50%)";
        }, 50);

        // Attendre la fin de l'animation avant de mettre à jour
        setTimeout(() => {
            statCircle.innerHTML = `
                <span id="stat-value" style="font-family: 'matter-bold'; font-size: 2rem;">${nextValue}</span>
                <p id="stat-label">${nextLabel}</p>
            `;
            statCircle.appendChild(dotsContainer); // Réintègre les points après mise à jour
        }, 800);

        // Met à jour les points actifs
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        currentIndex = index;
    }

    // Démarrer l'auto-scroll
    startAutoScroll();

    // Initialisation
    updateStat(0);

    // Ajout du mode sombre avec changement d'icône et logo
    const toggleDarkMode = document.getElementById("dark-mode-toggle");
    const darkModeIcon = document.querySelector("#dark-mode-toggle img");
    const logo = document.getElementById("logo");
    let isDarkMode = false;

    toggleDarkMode.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        isDarkMode = !isDarkMode;
        darkModeIcon.src = isDarkMode ? "assets/img/light-mode-modified.png" : "assets/img/dark-mode.png";
        logo.src = isDarkMode ? "assets/img/EB_Logo-light.png" : "assets/img/EB_Logo-dark.png"; // Changer le logo
    });
});

// document.addEventListener("DOMContentLoaded", function() {
//     const menuToggle = document.getElementById("menu-toggle");
//     const navMenu = document.querySelector("nav ul");

//     menuToggle.addEventListener("click", function() {
//         navMenu.classList.toggle("active");
//     });
// });

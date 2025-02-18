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

// --------> Animation cercle de statistiques
document.addEventListener("DOMContentLoaded", function() {
    // Liste des stats à afficher dans le cercle
    const statsData = [
        { value: "254K", label: "Nombre total de lignes de code écrites" },
        { value: "15+", label: "Projets réalisés" },
        { value: "2", label: "Clients satisfaits" }
    ];

    let currentIndex = 0;
    const statValue = document.getElementById("stat-value");
    const statLabel = document.getElementById("stat-label");
    const dotsContainer = document.querySelector(".stat-dots");

    // Création des points si non présents dans le HTML
    dotsContainer.innerHTML = "";
    statsData.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("stat-dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            updateStat(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll(".stat-dot");

    function updateStat(index) {
        if (index === currentIndex) return; // Évite les répétitions
        
        // Ajoute l'animation de transition
        statValue.style.transition = "transform 0.8s ease, opacity 0.8s ease";
        statLabel.style.transition = "transform 0.8s ease, opacity 0.8s ease";
        statValue.style.transform = "translateX(100%)";
        statLabel.style.transform = "translateX(100%)";
        statValue.style.opacity = "0";
        statLabel.style.opacity = "0";

        setTimeout(() => {
            currentIndex = index;
            statValue.textContent = statsData[index].value;
            
            statValue.style.transform = "translateX(-100%)";
            statLabel.style.transform = "translateX(-100%)";

            setTimeout(() => {
                statValue.style.transform = "translateX(0)";
                statLabel.style.transform = "translateX(0)";
                statValue.style.opacity = "1";
                statLabel.style.opacity = "1";
            }, 200);
        }, 200);

        // Met à jour les points actifs
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    // Auto-scroll toutes les 4 secondes
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % statsData.length;
        updateStat(nextIndex);
    }, 4000);

    // Initialisation
    updateStat(0);
});

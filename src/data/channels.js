export const channels = [
  {
    id: 'trainlytics',
    label: 'Trainlytics',
    category: 'App Mobile · Co-fondatrice',
    color: 'linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)',
    description:
      "Application mobile de suivi d'entraînement sportif. Co-fondée et développée de zéro : interface athlète, suivi de séances, tableau de bord coach, synchronisation temps réel.",
    tech: ['React Native', 'TypeScript', 'Expo', 'Supabase'],
    links: { github: 'https://github.com/Emma-blnch', demo: null },
    image: null,
    icon: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="5,52 22,30 38,40 57,16 75,22"
        stroke="rgba(255,255,255,0.92)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="57" cy="16" r="5.5" fill="white"/>
      <circle cx="22" cy="30" r="3.5" fill="rgba(255,255,255,0.55)"/>
      <line x1="5" y1="57" x2="75" y2="57" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
    </svg>`,
  },
  {
    id: 'singula',
    label: 'Singulã',
    category: 'Site web · Sophrologie',
    color: 'linear-gradient(135deg, #6a0dad 0%, #c77dff 100%)',
    description:
      "Création complète du site web d'un cabinet de sophrologie. Design épuré, responsive, accessible, formulaire de contact sécurisé, optimisation SEO.",
    tech: ['PHP', 'HTML', 'Tailwind CSS'],
    links: { github: null, demo: 'https://www.singula-sophrologie.fr/' },
    image: '/assets/img/projects/preview-singula.webp',
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="26" stroke="rgba(255,255,255,0.75)" stroke-width="4" fill="rgba(255,255,255,0.07)"/>
      <path d="M40 17 C54 22 60 31 58 40 C56 51 47 59 40 63 C33 59 24 51 22 40 C20 31 26 22 40 17Z"
        stroke="rgba(255,255,255,0.45)" stroke-width="2.5" fill="none"/>
      <circle cx="40" cy="40" r="7" fill="rgba(255,255,255,0.85)"/>
    </svg>`,
  },
  {
    id: 'cub3d',
    label: 'cub3D',
    category: 'Jeu vidéo · C · 42 Paris',
    color: 'linear-gradient(135deg, #1a1a2e 0%, #c34a00 100%)',
    description:
      "Moteur de rendu 3D en raycasting inspiré de Wolfenstein 3D, développé entièrement en C. Gestion des textures de murs, sprites, collisions, parsing de carte.",
    tech: ['C', 'MiniLibX', 'Raycasting', 'Git'],
    links: { github: 'https://github.com/Emma-blnch/cub3D', demo: null },
    image: '/assets/img/projects/preview-cub3d.webp',
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="40,10 68,26 68,58 40,74 12,58 12,26"
        stroke="rgba(220,100,20,0.9)" stroke-width="3.5" fill="rgba(220,100,20,0.07)"/>
      <line x1="40" y1="10" x2="40" y2="42" stroke="rgba(220,100,20,0.75)" stroke-width="3"/>
      <line x1="12" y1="26" x2="40" y2="42" stroke="rgba(220,100,20,0.75)" stroke-width="3"/>
      <line x1="68" y1="26" x2="40" y2="42" stroke="rgba(220,100,20,0.75)" stroke-width="3"/>
    </svg>`,
  },
  {
    id: 'learn2slither',
    label: 'Learn2Slither',
    category: 'IA · Reinforcement Learning',
    color: 'linear-gradient(135deg, #1b4332 0%, #52b788 100%)',
    description:
      "Agent IA apprenant à jouer au Snake par Deep Q-Network (DQN). Entraînement autonome, visualisation des courbes de score, expérimentation de différentes architectures de réseau.",
    tech: ['Python', 'PyTorch', 'DQN', 'Pygame'],
    links: { github: 'https://github.com/Emma-blnch', demo: null },
    image: null,
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 56 Q24 28 36 50 Q48 72 60 44 Q70 22 72 32"
        stroke="rgba(82,183,136,0.92)" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="72" cy="32" r="7.5" fill="rgba(82,183,136,0.92)"/>
      <circle cx="75" cy="27" r="3" fill="rgba(5,20,10,0.85)"/>
    </svg>`,
  },
  {
    id: 'cyber42',
    label: 'Projets Cyber',
    category: 'Cybersécurité · 42 Paris',
    color: 'linear-gradient(135deg, #03045e 0%, #0096c7 100%)',
    description:
      "Série de projets cybersécurité à 42 Paris : analyse de binaires, exploitation de vulnérabilités, cryptographie, reverse engineering, forensics et scripting d'attaque.",
    tech: ['C', 'Python', 'Assembleur', 'Bash', 'GDB', 'Radare2'],
    links: { github: 'https://github.com/Emma-blnch', demo: null },
    image: null,
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 10 L65 22 L65 46 Q65 66 40 74 Q15 66 15 46 L15 22 Z"
        stroke="rgba(0,200,230,0.8)" stroke-width="3" fill="rgba(0,200,230,0.06)"/>
      <text x="40" y="52" text-anchor="middle"
        fill="rgba(0,210,235,0.92)" font-size="22" font-family="monospace" font-weight="bold">42</text>
    </svg>`,
  },
  {
    id: 'inception',
    label: 'Inception',
    category: 'Infrastructure · Docker',
    color: 'linear-gradient(135deg, #023e8a 0%, #48cae4 100%)',
    description:
      "Infrastructure conteneurisée multi-services avec Docker Compose : Nginx, WordPress, MariaDB, volumes persistants, réseau isolé, certificat TLS self-signed.",
    tech: ['Docker', 'Docker Compose', 'Nginx', 'WordPress', 'MariaDB'],
    links: { github: 'https://github.com/Emma-blnch', demo: null },
    image: null,
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="64" height="52" rx="7"
        stroke="rgba(110,210,235,0.8)" stroke-width="3" fill="rgba(110,210,235,0.06)"/>
      <rect x="20" y="25" width="40" height="30" rx="5"
        stroke="rgba(110,210,235,0.8)" stroke-width="2.5" fill="rgba(110,210,235,0.1)"/>
      <rect x="30" y="34" width="20" height="12" rx="3" fill="rgba(110,210,235,0.7)"/>
    </svg>`,
  },
  {
    id: 'sportytrader',
    label: 'SportyTrader',
    category: 'Intégration web · Alternance',
    color: 'linear-gradient(135deg, #b91c1c 0%, #f97316 100%)',
    description:
      "Intégration et développement de composants front-end pour SportyTrader, plateforme d'actualité sportive (>1M visites/mois). Environnement Scrum, revues de code, CI/CD.",
    tech: ['Twig', 'Tailwind CSS', 'Symfony', 'TypeScript', 'Git'],
    links: { github: null, demo: 'https://www.sportytrader.com/' },
    image: '/assets/img/projects/preview-sporty.webp',
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 14 L54 14 L54 46 Q54 64 40 68 Q26 64 26 46 Z"
        stroke="rgba(252,211,77,0.9)" stroke-width="3" fill="rgba(252,211,77,0.1)"/>
      <line x1="40" y1="68" x2="40" y2="74" stroke="rgba(252,211,77,0.85)" stroke-width="3"/>
      <line x1="28" y1="74" x2="52" y2="74" stroke="rgba(252,211,77,0.9)" stroke-width="4" stroke-linecap="round"/>
      <line x1="26" y1="30" x2="16" y2="30" stroke="rgba(252,211,77,0.7)" stroke-width="3" stroke-linecap="round"/>
      <line x1="16" y1="20" x2="16" y2="30" stroke="rgba(252,211,77,0.7)" stroke-width="3" stroke-linecap="round"/>
      <line x1="54" y1="30" x2="64" y2="30" stroke="rgba(252,211,77,0.7)" stroke-width="3" stroke-linecap="round"/>
      <line x1="64" y1="20" x2="64" y2="30" stroke="rgba(252,211,77,0.7)" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'dataviz',
    label: 'Enedis Data-viz',
    category: 'Hackathon · GenAI',
    color: 'linear-gradient(135deg, #006d77 0%, #83c5be 100%)',
    description:
      "Dashboard de visualisation de données Enedis réalisé lors d'un hackathon GenAI. Charts interactifs, analyse de consommation énergétique, rendu en 48h.",
    tech: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
    links: {
      github: 'https://github.com/Emma-blnch/GenAI-Hackaton-02-2025',
      demo: null,
    },
    image: '/assets/img/projects/preview-data-vizualisation.webp',
    icon: `<svg viewBox="0 0 80 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="42" width="14" height="22" rx="3" fill="rgba(131,197,190,0.65)"/>
      <rect x="25" y="26" width="14" height="38" rx="3" fill="rgba(131,197,190,0.8)"/>
      <rect x="43" y="10" width="14" height="54" rx="3" fill="rgba(255,255,255,0.9)"/>
      <rect x="61" y="32" width="14" height="32" rx="3" fill="rgba(131,197,190,0.72)"/>
      <line x1="5" y1="65" x2="78" y2="65" stroke="rgba(131,197,190,0.35)" stroke-width="2.5"/>
    </svg>`,
  },
];

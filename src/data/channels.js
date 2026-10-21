// Detail data for each project, keyed by the tile's data-id in index.html.
// The tile title (<h3>) and description (<p>) live in the HTML so crawlers can read them;
// the tile order in the HTML is also the navigation order in the detail overlay.
export const channels = {
  trainlytics: {
    category: 'PWA · Co-founder & Fullstack Developer',
    color: 'linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)',
    tech: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'Tailwind', 'Sentry', 'Cloudflare'],
    links: { github: null, demo: 'https://trainlytics.app' },
    note: 'Beta access on request.',
    images: [
      '/assets/img/projects/trainlytics/trainlytics-screenshot1.webp',
      '/assets/img/projects/trainlytics/trainlytics-screenshot2.webp',
      '/assets/img/projects/trainlytics/trainlytics-screenshot3.webp',
      '/assets/img/projects/trainlytics/trainlytics-screenshot4.webp',
    ],
  },
  sportytrader: {
    category: 'Front-end Development (Apprenticeship)',
    color: 'linear-gradient(135deg, #b91c1c 0%, #f97316 100%)',
    tech: ['Twig', 'Tailwind CSS', 'Symfony', 'TypeScript', 'Vue.js', 'Node.js', 'Git'],
    links: { github: null, demo: 'https://www.sportytrader.com/' },
    images: [
      '/assets/img/projects/sporty/sporty-screenshot1.webp',
      '/assets/img/projects/sporty/sporty-screenshot2.webp',
      '/assets/img/projects/sporty/sporty-screenshot3.webp',
    ],
  },
  transcendence: {
    category: 'Full-stack web app · 42 Paris',
    color: 'linear-gradient(135deg, #3c096c 0%, #ff6d00 100%)',
    tech: ['TypeScript', 'Node.js', 'Fastify', 'WebSocket', 'SQLite', 'Docker', 'Vite'],
    links: { github: 'https://github.com/Emma-blnch/Transcendence', demo: null },
    images: [
      '/assets/img/projects/transcendence/transcendence-screenshot2.webp',
      '/assets/img/projects/transcendence/transcendence-screenshot1.webp',
    ],
  },
  singula: {
    category: 'Showcase website · Development & maintenance',
    color: 'linear-gradient(135deg, #6a0dad 0%, #c77dff 100%)',
    tech: ['PHP', 'HTML', 'Tailwind CSS', 'Javascript'],
    links: { github: null, demo: 'https://www.singula-sophrologie.fr/' },
    images: [
      '/assets/img/projects/singula/singula-screenshot1.webp',
      '/assets/img/projects/singula/singula-screenshot2.webp',
      '/assets/img/projects/singula/singula-screenshot3.webp',
      '/assets/img/projects/singula/singula-screenshot4.webp',
    ],
  },
  dataviz: {
    category: 'Hackathon · GenAI',
    color: 'linear-gradient(135deg, #006d77 0%, #83c5be 100%)',
    tech: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
    links: {
      github: 'https://github.com/Emma-blnch/GenAI-Hackaton-02-2025',
      demo: null,
    },
    images: [
      '/assets/img/projects/preview-data-vizualisation.webp',
      '/assets/img/projects/genai-hackaton/genai-screenshot1.webp',
      '/assets/img/projects/genai-hackaton/genai-screenshot2.webp',
      '/assets/img/projects/genai-hackaton/genai-screenshot3.webp',
    ],
  },
  'neural-network': {
    category: 'AI · Deep Learning',
    color: 'linear-gradient(135deg, #10002b 0%, #7b2cbf 100%)',
    tech: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Machine Learning'],
    links: { github: 'https://github.com/Emma-blnch/multilayer-perceptron', demo: null },
    images: ['/assets/img/projects/neural/neural-screenshot1.webp'],
  },
  learn2slither: {
    category: 'AI · Reinforcement Learning',
    color: 'linear-gradient(135deg, #1b4332 0%, #52b788 100%)',
    tech: ['Python', 'NumPy', 'Q-Learning', 'Pygame'],
    links: { github: 'https://github.com/Emma-blnch/learntoslither', demo: null },
    images: [
      '/assets/img/projects/learntoslither/learntoslither-screenshot1.webp',
      '/assets/img/projects/learntoslither/learntoslither-screenshot2.webp',
    ],
  },
  inception: {
    category: 'Infrastructure · Docker',
    color: 'linear-gradient(135deg, #023e8a 0%, #48cae4 100%)',
    tech: ['Docker', 'Docker Compose', 'Nginx', 'WordPress', 'MariaDB'],
    links: { github: 'https://github.com/Emma-blnch/Inception-Docker-project', demo: null },
    images: ['/assets/img/projects/inception-screenshot.webp'],
  },
  cyber42: {
    category: 'Cyber Security · 42 Paris',
    color: 'linear-gradient(135deg, #03045e 0%, #0096c7 100%)',
    tech: ['C', 'Python', 'Assembly', 'Bash', 'GDB'],
    links: { github: null, demo: null },
    images: ['/assets/img/projects/cyber-screenshot.webp'],
  },
  cub3d: {
    category: 'Video game · 42 Paris',
    color: 'linear-gradient(135deg, #1a1a2e 0%, #c34a00 100%)',
    tech: ['C', 'MiniLibX', 'Raycasting', 'Git'],
    links: { github: 'https://github.com/Emma-blnch/cub3D', demo: null },
    images: [
      '/assets/img/projects/cub3d/cub3d-screenshot1.webp',
      '/assets/img/projects/cub3d/cub3d-screenshot2.webp',
      '/assets/img/projects/cub3d/cub3d-screenshot3.webp',
    ],
  },
};

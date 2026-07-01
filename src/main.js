import { gsap } from 'gsap';
import { channels } from './data/channels.js';
import { initSounds, playHover, playSelect, playBack } from './audio/sounds.js';
import './style.css';

// ─── State ────────────────────────────────────────────────────────────────────
let soundReady = false;
let isMuted = false;
let lastOpenedChannelEl = null;
let lastOpenedChannel = null;

// ─── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderChannelGrid();
  setupBottomBar();
  setupOverlayBackButtons();
  setupKeyboard();
  animateMenuIn();

  // Audio autorisé seulement après une première interaction utilisateur
  document.addEventListener('click', () => {
    if (!soundReady) {
      initSounds();
      soundReady = true;
    }
  }, { once: true });
});

// ─── Animation d'entrée du menu ───────────────────────────────────────────────
function animateMenuIn() {
  gsap.from('.channel', {
    opacity: 0,
    scale: 0.82,
    duration: 0.45,
    stagger: { amount: 0.38, from: 'center', grid: [2, 4] },
    ease: 'back.out(1.5)',
    delay: 0.05,
  });

  gsap.from('.footer-name, .footer-subtitle', {
    opacity: 0,
    y: 10,
    duration: 0.4,
    stagger: 0.08,
    ease: 'power2.out',
    delay: 0.35,
  });

  gsap.from('.wii-bottom-wrap', {
    y: 40,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.out',
    delay: 0.2,
  });
}

// ─── Grille de chaînes ────────────────────────────────────────────────────────
function renderChannelGrid() {
  const grid = document.getElementById('channel-grid');

  channels.forEach(ch => {
    const el = document.createElement('div');
    el.dataset.id = ch.id;

    if (ch.empty) {
      el.className = 'channel channel--empty';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = `<div class="channel-card--empty"></div>`;
      grid.appendChild(el);
      return;
    }

    el.className = 'channel';
    el.tabIndex = 0;
    el.role = 'button';
    el.setAttribute('aria-label', `Projet ${ch.label}`);

    el.innerHTML = `
      <div class="channel-card">
        <div class="channel-illustration" style="background: ${ch.color}">
          ${ch.icon}
          <div class="channel-label">${ch.label}</div>
        </div>
      </div>
    `;

    // Hover
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { scale: 1.06, duration: 0.18, ease: 'power2.out' });
      el.classList.add('channel--hovered');
      if (soundReady && !isMuted) playHover();
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, duration: 0.18, ease: 'power2.out' });
      el.classList.remove('channel--hovered');
    });

    // Focus (clavier)
    el.addEventListener('focus', () => {
      gsap.to(el, { scale: 1.06, duration: 0.18, ease: 'power2.out' });
      el.classList.add('channel--hovered');
    });
    el.addEventListener('blur', () => {
      gsap.to(el, { scale: 1, duration: 0.18, ease: 'power2.out' });
      el.classList.remove('channel--hovered');
    });

    // Clic
    el.addEventListener('click', () => openProjectOverlay(ch, el));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectOverlay(ch, el);
      }
    });

    grid.appendChild(el);
  });
}

// ─── Overlay projet ───────────────────────────────────────────────────────────
function openProjectOverlay(ch, sourceEl) {
  if (soundReady && !isMuted) playSelect();

  lastOpenedChannelEl = sourceEl;
  lastOpenedChannel = ch;

  const overlay = document.getElementById('channel-overlay');
  const content = document.getElementById('overlay-content');

  content.innerHTML = buildProjectHTML(ch);
  gsap.set(content, { opacity: 0 });

  // Overlay couleur de la card pendant le zoom (pas du blanc vide)
  overlay.style.background = ch.color;

  const rect = sourceEl.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const clipStart = `inset(${rect.top}px ${vw - rect.right}px ${vh - rect.bottom}px ${rect.left}px round 14px)`;
  const clipEnd   = `inset(0px 0px 0px 0px round 0px)`;

  overlay.classList.add('overlay--visible');
  overlay.setAttribute('aria-hidden', 'false');
  lockMenu();

  // La grille zoome en avant (caméra qui s'avance)
  gsap.to('#channel-grid', {
    scale: 1.35,
    opacity: 0,
    duration: 0.45,
    ease: 'power3.in',
  });

  // Expansion de la card vers plein écran
  gsap.fromTo(overlay,
    { clipPath: clipStart },
    {
      clipPath: clipEnd,
      duration: 0.52,
      ease: 'power3.inOut',
      onComplete: () => {
        // Passage fond coloré → blanc, puis contenu
        gsap.to(overlay, {
          background: '#ffffff',
          duration: 0.25,
          ease: 'power2.inOut',
          onComplete: () => gsap.to(content, { opacity: 1, duration: 0.2, ease: 'power2.out' }),
        });
      },
    }
  );
}

function closeProjectOverlay() {
  if (soundReady && !isMuted) playBack();

  const overlay = document.getElementById('channel-overlay');
  const content = document.getElementById('overlay-content');

  const rect = lastOpenedChannelEl?.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const clipEnd = rect
    ? `inset(${rect.top}px ${vw - rect.right}px ${vh - rect.bottom}px ${rect.left}px round 14px)`
    : `inset(50% 50% 50% 50% round 14px)`;

  // Contenu disparaît, fond repasse à la couleur de la card
  gsap.to(content, {
    opacity: 0,
    duration: 0.15,
    ease: 'power2.in',
    onComplete: () => {
      gsap.to(overlay, {
        background: lastOpenedChannel?.color ?? '#ffffff',
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          // Rétrécissement vers la card + grille qui revient
          gsap.fromTo(overlay,
            { clipPath: 'inset(0px 0px 0px 0px round 0px)' },
            {
              clipPath: clipEnd,
              duration: 0.45,
              ease: 'power3.inOut',
              onComplete: () => {
                overlay.classList.remove('overlay--visible');
                overlay.setAttribute('aria-hidden', 'true');
                gsap.set(overlay, { clearProps: 'all' });
                unlockMenu();
              },
            }
          );

          // La grille revient en arrière en même temps
          gsap.to('#channel-grid', {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'power3.out',
          });
        },
      });
    },
  });
}

function buildProjectHTML(ch) {
  const githubBtn = ch.links.github
    ? `<a href="${ch.links.github}" target="_blank" rel="noopener" class="project-link-btn project-link-btn--primary">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub
      </a>`
    : '';

  const demoBtn = ch.links.demo
    ? `<a href="${ch.links.demo}" target="_blank" rel="noopener" class="project-link-btn project-link-btn--secondary">
        Voir le site →
      </a>`
    : '';

  const techHTML = ch.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

  const previewHTML = ch.image
    ? `<div class="project-preview">
        <img src="${ch.image}" alt="Aperçu ${ch.label}" loading="lazy"/>
      </div>`
    : `<div class="project-preview project-preview--gradient" style="background: ${ch.color}">
        ${ch.label}
      </div>`;

  return `
    <p class="project-category">${ch.category}</p>
    <h1 class="project-title">${ch.label}</h1>
    <p class="project-desc mt-5">${ch.description}</p>
    <div class="flex flex-wrap gap-2 mt-5">${techHTML}</div>
    <div class="flex flex-wrap gap-3 mt-8">${githubBtn}${demoBtn}</div>
    ${previewHTML}
  `;
}

// ─── Drawers About + Contact (slide bas → haut) ───────────────────────────────
function openGenericOverlay(id) {
  if (soundReady && !isMuted) playSelect();
  const overlay = document.getElementById(id);

  // Positionner hors écran avant de rendre visible (évite le flash)
  gsap.set(overlay, { y: '100%' });
  overlay.classList.add('overlay--visible');
  overlay.setAttribute('aria-hidden', 'false');
  lockMenu();

  gsap.to(overlay, { y: '0%', duration: 0.48, ease: 'power3.out' });
}

function closeGenericOverlay(id) {
  if (soundReady && !isMuted) playBack();
  const overlay = document.getElementById(id);

  gsap.to(overlay, {
    y: '100%',
    duration: 0.38,
    ease: 'power3.in',
    onComplete: () => {
      overlay.classList.remove('overlay--visible');
      overlay.setAttribute('aria-hidden', 'true');
      gsap.set(overlay, { clearProps: 'all' });
      unlockMenu();
    },
  });
}

// ─── Barre du bas ─────────────────────────────────────────────────────────────
function setupBottomBar() {
  document.getElementById('btn-about').addEventListener('click', () => openGenericOverlay('about-overlay'));
  document.getElementById('btn-contact').addEventListener('click', () => openGenericOverlay('contact-overlay'));
  document.getElementById('btn-mute').addEventListener('click', toggleMute);
}

// ─── Back buttons ─────────────────────────────────────────────────────────────
function setupOverlayBackButtons() {
  document.getElementById('overlay-back').addEventListener('click', closeProjectOverlay);
  document.getElementById('about-back').addEventListener('click', () => closeGenericOverlay('about-overlay'));
  document.getElementById('contact-back').addEventListener('click', () => closeGenericOverlay('contact-overlay'));
}

// ─── Keyboard ─────────────────────────────────────────────────────────────────
function setupKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const visible = document.querySelector('.overlay.overlay--visible');
    if (!visible) return;
    if (visible.id === 'channel-overlay') closeProjectOverlay();
    else closeGenericOverlay(visible.id);
  });
}

// ─── Mute ─────────────────────────────────────────────────────────────────────
function toggleMute() {
  isMuted = !isMuted;
  const btn = document.getElementById('btn-mute');
  btn.classList.toggle('is-muted', isMuted);
  btn.setAttribute('aria-label', isMuted ? 'Son coupé' : 'Son activé');

  btn.innerHTML = isMuted
    ? `<svg viewBox="0 0 24 24" fill="currentColor" class="w-[15px] h-[15px]">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
      </svg>`
    : `<svg viewBox="0 0 24 24" fill="currentColor" class="w-[15px] h-[15px]">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
      </svg>`;
}

// ─── Utilitaires ──────────────────────────────────────────────────────────────
function lockMenu() {
  document.getElementById('wii-menu').style.pointerEvents = 'none';
}

function unlockMenu() {
  document.getElementById('wii-menu').style.pointerEvents = '';
}

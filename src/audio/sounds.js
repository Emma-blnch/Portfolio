import { Howl } from 'howler';

let sfxHover        = null;
let sfxHoverButton  = null;
let sfxSelect       = null;
let sfxBack         = null;
let sfxArrow        = null;
let sfxButton       = null;

export function initSounds() {
  try {
    sfxHover = new Howl({
      src: ['/assets/sounds/hover.wav'],
      volume: 0.3,
      preload: true,
    });

    sfxHoverButton = new Howl({
      src: ['/assets/sounds/hver-button.wav'],
      volume: 0.4,
      preload: true,
    });

    sfxSelect = new Howl({
      src: ['/assets/sounds/bouton-channel.wav'],
      volume: 0.55,
      preload: true,
    });

    sfxArrow = new Howl({
      src: ['/assets/sounds/bouton-fleche.wav'],
      volume: 0.5,
      preload: true,
    });

    sfxBack = new Howl({
      src: ['/assets/sounds/bouton-retour.wav'],
      volume: 0.45,
      preload: true,
    });

    sfxButton = new Howl({
      src: ['/assets/sounds/boutons.wav'],
      volume: 0.45,
      preload: true,
    });
  } catch {
    // Fichiers sons absents — UI silencieuse sans erreur
  }
}

export const playHover        = () => sfxHover?.play();
export const playHoverButton  = () => sfxHoverButton?.play();
export const playSelect = () => sfxSelect?.play();
export const playBack   = () => sfxBack?.play();
export const playArrow  = () => sfxArrow?.play();
export const playButton = () => sfxButton?.play();

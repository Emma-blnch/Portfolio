import { Howl } from 'howler';

// Sons à sourcer sur freesound.org (CC0 / CC BY)
// Suggestions de recherche :
//   hover  → "ui pop click" (court ~50ms)
//   select → "whoosh select ui" (~150ms)
//   back   → "soft click back" (~120ms)
//
// Placer les fichiers dans /public/assets/sounds/ :
//   hover.mp3 + hover.ogg
//   select.mp3 + select.ogg
//   back.mp3 + back.ogg

let sfxHover = null;
let sfxSelect = null;
let sfxBack = null;

export function initSounds() {
  try {
    sfxHover = new Howl({
      src: ['/assets/sounds/hover.mp3', '/assets/sounds/hover.ogg'],
      volume: 0.35,
      preload: true,
    });

    sfxSelect = new Howl({
      src: ['/assets/sounds/select.mp3', '/assets/sounds/select.ogg'],
      volume: 0.55,
      preload: true,
    });

    sfxBack = new Howl({
      src: ['/assets/sounds/back.mp3', '/assets/sounds/back.ogg'],
      volume: 0.45,
      preload: true,
    });
  } catch {
    // Fichiers sons absents — les UI restent silencieuses sans erreur
  }
}

export const playHover = () => sfxHover?.play();
export const playSelect = () => sfxSelect?.play();
export const playBack = () => sfxBack?.play();

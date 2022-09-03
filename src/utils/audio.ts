import fileFlip from '@/assets/sounds/flip.mp3';
import fileFail from '@/assets/sounds/fail.mp3';
import fileSadTrombone from '@/assets/sounds/sad-trombone.mp3';
import fileSuccess from '@/assets/sounds/success.mp3';
import fileWin from '@/assets/sounds/ta-da.mp3';
import fileSlide from '@/assets/sounds/slide.mp3';

import { storeToRefs } from 'pinia';
import useAudioOn from '@/stores/audio-on';

const { isAudioOn } = storeToRefs(useAudioOn());

export const audioFlip = new Audio(fileFlip);
export const audioFail = new Audio(fileFail);
export const audioSadTrombone = new Audio(fileSadTrombone);
export const audioSuccess = new Audio(fileSuccess);
export const audioWin = new Audio(fileWin);
export const audioSlide = new Audio(fileSlide);

audioFlip.volume = 0.2;
audioFail.volume = 0.1;
audioSadTrombone.volume = 0.2;
audioSuccess.volume = 0.3;
audioWin.volume = 0.1;
audioSlide.volume = 0.2;

export const playAudio = (audio: HTMLAudioElement) => {
  if (isAudioOn.value) {
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Automatic playback started!
          // Show playing UI.
        })
        .catch(() => {
          // Auto-play was prevented
          // Show paused UI.
        });
    }
  }
};

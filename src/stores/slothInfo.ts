import { defineStore } from 'pinia';
import type { Sloth } from '@/common/types';

const newSloth: Sloth = {
  id: '',
  caption: '',
  description: '',
  image_url: '',
  rating: 0,
  createdAt: Date.now(),
};

const useSlothInfo = defineStore({
  id: 'slothInfo',

  state: () => ({
    slothsInfo: newSloth,
  }),

  actions: {
    setEmptySlothInfo() {
      this.slothsInfo = { ...newSloth };
    },

    setSlothInfo(newSlothInfo: Sloth) {
      this.slothsInfo = { ...newSlothInfo };
    },
  },
});

export default useSlothInfo;

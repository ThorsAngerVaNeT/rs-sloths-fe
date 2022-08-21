import { defineStore } from 'pinia';

const useLoader = defineStore({
  id: 'loader',
  state: () => ({
    isLoad: false,
  }),

  getters: {
    getIsLoad: (state): boolean => state.isLoad,
  },

  actions: {
    setIsLoad(bool: boolean): void {
      this.isLoad = bool;
    },
  },
});

export default useLoader;

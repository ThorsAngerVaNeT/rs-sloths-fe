import { defineStore } from 'pinia';

const usePagesStore = defineStore({
  id: 'pagesStore',
  state: () => ({
    pageCreate: '',
    pageMemory: '',
  }),

  actions: {
    getPageCrateState(): string {
      return this.pageCreate;
    },

    setPageCrateState(newState: string) {
      this.pageCreate = newState;
    },

    getPageMemoryState(): string {
      return this.pageMemory;
    },

    setPageMemoryState(newState: string) {
      this.pageMemory = newState;
    },
  },
});

export default usePagesStore;

import type { TagCloud } from '@/common/types';
import { defineStore } from 'pinia';

const useSelectedTags = defineStore({
  id: 'tagCloud',

  state: () => ({
    selected: [] as string[],
  }),

  actions: {
    getSelected(): string[] {
      return [...this.selected];
    },

    setSelected(s: TagCloud) {
      this.selected = [...s];
    },
  },
});

export default useSelectedTags;

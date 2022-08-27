<template>
  <div class="tags">
    <span class="tag" :class="{ active: isHas(item) }" v-for="item in tags" :key="item" @click="select(item)">
      {{ item }}
    </span>
  </div>
</template>

<script lang="ts">
import type { TagCloud } from '@/common/types';
import useSelectedTags from '@/stores/tag-cloud';
import { defineComponent, type PropType } from 'vue';

const { setSelected } = useSelectedTags();

const tagCloud = defineComponent({
  name: 'TagCloud',

  data() {
    return {
      selected: new Set([]) as TagCloud,
    };
  },

  props: {
    tags: {
      type: Object as PropType<string[]>,
      required: true,
    },
  },

  methods: {
    isHas(tag: string) {
      return this.selected.has(tag);
    },

    select(tag: string) {
      const has = this.selected.has(tag);
      if (has) {
        this.selected.delete(tag);
      } else {
        this.selected.add(tag);
      }

      setSelected(this.selected);
      this.$emit('tags');
    },

    clearSelected() {
      this.selected = new Set([]) as TagCloud;

      setSelected(this.selected);
    },
  },
});
export default tagCloud;
export type TagCloudElement = InstanceType<typeof tagCloud>;
</script>

<style>
.tags {
  padding: 0.5rem 0;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;

  color: var(--color-text);
}
.tags-center {
  justify-content: center;
}
.tag {
  padding: 0.5rem 0.7rem;
  cursor: pointer;

  color: inherit;
  background-color: var(--color-background);

  transition: background-color 0.3s ease, color 0.5s ease;

  border-radius: 1rem;
}
.tag:hover,
.active {
  color: var(--color-text-inverse);
  background-color: var(--color-background-inverse);
}
</style>

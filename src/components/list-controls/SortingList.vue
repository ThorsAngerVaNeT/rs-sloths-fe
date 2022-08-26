<template>
  <div class="sorting">
    <select name="select" class="sorting__select" v-model="sorting" @change="sortingList">
      <option disabled value="">{{ title }}</option>
      <option v-for="(item, index) in options" :key="index" :value="item.value">{{ $t(item.text) }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import type { SelectOptions } from '@/common/types';
import useSortingList from '@/stores/sorting-list';
import { defineComponent, type PropType } from 'vue';

const { setSortingList } = useSortingList();

export default defineComponent({
  name: 'SortingList',

  data() {
    return {
      sorting: '',
    };
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    options: {
      type: Object as PropType<SelectOptions[]>,
      required: true,
    },
  },

  methods: {
    sortingList() {
      setSortingList(this.sorting);
      this.$emit('sorting');
    },
  },
});
</script>

<style scoped></style>

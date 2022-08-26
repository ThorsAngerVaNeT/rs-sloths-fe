<template>
  <div class="search">
    <input
      type="text"
      class="search__text"
      :placeholder="placeholder"
      :title="placeholder"
      v-model="searchText"
      @change="search"
    />
    <div class="btn btn-search" @click="clearSearch">X</div>
  </div>
</template>

<script lang="ts">
import useSearchText from '@/stores/search-text';
import { defineComponent } from 'vue';

const { setSearchText } = useSearchText();

export default defineComponent({
  name: 'SearchText',

  data() {
    return {
      searchText: '',
    };
  },

  props: {
    placeholder: {
      type: String,
      required: true,
    },
  },

  methods: {
    search() {
      setSearchText(this.searchText);
      this.$emit('search');
    },

    clearSearch() {
      this.searchText = '';
      this.search();
    },
  },
});
</script>

<style scoped></style>

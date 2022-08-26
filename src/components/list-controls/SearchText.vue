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

const searchText = defineComponent({
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

    clearSearchText() {
      this.searchText = '';
      setSearchText(this.searchText);
    },

    clearSearch() {
      this.searchText = '';
      this.search();
    },
  },
});
export default searchText;
export type SearchTextElement = InstanceType<typeof searchText>;
</script>

<style scoped></style>

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
    <custom-btn @click="clearSearch" text="X" className="btn btn-search"></custom-btn>
  </div>
</template>

<script lang="ts">
import useSearchText from '@/stores/search-text';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import { defineComponent } from 'vue';

const { setSearchText } = useSearchText();

const searchText = defineComponent({
  name: 'SearchText',

  components: {
    CustomBtn,
  },

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

<style>
.search {
  position: relative;
  color: var(--color-text);
}
.search__text {
  margin: 0.5rem 0;
  padding: 0.5rem 0;

  width: 100%;

  border: none;
  border-bottom: 0.2rem solid gray;
  background-color: var(--color-background);
  color: inherit;
}
</style>

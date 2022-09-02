<template>
  <div class="admin">
    <div class="admin__aside">
      <h3>{{ $t('admin.title') }}</h3>
      <div class="admin__nav">
        <div
          v-for="(page, index) in pages"
          :key="index"
          :class="['btn', { 'btn-primary': currentPage === index }, { 'btn-link': currentPage !== index }]"
          @click="currentPage = index"
        >
          {{ $t(`admin.btn.${page}`) }}
        </div>
      </div>
    </div>
    <div class="admin__main">
      <component :is="components[currentPage]" :id="components[currentPage]"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import UsersList from '@/components/admin/UsersList.vue';
import GuessInfo from '@/components/profile/GuessInfo.vue';
import MemoryInfo from '@/components/profile/MemoryInfo.vue';
import { PAGINATION_OPTIONS } from '@/common/const';
import type { PageSettings } from '@/common/types';
import usePagination from '@/stores/pagination';
import useSearchText from '@/stores/search-text';
import useSortingList from '@/stores/sorting-list';
import useSelectedTags from '@/stores/tag-cloud';
import useCurrUser from '@/stores/curr-user';
import CatalogView from './Catalog.vue';
import SuggestionView from './Suggestion.vue';

const { setPerPage, setCurrPage } = usePagination();
const { setSearchText } = useSearchText();
const { setSelected } = useSelectedTags();
const { setSortingList } = useSortingList();

const { isAdmin } = useCurrUser();

export default defineComponent({
  name: 'AdminView',

  components: {
    CustomBtn,
    UsersList,
    CatalogView,
    SuggestionView,
    GuessInfo,
    MemoryInfo,
  },

  data() {
    return {
      currentPage: 0,
      pages: ['users', 'sloths', 'suggest', 'guess', 'memory'],
      components: ['UsersList', 'CatalogView', 'SuggestionView', 'GuessInfo', 'MemoryInfo'],
    };
  },

  beforeRouteLeave() {
    this.clearStore();
  },

  beforeRouteEnter(to, from, next) {
    if (!isAdmin) next('/404');
  },

  created() {
    this.clearStore();
  },

  methods: {
    clearStore() {
      const settings: PageSettings = {
        currPage: 1,
        perPage: PAGINATION_OPTIONS[0],
        searchText: '',
        selected: [] as string[],
        sorting: '',
        checked: [] as string[],
      };

      setCurrPage(settings.currPage);
      setPerPage(settings.perPage);
      setSearchText(settings.searchText);
      setSelected(settings.selected);
      setSortingList(settings.sorting);
    },
  },
});
</script>

<style scoped>
.admin {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  color: var(--color-text);
}
.admin__aside {
  padding: 1rem 2rem;
}
.admin__nav {
  display: flex;
  flex-direction: row;
}
.admin__main {
  padding: 1rem;
  width: 100%;
}
</style>

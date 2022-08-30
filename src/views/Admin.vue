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
import CatalogView from './Catalog.vue';
import SuggestionView from './Suggestion.vue';

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

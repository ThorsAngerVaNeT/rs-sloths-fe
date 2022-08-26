<template>
  <div class="admin">
    <h3>{{ $t('admin.title') }}</h3>
    <div class="admin__aside">
      <div
        v-for="(page, index) in pages"
        :key="index"
        :class="['btn', { 'btn-primary': currentPage === index }, { 'btn-link': currentPage !== index }]"
        @click="currentPage = index"
      >
        {{ $t(`admin.btn.${page}`) }}
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
import SuggestInfo from '@/components/profile/SuggestInfo.vue';
import GuessInfo from '@/components/profile/GuessInfo.vue';
import MemoryInfo from '@/components/profile/MemoryInfo.vue';
import CatalogView from './Catalog.vue';

export default defineComponent({
  name: 'AdminView',

  components: {
    CustomBtn,
    UsersList,
    CatalogView,
    SuggestInfo,
    GuessInfo,
    MemoryInfo,
  },

  data() {
    return {
      currentPage: 0,
      pages: ['users', 'sloths', 'suggest', 'guess', 'memory'],
      components: ['UsersList', 'CatalogView', 'SuggestInfo', 'GuessInfo', 'MemoryInfo'],
    };
  },
});
</script>

<style scoped>
.admin {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.admin__aside {
  padding: 1rem;

  display: flex;
  flex-direction: row;
}
.admin__main {
  padding: 1rem;
}
</style>

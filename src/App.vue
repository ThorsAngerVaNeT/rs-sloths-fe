<template>
  <header-view />

  <main class="main">
    <router-view />
  </main>

  <footer-view />

  <loader-view v-show="isLoad" />
</template>

<script lang="ts">
import { mapWritableState } from 'pinia';
import HeaderView from './components/header/HeaderView.vue';
import FooterView from './components/footer/FooterView.vue';
import LoaderView from './components/loader/LoaderView.vue';

import useLoader from './stores/loader';

export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView,
    LoaderView,
  },
  computed: {
    ...mapWritableState(useLoader, ['isLoad']),
  },
  created() {
    this.isLoad = true;
  },
  mounted() {
    setTimeout(() => {
      this.isLoad = false;
    }, 100);
  },
};
</script>

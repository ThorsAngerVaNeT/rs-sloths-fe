<template>
  <header-view />

  <main class="main">
    <router-view />
  </main>

  <footer-view />

  <loader-view v-show="getIsLoad" />
</template>

<script lang="ts">
import { mapState } from 'pinia';
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
    ...mapState(useLoader, ['getIsLoad']),
  },
  mounted() {
    console.log('loader: ', this.getIsLoad);
  },
};
</script>

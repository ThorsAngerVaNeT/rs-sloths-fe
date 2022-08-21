<template>
  <header-view />

  <main class="main">
    <router-view />
  </main>

  <footer-view />

  <loader-view />
</template>

<script lang="ts">
import HeaderView from './components/header/HeaderView.vue';
import FooterView from './components/footer/FooterView.vue';
import LoaderView from './components/loader/LoaderView.vue';

export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView,
    LoaderView,
  },
};
</script>

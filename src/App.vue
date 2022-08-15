<template>
  <header-view />

  <main class="main">
    <router-view />
  </main>

  <footer-view />
</template>

<script lang="ts">
import HeaderView from './components/header/HeaderView.vue';
import FooterView from './components/footer/FooterView.vue';

export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView,
  },
};
</script>

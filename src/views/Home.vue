<template>
  <h1>{{ $t('home') }}</h1>
  <div class="wrapper">
    <router-link to="/about">{{ $t('about') }}</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeView',
};
</script>

<template>
  <h1>{{ $t('home') }}</h1>
  <div class="wrapper">
    <RouterLink to="/about">{{ $t('about') }}</RouterLink>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeView',
};
</script>

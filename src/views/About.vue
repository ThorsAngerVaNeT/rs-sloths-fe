<template>
  <div class="about">
    <h1>{{ $t('about') }}</h1>
    <RouterLink to="/">{{ $t('home') }}</RouterLink>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutView',
};
</script>

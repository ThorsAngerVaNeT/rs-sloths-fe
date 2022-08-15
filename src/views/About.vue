<template>
  <div class="about">
    <h1>{{ $t('about') }}</h1>
    <router-link to="/">{{ $t('home') }}</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutView',
};
</script>

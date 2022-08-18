<template>
  <div class="about">
    <h1>{{ $t('about.title') }}</h1>
    <router-link to="/">{{ $t('home.title') }}</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutView',
};
</script>

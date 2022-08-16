<template>
  <h1>{{ $t('home') }}</h1>
  <div class="wrapper">
    <router-link to="/about">{{ $t('about') }}</router-link>
    <router-link to="/profile">{{ $t('profile') }}</router-link>
    <router-link to="/catalog">{{ $t('catalog') }}</router-link>
    <router-link to="/create">{{ $t('create') }}</router-link>
    <router-link to="/guess">{{ $t('guess') }}</router-link>
    <router-link to="/memory">{{ $t('memory') }}</router-link>
    <router-link to="/suggest">{{ $t('suggest') }}</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeView',
};
</script>

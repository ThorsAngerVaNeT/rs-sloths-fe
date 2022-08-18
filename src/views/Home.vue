<template>
  <h1>{{ $t('home.title') }}</h1>
  <div class="wrapper">
    <router-link to="/about">{{ $t('about.title') }}</router-link>
    <router-link to="/profile">{{ $t('profile.title') }}</router-link>
    <router-link to="/catalog">{{ $t('catalog.title') }}</router-link>
    <router-link to="/create">{{ $t('create.title') }}</router-link>
    <router-link to="/guess">{{ $t('guess.title') }}</router-link>
    <router-link to="/memory">{{ $t('memory.title') }}</router-link>
    <router-link to="/suggest">{{ $t('suggest.title') }}</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeView',
};
</script>

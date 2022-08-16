<template>
  <h1>{{ $t('home') }}</h1>
  <div class="wrapper">
    <router-link to="/about">{{ $t('about') }}</router-link>
    <router-link to="/profile">Profile</router-link>
    <router-link to="/catalog">Catalog</router-link>
    <router-link to="/create">Create</router-link>
    <router-link to="/guess">Guess</router-link>
    <router-link to="/memory">Memory</router-link>
    <router-link to="/suggest">Suggestion</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeView',
};
</script>

<template>
  <header class="header">
    <locale-switcher />
    <p>{{ $t('header') }}</p>
    <router-link to="/">{{ $t('home') }}</router-link>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LocaleSwitcher from '../locale-switcher/LocaleSwitcher.vue';

export default defineComponent({
  name: 'HeaderView',
  components: { LocaleSwitcher },
});
</script>

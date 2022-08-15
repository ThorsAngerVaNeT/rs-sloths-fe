<template>
  <header class="header">
    <LocaleSwitcher />
    <p>{{ $t('header') }}</p>
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

<template>
  <header class="header" :class="this.$route.name !== 'home' ? '' : 'header_home'">
    <router-link class="header__title" v-show="this.$route.name !== 'home'" to="/">RS SLOTHS</router-link>
    <locale-switcher />
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

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
}

.header_home {
  justify-content: flex-end;
}

.header__title {
  font-family: Arial, sans-serif;
  font-weight: 900;
  font-size: 24px;
  text-decoration: none;
  color: var(--vt-c-indigo);
}

.header__title:hover {
  color: black;
}
</style>

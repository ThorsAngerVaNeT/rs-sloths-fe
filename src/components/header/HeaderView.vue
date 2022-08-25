<template>
  <header class="header" :class="$route.name !== 'home' ? '' : 'header_home'">
    <router-link class="header__title" v-show="$route.name !== 'home'" to="/">RS SLOTHS</router-link>
    <div class="header__tools">
      <locale-switcher />
      <theme-switcher />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LocaleSwitcher from '../locale-switcher/LocaleSwitcher.vue';
import ThemeSwitcher from '../theme-switcher/ThemeSwitcher.vue';

export default defineComponent({
  name: 'HeaderView',

  components: { LocaleSwitcher, ThemeSwitcher },
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  z-index: 2;
}

.header_home {
  justify-content: flex-end;
}

.header__title {
  font-family: Arial, sans-serif;
  font-weight: 900;
  font-size: 24px;
  text-decoration: none;
  color: var(--color-text);
}

.header__title:hover {
  color: var(--color-heading);
}

.header__tools {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
}
</style>

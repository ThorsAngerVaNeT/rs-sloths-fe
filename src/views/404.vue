<template>
  <div class="page-404">
    <div class="page-404__image"></div>
    <h2 class="page-404__title">{{ $t('404.title') }}</h2>
    <p class="page-404__descr">{{ $t('404.text') }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '404View',
});
</script>

<style scoped>
.page-404 {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.page-404__image {
  height: 250px;
  width: 250px;
  background: no-repeat center center / contain url('../assets/icons/404/404.svg');
}

/* Temp colors */
.page-404__title {
  /* color: var(--color-heading); */
  color: var(--dark-addict);
}

.page-404__descr {
  /* color: var(--color-text); */
  color: var(--dark-main);
}
</style>

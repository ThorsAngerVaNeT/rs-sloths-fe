<template>
  <div class="home-catalog">
    <div class="home-catalog__wrapper">
      <div class="home-catalog_up"></div>
      <div class="home-catalog_down"></div>
    </div>
    <div class="home-category__name">{{ $t('catalog.title') }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeCatalog',
});
</script>

<style scoped>
.home-catalog__wrapper {
  position: relative;
  width: 400px;
  height: 400px;
}

.home-catalog_up,
.home-catalog_down {
  position: absolute;
  width: 100%;
  height: 240px;
  transition: 0.3s;
}

.home-catalog_up {
  top: 50%;
  transform: translate(0, -50%);
  z-index: 2;
  background: no-repeat center center / contain url('../../assets/icons/home/catalog-up.svg');
}

.home-catalog_down {
  bottom: 50%;
  transform: translate(0, 50%);
  z-index: 3;
  background: no-repeat center center / contain url('../../assets/icons/home/catalog-down.svg');
}

.home-catalog:hover .home-catalog_up {
  top: 0;
  transform: translate(0, 0);
}

.home-catalog:hover .home-catalog_down {
  /* top: none; */
  bottom: 0;
  transform: translate(0, 0);
}

.home-catalog:hover .home-catalog__name {
  opacity: 1;
}
</style>

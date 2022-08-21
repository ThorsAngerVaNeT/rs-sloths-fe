<template>
  <div :class="`home-category home-category_${category}`">
    <div class="home-category__wrapper">
      <div class="home-category_up"></div>
      <div class="home-category_down"></div>
    </div>
    <div class="home-category__name">{{ $t(`${category}.title`) }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeCategory',

  props: {
    category: {
      type: String,
      default: () => '',
    },
  },
});
</script>

<style scoped>
.home-category {
  height: 150px;
  width: 150px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.home-category__wrapper {
  position: relative;
  flex: 1;
}

.home-category_catalog {
  width: 100%;
  height: 100%;
  grid-area: D;
}

.home-category_profile {
  grid-area: A;
}

.home-category_suggest {
  grid-area: G;
}

.home-category_memory {
  grid-area: B;
}

.home-category_guess {
  grid-area: C;
}

.home-category_create {
  grid-area: F;
}

.home-category_sloth {
  grid-area: E;
}

.home-category_up,
.home-category_down {
  position: absolute;
  width: 100%;
  height: 50%;
  top: 50%;
  transform: translate(0, -50%);
  transition: 0.3s;
}

.home-category_up {
  z-index: 2;
  background-color: var(--blue-main);
}

.home-category_down {
  z-index: 3;
  background-color: var(--dark-addict);
}

.home-category:hover .home-category_up {
  top: 0;
  transform: translate(0, 0);
}

.home-category:hover .home-category_down {
  top: none;
  bottom: 0;
  transform: translate(0, 0);
}
</style>

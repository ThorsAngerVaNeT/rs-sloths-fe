<template>
  <div :class="`home-category home-category_${category}`">
    <div class="home-category__wrapper" v-if="category === 'catalog'">
      <div class="home-category_up"></div>
      <div class="home-category_down"></div>
    </div>
    <div class="home-category__img" v-else></div>
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
  width: 100px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.home-category__img {
  height: 100px;
  width: 100%;
  border-radius: 50%;
  border: 3px var(--color-border-theme) solid;
  background-color: var(--color-background-soft);
  transition: 0.3s;
}

.home-category_profile > .home-category__img {
  background: no-repeat center center / contain url('../../assets/icons/home/profile.svg') var(--color-background-soft);
}

.home-category_suggest > .home-category__img {
  background: no-repeat center center / contain url('../../assets/icons/home/suggest.svg') var(--color-background-soft);
}

.home-category_memory > .home-category__img {
  background: no-repeat center center / contain url('../../assets/icons/home/memory.svg') var(--color-background-soft);
}

.home-category_guess > .home-category__img {
  background: no-repeat center center / contain url('../../assets/icons/home/guess.svg') var(--color-background-soft);
}

.home-category_create > .home-category__img {
  background: no-repeat center center / contain url('../../assets/icons/home/create.svg') var(--color-background-soft);
}

.home-category_sloth > .home-category__img {
  background: no-repeat center center / contain url('../../assets/icons/home/sloth.svg') var(--color-background-soft);
}

.home-category__name {
  text-align: center;
  color: var(--color-text);
  font-weight: 300;
  opacity: 0;
  transition: 0.3s;
}

.home-category:hover .home-category_up {
  top: 20%;
  transform: translate(0, 0);
}

.home-category:hover .home-category_down {
  top: none;
  bottom: 20%;
  transform: translate(0, 0);
}

.home-category:hover .home-category__img {
  transform: scale(1.1) rotate(-10deg);
}

.home-category:hover .home-category__name {
  opacity: 1;
}
</style>

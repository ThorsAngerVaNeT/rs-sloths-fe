<template>
  <div :class="`home-category home-category_${category}`">
    <div class="home-category__wrapper" v-if="category === 'catalog'">
      <div class="home-category_up"></div>
      <div class="home-category_down"></div>
    </div>
    <!-- <img class="home-category__img" v-else :src="`./src/assets/icons/home/${category}.svg`" :alt="`${category}-icon`" /> -->
    <div class="home-category__img" v-else></div>
    <div class="home-category__name">{{ $t(`${category}.title`) }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeCategory',

  // data() {
  //   return {
  //     background: `no-repeat center center / contain url('../../assets/icons/home/${this.category}.svg')`
  //   }
  // },

  props: {
    category: {
      type: String,
      default: () => '',
    },
  },

  // computed: {
  //   background() {
  //     return `background:no-repeat center center / contain url('../../assets/icons/home/${this.category}.svg')`
  //   }
  // }
});
</script>

<style scoped>
.home-category {
  /* height: 100px; */
  width: 100px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

/* .home-category__wrapper {
  position: relative;
  flex: 1;
}

.home-category_catalog {
  width: 100%;
  height: 100%;
  grid-area: D;
} */

/* .home-category_profile {
  grid-area: A;
} */

.home-category_profile > .home-category__img {
  background: no-repeat center center / contain url('../../assets/icons/home/profile.svg');
}

/* .home-category_suggest {
  grid-area: G;
} */

.home-category_suggest > .home-category__img {
  background: no-repeat center center / contain url('../../assets/icons/home/suggest.svg');
}

/* .home-category_memory {
  grid-area: B;
} */

.home-category_memory > .home-category__img {
  background: no-repeat center center / contain url('../../assets/icons/home/memory.svg');
}

/* .home-category_guess {
  grid-area: C;
} */

.home-category_guess > .home-category__img {
  background: no-repeat center center / contain url('../../assets/icons/home/guess.svg');
}

/* .home-category_create {
  grid-area: F;
} */

.home-category_create > .home-category__img {
  background: no-repeat center center / contain url('../../assets/icons/home/create.svg');
}

/* .home-category_sloth {
  grid-area: E;
} */

.home-category_sloth > .home-category__img {
  background: no-repeat center center / contain url('../../assets/icons/home/sloth.svg');
}

.home-category__img {
  height: 100px;
  width: 100%;
  border-radius: 50%;
  transition: 0.3s;
  /* background: v-bind(background); */
}

.home-category__name {
  text-align: center;
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

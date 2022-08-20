<template>
  <div class="home">
    <div class="home__about">
      <div class="home__logo"></div>
      <div class="home__wrapper">
        <router-link to="/about">{{ $t('about.title') }}</router-link>
      </div>
    </div>
    <div class="home__menu">
      <home-category
        v-for="(category, i) in categories"
        :key="`${i}_${category}`"
        :category="category"
        @click="handleCategoryClick(category)"
      ></home-category>
      <!-- <router-link to="/profile">{{ $t('profile.title') }}</router-link>
      <router-link to="/catalog">{{ $t('catalog.title') }}</router-link>
      <router-link to="/create">{{ $t('create.title') }}</router-link>
      <router-link to="/guess">{{ $t('guess.title') }}</router-link>
      <router-link to="/memory">{{ $t('memory.title') }}</router-link>
      <router-link to="/suggest">{{ $t('suggest.title') }}</router-link> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeCategory from '@/components/home/HomeCategory.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    HomeCategory,
  },

  data(): {categories: string[]} {
    return {
      // categories: ['catalog', 'profile', 'memory', 'guess', 'create', 'suggest'],
      categories: ['catalog', 'profile', 'suggest'],
    }
  },

  methods: {
    handleCategoryClick(category: string): void {
      console.log(category)
    }
  }
});
</script>

<style scoped>
.home {
  display: flex;
  gap: 20px;
  padding: 30px;
  height: 100%;
}

.home__about {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home__menu {
  flex: 1;
  position: relative;
}
</style>

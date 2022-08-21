<template>
  <div class="home">
    <home-about></home-about>
    <div class="home__menu">
      <home-category
        v-for="(category, i) in categories"
        :key="`${i}_${category}`"
        :category="category"
        @click="handleCategoryClick(category)"
      ></home-category>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeCategory from '../components/home/HomeCategory.vue';
import HomeAbout from '../components/home/HomeAbout.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    HomeCategory,
    HomeAbout,
  },

  data(): { categories: string[] } {
    return {
      categories: ['catalog', 'profile', 'memory', 'guess', 'create', 'suggest', 'sloth'],
    };
  },

  methods: {
    handleCategoryClick(category: string): void {
      if (category === 'sloth') {
        alert('Здесь что-нибудь будет по ленивцу');
      } else {
        this.$router.push({ name: `${category}` });
      }
    },
  },
});
</script>

<style scoped>
.home {
  display: flex;
  gap: 20px;
  padding: 30px;
  height: 100%;
}

.home__menu {
  flex: 1;
  position: relative;
  display: grid;
  justify-items: start;
  align-items: center;
  justify-content: center;
  gap: 20px;
  grid-template-columns: repeat(4, 150px);
  grid-template-rows: repeat(4, 150px);
  grid-template-areas:
    'A A B Z'
    'D D B C'
    'D D E F'
    'G G E Y';
  margin: 0 auto;
}
</style>

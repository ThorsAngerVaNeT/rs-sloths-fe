<template>
  <div class="home">
    <home-about></home-about>
    <home-catalog></home-catalog>
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
import HomeCatalog from '../components/home/HomeCatalog.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    HomeCategory,
    HomeAbout,
    HomeCatalog,
  },

  data(): { categories: string[] } {
    return {
      categories: ['profile', 'memory', 'guess', 'create', 'suggest', 'sloth'],
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
  height: 100%;
  display: grid;
  gap: 80px;
  /* padding: 30px; */
  justify-items: center;
  align-items: center;
  justify-content: center;
  grid-template-columns: 300px 400px 300px;
  margin: 0 auto;
}

.home__menu {
  display: grid;
  justify-items: center;
  justify-content: center;
  grid-template-columns: repeat(2, 140px);
  grid-template-rows: repeat(3, 170px);
  gap: 50px 10px;
}
</style>

<template>
  <div class="game-info">
    <div class="title">{{ isAdmin ? 'all results' : userId }}</div>
    <div v-for="(res, index) in results" :key="index">
      {{ res.result }} {{ res.createdAt }} {{ isAdmin ? res.userId : '' }}
    </div>

    <home-category category="guess" @click="$router.push({ name: 'guess' })"></home-category>
  </div>
</template>

<script lang="ts">
import type { GameResult } from '@/common/types';
import { defineComponent } from 'vue';
// import CustomBtn from '@/components/buttons/CustomBtn.vue';
import HomeCategory from '@/components/home/HomeCategory.vue';
import { errorHandler } from '@/services/error-handling/error-handler';
import { GameResultService } from '@/services/game-result-service';
import { GUESS_GAME_ID } from '@/common/const';

export default defineComponent({
  name: 'GuessInfo',

  components: {
    // CustomBtn,
    HomeCategory,
  },

  data() {
    return {
      count: 0,
      results: [] as GameResult[],
    };
  },

  props: {
    userId: {
      type: String,
      default: '',
    },
  },

  computed: {
    isAdmin() {
      return this.$route.name === 'admin';
    },
  },

  async mounted() {
    await this.getGameInfo();
  },

  methods: {
    async getGameInfo() {
      try {
        const service = new GameResultService(GUESS_GAME_ID, this.userId);

        const res = await service.getAll();
        if (!res.ok) throw Error(); // todo

        this.count = res.data.count;
        this.results = res.data.items;
      } catch (error) {
        errorHandler(error);
      }
    },
  },
});
</script>

<template>
  <div class="game-info">
    <div class="title">{{ isAdmin ? 'all results' : userId }}</div>
    <div v-for="(res, index) in gameResults" :key="index">
      {{ res.level }}
      <div v-for="(r, i) in res.results" :key="i">{{ r.result }} {{ r.createdAt }} {{ isAdmin ? r.userId : '' }}</div>
    </div>

    <home-category category="memory" @click="$router.push({ name: 'memory' })"></home-category>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import CustomBtn from '@/components/buttons/CustomBtn.vue';
import HomeCategory from '@/components/home/HomeCategory.vue';
import { MEMORY_LEVELS } from '@/common/const';
import { GameResultService } from '@/services/game-result-service';
import type { GameResult, MemoryLevel } from '@/common/types';
import { errorHandler } from '@/services/error-handling/error-handler';

type MemoryLevelResult = MemoryLevel & { count: number; results: GameResult[] };

export default defineComponent({
  name: 'MemoryInfo',

  components: {
    // CustomBtn,
    HomeCategory,
  },

  data() {
    return {
      gameResults: [] as MemoryLevelResult[],
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
        MEMORY_LEVELS.forEach(async (level) => {
          const service = new GameResultService(level.gameId, this.userId);

          const res = await service.getAll();
          if (!res.ok) throw Error(); // todo

          this.gameResults.push({
            level: level.level,
            n: level.n,
            gameId: level.gameId,
            count: res.data.count,
            results: res.data.items,
          });
        });
      } catch (error) {
        errorHandler(error);
      }
    },
  },
});
</script>

<template>
  <div class="game-info">
    <div class="game-info__title">{{ isAdmin ? $t('results.all') : $t('results.user') }}</div>
    <div class="game-info__wrap">
      <div class="game-info__level" v-for="(res, index) in gameResults" :key="index">
        <h4 class="result__level__title">{{ $t(`memory.${res.level}`) }}</h4>
        <div class="game-info__result" v-for="(r, i) in res.results" :key="i">
          <!-- {{ r.result }} {{ r.createdAt }} {{ isAdmin ? r.userId : '' }} -->
          <span class="result__index">{{ `${i + 1}.` }}</span>
          <span class="result__steps">{{
            `${handleResultString(r.result).steps} ${getStepsText(handleResultString(r.result).steps)}`
          }}</span>
          <span class="result__time">{{ `${handleResultString(r.result).time} s` }}</span>
        </div>
      </div>
    </div>
    <div class="game-info__again">
      <div class="game-info__title">{{ isAdmin ? '' : $t('results.again') }}</div>
      <home-category category="memory" @click="$router.push({ name: 'memory' })"></home-category>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';
// import CustomBtn from '@/components/buttons/CustomBtn.vue';
import HomeCategory from '@/components/home/HomeCategory.vue';
import { ruNounEnding } from '@/utils/ru-noun-ending';
import { MEMORY_LEVELS } from '@/common/const';
import { GameResultService } from '@/services/game-result-service';
import type { GameResult, MemoryLevel } from '@/common/types';
import { errorHandler } from '@/services/error-handling/error-handler';
import useLoader from '@/stores/loader';

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
    ...mapWritableState(useLoader, ['isLoad']),
    isAdmin() {
      return this.$route.name === 'admin';
    },
  },
  async mounted() {
    await this.getGameInfo();
  },

  methods: {
    async getGameInfo() {
      this.isLoad = true;
      try {
        MEMORY_LEVELS.map(async (level) => {
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

        // for (let level of MEMORY_LEVELS) {
        //   const service = new GameResultService(level.gameId, this.userId);

        //   const res = await service.getAll();
        //   if (!res.ok) throw Error(); // todo

        //   this.gameResults.push({
        //     level: level.level,
        //     n: level.n,
        //     gameId: level.gameId,
        //     count: res.data.count,
        //     results: res.data.items,
        //   });
        // }
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    handleResultString(val: string) {
      return JSON.parse(val);
    },

    getStepsText(val: number): string {
      return ruNounEnding(val, this.$t('memory.steps1'), this.$t('memory.steps2'), this.$t('memory.stepsN'));
    },
  },
});
</script>

<style scoped>
.game-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-info__title {
  color: var(--color-text);
  font-size: 2.4rem;
}

.game-info__wrap {
  display: flex;
  gap: 2rem;
}

.game-info__level {
  width: 25rem;
  min-height: 25rem;
  border-radius: 1rem;
  border: 0.2rem solid var(--color-border-inverse);
  background-color: var(--color-background-opacity);
  color: var(--color-text);
}

.result__level__title {
  text-align: center;
  padding: 1rem;
  font-size: 2.4rem;
}

.game-info__result {
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--color-text);
}

.result__index {
  width: 3rem;
}

.result__steps {
  flex: 1;
}

.result__time {
  width: 8rem;
}

.game-info__again {
  display: flex;
  align-items: center;
  gap: 2rem;
}
</style>

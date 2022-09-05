<template>
  <div class="game-info">
    <div class="game-info__title">{{ isAdmin ? $t('results.all') : $t('results.user') }}</div>
    <div class="game-info__wrap">
      <div
        class="game-info__level"
        :class="isAdmin ? 'game-info__level_admin' : ''"
        v-for="(res, index) in gameResults"
        :key="index"
      >
        <h4 class="result__level__title">{{ $t(`memory.${res.level}`) }}</h4>
        <div class="game-info__result" v-for="(r, i) in res.results" :key="i">
          <span class="result__index">{{ `${i + 1}.` }}</span>
          <span class="result__user" v-show="isAdmin">{{ `${r.user.name}` }}</span>
          <span class="result__steps">{{ `${r.count} ${getStepsText(r.count)}` }}</span>
          <span class="result__time">{{ `${r.time / 1000} s` }}</span>
        </div>
      </div>
    </div>
    <div class="game-info__again" v-show="!isAdmin">
      <div class="game-info__title">{{ $t('results.again') }}</div>
      <home-category category="memory" @click="$router.push({ name: 'memory' })"></home-category>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';
import HomeCategory from '@/components/home/HomeCategory.vue';
import { ruNounEnding } from '@/utils/ru-noun-ending';
import { MEMORY_LEVELS } from '@/common/const';
import { GameResultService } from '@/services/game-result-service';
import type { GameResult, MemoryLevel, APIRequestResult, GetList } from '@/common/types';
import { errorHandler } from '@/services/error-handling/error-handler';
import useLoader from '@/stores/loader';

type MemoryLevelResult = MemoryLevel & { count: number; results: GameResult[] };

export default defineComponent({
  name: 'MemoryInfo',

  components: {
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
        const promises: Promise<APIRequestResult<GetList<GameResult>>>[] = [];
        MEMORY_LEVELS.forEach((level) => {
          const service = new GameResultService(level.gameId, this.userId);
          const res = service.getAll();
          promises.push(res);
        });

        const results = await Promise.all(promises);
        results.forEach((result, i) => {
          if (!result.ok) throw Error(); // todo
          this.gameResults.push({
            level: MEMORY_LEVELS[i].level,
            n: MEMORY_LEVELS[i].n,
            gameId: MEMORY_LEVELS[i].gameId,
            count: result.data.count,
            results: result.data.items,
          });
        });
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
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
  gap: 2rem;
}

.game-info__title {
  padding-top: 1rem;
  color: var(--color-text);
  font-size: 2.4rem;
  transition: 0.5s ease;
}

.game-info__wrap {
  display: flex;
  gap: 2rem;
}

.game-info__level {
  width: 25rem;
  min-height: 25rem;
  max-height: 34rem;
  overflow-y: auto;
  border-radius: 1rem;
  border: 0.2rem solid var(--color-border-inverse);
  background-color: var(--color-background-opacity);
  color: var(--color-text);
  transition: 0.5s ease;
}

.game-info__level_admin {
  width: 37rem;
}

.result__level__title {
  text-align: center;
  padding: 1rem;
  font-size: 2.4rem;
  transition: 0.5s ease;
}

.game-info__result {
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--color-text);
  transition: 0.5s ease;
}

.result__index {
  width: 3rem;
}

.result__user {
  width: 11rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  transition: 0.5s ease;
}

@media (max-width: 1200px) {
  .game-info__title {
    text-align: center;
  }

  .game-info__wrap {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>

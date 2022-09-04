<template>
  <div class="game-info">
    <div class="game-info__title">{{ isAdmin ? $t('results.all') : $t('results.user') }}</div>
    <div class="results">
      <div class="results__item" v-for="(res, index) in results" :key="index">
        <span class="result__index">{{ `${index + 1}.` }}</span>
        <span class="result__user">{{ `${res.user.name}` }}</span>
        <span class="result__steps">{{ `${res.count} p` }}</span>
        <span class="result__time">{{ `${res.time / 1000} s` }}</span>
      </div>
    </div>

    <div class="game-info__again">
      <div class="game-info__title">{{ isAdmin ? '' : $t('results.again') }}</div>
      <home-category category="guess" @click="$router.push({ name: 'guess' })"></home-category>
    </div>
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
import useLoader from '@/stores/loader';
import { mapWritableState } from 'pinia';

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
        const service = new GameResultService(GUESS_GAME_ID, this.userId);

        const res = await service.getAll();
        if (!res.ok) throw Error(); // todo

        this.count = res.data.count;
        this.results = res.data.items;
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
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

.results {
  padding: 1rem;
  width: 37rem;
  min-height: 25rem;
  max-height: 34rem;
  overflow-y: auto;
  border-radius: 1rem;
  border: 0.2rem solid var(--color-border-inverse);
  background-color: var(--color-background-opacity);
  color: var(--color-text);
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.results__item {
  display: flex;
  align-items: center;
  gap: 2rem;
  color: var(--color-text);
}

.result__index {
  width: 3rem;
  font-weight: 700;
}

.result__user {
  width: 11rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result__steps {
  width: 5rem;
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

  .results,
  .game-info__again {
    justify-content: center;
  }
}
</style>

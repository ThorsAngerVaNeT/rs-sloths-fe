<template>
  <div class="memory">
    <h2>{{ $t('memory.title') }}</h2>
    <h3>{{ $t('memory.level') }}</h3>
    <div class="memory__level">
      <div v-for="(level, index) in levels" :key="index" class="btn btn-img" @click="setLevel(index)">
        <img :src="getImg(index)" :alt="$t(getText(index))" />
      </div>
    </div>
    <game-field :level="levels[level]"></game-field>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameField from '../components/memory/GameField.vue';
import { MEMORY_LEVELS } from '../common/const';

export default defineComponent({
  name: 'MemoryView',

  components: {
    GameField,
  },

  data() {
    return {
      levels: MEMORY_LEVELS,
      level: 1,
    };
  },

  methods: {
    getText(i: number): string {
      return `memory.${this.levels[i].level}`;
    },

    getImg(i: number): string {
      return `./memory-level-${this.levels[i].level}.png`;
    },

    setLevel(i: number) {
      this.level = i;
    },
  },
});
</script>

<style scoped>
.memory {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.memory__level {
  display: flex;
  justify-content: center;
}
</style>

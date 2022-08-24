<template>
  <div class="memory">
    <h2>{{ $t('memory.title') }}</h2>
    <h3>{{ $t('memory.level') }}: {{ $t(getLevel) }}</h3>
    <div class="memory__level">
      <div
        v-for="(level, index) in levels"
        :key="index"
        class="btn btn-img memory__btn"
        :class="{ active: activeLevel === index }"
        @click="setLevel(index)"
      >
        <img :src="getImg(index)" :alt="$t(getText(index))" />
      </div>
    </div>
    <game-field :level="levels[activeLevel]"></game-field>
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
      activeLevel: 1,
    };
  },
  computed: {
    getLevel(): string {
      return `memory.${this.levels[this.activeLevel].level}`;
    },
  },

  methods: {
    getText(i: number): string {
      return `memory.${this.levels[i].level}`;
    },

    getImg(i: number): string {
      return `./memory-level-${this.levels[i].level}.png`;
    },

    setLevel(i: number) {
      this.activeLevel = i;
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

h3 {
  padding: 1em;
}
.memory__level {
  display: flex;
  justify-content: center;
}
.memory__btn img {
  width: 150px;
  height: 150px;

  border-radius: 50%;

  background-color: lightgray;
}

.active img {
  box-shadow: 0px 0px 5px;
}
</style>

<template>
  <div class="memory">
    <div class="memory__aside list-aside">
      <h3 class="memory__subtitle">{{ $t('memory.level') }}</h3>
      <h2 class="memory__title">{{ $t(getLevel) }}</h2>
      <div class="memory__level">
        <div
          v-for="(level, index) in levels"
          :key="index"
          class="btn btn-img memory__btn"
          :class="{ active_lvl: activeLevel === index }"
          @click="setLevel(index)"
        >
          <img :src="getImg(index)" :alt="$t(getText(index))" />
        </div>
      </div>
    </div>
    <div class="memory__main list-main">
      <game-field :level="levels[activeLevel]"></game-field>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameField from '@/components/memory/GameField.vue';
import { MEMORY_LEVELS } from '@/common/const';
import usePagesStore from '@/stores/pages-store';

const { getPageMemoryState, setPageMemoryState } = usePagesStore();

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

  mounted() {
    const str = getPageMemoryState();
    if (!str) return;

    const data = JSON.parse(str);
    if (!data) return;

    this.activeLevel = data.activeLevel;
  },

  beforeRouteLeave() {
    setPageMemoryState(JSON.stringify(this.$data));
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
  padding: 0 3rem;
  display: flex;
  gap: 2rem;
}

.memory__aside {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  color: var(--color-text);
}

.memory__title,
.memory__subtitle {
  transition: 0.5s ease;
}

.memory__main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.memory__level {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.memory__btn img {
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  background-color: lightgray;
}

.active_lvl img {
  box-shadow: 0px 0px 5px;
  border-color: var(--red-active);
}

@media (max-width: 1200px) {
  .memory__aside {
    width: 15rem;
  }

  .memory__btn img {
    width: 10rem;
    height: 10rem;
  }
}
</style>

<template>
  <div class="game-field">
    <h3>{{ level.level }}</h3>
    <div class="game-field__cards">
      <div class="game-field__card" v-for="(item, index) in cards" :key="index" :item="item" @click="openCard(index)">
        {{ item.id }}
        <img class="game-field__img" :src="getImage(index)" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { MEMORY_LEVELS, MEMORY_START_TIMEOUT } from '../../common/const';
import type { MemoryLevel } from '../../common/types';

const cardCover = './card-cover.png';

type Card = {
  img: string;
  id: number;
  open: boolean;
  guess: boolean;
};

export default defineComponent({
  name: 'GameField',

  data() {
    return {
      cards: [] as Card[],
      gameStage: 0,
      steps: 0,
      startTime: 0,
    };
  },

  props: {
    level: {
      type: Object as PropType<MemoryLevel>,
      default: MEMORY_LEVELS[0],
    },
  },

  computed: {},

  mounted() {
    this.randomGame(this.level.n);
  },

  methods: {
    async getCards() {
      // todo fetch

      return ['./default-user.png', './guess-game.png', './memory-game.png', './suggest-game.png'];
    },

    async randomGame(n: number) {
      const images = await this.getCards();

      const res: Card[] = [];

      images
        .sort(() => Math.random() - 0.5)
        .filter((el, i) => i < n)
        .forEach((el, index) => {
          res.push({
            img: el,
            id: index,
            open: true,
            guess: false,
          });
          res.push({
            img: el,
            id: index,
            open: true,
            guess: false,
          });
        });

      res.sort(() => Math.random() - 0.5);

      this.cards = res;
      this.gameStage = 0;

      setTimeout(() => {
        this.cards.forEach((el, i) => this.closeCard(i));
        this.gameStage = 1;
        this.steps = 0;
        this.startTime = Date.now();
      }, MEMORY_START_TIMEOUT);
    },

    getImage(i: number) {
      return this.cards[i].open ? this.cards[i].img : cardCover;
    },

    openCard(i: number) {
      this.cards[i].open = true;
    },

    closeCard(i: number) {
      this.cards[i].open = false;
    },
  },
});
</script>

<style scoped>
.game-field {
  margin: 0 auto;
}
.game-field__cards {
  display: grid;
  grid-template-columns: repeat(4, 200px);
  gap: 1em;
}
.game-field__img {
  display: inline-block;
  width: 200px;
  height: 300px;
  overflow: hidden;

  border-radius: 1em;
}
</style>

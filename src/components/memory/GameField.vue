<template>
  <div class="game-field">
    <h3>{{ level.level }}</h3>
    <custom-btn :text="$t('memory.start')" className="btn btn-primary" :onClick="startGame"></custom-btn>
    <div class="game-field__cards">
      <div class="game-field__card" v-for="(item, index) in cards" :key="index" :item="item" @click="openCard(index)">
        <img class="game-field__img" :src="getImage(index)" alt="" />
      </div>
    </div>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import CustomBtn from '../buttons/CustomBtn.vue';
import { MEMORY_GAME_TIMEOUT, MEMORY_LEVELS, MEMORY_START_TIMEOUT } from '../../common/const';
import type { MemoryLevel } from '../../common/types';

const cardCover = './card-cover.png';

type Card = {
  img: string;
  id: number;
  open: boolean;
};

export default defineComponent({
  name: 'GameField',

  components: {
    CustomBtn,
  },

  data() {
    return {
      images: [] as string[],
      cards: [] as Card[],
      steps: 0,
      startTime: 0,
      activeCard: Infinity,
      message: '',
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
    this.getCards();
  },

  methods: {
    async getCards() {
      // todo fetch

      this.images = ['./default-user.png', './guess-game.png', './memory-game.png', './suggest-game.png'];
    },

    async startGame() {
      const images = [...this.images];

      const res: Card[] = [];

      images
        .sort(() => Math.random() - 0.5)
        .filter((el, i) => i < this.level.n)
        .forEach((el, index) => {
          res.push({
            img: el,
            id: index,
            open: true,
          });
          res.push({
            img: el,
            id: index,
            open: true,
          });
        });

      res.sort(() => Math.random() - 0.5);

      this.cards = res;

      setTimeout(() => {
        this.cards.forEach((el, i) => this.closeCard(i));
        this.steps = 0;
        this.startTime = Date.now();
        this.activeCard = Infinity;
        this.message = '';
      }, MEMORY_START_TIMEOUT);
    },

    getImage(i: number) {
      return this.cards[i].open ? this.cards[i].img : cardCover;
    },

    openCard(i: number) {
      if (this.cards[i].open) return;

      this.cards[i].open = true;
      this.steps += 1;

      if (this.activeCard === Infinity) {
        this.activeCard = i;
      } else if (this.cards[i].id === this.cards[this.activeCard].id) {
        this.activeCard = Infinity;
      } else {
        const i1 = i;
        const i2 = this.activeCard;
        this.activeCard = Infinity;

        setTimeout(() => {
          this.closeCard(i1);
          this.closeCard(i2);
        }, MEMORY_GAME_TIMEOUT);
      }

      if (this.checkGame()) {
        this.message = `!!! Congrats !!! ${this.steps} steps, ${(Date.now() - this.startTime) / 1000} second!`;
      }
    },

    checkGame(): boolean {
      return this.cards.every((el) => el.open);
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

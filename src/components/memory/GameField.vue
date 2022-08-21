<template>
  <div class="game-field">
    <h3>{{ $t(getLevel) }}</h3>
    <custom-btn :text="$t('memory.start')" className="btn btn-primary" :onClick="startGame"></custom-btn>
    <p>steps: {{ getSteps }}</p>
    <transition-group name="flip-list" tag="div" class="game-field__cards">
      <div
        class="game-field__card"
        v-for="(item, index) in cards"
        :key="item.index"
        :item="item"
        @click="openCard(index)"
      >
        <div class="game-field__card-inner" :class="getFlip(index)">
          <img class="game-field__img game-field__img-front" :src="cardCover" alt="cover" />
          <img class="game-field__img game-field__img-back" :src="getImage(index)" alt="card" />
        </div>
      </div>
    </transition-group>
    <modal-window v-show="isModalVisible" @close="closeModal">
      <template v-slot:header> {{ $t('memory.congrats') }} </template>

      <template v-slot:body>
        <p>{{ $t('memory.win') }}</p>
        <p>{{ getSteps }} {{ $t('memory.steps') }}</p>
        <p>{{ getTime }} {{ $t('memory.time') }}</p>
      </template>
    </modal-window>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import ModalWindow from '../modal/ModalWindow.vue';
import CustomBtn from '../buttons/CustomBtn.vue';
import { MEMORY_GAME_TIMEOUT, MEMORY_LEVELS } from '../../common/const';
import type { MemoryLevel } from '../../common/types';

type Card = {
  img: string;
  index: number;
  id: number;
  open: boolean;
};

export default defineComponent({
  name: 'GameField',

  components: {
    CustomBtn,
    ModalWindow,
  },

  data() {
    return {
      cardCover: './card-cover.png',
      images: [] as string[],
      cards: [] as Card[],
      grid: 0,
      steps: 0,
      startTime: 0,
      endTime: 0,
      activeCard: Infinity,
      isModalVisible: false,
    };
  },

  props: {
    level: {
      type: Object as PropType<MemoryLevel>,
      default: MEMORY_LEVELS[0],
    },
  },

  computed: {
    getSteps() {
      return this.steps;
    },

    getLevel() {
      return `memory.${this.level.level}`;
    },

    getTime() {
      return (this.endTime - this.startTime) / 1000;
    },
  },

  mounted() {
    this.setGrid();
    this.getImages();
  },

  watch: {
    level() {
      this.getCards();
      this.setGrid();
    },
  },

  methods: {
    async getImages() {
      // todo fetch

      this.images = [
        './default-user.png',
        './guess-game.png',
        './memory-game.png',
        './suggest-game.png',
        './test1.png',
        './test2.png',
        './test3.png',
        './test4.png',
      ];

      this.getCards();
    },

    getCards() {
      this.cards = [];
      let index = 0;

      const images = this.images.sort(() => Math.random() - 0.5).filter((el, i) => i < this.level.n);

      images.forEach((el, i) => {
        this.cards.push({ img: el, id: i, index, open: false });
        index += 1;
        this.cards.push({ img: el, id: i, index, open: false });
        index += 1;
      });

      this.cards.sort(() => Math.random() - 0.5);
    },

    async startGame() {
      this.cards.forEach((el, i) => this.closeCard(i));
      this.steps = 0;
      this.activeCard = Infinity;
      this.startTime = 0;
      this.endTime = 0;

      this.cards.sort(() => Math.random() - 0.5);
    },

    getImage(i: number) {
      // return this.cards[i].open ? this.cards[i].img : cardCover;
      return this.cards[i].img;
    },

    getFlip(i: number) {
      // return this.cards[i].open;
      return this.cards[i].open ? 'flip' : '';
    },

    openCard(i: number) {
      if (this.startTime === 0) this.startTime = Date.now();

      if (this.cards[i].open) return;

      this.cards[i].open = true;
      this.steps += 1;

      if (this.activeCard === Infinity) {
        this.activeCard = i;
      } else if (this.cards[i].id === this.cards[this.activeCard].id) {
        this.activeCard = Infinity;
      } else {
        const i2 = this.activeCard;
        this.activeCard = Infinity;

        setTimeout(() => {
          this.closeCard(i);
          this.closeCard(i2);
        }, MEMORY_GAME_TIMEOUT);
      }

      if (this.checkGame()) {
        this.endTime = Date.now();
        this.isModalVisible = true;
      }
    },

    checkGame(): boolean {
      return this.cards.every((el) => el.open);
    },

    closeCard(i: number) {
      this.cards[i].open = false;
    },

    closeModal() {
      this.isModalVisible = false;
    },

    setGrid() {
      this.grid = this.level.n <= 6 ? this.level.n : 6;
    },
  },
});
</script>

<style scoped>
.game-field {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game-field__cards {
  margin: 1em;

  display: grid;
  grid-template-columns: repeat(v-bind(grid), 150px);
  gap: 1em;
}

.game-field__card {
  width: 150px;
  height: 200px;

  perspective: 600px;
}

.game-field__card-inner {
  position: relative;
  width: 100%;
  height: 100%;

  cursor: pointer;

  transition: transform 1s;
  transform-style: preserve-3d;
}

.game-field__img {
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;

  backface-visibility: hidden;

  transition: transform 1s;
  transform-style: preserve-3d;

  overflow: hidden;
  border-radius: 1em;
}
.game-field__img:hover {
  box-shadow: 0px 0px 5px;
}

.game-field__img-back,
.flip {
  transform: rotateY(180deg);
}

.flip-list-move {
  transition: transform 0.5s;
}
</style>

<template>
  <div class="game-field">
    <h3>{{ $t(getLevel) }}</h3>
    <custom-btn :text="$t('memory.start')" className="btn btn-primary" :onClick="startGame"></custom-btn>
    <p>steps: {{ steps }}</p>
    <transition-group name="shuffle-list" tag="div" class="game-field__cards">
      <div
        class="game-field__card"
        v-for="(item, index) in cards"
        :key="item.index"
        :item="item"
        @click="gameHandler(index)"
      >
        <transition name="flip" mode="out-in" @before-leave="isAnimated = true" @after-enter="isAnimated = false">
          <img v-if="!getIsOpen(index)" :src="cardCover" alt="cover" class="game-field__img" />
          <img v-else :src="getImage(index)" alt="card" class="game-field__img" />
        </transition>
      </div>
    </transition-group>
    <modal-window v-show="getShowModal" @close="closeModal">
      <template v-slot:header> {{ $t('memory.congrats') }} </template>

      <template v-slot:body>
        <p>{{ $t('memory.win') }}</p>
        <p>{{ steps }} {{ getStepsText }}</p>
        <p>{{ getTime }} {{ $t('memory.time') }}</p>
      </template>
    </modal-window>
  </div>
</template>

<script lang="ts">
import { ruNounEnding } from '@/utils/ru-noun-ending';
import { MEMORY_GAME_COVER, MEMORY_GAME_TIMEOUT, MEMORY_LEVELS } from '@/common/const';
import type { MemoryLevel } from '@/common/types';
import { defineComponent, type PropType } from 'vue';
import ModalWindow from '@/components/modal/ModalWindow.vue';
import CustomBtn from '@/components/buttons/CustomBtn.vue';

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
      cardCover: MEMORY_GAME_COVER,
      images: [] as string[],
      cards: [] as Card[],
      activeCard: Infinity,
      steps: 0,
      startTime: 0,
      endTime: 0,
      grid: 0,
      isHandled: false,
      isAnimated: false,
      isModalVisible: false,
    };
  },

  props: {
    level: {
      type: Object as PropType<MemoryLevel>,
      default: MEMORY_LEVELS[1],
    },
  },

  computed: {
    getLevel(): string {
      return `memory.${this.level.level}`;
    },

    getStepsText(): string {
      return ruNounEnding(this.steps, this.$t('memory.steps1'), this.$t('memory.steps2'), this.$t('memory.stepsN'));
    },

    getTime(): number {
      return (this.endTime - this.startTime) / 1000;
    },

    getShowModal(): boolean {
      return this.isModalVisible && !this.isAnimated && !this.isHandled;
    },
  },

  mounted() {
    this.setGrid();
    this.getImages();
    this.startGame();
  },

  watch: {
    level() {
      this.setGrid();
      this.getCards();
      this.startGame();
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
    },

    startGame() {
      const isAllClosed = this.cards.every((el) => !el.open);

      this.cards.forEach((el, i) => this.closeCard(i));
      this.activeCard = Infinity;
      this.steps = 0;
      this.startTime = 0;
      this.endTime = 0;

      if (isAllClosed) {
        this.cards.sort(() => Math.random() - 0.5);
      } else {
        setTimeout(() => {
          this.cards.sort(() => Math.random() - 0.5);
        }, MEMORY_GAME_TIMEOUT);
      }
      setTimeout(() => {
        this.cards.sort(() => Math.random() - 0.5);
      }, MEMORY_GAME_TIMEOUT / 2);

      // this.cards.sort(() => Math.random() - 0.5);
    },

    getImage(i: number): string {
      return this.cards[i].img;
    },

    getIsOpen(i: number): boolean {
      return this.cards[i].open;
    },

    gameHandler(i: number) {
      if (this.startTime === 0) this.startTime = Date.now();

      if (this.cards[i].open) return;
      if (this.isHandled) return;
      if (this.isAnimated) return;

      this.openCard(i);
      this.steps += 1;

      if (this.activeCard === Infinity) {
        this.activeCard = i;
      } else if (this.cards[i].id === this.cards[this.activeCard].id) {
        this.activeCard = Infinity;
      } else {
        const i2 = this.activeCard;
        this.activeCard = Infinity;

        this.isHandled = true;
        setTimeout(() => {
          this.closeCard(i);
          this.closeCard(i2);
          this.isHandled = false;
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

    openCard(i: number) {
      this.cards[i].open = true;
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

.game-field__img {
  position: absolute;
  display: inline-block;

  width: 100%;
  height: 100%;

  overflow: hidden;
  border-radius: 1em;
}

.game-field__img:hover {
  box-shadow: 0px 0px 5px;
}
/* Animations */
.shuffle-list-move {
  transition: transform 0.6s;
}

.flip-enter-active {
  animation: flip-out 0.2s;
}
.flip-leave-active {
  animation: flip-in 0.2s;
}
@keyframes flip-in {
  0% {
    transform: rotateY(0deg);
    transform-style: preserve-3d;
  }
  100% {
    transform: rotateY(90deg);
    transform-style: preserve-3d;
  }
}
@keyframes flip-out {
  0% {
    transform: rotateY(270deg);
    transform-style: preserve-3d;
  }
  100% {
    transform: rotateY(360deg);
    transform-style: preserve-3d;
  }
}
</style>

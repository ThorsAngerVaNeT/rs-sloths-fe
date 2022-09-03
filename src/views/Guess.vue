<template>
  <div class="guess">
    <custom-btn :text="$t('guess.start')" className="btn btn-primary" :onClick="startGame"></custom-btn>

    <div v-for="(item, index) in gameCards" :key="index" v-show="index === step">
      <img :src="item.guess.img" :alt="$t('guess.guess')" />
      <div class="guess__answers">
        <span
          v-for="(answer, i) in item.answers"
          :key="i"
          :class="`guess__answer ${getClassStepSelect(i)}`"
          @click="setAnswer(index, i)"
        >
          {{ i + 1 }} - {{ answer.caption }}
        </span>
      </div>
    </div>
    <custom-btn :text="$t('pagination.next')" className="btn btn-pagination" :onClick="nextStep"></custom-btn>
    <div class="guess__results">
      <div v-for="(res, index) in result" :key="index" :class="`guess__result ${getClassStepResult(index)}`"></div>
    </div>

    <modal-window v-show="isModalVisible" @close="closeModal">
      <template v-slot:header> {{ $t('guess.congrats') }} </template>

      <template v-slot:body>
        <img :src="cardWinner" alt="winner" />
        <p>{{ $t('guess.win') }}</p>
        <!-- <p>{{ steps }} {{ getStepsText }}</p>
      <p>{{ getTime }} {{ $t('memory.time') }}</p> -->
      </template>
    </modal-window>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalWindow from '@/components/modal/ModalWindow.vue';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import { GUESS_GAME_WINNER } from '@/common/const';

type Card = {
  caption: string;
  img: string;
};

type GameCard = {
  guess: Card;
  answers: Card[];
};

export default defineComponent({
  name: 'GuessView',

  components: {
    CustomBtn,
    ModalWindow,
  },

  data() {
    return {
      guesses: [] as Card[],
      answers: [] as Card[],
      gameCards: [] as GameCard[],
      result: [] as boolean[],
      step: 0,
      stepSelection: -1,
      stepAnswer: false,
      cardWinner: GUESS_GAME_WINNER,
      isModalVisible: false,
    };
  },

  mounted() {
    this.initCards();
    this.startGame();
  },

  methods: {
    initCards() {
      this.guesses = [
        { caption: 'Student 1', img: './test01.png' },
        { caption: 'Git problem', img: './test02.png' },
        { caption: 'Samurai', img: './test03.png' },
        { caption: 'Thanks', img: './test04.png' },
        { caption: 'Popcorn', img: './test05.png' },
        { caption: 'WTF?', img: './test06.png' },
        { caption: 'Shocked', img: './test07.png' },
        { caption: 'Junior', img: './test08.png' },
        { caption: 'Middle', img: './test09.png' },
        { caption: 'Senior', img: './test10.png' },
      ];

      this.answers = [
        { caption: 'Student 1', img: './test01.png' },
        { caption: 'Git problem', img: './test02.png' },
        { caption: 'Samurai', img: './test03.png' },
        { caption: 'Thanks', img: './test04.png' },
        { caption: 'Popcorn', img: './test05.png' },
        { caption: 'WTF?', img: './test06.png' },
        { caption: 'Shocked', img: './test07.png' },
        { caption: 'Junior', img: './test08.png' },
        { caption: 'Middle', img: './test09.png' },
        { caption: 'Senior', img: './test10.png' },
        { caption: 'Fine', img: './test11.png' },
        { caption: 'Love', img: './test12.png' },
      ];
    },

    startGame() {
      this.getGameCards();
    },

    getGameCards() {
      const gameCards = [] as GameCard[];
      this.result = [];

      this.guesses.forEach((guess) => {
        const newGameCard = {} as GameCard;
        newGameCard.guess = guess;

        const trueCard = this.answers.filter((el) => el.caption === guess.caption);
        const answers = this.answers
          .filter((el) => el.caption !== guess.caption)
          .sort(() => Math.random() - 0.5)
          .filter((el, i) => i < 3);
        answers.push(trueCard[0]);

        newGameCard.answers = answers.sort(() => Math.random() - 0.5);

        gameCards.push(newGameCard);
        this.result.push(false);
      });

      this.gameCards = gameCards.sort(() => Math.random() - 0.5);
      this.step = 0;
      this.stepSelection = -1;
      this.stepAnswer = false;
    },

    setAnswer(guess: number, answer: number) {
      this.stepSelection = answer;
      this.stepAnswer = this.gameCards[guess].guess.caption === this.gameCards[guess].answers[answer].caption;
    },

    nextStep() {
      this.result[this.step] = this.stepAnswer;
      this.step += 1;
      this.stepAnswer = false;
      this.stepSelection = -1;
    },

    getClassStepResult(i: number) {
      if (i >= this.step) return '';
      return this.result[i] ? 'is-guess' : 'is-not-guess';
    },

    getClassStepSelect(i: number) {
      return i === this.stepSelection ? 'active' : '';
    },

    closeModal() {
      this.isModalVisible = false;
    },
  },
});
</script>

<style>
.guess__answers {
  padding: 0.5rem 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--gap) / 2);

  color: var(--color-text);
}

.guess__answer {
  padding: 0.5rem 0.7rem;
  cursor: pointer;

  color: var(--color-text);
  background-color: var(--color-background-soft);
  border: 0.2rem solid var(--color-border-theme);
  border-radius: 0.5rem;
  text-decoration: none;
}

.guess__answer:hover {
  border-color: var(--color-border-inverse);
}

.active {
  color: var(--color-text-inverse);
  background-color: var(--color-background-inverse);
  border-color: var(--color-border-inverse);
}

.guess__result {
  display: inline-block;
  margin: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: gray;
}

.is-guess {
  background-color: var(--green-active);
}

.is-not-guess {
  background-color: var(--red-active);
}
</style>

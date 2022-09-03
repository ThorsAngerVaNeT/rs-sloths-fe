<template>
  <div class="guess">
    <custom-btn :text="$t('guess.start')" className="btn btn-primary" :onClick="startGame"></custom-btn>

    <div v-for="(item, index) in gameCards" :key="index" v-show="index === step">
      <img :src="item.guess.img" :alt="$t('guess.guess')" class="guess__img" />
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
    <custom-btn :text="$t('guess.next')" className="btn btn-primary" :onClick="nextStep"></custom-btn>
    <div class="guess__results">
      <div v-for="(res, index) in result" :key="index" :class="`guess__result ${getClassStepResult(index)}`"></div>
    </div>

    <modal-window v-show="isModalVisible" @close="closeModal">
      <template v-slot:header> {{ $t('guess.congrats') }} </template>

      <template v-slot:body>
        <img :src="allGuesses ? cardWinnerAll : cardWinner" alt="winner" />
        <p>{{ allGuesses ? `${$t('guess.win')} ` : '' }}{{ $t('guess.result') }}</p>
        <p>{{ getGuesses }} / {{ gameCards.length }} {{ $t('guess.guesses') }}</p>
        <p>{{ getTime / 1000 }} {{ $t('memory.time') }}</p>
      </template>
    </modal-window>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalWindow from '@/components/modal/ModalWindow.vue';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import { GUESS_GAME_WINNER, GUESS_GAME_WINNER_ALL, GUESS_GAME_ID } from '@/common/const';
import { playAudio, audioWin, audioSadTrombone } from '@/utils/audio';
import type { GameResult } from '@/common/types';
import { GameResultService } from '@/services/game-result-service';

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
      startTime: 0,
      endTime: 0,
      step: 0,
      stepSelection: -1,
      stepAnswer: false,
      cardWinner: GUESS_GAME_WINNER,
      cardWinnerAll: GUESS_GAME_WINNER_ALL,
      isModalVisible: false,
    };
  },

  computed: {
    getGuesses(): number {
      return this.result.filter((el) => el).length;
    },

    allGuesses(): boolean {
      return this.getGuesses === this.gameCards.length;
    },

    getTime(): number {
      return this.endTime - this.startTime;
    },
  },

  mounted() {
    this.initCards();
    this.startGame();
  },

  methods: {
    initCards() {
      this.guesses = [
        { caption: 'Student 1', img: './test01.svg' },
        { caption: 'Git problem', img: './test02.svg' },
        { caption: 'Samurai', img: './test03.svg' },
        { caption: 'Thanks', img: './test04.svg' },
        { caption: 'Popcorn', img: './test05.svg' },
        { caption: 'WTF?', img: './test06.svg' },
        { caption: 'Shocked', img: './test07.svg' },
        { caption: 'Junior', img: './test08.svg' },
        { caption: 'Middle', img: './test09.svg' },
        { caption: 'Senior', img: './test10.svg' },
      ];

      this.answers = [
        { caption: 'Student 1', img: './test01.svg' },
        { caption: 'Git problem', img: './test02.svg' },
        { caption: 'Samurai', img: './test03.svg' },
        { caption: 'Thanks', img: './test04.svg' },
        { caption: 'Popcorn', img: './test05.svg' },
        { caption: 'WTF?', img: './test06.svg' },
        { caption: 'Shocked', img: './test07.svg' },
        { caption: 'Junior', img: './test08.svg' },
        { caption: 'Middle', img: './test09.svg' },
        { caption: 'Senior', img: './test10.svg' },
        { caption: 'Fine', img: './test11.svg' },
        { caption: 'Love', img: './test12.svg' },
      ];
    },

    startGame() {
      this.getGameCards();

      this.endTime = 0;
      this.startTime = Date.now();
      this.step = 0;
      this.stepSelection = -1;
      this.stepAnswer = false;
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
    },

    setAnswer(guess: number, answer: number) {
      this.stepSelection = answer;
      this.stepAnswer = this.gameCards[guess].guess.caption === this.gameCards[guess].answers[answer].caption;
    },

    nextStep() {
      this.result[this.step] = this.stepAnswer;

      if (this.stepAnswer) {
        playAudio(audioWin);
      } else {
        playAudio(audioSadTrombone);
      }

      this.step += 1;
      this.stepAnswer = false;
      this.stepSelection = -1;

      if (this.step === this.gameCards.length) {
        // end
        this.endTime = Date.now();
        playAudio(audioWin);
        this.isModalVisible = true;
        this.saveResult();
      }
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

    async saveResult() {
      const service = new GameResultService(GUESS_GAME_ID);
      const gameResult: GameResult = {
        gameId: GUESS_GAME_ID,
        count: this.getGuesses,
        time: this.getTime,
      };
      await service.create(gameResult);
    },
  },
});
</script>

<style>
.guess {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.guess__img {
  position: relative;
  height: 40rem;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

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

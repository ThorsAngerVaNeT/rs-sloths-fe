<template>
  <div class="guess">
    <custom-btn :text="$t('guess.start')" className="btn btn-primary" :onClick="startGame"></custom-btn>
    test
    <div v-for="(item, index) in gameCards" :key="index">
      guess {{ item.guess.caption }}
      <span v-for="(it, i) in item.answers" :key="i">{{ it.caption }} / </span>
    </div>
    end test

    <div v-for="(item, index) in gameCards" :key="index" v-show="index === step">
      <img :src="item.guess.img" :alt="$t('guess.guess')" />{{ stepAnswer }}
      <div v-for="(answer, i) in item.answers" :key="i" class="btn btn-guess" @click="setAnswer(index, i)">
        {{ i + 1 }} - {{ answer.caption }}
      </div>
    </div>
    <custom-btn :text="$t('pagination.next')" className="btn btn-pagination" :onClick="nextStep"></custom-btn>
    result
    <span v-for="(res, index) in result" :key="index">{{ index }} - {{ res }} /</span>

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
    },

    setAnswer(guess: number, answer: number) {
      this.stepAnswer = this.gameCards[guess].guess.caption === this.gameCards[guess].answers[answer].caption;
    },

    nextStep() {
      this.result[this.step] = this.stepAnswer;
      this.step += 1;
    },

    closeModal() {
      this.isModalVisible = false;
    },
  },
});
</script>

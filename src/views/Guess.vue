<template>
  <div class="guess">
    <custom-btn :text="$t('guess.start')" className="btn btn-primary" :onClick="startGame"></custom-btn>

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

export default defineComponent({
  name: 'GuessView',

  components: {
    CustomBtn,
    ModalWindow,
  },

  data() {
    return {
      guess: [] as Card[],
      answers: [] as Card[],
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
      this.guess = [
        { caption: 'test01', img: './test01.png' },
        { caption: 'test02', img: './test02.png' },
        { caption: 'test03', img: './test03.png' },
        { caption: 'test04', img: './test04.png' },
        { caption: 'test05', img: './test05.png' },
        { caption: 'test06', img: './test06.png' },
        { caption: 'test07', img: './test07.png' },
        { caption: 'test08', img: './test08.png' },
        { caption: 'test09', img: './test09.png' },
        { caption: 'test10', img: './test10.png' },
      ];

      this.answers = [
        { caption: 'test01', img: './test01.png' },
        { caption: 'test02', img: './test02.png' },
        { caption: 'test03', img: './test03.png' },
        { caption: 'test04', img: './test04.png' },
        { caption: 'test05', img: './test05.png' },
        { caption: 'test06', img: './test06.png' },
        { caption: 'test07', img: './test07.png' },
        { caption: 'test08', img: './test08.png' },
        { caption: 'test09', img: './test09.png' },
        { caption: 'test10', img: './test10.png' },
      ];
    },

    startGame() {},

    closeModal() {
      this.isModalVisible = false;
    },
  },
});
</script>

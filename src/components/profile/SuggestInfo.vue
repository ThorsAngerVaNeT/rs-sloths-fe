<template>
  <div class="game-info">
    <div class="title">{{ id }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { errorHandler } from '../../services/error-handling/error-handler';

// const service = new UsersService();

export default defineComponent({
  name: 'SuggestInfo',

  data() {
    return {
      gameInfo: {
        id: '',
        title: '',
      },
    };
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {},

  mounted() {
    this.getGameInfo();
  },

  methods: {
    async getGameInfo() {
      //   try {
      //     const res = await service.getById(this.id);
      //     if (!res) throw Error(); // todo
      //     this.userInfo = res.data;
      //   } catch (error) {
      //     errorHandler(error);
      //   }
    },
  },
});
</script>

<style scoped></style>

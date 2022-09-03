<template>
  <div class="game-info">
    <div class="game-info__again">
      <home-category category="suggest" @click="$router.push({ name: 'suggest' })"></home-category>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeCategory from '@/components/home/HomeCategory.vue';
// import { errorHandler } from '../../services/error-handling/error-handler';

// const service = new UsersService();

export default defineComponent({
  name: 'SuggestInfo',

  components: {
    HomeCategory,
  },

  data() {
    return {
      gameInfo: {
        id: '',
        title: '',
      },
    };
  },

  props: {
    userId: {
      type: String,
      default: '',
    },
  },

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

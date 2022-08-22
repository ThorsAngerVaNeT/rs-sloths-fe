<template>
  <div class="profile">
    <aside class="profile__aside">
      <h2>{{ $t('profile.title') }}</h2>
      <user-info @updUser="updUser"></user-info>
      <custom-btn :text="$t('profile.btn.logout')" className="btn btn-link" :onClick="logOut"></custom-btn>
      <router-link to="/admin">
        <custom-btn :text="$t('profile.btn.admin')" className="btn btn-link"></custom-btn>
      </router-link>
    </aside>
    <main class="profile__main">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['btn btn-tab', { active: currentGame === index }]"
        @click="currentGame = index"
      >
        {{ $t(`profile.btn.${tab}`) }}
      </div>
      <component :is="components[currentGame]" class="profile__tab" :id="components[currentGame]"></component>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { errorHandler } from '../services/error-handling/error-handler';
import { UsersService } from '../services/users-service';
import UserInfo from '../components/profile/UserInfo.vue';
import MemoryInfo from '../components/profile/MemoryInfo.vue';
import GuessInfo from '../components/profile/GuessInfo.vue';
import SuggestInfo from '../components/profile/SuggestInfo.vue';
import CustomBtn from '../components/buttons/CustomBtn.vue';
import type { User } from '@/common/types';
import useUserInfo from '../stores/user-info';

const service = new UsersService();

const { setUserInfo } = useUserInfo();

export default defineComponent({
  name: 'ProfileView',

  components: {
    UserInfo,
    MemoryInfo,
    GuessInfo,
    SuggestInfo,
    CustomBtn,
  },

  data() {
    return {
      user: {} as User,
      currentGame: 0,
      tabs: ['memory', 'guess', 'suggest'],
      components: ['MemoryInfo', 'GuessInfo', 'SuggestInfo'],
    };
  },

  props: {
    id: {
      type: String,
      default: '1', // todo // required: true,
    },
  },

  mounted() {
    this.getUser();
  },

  methods: {
    async getUser() {
      try {
        const res = await service.getById(this.id);
        if (!res) throw Error(); // todo
        this.user = res.data;

        setUserInfo(this.user);
      } catch (error) {
        errorHandler(error);
      }
    },

    async updUser(user: User) {
      try {
        const res = await service.updateById(user.id, user);
        if (!res) throw Error(); // todo
        await this.getUser();
      } catch (error) {
        errorHandler(error);
      }
    },

    logOut() {
      // todo
    },
  },
});
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
}
.profile__aside {
  width: 300px;
  padding: 1em;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile__tab {
  border: 1px solid;
  padding: 1em;
}
</style>

<template>
  <div class="profile">
    <h2 class="profile__title">{{ $t('profile.title') }}</h2>
    <aside class="profile__aside">
      <user-info @updUser="updUser"></user-info>
      <custom-btn :text="$t('profile.btn.logout')" className="btn btn-link" :onClick="logOut"></custom-btn>
      <router-link v-show="isAdmin" to="/admin">
        <custom-btn :text="$t('profile.btn.admin')" className="btn btn-link"></custom-btn>
      </router-link>
    </aside>
    <main class="profile__main">
      <div class="profile__tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="['btn btn-tab', { 'btn-tab_active': currentGame === index }]"
          @click="currentGame = index"
        >
          {{ $t(`profile.btn.${tab}`) }}
        </div>
      </div>
      <component :is="components[currentGame]" class="profile__tab" :id="components[currentGame]"></component>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapWritableState } from 'pinia';
import type { User } from '@/common/types';
import { errorHandler } from '@/services/error-handling/error-handler';
import { UsersService } from '@/services/users-service';
import useLoader from '@/stores/loader';
import UserInfo from '@/components/profile/UserInfo.vue';
import MemoryInfo from '@/components/profile/MemoryInfo.vue';
import GuessInfo from '@/components/profile/GuessInfo.vue';
import SuggestInfo from '@/components/profile/SuggestInfo.vue';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import useUserInfo from '@/stores/user-info';
import useCurrUser from '@/stores/curr-user';
import { USERS_ERROR_GET, USERS_ERROR_UPD } from '@/common/const';
import { CustomError } from '@/services/error-handling/custom-error';

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

  computed: {
    ...mapState(useCurrUser, ['isAdmin', 'getUserId']),
    ...mapWritableState(useLoader, ['isLoad']),
  },

  methods: {
    async getUser() {
      this.isLoad = true;
      try {
        const res = await service.getById(this.getUserId);
        if (!res.ok)
          throw new CustomError(res.status, USERS_ERROR_GET.code, `${USERS_ERROR_GET.message} (id=${this.getUserId})`);
        this.user = res.data;

        setUserInfo(this.user);
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async updUser(user: User) {
      this.isLoad = true;
      try {
        const res = await service.updateById(user.id, user);
        if (!res.ok)
          throw new CustomError(res.status, USERS_ERROR_UPD.code, `${USERS_ERROR_UPD.message} (id=${user.id})`);
        await this.getUser();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
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
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: repeat(2, auto);
  grid-template-areas:
    'A A'
    'B C';
}

.profile__title {
  grid-area: A;
  text-align: center;
  padding: 1rem;
}

.profile__aside {
  width: var(--width-panel);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  grid-area: B;
}

.profile__main {
  grid-area: C;
  padding: 1rem;
}

.profile__tabs {
  display: flex;
  gap: 3px;
}

.profile__tab {
  border: 1px solid var(--color-border-inverse);
  padding: 1rem;
  margin-left: 0.1rem;
}
</style>

<template>
  <header-view />

  <main class="main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <footer-view />

  <background-view />
  <loader-view v-show="isLoad" />

  <alert-modal v-show="isAlert" :header="header" :message="message" @closeAlertModal="isAlert = false"></alert-modal>
  <authorization-modal v-show="isAuthorization" @closeAuthorizationModal="closeAuthorization"></authorization-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';
import type { User } from '@/common/types';
import router from './router';
import HeaderView from './components/header/HeaderView.vue';
import FooterView from './components/footer/FooterView.vue';
import LoaderView from './components/loader/LoaderView.vue';
import BackgroundView from './components/background/BackgroundView.vue';
import AlertModal from './components/modal/AlertModal.vue';
import AuthorizationModal from './components/modal/AuthorizationModal.vue';

import useLoader from './stores/loader';
import useAlertModal from './stores/alert-modal';
import useAuthorizationModal from './stores/authorization-modal';
import useAudioOn from './stores/audio-on';
import useCurrUser from './stores/curr-user';
// import type APIError from './services/error-handling/api-error';

// const { setCurrUser } = useCurrUser();

export default defineComponent({
  name: 'App',
  components: {
    HeaderView,
    FooterView,
    LoaderView,
    BackgroundView,
    AlertModal,
    AuthorizationModal,
  },
  computed: {
    ...mapWritableState(useLoader, ['isLoad']),

    ...mapWritableState(useAlertModal, ['isAlert', 'header', 'message']),

    ...mapWritableState(useAuthorizationModal, ['isAuthorization']),

    ...mapWritableState(useAudioOn, ['isAudioOn']),

    ...mapWritableState(useCurrUser, ['currUser']),
  },
  created() {
    // this.isLoad = true;
    this.isAlert = false;
    this.header = 'modal.header.alert';
    this.message = '';
    // this.isAudioOn = true; // todo local storage
  },
  async mounted() {
    // setTimeout(() => {
    //   this.isLoad = false;
    // }, 100);

    // console.log('this.doesHttpOnlyCookieExist: ', this.doesHttpOnlyCookieExist('rs-sloths-cookie'))

    if (this.isThereCookies('rs-sloths-cookie')) {
      this.isLoad = true;
      try {
        await this.getCurrUser();
      } catch (error: string | unknown) {
        throw new Error(error as string);
      } finally {
        this.isLoad = false;
      }
    }
  },
  methods: {
    closeAuthorization() {
      this.isAuthorization = false;
      router.push('/');
    },

    async getCurrUser(): Promise<void> {
      // this.isLoad = true;

      const res = await fetch(`http://localhost:3000/users/session`, {
        method: 'GET',
        credentials: 'include',
      });

      // console.log('res: ', res)

      if (res.status === 401) {
        this.isAuthorization = true;
      }

      if (res.status === 200) {
        const data: User = await res.json();
        this.currUser = data;
        // localStorage.setItem('rs-sloths-user', data.id);
      }
    },

    isThereCookies(name: string): boolean {
      const date = new Date();
      date.setTime(date.getTime() + 1000);
      const expires = `expires=${date.toUTCString()}`;

      document.cookie = `${name}=new_value;path=/;${expires}`;
      return document.cookie.indexOf(`${name}=`) === -1;
    },
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

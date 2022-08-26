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
import HeaderView from './components/header/HeaderView.vue';
import FooterView from './components/footer/FooterView.vue';
import LoaderView from './components/loader/LoaderView.vue';
import BackgroundView from './components/background/BackgroundView.vue';
import AlertModal from './components/modal/AlertModal.vue';
import AuthorizationModal from './components/modal/AuthorizationModal.vue';

import useLoader from './stores/loader';
import useAlertModal from './stores/alert-modal';
import useAuthorizationModal from './stores/authorization-modal';
import router from './router';
import useAudioOn from './stores/audio-on';

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
  },
  created() {
    this.isLoad = true;
    this.isAlert = false;
    this.header = 'modal.header.alert';
    this.message = '';
    this.isAudioOn = true; // todo local storage
  },
  mounted() {
    setTimeout(() => {
      this.isLoad = false;
    }, 100);
  },
  methods: {
    closeAuthorization() {
      this.isAuthorization = false;
      router.push('/');
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

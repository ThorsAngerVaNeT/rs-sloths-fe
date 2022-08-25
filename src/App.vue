<template>
  <header-view />

  <main class="main">
    <router-view />
  </main>

  <footer-view />

  <loader-view v-show="isLoad" />

  <alert-modal
    v-show="isVisible"
    :header="header"
    :message="message"
    @closeAlertModal="isVisible = false"
  ></alert-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';
import HeaderView from './components/header/HeaderView.vue';
import FooterView from './components/footer/FooterView.vue';
import LoaderView from './components/loader/LoaderView.vue';
import AlertModal from './components/modal/AlertModal.vue';

import useLoader from './stores/loader';
import useAlertModal from './stores/alert-modal';
import useAudioOn from './stores/audio-on';

export default defineComponent({
  name: 'App',
  components: {
    HeaderView,
    FooterView,
    LoaderView,
    AlertModal,
  },
  computed: {
    ...mapWritableState(useLoader, ['isLoad']),

    ...mapWritableState(useAlertModal, ['isVisible', 'header', 'message']),

    ...mapWritableState(useAudioOn, ['isAudioOn']),
  },
  created() {
    this.isLoad = true;
    this.isVisible = false;
    this.header = 'modal.header.alert';
    this.message = '';
    this.isAudioOn = true; // todo local storage
  },
  mounted() {
    setTimeout(() => {
      this.isLoad = false;
    }, 100);
  },
});
</script>

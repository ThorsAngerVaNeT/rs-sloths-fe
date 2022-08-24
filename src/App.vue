<template>
  <header-view />

  <main class="main">
    <router-view />
  </main>

  <footer-view />

  <loader-view v-show="isLoad" />

  <error-modal v-show="isVisible" :message="message" @closeErrorModal="isVisible = false"></error-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';
import HeaderView from './components/header/HeaderView.vue';
import FooterView from './components/footer/FooterView.vue';
import LoaderView from './components/loader/LoaderView.vue';
import ErrorModal from './components/modal/ErrorModal.vue';

import useLoader from './stores/loader';
import useErrorModal from './stores/error-modal';

export default defineComponent({
  name: 'App',
  components: {
    HeaderView,
    FooterView,
    LoaderView,
    ErrorModal,
  },
  computed: {
    ...mapWritableState(useLoader, ['isLoad']),

    ...mapWritableState(useErrorModal, ['isVisible', 'message']),
  },
  created() {
    this.isLoad = true;
    this.isVisible = false;
    this.message = '';
  },
  mounted() {
    setTimeout(() => {
      this.isLoad = false;
    }, 100);
  },
});
</script>

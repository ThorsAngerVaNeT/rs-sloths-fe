<template>
  <div class="background"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BackgroundView',
});
</script>

<style scoped>
.background {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  left: 0;
  bottom: 0;
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-home-light.svg');
}
</style>

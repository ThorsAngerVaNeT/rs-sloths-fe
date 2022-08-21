<template>
  <div class="loader">Loader</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoaderView',
});
</script>

<style scoped>
.loader {
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  background-color: var(--dark-opacity);
}
</style>

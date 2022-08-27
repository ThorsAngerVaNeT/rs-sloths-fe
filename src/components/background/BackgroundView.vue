<template>
  <div class="background" :class="`background-${$route.name === 'about' ? $route.name : 'home'}-${currTheme}`"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';

import themeProp from '../../stores/theme';

export default defineComponent({
  name: 'BackgroundView',

  computed: {
    ...mapWritableState(themeProp, ['currTheme']),
  },
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
  transition: 0.5s ease;
}

.background-home-light {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-home-light.svg');
}

.background-home-dark {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-home-dark.svg');
}

.background-about-light {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-about-light.svg');
}

.background-about-dark {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-about-dark.svg');
}
</style>

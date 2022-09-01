<template>
  <div class="background" :class="`background-${routeName}-${currTheme}`"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';

import themeProp from '../../stores/theme';

export default defineComponent({
  name: 'BackgroundView',

  computed: {
    ...mapWritableState(themeProp, ['currTheme']),

    // temp realization, todo
    routeName() {
      switch (this.$route.name) {
        case 'about':
          return 'about';
        case 'memory':
          return 'memory';
        case 'suggest':
          return 'suggest';
        default:
          return 'home';
      }
    },
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

.background-memory-light {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-memory-light.svg');
}

.background-memory-dark {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-memory-dark.svg');
}

.background-suggest-light {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-suggest-light.svg');
}

.background-suggest-dark {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-suggest-dark.svg');
}
</style>

<template>
  <div class="background" :class="`background-${currRoute}-${currTheme}`"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';

import themeProp from '../../stores/theme';

export default defineComponent({
  name: 'BackgroundView',

  computed: {
    ...mapWritableState(themeProp, ['currTheme']),

    currRoute() {
      return String(this.$route.name);
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

.background-404-light {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-404-light.svg');
}

.background-404-dark {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-404-dark.svg');
}

.background-admin-light {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-admin-light.svg');
}

.background-admin-dark {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-admin-dark.svg');
}

.background-catalog-light {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-catalog-light.svg');
}

.background-catalog-dark {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-catalog-dark.svg');
}

.background-create-light {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-create-light.svg');
}

.background-create-dark {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-create-dark.svg');
}

.background-guess-light {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-guess-light.svg');
}

.background-guess-dark {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-guess-dark.svg');
}

.background-profile-light {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-profile-light.svg');
}

.background-profile-dark {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-profile-dark.svg');
}

.background-merch-light {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-merch-light.svg');
}

.background-merch-dark {
  background: no-repeat left bottom / cover url('../../assets/backgrounds/bg-merch-dark.svg');
}
</style>

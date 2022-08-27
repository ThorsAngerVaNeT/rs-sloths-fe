<template>
  <section class="about__section">
    <h2 class="about__title">{{ $t(`about.${section}.title`) }}</h2>
    <div class="about__project">
      <p class="about__main">{{ $t(`about.${section}.main`) }}</p>
      <p class="about__descr">{{ $t(`about.${section}.descr`) }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutSection',

  props: {
    section: {
      type: String,
      required: true,
    },
    softClass: {
      type: String,
      required: true,
      default: () => '',
    },
  },
});
</script>

<style scoped>
.about__section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about__title {
  font-size: 2.8rem;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  color: var(--color-heading);
}

.about__project {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about__main {
  font-size: 2.8rem;
  text-align: v-bind(softClass);
  color: var(--color-heading);
}

.about__descr {
  font-size: 2.2rem;
  line-height: 3.2rem;
  color: var(--color-text);
}
</style>

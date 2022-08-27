<template>
  <section class="about__section">
    <h2 :class="`about__title about__title_${softClass}`">{{ $t(`about.${section}.title`) }}</h2>
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

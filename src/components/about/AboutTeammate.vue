<template>
  <div class="about__person">
    <img src="@/../public/img/foto.png" alt="photo" class="about__foto" />
    <div class="about__wrap">
      <div class="about__main">{{ `${teammate}` }}</div>
      <div class="about__descr">{{ $t(`about.teammates.${teammate}`) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutTeammate',

  props: {
    teammate: {
      type: String,
      required: true,
    },
  },
});
</script>

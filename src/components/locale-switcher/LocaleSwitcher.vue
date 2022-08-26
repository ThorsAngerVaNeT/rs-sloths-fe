<template>
  <div class="switcher">
    <input
      class="switcher__input"
      type="radio"
      v-for="(locale, i) in locales"
      :key="`locale-${i}`"
      :value="locale"
      v-model="$i18n.locale"
      :name="locale"
      :id="`locale-${locale}`"
    />

    <label class="switcher__label" :for="`locale-${checkLocale}`" :class="`switcher__label_${checkLocale}`"></label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LocaleSwitcher',

  data() {
    return { locales: ['ru', 'en'] };
  },

  computed: {
    checkLocale(): string {
      return this.locales.filter((item) => item !== this.$i18n.locale)[0];
    },
  },
});
</script>

<style scoped>
.switcher__input {
  display: none;
}

.switcher__label {
  display: block;
  width: 3.2rem;
  height: 1.6rem;
  cursor: pointer;
}

.switcher__label_en {
  background: center center / cover url('@/assets/icons/locales/en.png') no-repeat;
}

.switcher__label_ru {
  background: center center / cover url('@/assets/icons/locales/ru.png') no-repeat;
}
</style>

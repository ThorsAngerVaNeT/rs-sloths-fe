<template>
  <select v-model="$i18n.locale">
    <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>

<script lang="ts">
export default {
  name: 'LocaleSwitcher',
  data() {
    return { locales: ['ru', 'en'] };
  },
};
</script>

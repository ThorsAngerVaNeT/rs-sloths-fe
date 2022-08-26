<template>
  <div class="theme-switcher">
    <input
      class="theme-switcher__input"
      type="radio"
      v-for="(theme, i) in themes"
      :key="`theme-${i}`"
      :value="theme"
      v-model="currTheme"
      :name="theme"
      :id="`${theme}-theme`"
    />

    <label
      class="theme-switcher__label"
      :for="`${checkTheme}-theme`"
      :class="`theme-switcher__label_${checkTheme}`"
    ></label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';

import themeProp from '../../stores/theme';

export default defineComponent({
  name: 'ThemeSwitcher',

  data(): { themes: string[] } {
    return {
      //   currTheme: '',
      themes: ['light', 'dark'],
    };
  },

  computed: {
    ...mapWritableState(themeProp, ['currTheme']),
    checkTheme(): string {
      return this.themes.filter((theme) => theme !== this.currTheme)[0];
    },
  },

  mounted() {
    this.currTheme = this.getLastTheme() || this.getUserTheme();
  },

  watch: {
    currTheme(newTheme) {
      this.setTheme(newTheme);
    },
  },

  methods: {
    getUserTheme(): string {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    },

    getLastTheme(): string | null {
      console.log(localStorage.getItem('rs-sloths-theme'));
      return localStorage.getItem('rs-sloths-theme');
    },

    setTheme(theme: string): void {
      localStorage.setItem('rs-sloths-theme', theme);
      document.documentElement.className = theme;
    },
  },
});
</script>

<style scoped>
.theme-switcher__input {
  display: none;
}

.theme-switcher__label {
  display: block;
  width: 2rem;
  height: 3rem;
  transition: 0.5s ease;
  cursor: pointer;
}

.theme-switcher__label_light {
  background: center center / cover url('@/assets/icons/themes/light.svg') no-repeat;
}

.theme-switcher__label_dark {
  background: center center / cover url('@/assets/icons/themes/dark.svg') no-repeat;
}
</style>

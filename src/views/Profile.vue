<template>
  <div class="profile">
    <aside class="aside">
      <h2>{{ $t('profile-title') }}</h2>
      <user-info :id="id"></user-info>
      <button class="btn btn-link" @click="logOut">{{ $t('profile-btn-logout') }}</button>
    </aside>
    <main class="main">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button', { active: currentGame === getGameComponent(tab) }]"
        @click="currentGame = getGameComponent(tab)"
      >
        {{ $t(`profile-btn-${tab}`) }}
      </button>
      <component :is="currentGame" class="tab" :id="currentGame"></component>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import UserInfo from '../components/profile/UserInfo.vue';
import MemoryInfo from '../components/profile/MemoryInfo.vue';
import GuessInfo from '../components/profile/GuessInfo.vue';
import SuggestInfo from '../components/profile/SuggestInfo.vue';

export default defineComponent({
  name: 'ProfileView',

  data() {
    return {
      id: '',
      currentGame: 'MemoryInfo',
      tabs: ['memory', 'guess', 'suggest'],
    };
  },

  computed: {},

  components: {
    UserInfo,
    MemoryInfo,
    GuessInfo,
    SuggestInfo,
  },

  mounted() {},

  methods: {
    getGameComponent(tab: string): string {
      return `${tab.charAt(0).toUpperCase() + tab.slice(1)}Info`;
    },

    logOut() {
      // todo
    },
  },
});
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
}
.aside {
  width: 300px;
  padding: 1em;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-button {
  padding: 0.5em 1em;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 1em;
}
</style>

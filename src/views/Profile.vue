<template>
  <div class="profile">
    <aside class="aside">
      <h2>{{ $t('profile-title') }}</h2>
      <user-info :id="id"></user-info>
      <custom-btn :text="$t('profile-btn-logout')" className="btn btn-link" :onClick="logOut"></custom-btn>
    </aside>
    <main class="main">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['btn btn-tab', { active: currentGame === index }]"
        @click="currentGame = index"
      >
        {{ $t(`profile-btn-${tab}`) }}
      </div>
      <component :is="components[currentGame]" class="tab" :id="components[currentGame]"></component>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import UserInfo from '../components/profile/UserInfo.vue';
import MemoryInfo from '../components/profile/MemoryInfo.vue';
import GuessInfo from '../components/profile/GuessInfo.vue';
import SuggestInfo from '../components/profile/SuggestInfo.vue';
import CustomBtn from '../components/buttons/CustomBtn.vue';

export default defineComponent({
  name: 'ProfileView',

  data() {
    return {
      id: '',
      currentGame: 0,
      tabs: ['memory', 'guess', 'suggest'],
      components: ['MemoryInfo', 'GuessInfo', 'SuggestInfo'],
    };
  },

  components: {
    UserInfo,
    MemoryInfo,
    GuessInfo,
    SuggestInfo,
    CustomBtn,
  },

  methods: {
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

.tab {
  border: 1px solid;
  padding: 1em;
}
</style>

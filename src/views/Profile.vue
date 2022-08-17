<template>
  <div class="profile">
    <!-- <h2>{{ $t('profile-title') }}</h2> -->
    <aside class="aside">
      <user-info :id="id"></user-info>
      <button class="btn btn-link">{{ $t('profile-btn-logout') }}</button>
    </aside>
    <main class="main"></main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import UserInfo from '../components/profile/UserInfo.vue';

export default defineComponent({
  name: 'ProfileView',

  data() {
    return {
      id: '',
    };
  },

  computed: {},

  components: {
    UserInfo,
  },

  mounted() {},

  methods: {},
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
</style>

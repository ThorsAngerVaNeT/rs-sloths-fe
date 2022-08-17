<template>
  <div class="profile">
    <h2>{{ $t('profile-title') }}</h2>
    <aside class="aside">
      <div class="avatar"></div>
      <p class="user-property"></p>
      <button class="btn btn-primary">{{ $t('profile-btn-save') }}</button>
    </aside>
    <button class="btn btn-link">{{ $t('profile-btn-logout') }}</button>
    <main class="main"></main>
  </div>
</template>

<script lang="ts">
import { UsersService } from '../services/users-service';

const service = new UsersService();

export default {
  name: 'ProfileView',

  data() {
    return {
      userInfo: {
        id: '',
        name: '',
        email: '',
      },
    };
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    async getUserInfo() {
      this.userInfo = (await service.getById('1')).data;
    },
  },
};
</script>

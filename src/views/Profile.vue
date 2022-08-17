<template>
  <div class="profile">
    <h2>{{ $t('profile-title') }}</h2>
    <aside class="aside">
      <div class="avatar"></div>
      <input
        type="text"
        class="input-text user-property"
        autocomplete="off"
        :placeholder="$t('profile-name')"
        v-model="userInfo.name"
      />
      <input
        type="text"
        class="input-text user-property"
        autocomplete="off"
        :placeholder="$t('profile-email')"
        v-model="userInfo.email"
      />
      <button class="btn btn-primary" @click="updUserInfo">{{ $t('profile-btn-save') }}</button>
    </aside>
    <button class="btn btn-link">{{ $t('profile-btn-logout') }}</button>
    <main class="main"></main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { errorHandler } from '../services/error-handling/error-handler';
import { UsersService } from '../services/users-service';

const service = new UsersService();

export default defineComponent({
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
      try {
        const res = await service.getById('1');

        if (!res) throw Error();

        this.userInfo = res.data;
      } catch (error) {
        errorHandler(error);
      }
    },
    async updUserInfo() {
      try {
        const res = await service.updateById('1', this.userInfo);

        if (!res) throw Error();

        await this.getUserInfo();
      } catch (error) {
        errorHandler(error);
      }
    },
  },
});
</script>

<style scoped>
.aside {
  width: 300px;

  display: flex;
  flex-direction: column;
}

.user-property {
  padding: 0.5em;
  text-align: center;
}
</style>

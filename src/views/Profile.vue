<template>
  <div class="profile">
    <!-- <h2>{{ $t('profile-title') }}</h2> -->
    <aside class="aside">
      <div class="user">
        <div class="avatar">
          <img class="avatar--img" :src="getAvatar" :alt="$t('profile-avatar')" />
        </div>
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
      </div>
      <button class="btn btn-link">{{ $t('profile-btn-logout') }}</button>
    </aside>
    <main class="main"></main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { errorHandler } from '../services/error-handling/error-handler';
import { UsersService } from '../services/users-service';

const service = new UsersService();
const defaultUser = './default-user.png';

export default defineComponent({
  name: 'ProfileView',

  data() {
    return {
      userInfo: {
        id: '',
        name: '',
        email: '',
        avatar: '',
      },
    };
  },

  computed: {
    getAvatar() {
      return this.userInfo.avatar || defaultUser;
    },
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    async getUserInfo() {
      try {
        const res = await service.getById('1');

        if (!res) throw Error(); // todo

        this.userInfo = res.data;
      } catch (error) {
        errorHandler(error);
      }
    },
    async updUserInfo() {
      try {
        const res = await service.updateById('1', this.userInfo);

        if (!res) throw Error(); // todo

        await this.getUserInfo();
      } catch (error) {
        errorHandler(error);
      }
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

.user {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  display: inline-block;
  width: 200px;
  height: 200px;
  overflow: hidden;

  border-radius: 50%;
}
.avatar--img {
  width: 200px;
}

.user-property,
.user-property:focus {
  outline: none;

  margin: 0.5em 0;
  padding: 0.5em 0;

  text-align: center;
  border-style: none none solid;
}
</style>

<template>
  <div class="user-info">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { errorHandler } from '../../services/error-handling/error-handler';
import { UsersService } from '../../services/users-service';

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

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    getAvatar(): string {
      return this.userInfo.avatar || defaultUser;
    },
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    async getUserInfo() {
      try {
        const res = await service.getById(this.id);

        if (!res) throw Error(); // todo

        this.userInfo = res.data;
      } catch (error) {
        errorHandler(error);
      }
    },
    async updUserInfo() {
      try {
        // console.log('updUserInfo1', this.userInfo);
        const res = await service.updateById(this.id, this.userInfo);

        if (!res) throw Error(); // todo

        await this.getUserInfo();
        // console.log('updUserInfo2', this.userInfo);
      } catch (error) {
        errorHandler(error);
      }
    },
  },
});
</script>

<style scoped>
.user-info {
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

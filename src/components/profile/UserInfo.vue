<template>
  <div class="user-info">
    <div class="user-info__avatar">
      <img class="user-info__img" :src="currUser['avatar_url']" :alt="$t('profile.avatar')" />
    </div>
    <input
      type="text"
      class="input-text user-info__property"
      autocomplete="off"
      :placeholder="$t('profile.name')"
      :title="$t('profile.name')"
      v-model="currUser.name"
    />
    <input
      type="text"
      class="input-text user-info__property"
      autocomplete="off"
      :placeholder="$t('profile.github')"
      :title="$t('profile.github')"
      v-model="currUser.github"
    />
    <select
      v-show="isAdmin"
      name="select"
      class="user-info__select select-element"
      :title="$t('profile.role')"
      v-model="currUser.role"
    >
      <option :value="admin">{{ admin }}</option>
      <option :value="user">{{ user }}</option>
    </select>
    <custom-btn :text="$t('btn.save')" className="btn btn-primary" :onClick="saveUser"></custom-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { DEFAULT_USER_AVATAR } from '@/common/const';
import { Role } from '@/common/enums/user-role';
import useUserInfo from '@/stores/user-info';
import useCurrUser from '@/stores/curr-user';
import CustomBtn from '@/components/buttons/CustomBtn.vue';

const { userInfo } = storeToRefs(useUserInfo());
const { currUser } = storeToRefs(useCurrUser());

export default defineComponent({
  name: 'UserInfo',

  components: {
    CustomBtn,
  },

  data() {
    return {
      currUser,
      userInfo,
      admin: Role.admin,
      user: Role.user,
    };
  },

  computed: {
    getAvatar(): string {
      return this.userInfo.avatar_url ?? DEFAULT_USER_AVATAR;
    },

    isAdmin() {
      return this.$route.name === 'admin';
    },
  },

  methods: {
    saveUser() {
      this.$emit('updUser', this.userInfo);
    },
  },
});
</script>

<style scoped>
.user-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap);
  width: 100%;
  border: 0.1rem solid;
  border-radius: 0.5rem;
}

.user-info__avatar {
  display: inline-block;
  width: 20rem;
  height: 20rem;
  overflow: hidden;
  border-radius: 50%;
}
.user-info__img {
  height: 20rem;
}
.user-info__property,
.user-info__select {
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  width: 80%;
  text-align: center;
  border: none;
  border-bottom: 0.2rem solid gray;
  background: none;
}

.user-info__property,
.user-info__property:focus {
  outline: none;
}
</style>

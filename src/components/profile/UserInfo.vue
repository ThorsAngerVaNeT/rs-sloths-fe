<template>
  <div class="user-info">
    <div class="user-info__avatar">
      <img class="user-info__img" :src="getAvatar" :alt="$t('profile.avatar')" />
    </div>
    <input
      type="text"
      class="input-text user-info__property"
      autocomplete="off"
      :placeholder="$t('profile.name')"
      v-model="userInfo.name"
    />
    <input
      type="text"
      class="input-text user-info__property"
      autocomplete="off"
      :placeholder="$t('profile.github')"
      v-model="userInfo.github"
    />
    <custom-btn :text="$t('profile.btn.save')" className="btn btn-primary" :onClick="saveUser"></custom-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { DEFAULT_USER_AVATAR } from '../../common/const';
import useUserInfo from '../../stores/user-info';
import CustomBtn from '../buttons/CustomBtn.vue';

const { userInfo } = storeToRefs(useUserInfo());

export default defineComponent({
  name: 'UserInfo',

  components: {
    CustomBtn,
  },

  data() {
    return {
      userInfo,
    };
  },

  computed: {
    getAvatar(): string {
      return this.userInfo.avatar_url || DEFAULT_USER_AVATAR;
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
  padding: 1em;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  border: 1px solid;
  border-radius: 0.5em;
}

.user-info__avatar {
  display: inline-block;
  width: 200px;
  height: 200px;
  overflow: hidden;

  border-radius: 50%;
}
.user-info__img {
  width: 200px;
}

.user-info__property,
.user-info__property:focus {
  outline: none;

  margin: 0.5em 0;
  padding: 0.5em 0;

  text-align: center;
  border-style: none none solid;
}
</style>

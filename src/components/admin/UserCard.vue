<template>
  <div class="user-info">
    <div>
      <div class="user-info__user">
        <img class="user-info__img" :src="getAvatar" :alt="userInfo.name" />
      </div>
      <div class="user-info__btn">
        <custom-btn
          :text="$t('admin.users.btn.edit')"
          className="btn btn-primary"
          @click="$emit('editUser', userInfo)"
        ></custom-btn>
        <custom-btn
          :text="$t('admin.users.btn.del')"
          className="btn btn-primary"
          @click="$emit('delUser', userInfo.id)"
        ></custom-btn>
      </div>
    </div>
    <div class="user-info__props">
      <p class="user-info__property">{{ $t('profile.name') }}</p>
      <p class="user-info__property">{{ $t('profile.github') }}</p>
      <p class="user-info__property">{{ $t('profile.role') }}</p>
      <p class="user-info__property">{{ $t('profile.createdAt') }}</p>
    </div>
    <div class="user-info__props">
      <p class="user-info__property">{{ userInfo.name }}</p>
      <p class="user-info__property">{{ userInfo.github }}</p>
      <p class="user-info__property">{{ userInfo.role }}</p>
      <p class="user-info__property">{{ new Date(userInfo.createdAt).toLocaleDateString() }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { User } from '@/common/types';
import { DEFAULT_USER_AVATAR } from '@/common/const';
import CustomBtn from '@/components/buttons/CustomBtn.vue';

export default defineComponent({
  name: 'UserCard',

  components: {
    CustomBtn,
  },

  props: {
    userInfo: {
      type: Object as PropType<User>,
      required: true,
    },
  },

  computed: {
    getAvatar(): string {
      return this.userInfo.avatar_url || DEFAULT_USER_AVATAR;
    },
  },
});
</script>

<style scoped>
.user-info {
  padding: 0.5rem;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 1rem;

  border: 1px solid var(--dark-addict);
  border-radius: 0.5rem;
}
.user-info:hover {
  box-shadow: 0px 0px 0.5rem;
}

.user-info__img {
  width: calc(10rem - 1rem);
}

.user-info__props {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-info__property {
  padding: 0.25rem;
}

.user-info__btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>

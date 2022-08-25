import { defineStore } from 'pinia';
import type { User } from '@/common/types';

const useUserInfo = defineStore({
  id: 'userInfo',

  state: () => ({
    userInfo: {} as User,
  }),

  actions: {
    setEmptyUserInfo() {
      this.userInfo = {} as User;
    },

    setUserInfo(newUserInfo: User) {
      this.userInfo = { ...newUserInfo };
    },
  },
});

export default useUserInfo;

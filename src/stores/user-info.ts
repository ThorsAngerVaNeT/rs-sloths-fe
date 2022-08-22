import { defineStore } from 'pinia';
import type { User } from '@/common/types';

const newUser: User = {
  id: '',
  name: '',
  email: '',
  avatar: '',
};

const useUserInfo = defineStore({
  id: 'userInfo',

  state: () => ({
    userInfo: newUser,
  }),

  actions: {
    setEmptyUserInfo() {
      this.userInfo = { ...newUser };
    },

    setUserInfo(newUserInfo: User) {
      this.userInfo = { ...newUserInfo };
    },
  },
});

export default useUserInfo;

import { defineStore } from 'pinia';
import type { User } from '@/common/types';
import { Role } from '@/common/enums/user-role';

const newUser = {} as User;
newUser.role = Role.user;

const useCurrUserInfo = defineStore({
  id: 'userInfo',

  state: () => ({
    currUser: newUser,
  }),

  getters: {
    getUserId(): string {
      return this.currUser.id;
    },

    isAdmin(): boolean {
      return this.currUser.role === Role.admin;
    },
  },

  actions: {
    setEmptyUserInfo() {
      this.currUser = newUser;
    },

    setUserInfo(userData: User) {
      this.currUser = { ...userData };
    },
  },
});

export default useCurrUserInfo;

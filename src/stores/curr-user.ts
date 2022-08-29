import { defineStore } from 'pinia';
import type { User } from '@/common/types';
import { Role } from '@/common/enums/user-role';

const newUser = {} as User;
newUser.role = Role.user;

const useCurrUser = defineStore({
  id: 'userInfo',

  state: () => ({
    currUser: newUser,
  }),

  getters: {
    getUserId: (state): string => state.currUser.id,

    getUserAvatar: (state): string => state.currUser.avatar_url,

    isAdmin: (state): boolean => state.currUser.role === Role.admin,

    getCurrUserInfo: (state): User => state.currUser,

    // hasAuth: (state): boolean => state.currUser.hasOwnProperty('id'),
    hasAuth: (state): boolean => Object.keys(state.currUser).includes('id'),
  },

  actions: {
    setClearUser() {
      this.currUser = newUser;
    },

    setCurrUser(currUserData: User) {
      this.currUser = { ...currUserData };
    },
  },
});

export default useCurrUser;

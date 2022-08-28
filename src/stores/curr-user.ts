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

    isAdmin: (state) => state.currUser.role === Role.admin,
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

<template>
  <div class="users">
    <div class="users__aside">
      <h3>{{ $t('admin.users.title') }}</h3>
      <custom-btn :text="$t('admin.users.btn.new')" className="btn btn-primary" @click="showUserInfoNew"></custom-btn>
      <custom-btn :text="$t('admin.users.btn.reset')" className="btn btn-primary"></custom-btn>
    </div>
    <div class="users__showcase">
      <user-card
        v-for="user in users"
        :key="user.id"
        :userInfo="user"
        @delUser="delUser"
        @editUser="showUserInfoEdit"
        @showUser="showUserInfoView"
      ></user-card>
    </div>
    <user-modal
      :isUserInfoVisible="isUserInfoVisible"
      :headerText="getHeaderUserInfo"
      :modalEvents="modalEvents"
      @closeUserInfo="closeUserInfo"
      @createUser="createUser"
      @updUser="updUser"
    ></user-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { errorHandler } from '../../services/error-handling/error-handler';
import { UsersService } from '../../services/users-service';
import type { User, Users } from '@/common/types';
import { ModalEvents } from '../../common/enums/modalEvents';
import CustomBtn from '../buttons/CustomBtn.vue';
import UserModal from './UserModal.vue';
import UserCard from './UserCard.vue';
import useUserInfo from '../../stores/user-info';

const service = new UsersService();

const { setEmptyUserInfo, setUserInfo } = useUserInfo();

export default defineComponent({
  name: 'UsersList',

  components: {
    CustomBtn,
    UserCard,
    UserModal,
  },

  data() {
    return {
      users: [] as Users,
      isUserInfoVisible: false,
      modalEvents: ModalEvents.view,
    };
  },

  computed: {
    getHeaderUserInfo(): string {
      if (this.modalEvents === ModalEvents.new) return this.$t('admin.users.btn.new');
      if (this.modalEvents === ModalEvents.edit) return this.$t('admin.users.btn.edit');
      return this.$t('admin.users.info');
    },
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    async getUsers() {
      try {
        const res = await service.getAll();

        if (!res) throw Error(); // todo

        this.users = res.data;
      } catch (error) {
        errorHandler(error);
      }
    },

    async delUser(id: string) {
      try {
        const res = await service.deleteById(id);

        if (!res) throw Error(); // todo

        await this.getUsers();
      } catch (error) {
        errorHandler(error);
      }
    },

    async createUser(user: User) {
      try {
        const res = await service.create(user);

        if (!res) throw Error(); // todo

        await this.getUsers();
      } catch (error) {
        errorHandler(error);
      }
    },

    async updUser(user: User) {
      try {
        const res = await service.updateById(user.id, user);

        if (!res) throw Error(); // todo

        await this.getUsers();
      } catch (error) {
        errorHandler(error);
      }
    },

    showUserInfoView(user: User) {
      this.modalEvents = ModalEvents.view;
      setUserInfo(user);
      this.showUserInfo();
    },

    showUserInfoNew() {
      this.modalEvents = ModalEvents.new;
      setEmptyUserInfo();
      this.showUserInfo();
    },

    showUserInfoEdit(user: User) {
      this.modalEvents = ModalEvents.edit;
      setUserInfo(user);
      this.showUserInfo();
    },

    showUserInfo() {
      this.isUserInfoVisible = true;
    },

    closeUserInfo() {
      this.isUserInfoVisible = false;
    },
  },
});
</script>

<style scoped>
.users {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.users__aside {
  width: 200px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.users__showcase {
  margin: 0.5em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
}
</style>

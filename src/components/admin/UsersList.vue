<template>
  <div class="users">
    <div class="users__aside">
      <h3>{{ $t('admin.users.title') }}: {{ count }}</h3>
      <search-text @search="getUsers" :placeholder="$t('admin.search')"></search-text>
      <sorting-list @sorting="getUsers" :title="$t('admin.sorting')" :options="sortingOptions"></sorting-list>
      <custom-btn :text="$t('admin.users.btn.reset')" className="btn btn-primary"></custom-btn>
      <custom-btn :text="$t('admin.users.btn.new')" className="btn btn-primary" @click="showUserInfoNew"></custom-btn>
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
import { mapWritableState } from 'pinia';
import { errorHandler } from '@/services/error-handling/error-handler';
import { CustomError } from '@/services/error-handling/custom-error';
import {
  USERS_ERROR_CREATE,
  USERS_ERROR_DEL,
  USERS_ERROR_GET_LIST,
  USERS_ERROR_UPD,
  USER_SORTING,
} from '@/common/const';
import { UsersService } from '@/services/users-service';
import type { User, Users } from '@/common/types';
import { ModalEvents } from '@/common/enums/modal-events';
import useSearchText from '@/stores/search-text';
import useSortingList from '@/stores/sorting-list';
import useUserInfo from '@/stores/user-info';
import useLoader from '@/stores/loader';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import SearchText from '@/components/search/SearchText.vue';
import SortingList from '@/components/sorting/SortingList.vue';
import UserModal from './UserModal.vue';
import UserCard from './UserCard.vue';

const service = new UsersService();

const { setEmptyUserInfo, setUserInfo } = useUserInfo();
const { getSearchText } = useSearchText();
const { getSortingList } = useSortingList();

export default defineComponent({
  name: 'UsersList',

  components: {
    CustomBtn,
    UserCard,
    UserModal,
    SearchText,
    SortingList,
  },

  data() {
    return {
      users: [] as Users,
      count: 0,
      isUserInfoVisible: false,
      modalEvents: ModalEvents.view,
      searchText: '',
      sortingOptions: USER_SORTING,
    };
  },

  computed: {
    ...mapWritableState(useLoader, ['isLoad']),

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
      this.isLoad = true;
      try {
        const searchText = getSearchText();
        const sorting = getSortingList();

        const res = await service.getAll(searchText, sorting);

        if (!res) throw new CustomError(USERS_ERROR_GET_LIST.code, USERS_ERROR_GET_LIST.message);

        this.users = res.data.items;
        this.count = res.data.count;
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async delUser(id: string) {
      this.isLoad = true;
      try {
        const res = await service.deleteById(id);

        if (!res) throw new CustomError(USERS_ERROR_DEL.code, `${USERS_ERROR_DEL.message} (id=${id})`);

        await this.getUsers();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async createUser(user: User) {
      this.isLoad = true;
      try {
        const res = await service.create(user);

        if (!res) throw new CustomError(USERS_ERROR_CREATE.code, `${USERS_ERROR_CREATE.message} (name=${user.name})`);

        await this.getUsers();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async updUser(user: User) {
      this.isLoad = true;
      try {
        const res = await service.updateById(user.id, user);

        if (!res) throw new CustomError(USERS_ERROR_UPD.code, `${USERS_ERROR_UPD.message} (id=${user.id})`);

        await this.getUsers();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
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
  width: var(--width-panel);

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

<template>
  <div class="users">
    <div class="users__aside">
      <h3>{{ $t('admin.users.title') }}: {{ count }}</h3>
      <list-controls
        @search="getUsers"
        @tags="getUsers"
        @sorting="getUsers"
        @clearAll="getUsers"
        :placeholder="$t('admin.search')"
        :tags="tags"
        :title="$t('admin.sorting')"
        :options="sortingOptions"
        :text="$t('btn.reset')"
      >
      </list-controls>
      <custom-btn :text="$t('admin.users.btn.new')" className="btn btn-primary" @click="showUserInfoNew"></custom-btn>
      <list-pagination :size="count" @getPage="getUsers"></list-pagination>
    </div>
    <div class="users__list">
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
import usePagination from '@/stores/pagination';
import useSearchText from '@/stores/search-text';
import useSelectedTags from '@/stores/tag-cloud';
import useSortingList from '@/stores/sorting-list';
import useUserInfo from '@/stores/user-info';
import useLoader from '@/stores/loader';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import ListControls from '@/components/list-controls/ListControls.vue';
import ListPagination from '@/components/list-controls/ListPagination.vue';
import { Role } from '@/common/enums/user-role';
import UserModal from './UserModal.vue';
import UserCard from './UserCard.vue';

const service = new UsersService();

const { setEmptyUserInfo, setUserInfo } = useUserInfo();

const { getPerPage, getCurrPage } = usePagination();
const { getSearchText } = useSearchText();
const { getSelected } = useSelectedTags();
const { getSortingList } = useSortingList();

export default defineComponent({
  name: 'UsersList',

  components: {
    CustomBtn,
    UserCard,
    UserModal,
    ListControls,
    ListPagination,
  },

  data() {
    return {
      users: [] as Users,
      count: 0,
      isUserInfoVisible: false,
      modalEvents: ModalEvents.view,
      searchText: '',
      tags: [Role.admin, Role.user],
      sortingOptions: USER_SORTING,
    };
  },

  computed: {
    ...mapWritableState(useLoader, ['isLoad']),

    getHeaderUserInfo(): string {
      if (this.modalEvents === ModalEvents.new) return this.$t('admin.users.btn.new');
      if (this.modalEvents === ModalEvents.edit) return this.$t('btn.edit');
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
        const currPage = getCurrPage();
        const perPage = getPerPage();
        const searchText = getSearchText();
        const selected = getSelected();
        const sorting = getSortingList();

        const res = await service.getPage(currPage, perPage, searchText, sorting, selected);

        if (!res.ok) throw new CustomError(res.status, USERS_ERROR_GET_LIST.code, USERS_ERROR_GET_LIST.message);

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

        if (!res.ok) throw new CustomError(res.status, USERS_ERROR_DEL.code, `${USERS_ERROR_DEL.message} (id=${id})`);

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

        if (!res.ok)
          throw new CustomError(
            res.status,
            USERS_ERROR_CREATE.code,
            `${USERS_ERROR_CREATE.message} (name=${user.name})`
          );

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

        if (!res.ok)
          throw new CustomError(res.status, USERS_ERROR_UPD.code, `${USERS_ERROR_UPD.message} (id=${user.id})`);

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
.users__list {
  margin: 0.5em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
}
</style>

<template>
  <div class="user-modal">
    <modal-window v-show="isUserInfoVisible" @close="closeModal">
      <template v-slot:header> {{ headerText }} </template>

      <template v-slot:body>
        <user-info @updUser="saveUser"></user-info>
      </template>
    </modal-window>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { storeToRefs } from 'pinia';
import ModalWindow from '../modal/ModalWindow.vue';
import UserInfo from '../profile/UserInfo.vue';
import useUserInfo from '../../stores/user-info';
import { ModalEvents } from '../../common/enums/modalEvents';

const { userInfo } = storeToRefs(useUserInfo());

export default defineComponent({
  name: 'UserModal',

  components: {
    ModalWindow,
    UserInfo,
  },

  data() {
    return {
      userInfo,
      isModalVisible: false,
    };
  },

  props: {
    isUserInfoVisible: {
      type: Boolean,
      default: false,
    },
    headerText: {
      type: String,
      required: true,
    },
    modalEvents: {
      type: String as PropType<ModalEvents>,
      default: ModalEvents.view,
    },
  },

  methods: {
    saveUser() {
      if (this.modalEvents === ModalEvents.new) {
        this.$emit('createUser', this.userInfo);
      } else if (this.modalEvents === ModalEvents.edit) {
        this.$emit('updUser', this.userInfo);
      }
      this.closeModal();
    },

    closeModal() {
      this.$emit('closeUserInfo');
    },
  },
});
</script>

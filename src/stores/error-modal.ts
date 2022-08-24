import { defineStore } from 'pinia';

const useErrorModal = defineStore({
  id: 'errorModal',

  state: () => ({
    isVisible: false,
    message: '',
  }),

  actions: {
    showErrorModal(message: string) {
      this.isVisible = true;
      this.message = message;
    },
  },
});

export default useErrorModal;

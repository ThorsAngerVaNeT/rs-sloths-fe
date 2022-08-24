import { defineStore } from 'pinia';

const useAlertModal = defineStore({
  id: 'alertModal',

  state: () => ({
    isVisible: false,
    header: '',
    message: '',
  }),

  actions: {
    showAlertModal(header: string, message: string) {
      this.isVisible = true;
      this.header = header;
      this.message = message;
    },
  },
});

export default useAlertModal;

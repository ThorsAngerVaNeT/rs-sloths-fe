<template>
  <div class="alert-modal">
    <modal-window @close="closeModal">
      <template v-slot:header> {{ $t(header) }} </template>

      <template v-slot:body>
        {{ message }}
      </template>
    </modal-window>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalWindow from '@/components/modal/ModalWindow.vue';

export default defineComponent({
  name: 'AlertModal',

  components: {
    ModalWindow,
  },

  props: {
    header: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeAlertModal');
    },
  },
});
</script>

.
<style scoped>
.alert-modal {
  z-index: 100;
  position: absolute;
}
</style>

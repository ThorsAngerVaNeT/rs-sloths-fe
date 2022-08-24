<template>
  <div class="error-modal">
    <modal-window @close="closeModal">
      <template v-slot:header> {{ $t('error') }} </template>

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
  name: 'ErrorModal',

  components: {
    ModalWindow,
  },

  props: {
    message: {
      type: String,
      required: true,
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeErrorModal');
    },
  },
});
</script>

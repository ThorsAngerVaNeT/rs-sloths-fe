<template>
  <div class="modal-background">
    <div class="modal">
      <div class="btn-close" @click="close">╳</div>
      <header class="modal__header">
        <slot name="header"></slot>
      </header>

      <section class="modal__body">
        <slot name="body"> </slot>
      </section>

      <footer class="modal__footer">
        <slot name="footer"></slot>
      </footer>
      <custom-btn :text="$t('modal.btn.close')" className="btn btn-link" :onClick="close"></custom-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomBtn from '../buttons/CustomBtn.vue';

export default defineComponent({
  name: 'ModalWindow',

  components: {
    CustomBtn,
  },

  methods: {
    close() {
      this.$emit('close');
    },
  },
});
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  padding: 1em 2.5em;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-x: auto;

  border-radius: 1em;
  box-shadow: 0px 0px 5px;
}

.modal__header,
.modal__footer {
  padding: 0.5em;

  display: flex;
  justify-content: center;
}

.modal__header {
  position: relative;
  border-bottom: 1px solid;
}

.modal__footer {
  border-top: 1px solid;
}

.modal__body {
  position: relative;
  padding: 1em 0.5em;
}

.btn-close {
  position: absolute;
  top: 0.8em;
  right: 0.5em;
  width: 2em;
  height: 2em;

  border: none;
  font-size: 1em;
  font-weight: bold;
  text-align: center;

  cursor: pointer;

  background: transparent;
}
</style>

<template>
  <div class="suggest-new">
    <form @submit.prevent="handleSubmit" class="suggest-new__form form">
      <div class="form__block">
        <label for="name" class="form__label" required>Name:</label>
        <input type="text" v-model="name" placeholder="name" id="name" />
      </div>
      <div class="form__block">
        <div class="form__drop" id="drop" @drop="handleDrop" @dragover="handleDrag">
          <img
            class="form__img"
            ref="img"
            :src="`/img/suggest/upload-${$i18n.locale}-${currTheme}.svg`"
            alt="upload-image"
          />
        </div>
      </div>
      <div class="form__block">
        <label for="descr" class="form__label">Description:</label>
        <input type="textarea" v-model="descr" placeholder="name" id="descr" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';
import themeProp from '@/stores/theme';

export default defineComponent({
  name: 'SuggestionNew',

  data() {
    return {
      name: '',
      descr: '',
    };
  },

  computed: {
    ...mapWritableState(themeProp, ['currTheme']),
  },

  methods: {
    handleSubmit() {
      console.log('submit!');
    },

    handleDrop(ev: DragEvent) {
      const reader = new FileReader();
      ev.preventDefault();
      ev.stopPropagation();

      console.log('handleDrop: ', ev);

      const { files } = ev.dataTransfer as DataTransfer;
      console.log('files: ', files);

      reader.readAsDataURL(files[0]);

      reader.onload = (e) => {
        const imgEl = this.$refs.img as HTMLImageElement;
        console.log('imgEl: ', typeof imgEl);
        imgEl.src = (e.target as FileReader).result as string;
      };
    },

    handleDrag(ev: DragEvent) {
      ev.preventDefault();
      ev.stopPropagation();
      // (ev.dataTransfer as DataTransfer).dropEffect = 'copy'
      // console.log('handleDrag: ', ev)
    },
  },
});
</script>

<style scoped>
.form__drop {
  width: 25rem;
  height: 25rem;
  border-radius: 1rem;
}

.form__img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>

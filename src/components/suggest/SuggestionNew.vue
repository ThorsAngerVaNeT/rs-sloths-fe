<template>
  <div class="suggest-new">
    <h3 class="suggest-new__title">Suggest new Sloth</h3>
    <form @submit.prevent="handleSubmit" class="suggest-new__form form">
      <div class="form__block form__block_1">
        <label for="name" class="form__label" required>Name</label>
        <input
          class="form__input form__text"
          type="text"
          v-model="name"
          placeholder="Name"
          id="name"
          autocomplete="off"
        />
      </div>
      <div class="form__block form__block_2">
        <input class="form__file" type="file" name="upload-file" id="drop" @change="handleUploadChange" />
        <label for="drop" class="form__drop" @drop="handleDrop" @dragover="handleDrag">
          <img
            class="form__img"
            ref="img"
            :src="`/img/suggest/upload-${$i18n.locale}-${currTheme}.svg`"
            alt="upload-image"
          />
        </label>
      </div>
      <div class="form__block form__block_3">
        <label for="descr" class="form__label">Description</label>
        <textarea
          class="form__input form__textarea"
          v-model="descr"
          placeholder="Description"
          id="descr"
          autocomplete="off"
        />
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
      url: '',
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
      ev.preventDefault();
      ev.stopPropagation();

      console.log('handleDrop: ', ev);

      const { files } = ev.dataTransfer as DataTransfer;
      console.log('files: ', files);
      this.renderFile(files[0]);
    },

    handleDrag(ev: DragEvent) {
      ev.preventDefault();
      ev.stopPropagation();
    },

    handleUploadChange(ev: InputEvent) {
      const file: File = (ev.target as HTMLFormElement).files[0];
      console.log('file in change: ', file);
      this.renderFile(file);
    },

    renderFile(file: File) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const imgEl = this.$refs.img as HTMLImageElement;
        console.log('imgEl: ', typeof imgEl);
        imgEl.src = (e.target as FileReader).result as string;
        this.url = (e.target as FileReader).result as string;
      };
    },
  },
});
</script>

<style scoped>
.suggest-new {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
}

.suggest-new__title {
  font-size: 3.6rem;
}

.form {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 25rem 50rem;
  grid-template-areas:
    'A B'
    'C B';
  justify-content: center;
  gap: 3rem;
}

.form__block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.form__block_1 {
  grid-area: A;
}

.form__block_2 {
  grid-area: C;
}

.form__block_3 {
  grid-area: B;
}

.form__label {
  font-size: 2.2rem;
}

.form__file {
  display: none;
}

.form__drop {
  display: block;
  width: 25rem;
  height: 25rem;
  border-radius: 1rem;
}

.form__img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.form__input {
  padding: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.form__textarea {
  height: 100%;
  width: 100%;
  resize: none;
}
</style>

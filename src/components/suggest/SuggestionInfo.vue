<template>
  <div class="suggest-info">
    <modal-window v-show="isSuggestInfoVisible" @close="closeModal">
      <template v-slot:header> {{ getHeader }} </template>

      <template v-slot:body>
        <div>
          <div v-if="isView" class="suggest-info__props">
            <div class="suggest-info__sloth">
              <img class="suggest-info__img" :src="getImage" alt="getHeader" />
            </div>
            <div class="suggest-info__property property-center">
              <p class="suggest-info__text">{{ suggestInfo.description }}</p>
            </div>
            <div class="suggest-info__property property-center">
              <p class="suggest-info__text">{{ suggestInfo.status }}</p>
            </div>
            <div class="suggest-info__property property-center">
              <label for="rating" class="suggest-info__label">{{ $t('suggest.rating') }}</label>
              <p id="rating" class="suggest-info__text">{{ suggestInfo.rating }}⭐</p>
            </div>
            <div class="suggest-info__property property-center">
              <label for="createdAt" class="suggest-info__label">{{ $t('suggest.createdAt') }} </label>
              <p id="createdAt" class="suggest-info__text">
                {{ new Date(suggestInfo.createdAt).toLocaleDateString() }}
              </p>
            </div>
          </div>

          <div v-else class="suggest-info__props">
            <div v-show="isNew" class="suggest-info__suggest">
              <label for="file" class="btn btn-primary">{{ $t('btn.upload') }}</label>
              <input type="file" id="file" accept="image/*" ref="uploadBtn" @change="uploadImage" />
              <img v-show="isNew" class="suggest-info__img" :src="preview" alt="preview" />
            </div>
            <div v-show="!isNew" :class="'suggest-info__sloth'">
              <img class="suggest-info__img" :src="getImage" alt="getHeader" />
            </div>
            <div class="suggest-info__property">
              <label for="description" class="suggest-info__label">{{ $t('suggest.description') }} </label>
              <textarea
                v-show="isNew"
                rows="3"
                id="description"
                class="suggest-info__input"
                v-model="suggestInfo.description"
              ></textarea>
              <p v-show="!isNew" id="description" class="suggest-info__text">{{ suggestInfo.description }}</p>
            </div>
            <div v-show="!isNew" class="suggest-info__property">
              <label for="status" class="suggest-info__label">{{ $t('suggest.status') }} </label>
              <select name="select" class="suggest-info__input select-element" v-model="suggestInfo.status">
                <option :value="pending">{{ pending }}</option>
                <option :value="accepted">{{ accepted }}</option>
                <option :value="decline">{{ decline }}</option>
              </select>
            </div>
            <div v-show="!isNew" class="suggest-info__property">
              <label for="rating" class="suggest-info__label">{{ $t('suggest.rating') }} </label>
              <p id="rating" class="suggest-info__text">{{ suggestInfo.rating }}⭐</p>
            </div>
            <div v-show="!isNew" class="suggest-info__property">
              <label for="createdAt" class="suggest-info__label">{{ $t('suggest.createdAt') }} </label>
              <p id="createdAt" class="suggest-info__text">
                {{ new Date(suggestInfo.createdAt).toLocaleDateString() }}
              </p>
            </div>
            <div v-show="!isNew" class="suggest-info__property">
              <label for="user" class="suggest-info__label">{{ $t('suggest.user') }} </label>
              <p id="user" class="suggest-info__text">{{ suggestInfo.userId }}</p>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <custom-btn
          v-show="!isView"
          :text="$t('btn.save')"
          className="btn btn-primary"
          :onClick="saveSuggest"
        ></custom-btn>
      </template>
    </modal-window>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { storeToRefs } from 'pinia';
import ModalWindow from '@/components/modal/ModalWindow.vue';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import useSuggestInfo from '@/stores/suggestion-info';
import { ModalEvents } from '@/common/enums/modal-events';
import useAlertModal from '@/stores/alert-modal';
import { CATALOG_SLOTH_PREVIEW, DEFAULT_USER_AVATAR } from '@/common/const';
import { SuggestionStatus } from '@/common/enums/suggestion-status';

const { suggestionInfo } = storeToRefs(useSuggestInfo());
const { showAlertModal } = useAlertModal();

export default defineComponent({
  name: 'SuggestInfo',

  components: {
    CustomBtn,
    ModalWindow,
  },

  data() {
    return {
      suggestInfo: suggestionInfo,
      newFile: {} as File,
      preview: CATALOG_SLOTH_PREVIEW,
      isModalVisible: false,
      pending: SuggestionStatus.pending,
      accepted: SuggestionStatus.accepted,
      decline: SuggestionStatus.decline,
    };
  },

  props: {
    isSuggestInfoVisible: {
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

  computed: {
    isNew(): boolean {
      return this.modalEvents === ModalEvents.new;
    },

    isView(): boolean {
      return this.modalEvents === ModalEvents.view;
    },

    getHeader(): string {
      if (this.isNew) return this.headerText;
      return this.isView ? this.headerText : this.suggestInfo.id;
    },

    getImage(): string {
      // if (this.newFile.name) return this.preview;
      return this.suggestInfo.image_url || DEFAULT_USER_AVATAR;
    },
  },

  methods: {
    saveSuggest() {
      if (this.modalEvents === ModalEvents.new) {
        if (!this.suggestInfo.description) {
          showAlertModal('modal.header.error', `${this.$t('modal.body.empty-description')}`);
          return;
        }

        this.$emit('createSuggest', this.suggestInfo, this.newFile);
        this.closeModal();
      } else if (this.modalEvents === ModalEvents.edit) {
        this.$emit('updSuggest', this.suggestInfo);
        this.closeModal();
      }
    },

    closeModal() {
      this.$emit('closeSuggestInfo');

      const { uploadBtn } = this.$refs;
      if (uploadBtn instanceof HTMLInputElement) uploadBtn.value = '';
      this.preview = CATALOG_SLOTH_PREVIEW;
      this.newFile = {} as File;
    },

    uploadImage() {
      const { uploadBtn } = this.$refs;
      if (!(uploadBtn instanceof HTMLInputElement)) return;

      const { files } = uploadBtn;
      if (!files?.length) return;

      [this.newFile] = files;

      const src = URL.createObjectURL(this.newFile);
      this.preview = src;
    },
  },
});
</script>

<style scoped>
.suggest-info__props {
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap);
}

.suggest-info__suggest,
.suggest-info__property {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap);
}
.property-center {
  justify-content: center;
}

.suggest-info__suggest {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input[type='file'] {
  display: none;
}
.suggest-info__img {
  height: 20rem;
}
.suggest-info__text {
  text-align: center;
}

.suggest-info__input {
  margin: 0.5rem 0;
  padding: 0.5rem 0;

  width: 30rem !important;

  border: none;
  border-bottom: 0.2rem solid gray;
  background-color: var(--color-background);
  color: inherit;
}
</style>

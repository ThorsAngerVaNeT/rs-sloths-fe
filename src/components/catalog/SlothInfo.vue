<template>
  <div class="sloth-info">
    <modal-window v-show="isSlothInfoVisible" @close="closeModal">
      <template v-slot:header> {{ getHeader }} </template>

      <template v-slot:body>
        <div>
          <div v-if="isView" class="sloth-info__props">
            <div :class="'sloth-info__sloth'">
              <img :class="'sloth-info__img'" :src="slothInfo.image_url" :alt="slothInfo.caption" />
            </div>
            <div class="sloth-info__property property-center">
              <p class="sloth-info__text">{{ slothInfo.description }}</p>
            </div>
            <div class="sloth-info__property property-center">
              <div class="tags">
                <span class="tag" v-for="tag in slothInfo.tags" :key="tag.value">{{ tag.value }}</span>
              </div>
            </div>
            <div class="sloth-info__property property-center">
              <label for="rating" class="sloth-info__label">{{ $t('catalog.rating') }} </label>
              <p id="rating" class="sloth-info__text">{{ slothInfo.rating }}⭐</p>
            </div>
            <div class="sloth-info__property property-center">
              <label for="createdAt" class="sloth-info__label">{{ $t('catalog.createdAt') }} </label>
              <p id="createdAt" class="sloth-info__text">{{ new Date(slothInfo.createdAt).toLocaleDateString() }}</p>
            </div>
          </div>

          <div v-else class="sloth-info__props">
            <div :class="'sloth-info__sloth'">
              <input type="file" id="file" accept="image/*" ref="uploadBtn" @change="uploadImage" />
              <img v-show="isNew" class="sloth-info__img" :src="preview" alt="preview" />
              <img v-show="!isNew" class="sloth-info__img" :src="getImage" :alt="slothInfo.caption" />
            </div>
            <div class="sloth-info__property">
              <label for="caption" class="sloth-info__label">{{ $t('catalog.caption') }} </label>
              <input type="text" id="caption" class="sloth-info__input" v-model="slothInfo.caption" />
            </div>
            <div class="sloth-info__property">
              <label for="description" class="sloth-info__label">{{ $t('catalog.description') }} </label>
              <textarea rows="3" id="description" class="sloth-info__input" v-model="slothInfo.description"></textarea>
            </div>
            <div class="sloth-info__property">
              <label for="tags" class="sloth-info__label">{{ $t('catalog.tags') }} </label>
              <input type="text" id="tags" class="sloth-info__input" v-model="tags" />
            </div>
            <div v-show="!isNew" class="sloth-info__property">
              <label for="rating" class="sloth-info__label">{{ $t('catalog.rating') }} </label>
              <p id="rating" class="sloth-info__text">{{ slothInfo.rating }}⭐</p>
            </div>
            <div v-show="!isNew" class="sloth-info__property">
              <label for="createdAt" class="sloth-info__label">{{ $t('catalog.createdAt') }} </label>
              <p id="createdAt" class="sloth-info__text">{{ new Date(slothInfo.createdAt).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <custom-btn
          v-show="!isView"
          :text="$t('btn.save')"
          className="btn btn-primary"
          :onClick="saveSloth"
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
import useSlothInfo from '@/stores/sloth-info';
import { ModalEvents } from '@/common/enums/modal-events';
import useAlertModal from '@/stores/alert-modal';
import { CATALOG_SLOTH_PREVIEW } from '@/common/const';

const { slothInfo, tagsStr } = storeToRefs(useSlothInfo());
const { showAlertModal } = useAlertModal();

export default defineComponent({
  name: 'SlothInfo',

  components: {
    CustomBtn,
    ModalWindow,
  },

  data() {
    return {
      slothInfo,
      tags: tagsStr,
      newFile: {} as File,
      preview: CATALOG_SLOTH_PREVIEW,
      isModalVisible: false,
    };
  },

  props: {
    isSlothInfoVisible: {
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
      return this.isView ? this.slothInfo.caption : this.slothInfo.id;
    },

    getImage(): string {
      return this.newFile.name ? this.preview : this.slothInfo.image_url;
    },
  },

  methods: {
    saveSloth() {
      if (this.tags) {
        this.slothInfo.tags = this.tags.split(' ').map((el) => {
          return { value: el };
        });

        this.tags = '';
      }

      if (this.modalEvents === ModalEvents.new) {
        if (!this.newFile.name) {
          showAlertModal('modal.header.error', `${this.$t('modal.body.empty-file')}`);
          return;
        }
        if (!this.slothInfo.caption) {
          showAlertModal('modal.header.error', `${this.$t('modal.body.empty-caption')}`);
          return;
        }
        if (!this.slothInfo.description) {
          showAlertModal('modal.header.error', `${this.$t('modal.body.empty-description')}`);
          return;
        }

        this.$emit('createSloth', this.slothInfo, this.newFile);
        this.closeModal();
      } else if (this.modalEvents === ModalEvents.edit) {
        if (this.newFile.name) {
          this.$emit('updSlothImage', this.slothInfo, this.newFile);
        } else {
          this.$emit('updSloth', this.slothInfo);
        }

        this.closeModal();
      }
    },

    closeModal() {
      this.$emit('closeSlothInfo');

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
.sloth-info__props {
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap);
}
.sloth-info__property {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap);
}
.property-center {
  justify-content: center;
}

.sloth-info__sloth {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sloth-info__img {
  height: 20rem;
}
.sloth-info__text {
  text-align: center;
}

.sloth-info__input {
  margin: 0.5rem 0;
  padding: 0.5rem 0;

  width: 30rem !important;

  border: none;
  border-bottom: 0.2rem solid gray;
  background-color: var(--color-background);
  color: inherit;
}
</style>

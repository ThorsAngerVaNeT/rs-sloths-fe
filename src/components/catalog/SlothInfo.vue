<template>
  <div class="sloths-info">
    <modal-window v-show="isSlothInfoVisible" @close="closeModal">
      <template v-slot:header> {{ getHeader }} </template>

      <template v-slot:body>
        <div class="sloths-info__props">
          <div v-show="!isNew" :class="'sloths-info__sloths'">
            <img :class="'sloths-info__img'" :src="slothsInfo.image_url" :alt="slothsInfo.caption" />
          </div>
          <div v-show="!isView" class="sloths-info__property">
            <label for="caption" class="sloths-info__label">{{ $t('catalog.caption') }} </label>
            <input type="text" id="caption" class="sloths-info__input" v-model="slothsInfo.caption" />
          </div>
          <div class="sloths-info__property">
            <div v-show="!isView">
              <label for="description" class="sloths-info__label">{{ $t('catalog.description') }} </label>
              <textarea
                rows="5"
                id="description"
                class="sloths-info__input"
                v-model="slothsInfo.description"
              ></textarea>
            </div>
            <p v-show="isView" id="description" class="sloths-info__text">{{ slothsInfo.description }}</p>
          </div>
          <div v-show="isNew" :class="'sloths-info__sloths'">
            <input type="file" id="file" accept="image/*" ref="uploadBtn" @change="uploadImage()" />
          </div>
          <div v-show="isView" class="sloths-info__property">
            <div class="tags">
              <span class="tag" v-for="tag in slothsInfo.tags" :key="tag.value">{{ tag.value }}</span>
            </div>
          </div>
          <div v-show="!isNew" class="sloths-info__property">
            <label for="image_url" class="sloths-info__label">{{ $t('catalog.image_url') }} </label>
            <p id="image_url" class="sloths-info__text">{{ slothsInfo.image_url }}</p>
          </div>
          <div v-show="!isNew" class="sloths-info__property">
            <label for="rating" class="sloths-info__label">{{ $t('catalog.rating') }} </label>
            <p id="rating" class="sloths-info__text">{{ slothsInfo.rating }}⭐</p>
          </div>
          <div v-show="!isNew" class="sloths-info__property">
            <label for="createdAt" class="sloths-info__label">{{ $t('catalog.createdAt') }} </label>
            <p id="createdAt" class="sloths-info__text">{{ new Date(slothsInfo.createdAt).toLocaleDateString() }}</p>
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
import useSlothInfo from '@/stores/slothInfo';
import { ModalEvents } from '@/common/enums/modal-events';
import useAlertModal from '@/stores/alert-modal';

const { slothsInfo } = storeToRefs(useSlothInfo());
const { showAlertModal } = useAlertModal();

export default defineComponent({
  name: 'SlothInfo',

  components: {
    CustomBtn,
    ModalWindow,
  },

  data() {
    return {
      slothsInfo,
      newFile: {} as File,
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
      return this.isNew ? this.headerText : slothsInfo.value.caption;
    },
  },

  methods: {
    saveSloth() {
      if (this.modalEvents === ModalEvents.new) {
        if (!this.newFile.name) {
          showAlertModal('modal.header.error', `${this.$t('modal.body.emptyFile')}`);
          return;
        }
        this.$emit('createSloth', this.slothsInfo, this.newFile);
        this.closeModal();
      } else if (this.modalEvents === ModalEvents.edit) {
        this.$emit('updSloth', this.slothsInfo);
        this.closeModal();
      }
    },

    closeModal() {
      this.$emit('closeSlothInfo');
    },

    uploadImage() {
      const { uploadBtn } = this.$refs;

      if (uploadBtn instanceof HTMLInputElement) {
        const { files } = uploadBtn;

        if (files?.length) [this.newFile] = files;
      }
    },
  },
});
</script>

<style scoped>
.sloths-info__props {
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}
.sloths-info__img {
  width: 200px;
}
.sloths-info__property {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1em;
}
</style>

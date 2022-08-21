<template>
  <div class="sloths-info">
    <modal-window v-show="isSlothInfoVisible" @close="closeModal">
      <template v-slot:header> {{ headerText }} </template>

      <template v-slot:body>
        <div class="sloths-info__props">
          <div v-show="!isNew" :class="'sloths-info__sloths'">
            <img :class="'sloths-info__img'" :src="slothsInfo.image_url" :alt="slothsInfo.caption" />
          </div>
          <div class="sloths-info__property">
            <label for="caption" class="sloths-info__label">{{ $t('catalog.caption') }} </label>
            <input v-show="!isView" type="text" id="caption" class="sloths-info__input" v-model="slothsInfo.caption" />
            <p v-show="isView" id="caption" class="sloths-info__text">{{ slothsInfo.caption }}</p>
          </div>
          <div class="sloths-info__property">
            <label for="description" class="sloths-info__label">{{ $t('catalog.description') }} </label>
            <textarea
              v-show="!isView"
              rows="5"
              id="description"
              class="sloths-info__input"
              v-model="slothsInfo.description"
            ></textarea>
            <p v-show="isView" id="description" class="sloths-info__text">{{ slothsInfo.description }}</p>
          </div>
          <div class="sloths-info__property">
            <label for="image_url" class="sloths-info__label">{{ $t('catalog.image_url') }} </label>
            <input
              v-show="!isView"
              type="text"
              id="image_url"
              class="sloths-info__input"
              v-model="slothsInfo.image_url"
            />
            <p v-show="isView" id="image_url" class="sloths-info__text">{{ slothsInfo.image_url }}</p>
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
          :text="$t('catalog.btn.save')"
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
import ModalWindow from '../modal/ModalWindow.vue';
import CustomBtn from '../buttons/CustomBtn.vue';
import useSlothInfo from '../../stores/slothInfo';
import { ModalEvents } from '../../common/enums/modalEvents';

const { slothsInfo } = storeToRefs(useSlothInfo());

export default defineComponent({
  name: 'SlothInfo',

  components: {
    CustomBtn,
    ModalWindow,
  },

  data() {
    return {
      slothsInfo,
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
    isNew() {
      return this.modalEvents === ModalEvents.new;
    },
    isView() {
      return this.modalEvents === ModalEvents.view;
    },
  },

  methods: {
    saveSloth() {
      if (this.modalEvents === ModalEvents.new) {
        this.$emit('createSloth', this.slothsInfo);
      } else if (this.modalEvents === ModalEvents.edit) {
        this.$emit('updSloth', this.slothsInfo);
      }
      this.closeModal();
    },

    closeModal() {
      this.$emit('closeSlothInfo');
    },
  },
});
</script>

<style scoped>
.sloths-info__props {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

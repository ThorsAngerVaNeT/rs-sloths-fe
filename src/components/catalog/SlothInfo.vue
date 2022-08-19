<template>
  <div class="sloths-info">
    <modal-window v-show="isSlothInfoVisible" @close="closeModal">
      <template v-slot:header> {{ headerText }} </template>

      <template v-slot:body>
        <div class="sloths-info__props">
          <div class="sloths-info__property">
            <label for="caption" class="sloths-info__label">{{ $t('catalog.caption') }} </label>
            <input type="text" id="caption" class="sloths-info__input" v-model="newSlothsInfo.caption" />
          </div>
          <div class="sloths-info__property">
            <label for="description" class="sloths-info__label">{{ $t('catalog.description') }} </label>
            <textarea
              rows="5"
              id="description"
              class="sloths-info__input"
              v-model="newSlothsInfo.description"
            ></textarea>
          </div>
          <div class="sloths-info__property">
            <label for="image_url" class="sloths-info__label">{{ $t('catalog.image_url') }} </label>
            <input type="text" id="image_url" class="sloths-info__input" v-model="newSlothsInfo.image_url" />
          </div>
          <div v-show="!isNew" class="sloths-info__property">
            <label for="rating" class="sloths-info__label">{{ $t('catalog.rating') }} </label>
            <input
              type="number"
              min="0"
              max="5"
              id="rating"
              class="sloths-info__input"
              v-model="newSlothsInfo.rating"
            />
          </div>
          <div v-show="!isNew" class="sloths-info__property">
            <label for="createdAt" class="sloths-info__label">{{ $t('catalog.createdAt') }} </label>
            <input type="date" id="createdAt" class="sloths-info__input" v-model="newSlothsInfo.createdAt" />
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <custom-btn :text="$t('catalog.btn.save')" className="btn btn-primary" :onClick="saveSloth"></custom-btn>
      </template>
    </modal-window>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Sloth } from '@/common/types';
import ModalWindow from '../modal/ModalWindow.vue';
import CustomBtn from '../buttons/CustomBtn.vue';

const newSloth: Sloth = {
  id: '',
  caption: '',
  description: '',
  image_url: '',
  rating: 0,
  createdAt: Date.now(),
};

export default defineComponent({
  name: 'SlothInfo',

  components: {
    CustomBtn,
    ModalWindow,
  },

  data() {
    return {
      newSlothsInfo: newSloth,
      isModalVisible: false,
    };
  },

  props: {
    slothsInfo: {
      type: Object as PropType<Sloth>,
      default: newSloth,
    },
    isSlothInfoVisible: {
      type: Boolean,
      default: false,
    },
    headerText: {
      type: String,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    saveSloth() {
      if (this.isNew) {
        this.$emit('createSloth', newSloth);
      } else {
        this.$emit('updSloth');
      }
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

.sloths-info__property {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1em;
}
</style>

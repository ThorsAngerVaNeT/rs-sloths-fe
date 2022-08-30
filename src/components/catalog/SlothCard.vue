<template>
  <div :class="`${getPageName}-sloth-info`">
    <div v-if="isAdmin" class="admin-sloth-info__inner">
      <div class="admin-sloth-info__sloth">
        <img class="admin-sloth-info__img" :src="slothInfo.image_url" :alt="slothInfo.caption" />
        <div class="sloth-info__tags tags">
          <span class="sloth-info__tag" v-for="tag in slothInfo.tags" :key="tag.value">{{ tag.value }}</span>
        </div>
      </div>
      <div class="sloth-info__btn">
        <custom-btn className="btn btn-icon icon-edit" @click="$emit('editSloth', slothInfo)"></custom-btn>
        <custom-btn className="btn btn-icon icon-del" @click="delItem"></custom-btn>
      </div>
      <div class="admin-sloth-info__props">
        <p class="sloth-info__property">{{ $t('catalog.caption') }}</p>
        <p class="sloth-info__property">{{ $t('catalog.rating') }}</p>
        <p class="sloth-info__property">{{ $t('catalog.createdAt') }}</p>
      </div>
      <div class="admin-sloth-info__props">
        <p class="sloth-info__property">{{ slothInfo.caption }}</p>
        <p class="sloth-info__property">{{ slothInfo.rating }}⭐</p>
        <p class="sloth-info__property">
          {{ new Date(slothInfo.createdAt).toLocaleDateString() }}
        </p>
      </div>
    </div>

    <div v-else-if="isCatalog && !isDownload" class="catalog-sloth-info__inner">
      <div class="catalog-sloth-info__sloth">
        <img class="catalog-sloth-info__img" :src="slothInfo.image_url" :alt="slothInfo.caption" />
        <div class="sloth-info__tags tags">
          <span class="sloth-info__tag" v-for="tag in slothInfo.tags" :key="tag.value">{{ tag.value }}</span>
        </div>
      </div>
      <custom-btn
        :className="slothInfo.checked ? 'icon icon_check-on' : 'icon icon_check-off'"
        @click="$emit('checkSloth', slothInfo)"
      ></custom-btn>
      <div>
        <div class="catalog-sloth-info__props">
          <p class="sloth-info__property">{{ slothInfo.caption }}</p>
          <div class="sloth-info__property">
            <label for="range" class="sloth-info__label">{{ slothInfo.rating }}⭐</label>
            <input
              type="range"
              id="range"
              min="0"
              max="5"
              step="1"
              v-model="newRating"
              @change="$emit('editRating', slothInfo, +newRating)"
            />
          </div>
        </div>
      </div>
      <custom-btn
        :text="$t('btn.show')"
        className="btn btn-primary"
        @click="$emit('showSloth', slothInfo)"
      ></custom-btn>
    </div>

    <div v-else class="download-sloth-info__inner">
      <custom-btn
        :className="slothInfo.checked ? 'download-icon icon_check-on' : 'download-icon icon_check-off'"
        @click="$emit('checkSloth', slothInfo)"
      ></custom-btn>
      <div class="download-sloth-info__sloth">
        <img class="download-sloth-info__img" :src="slothInfo.image_url" :alt="slothInfo.caption" />
      </div>
      <p class="sloth-info__property">{{ slothInfo.caption }}</p>
    </div>

    <modal-window v-show="isApproveShow" @close="closeModal">
      <template v-slot:header> {{ $t('modal.header.alert') }} </template>

      <template v-slot:body> {{ $t('modal.body.del-sloth') }} </template>

      <template v-slot:footer>
        <div class="sloth-info__btn btn-horizontal">
          <custom-btn :text="$t('btn.yes')" className="btn btn-primary" :onClick="approveDelItem"></custom-btn>
          <custom-btn :text="$t('btn.no')" className="btn btn-primary" :onClick="closeModal"></custom-btn>
        </div>
      </template>
    </modal-window>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Sloth } from '@/common/types';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import ModalWindow from '@/components/modal/ModalWindow.vue';

export default defineComponent({
  name: 'SlothCard',

  components: {
    CustomBtn,
    ModalWindow,
  },

  data() {
    return { newRating: 0, isApproveShow: false };
  },

  props: {
    slothInfo: {
      type: Object as PropType<Sloth>,
      required: true,
    },
    isDownload: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getPageName(): string {
      if (this.isDownload) return 'download';
      return this.$route.name === 'admin' ? 'admin' : 'catalog';
    },

    isAdmin(): boolean {
      return this.$route.name === 'admin';
    },

    isCatalog(): boolean {
      return this.$route.name === 'catalog';
    },
  },

  methods: {
    delItem() {
      this.isApproveShow = true;
    },
    approveDelItem() {
      this.$emit('delSloth', this.slothInfo.id);
      this.closeModal();
    },
    closeModal() {
      this.isApproveShow = false;
    },
  },
});
</script>

<style scoped>
.catalog-sloth-info,
.admin-sloth-info {
  overflow: hidden;

  background-color: var(--color-background-soft);
  border: 1px solid gray;
}
.admin-sloth-info {
  padding: 0.5rem;
  width: calc(50% - var(--gap));

  border-radius: 0.5rem;
}
.catalog-sloth-info {
  position: relative;
  padding: 1rem;
  width: 20rem;

  border-radius: 1rem;
}
.admin-sloth-info:hover,
.catalog-sloth-info:hover {
  box-shadow: 0px 0px 0.5rem gray;
}

.catalog-sloth-info__inner,
.admin-sloth-info__inner,
.download-sloth-info__inner {
  display: flex;
  align-items: center;
  gap: var(--gap);
}
.catalog-sloth-info__inner {
  flex-direction: column;
}

.catalog-sloth-info__sloth {
  position: relative;

  overflow: hidden;
}

.admin-sloth-info__img {
  width: calc(10rem - 1rem);
  height: calc(10rem - 1rem);
  object-fit: contain;
}
.catalog-sloth-info__img {
  width: calc(20rem - 2rem);
  height: calc(20rem - 2rem);
  object-fit: contain;
}

.admin-sloth-info__props,
.catalog-sloth-info__props {
  display: flex;
  flex-direction: column;
}
.admin-sloth-info__props {
  align-items: flex-start;
}
.catalog-sloth-info__props {
  align-items: center;
}

.sloth-info__property {
  padding: 0.25rem;
}

.sloth-info__btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gap);
}
.btn-horizontal {
  flex-direction: row;
}
.sloth-info__tags {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  transform: translateY(-500px);
  transition: transform 0.3s;

  justify-content: center;
  z-index: 10;
}
.catalog-sloth-info__sloth:hover .sloth-info__tags {
  transform: translateY(0);
}
.sloth-info__tag {
  padding: 0.5rem 0.7rem;
  cursor: default;

  color: inherit;
  background-color: var(--color-background);

  border-radius: 1rem;
  border: 1px solid gray;
}

.icon {
  position: absolute;
  bottom: 0rem;
  right: 0rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}
.download-icon {
  /* position: absolute;
  bottom: 0rem;
  right: 0rem; */
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}
.icon_check-on {
  background-image: url('@/assets/icons/btn/check-circle-fill.svg');
}
.icon_check-off {
  background-image: url('@/assets/icons/btn/check-circle.svg');
}

.download-sloth-info {
  padding: 0.5rem 1rem;
  position: relative;
  height: 6rem;
}
.download-sloth-info__img {
  width: 6rem;
  height: 6rem;
}

@media (max-width: 1000px) {
  .admin-sloth-info {
    width: 100%;
  }
}
</style>

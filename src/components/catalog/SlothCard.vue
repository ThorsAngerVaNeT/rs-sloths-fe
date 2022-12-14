<template>
  <div :class="`${getPageName}-sloth-info`">
    <div v-if="isAdmin" class="admin-sloth-info__inner">
      <div class="admin-sloth-info__sloth">
        <img class="admin-sloth-info__img" :src="getImageUrl" :alt="slothInfo.caption" />
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
        <p v-show="slothInfo.rating === 0" class="sloth-info__text__main">0</p>
        <p class="sloth-info__property">
          <img
            v-for="item in Math.floor(slothInfo.rating) || 0"
            :key="item"
            src="/img/catalog/sloths.svg"
            alt="sloths"
            class="sloth-info__text__sloth"
            :title="`${slothInfo.rating.toFixed(1)}`"
          />
          <img
            v-show="slothInfo.rating - Math.floor(slothInfo.rating) !== 0"
            src="/img/catalog/sloths.svg"
            alt="sloths"
            class="sloth-info__text__sloth"
            :title="`${slothInfo.rating.toFixed(1)}`"
            :style="{
              height: '20px',
              width: 22 * (slothInfo.rating - Math.floor(slothInfo.rating)) + 'px',
              overflowX: 'hidden',
              objectFit: 'cover',
              objectPosition: 'left center',
            }"
          />
        </p>
        <p class="sloth-info__property">
          {{ new Date(slothInfo.createdAt).toLocaleDateString() }}
        </p>
      </div>
    </div>

    <div v-else-if="isCatalog && !isDownload" class="catalog-sloth-info__inner">
      <div class="catalog-sloth-info__sloth">
        <img class="catalog-sloth-info__img" :src="getImageUrl" :alt="slothInfo.caption" />
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
          <p class="sloth-info__property sloth-info__property_text">{{ slothInfo.caption }}</p>
          <div class="sloth-info__property sloth-info__property_rating">
            <p v-if="slothInfo.rating === 0" class="sloth-info__user-rate">
              <span class="user-rate__main">{{ $t('rate.none') }}</span>
            </p>
            <p v-else class="sloth-info__user-rate">
              <img
                v-for="item in Math.floor(slothInfo.rating)"
                :key="item"
                src="/img/catalog/sloths.svg"
                alt="sloths"
                class="user-rate__sloth"
                :title="`${slothInfo.rating.toFixed(1)}`"
              />
              <img
                v-show="slothInfo.rating - Math.floor(slothInfo.rating) !== 0"
                src="/img/catalog/sloths.svg"
                alt="sloths"
                class="user-rate__sloth"
                :title="`${slothInfo.rating.toFixed(1)}`"
                :style="{
                  height: '40px',
                  width: 44 * (slothInfo.rating - Math.floor(slothInfo.rating)) + 'px',
                  overflowX: 'hidden',
                  objectFit: 'cover',
                  objectPosition: 'left center',
                }"
              />
            </p>
          </div>
          <div class="sloth-info__property sloth-info__property_rate">
            <label for="range" class="sloth-info__label">{{ $t('rate.your') }}</label>
            <select
              class="sloth-info__select"
              name="range"
              id="range"
              v-model="newRating"
              @change="$emit('editRating', slothInfo, +newRating)"
            >
              <option v-for="value in rateValues" :key="value" :value="value">{{ value }}</option>
            </select>
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
        <img class="download-sloth-info__img" :src="getImageUrl" :alt="slothInfo.caption" />
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
import { BASE, RATING_OPTIONS } from '@/common/const';

export default defineComponent({
  name: 'SlothCard',

  components: {
    CustomBtn,
    ModalWindow,
  },

  data() {
    return {
      newRating: this.slothInfo.ratings[0]?.rate ?? 0,
      isApproveShow: false,
      rateValues: RATING_OPTIONS,
    };
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
    getImageUrl(): string {
      return `${BASE}/${this.slothInfo.image_url}`;
    },

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
  width: 30rem;
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
  justify-content: center;
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
  width: 100%;
  height: 25rem;
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
  text-align: center;
  align-items: center;
  gap: var(--gap);
}

.sloth-info__property {
  font-size: 2rem;
}

.sloth-info__property_text {
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
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

.icon,
.download-icon {
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}

.icon {
  position: absolute;
  bottom: 0rem;
  right: 0rem;
}

.icon_check-on {
  background-image: url('@/assets/icons/btn/check-circle-fill.svg');
}

.icon_check-off {
  background-image: url('@/assets/icons/btn/check-circle.svg');
}

.download-sloth-info {
  position: relative;
  height: 6rem;
}

.download-sloth-info__img {
  height: 6rem;
}

.sloth-info__property_rating {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sloth-info__user-rate {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sloth-info__rating {
  text-transform: uppercase;
}

.user-rate__main {
  font-size: 2rem;
}

.user-rate__sloth {
  height: 4rem;
}

.sloth-info__property_rate {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.sloth-info__select {
  padding: 0.5rem;
  border: 0.2rem solid var(--color-border-inverse-soft);
  background-color: var(--color-background);
  color: inherit;
  width: 5rem;
  border-radius: 1rem;
  transition: 0.5s ease;
}

.sloth-info__user-other {
  align-self: end;
}

.sloth-info__text__sloth {
  height: 2rem;
}

@media (max-width: 1000px) {
  .admin-sloth-info {
    width: 100%;
  }
}
</style>

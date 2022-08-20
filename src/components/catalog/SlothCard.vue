<template>
  <div :class="`${getPageName}-sloths-info`">
    <div :class="`${getPageName}-sloths-info__sloths`">
      <img :class="`${getPageName}-sloths-info__img`" :src="slothsInfo.image_url" :alt="slothsInfo.caption" />
    </div>
    <div>
      <div :class="`${getPageName}-sloths-info__props`">
        <p class="sloths-info__property">{{ slothsInfo.caption }}</p>
        <p class="sloths-info__property">{{ slothsInfo.description }}</p>
        <p class="sloths-info__property">{{ slothsInfo.rating }}⭐</p>
        <p class="sloths-info__property">{{ new Date(slothsInfo.createdAt).toLocaleDateString() }}</p>
      </div>
      <div class="sloths-info__btn">
        <custom-btn
          v-show="getPageName === 'admin'"
          :text="$t('catalog.btn.edit')"
          className="btn btn-primary"
          @click="$emit('editSloth', slothsInfo)"
        ></custom-btn>
        <custom-btn
          v-show="getPageName === 'admin'"
          :text="$t('catalog.btn.del')"
          className="btn btn-primary"
          @click="$emit('delSloth', slothsInfo.id)"
        ></custom-btn>
        <custom-btn
          v-show="getPageName === 'catalog'"
          :text="$t('catalog.btn.pick')"
          className="btn btn-primary"
          @click="$emit('showSloth', slothsInfo)"
        ></custom-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Sloth } from '@/common/types';
import CustomBtn from '../buttons/CustomBtn.vue';

export default defineComponent({
  name: 'SlothCard',

  components: {
    CustomBtn,
  },

  props: {
    slothsInfo: {
      type: Object as PropType<Sloth>,
      required: true,
    },
  },

  computed: {
    getPageName() {
      return this.$route.name === 'admin' ? 'admin' : 'catalog';
    },
  },
});
</script>

<style scoped>
.catalog-sloths-info,
.admin-sloths-info {
  overflow: hidden;

  display: flex;
  align-items: center;

  border: 1px solid var(--dark-addict);
}
.admin-sloths-info {
  padding: 0.5em;

  border-radius: 0.5em;
}
.catalog-sloths-info {
  padding: 1em;
  width: 200px;

  flex-direction: column;

  border-radius: 1em;
}
.admin-sloths-info:hover,
.catalog-sloths-info:hover {
  box-shadow: 0px 0px 5px;
}

.admin-sloths-info__img {
  width: calc(100px - 1em);
}
.catalog-sloths-info__img {
  width: calc(200px - 2em);
}

.admin-sloths-info__props,
.catalog-sloths-info__props {
  display: flex;
  align-items: center;
}
.catalog-sloths-info__props {
  flex-direction: column;
}

.sloths-info__property {
  padding: 0.25em;
}

.sloths-info__btn {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
</style>

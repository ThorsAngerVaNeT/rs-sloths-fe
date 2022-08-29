<template>
  <div :class="`${getPageName}-sloths-info`">
    <div :class="`${getPageName}-sloths-info__sloth`">
      <img :class="`${getPageName}-sloths-info__img`" :src="slothsInfo.image_url" :alt="slothsInfo.caption" />
      <div class="sloths-info__tags tags">
        <span class="sloths-info__tag tag" v-for="tag in slothsInfo.tags" :key="tag.value">{{ tag.value }}</span>
      </div>
    </div>
    <div>
      <div :class="`${getPageName}-sloths-info__props`">
        <p class="sloths-info__property">{{ slothsInfo.caption }}</p>
        <p v-show="!isCatalog" class="sloths-info__property">{{ slothsInfo.rating }}⭐</p>
        <div v-show="isCatalog">
          <label for="range" class="sloths-info__label">{{ slothsInfo.rating }}⭐</label>
          <input
            type="range"
            id="range"
            min="0"
            max="5"
            step="1"
            v-model="newRating"
            @change="$emit('editRating', slothsInfo, +newRating)"
          />
        </div>
        <p v-show="isAdmin" class="sloths-info__property">
          {{ new Date(slothsInfo.createdAt).toLocaleDateString() }}
        </p>
      </div>
      <div class="sloths-info__btn">
        <custom-btn
          v-show="isAdmin"
          :text="$t('btn.edit')"
          className="btn btn-primary"
          @click="$emit('editSloth', slothsInfo)"
        ></custom-btn>
        <custom-btn
          v-show="isAdmin"
          :text="$t('btn.del')"
          className="btn btn-primary"
          @click="$emit('delSloth', slothsInfo.id)"
        ></custom-btn>
        <custom-btn
          v-show="isCatalog"
          :text="$t('btn.show')"
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

  data() {
    return { newRating: 0 };
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

    isAdmin() {
      return this.$route.name === 'admin';
    },

    isCatalog() {
      return this.$route.name === 'catalog';
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
  padding: 0.5rem;

  border-radius: 0.5rem;
}
.catalog-sloths-info {
  padding: 1rem;
  width: 20rem;

  flex-direction: column;

  border-radius: 1rem;
}
.admin-sloths-info:hover,
.catalog-sloths-info:hover {
  box-shadow: 0px 0px 0.5rem;
}
.catalog-sloths-info__sloth {
  position: relative;

  overflow: hidden;
}

.admin-sloths-info__img {
  width: calc(10rem - 1rem);
}
.catalog-sloths-info__img {
  width: calc(20rem - 2rem);
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
  padding: 0.25rem;
}

.sloths-info__btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.sloths-info__tags {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  transform: translateY(-500px);
  transition: transform 0.3s;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.catalog-sloths-info__sloth:hover .sloths-info__tags {
  transform: translateY(0);
}
.sloths-info__tag {
  padding: 0.2rem 0.5rem;

  border: 1px solid;
  border-radius: 0.5rem;
}
</style>

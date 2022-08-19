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
          :text="$t('catalog.btn.del')"
          className="btn btn-primary"
        ></custom-btn>
        <custom-btn :text="$t('catalog.btn.edit')" className="btn btn-primary"></custom-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { errorHandler } from '../../services/error-handling/error-handler';
import { SlothsService } from '../../services/sloths-service';
import type { Sloth } from '@/common/types';
import CustomBtn from '../buttons/CustomBtn.vue';

const service = new SlothsService();

export default defineComponent({
  name: 'SlothsInfo',

  components: {
    CustomBtn,
  },

  data() {
    return {
      slothsInfo: {} as Sloth,
    };
  },

  props: {
    sloth: {
      type: Object as PropType<Sloth>,
      required: true,
    },
  },

  computed: {
    getPageName() {
      return this.$route.name === 'admin' ? 'admin' : 'catalog';
    },
  },

  mounted() {
    this.slothsInfo = { ...this.sloth };
  },

  methods: {
    async getSlothsInfo() {
      try {
        const res = await service.getById(this.sloth.id);

        if (!res) throw Error(); // todo

        this.slothsInfo = res.data;
      } catch (error) {
        errorHandler(error);
      }
    },
    async updSlothsInfo() {
      try {
        const res = await service.updateById(this.sloth.id, this.slothsInfo);

        if (!res) throw Error(); // todo

        await this.getSlothsInfo();
      } catch (error) {
        errorHandler(error);
      }
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
  width: 100%;

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

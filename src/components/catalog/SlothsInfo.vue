<template>
  <div class="sloths-info">
    <div class="sloths-info__sloths">
      <img class="sloths-info__img" :src="slothsInfo.image_url" :alt="slothsInfo.caption" />
    </div>
    <p class="sloths-info__property">{{ slothsInfo.caption }}</p>
    <p class="sloths-info__property">{{ slothsInfo.description }}</p>
    <p class="sloths-info__property">{{ slothsInfo.rating }}★</p>
    <p class="sloths-info__property">{{ new Date(slothsInfo.createdAt).toLocaleDateString() }}</p>
    <custom-btn :text="$t('catalog.btn.edit')" className="btn btn-primary"></custom-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { errorHandler } from '../../services/error-handling/error-handler';
import { SlothsService } from '../../services/sloths-service';
import type { Sloths } from '@/common/types';
import CustomBtn from '../buttons/CustomBtn.vue';

const service = new SlothsService();

export default defineComponent({
  name: 'SlothsInfo',

  components: {
    CustomBtn,
  },

  data() {
    return {
      slothsInfo: {} as Sloths,
    };
  },

  props: {
    sloth: {
      type: Object as PropType<Sloths>,
      required: true,
    },
  },

  computed: {},

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
.sloths-info {
  padding: 1em;
  width: 200px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 1em;
  border: 1px solid var(--dark-addict);
}
.sloths-info:hover {
  box-shadow: 0px 0px 5px;
}
.sloths-info__sloths {
  display: inline-block;
  width: calc(200px - 2em);
  height: calc(200px - 2em);
  overflow: hidden;
}
.sloths-info__img {
  width: calc(200px - 2em);
}
</style>

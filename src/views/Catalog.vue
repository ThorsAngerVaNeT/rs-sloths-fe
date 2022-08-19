<template>
  <div class="catalog">
    <div class="catalog__aside">
      <h3>{{ $t('catalog.title') }}</h3>
      <custom-btn :text="$t('catalog.btn.reset')" className="btn btn-primary"></custom-btn>
    </div>
    <div class="catalog__showcase">
      <sloths-info v-for="sloth in sloths" :key="sloth.id" :sloth="sloth"></sloths-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { errorHandler } from '../services/error-handling/error-handler';
import { SlothsService } from '../services/sloths-service';
import CustomBtn from '../components/buttons/CustomBtn.vue';
import SlothsInfo from '../components/catalog/SlothsInfo.vue';
import type { Sloths } from '@/common/types';

const service = new SlothsService();

export default defineComponent({
  name: 'CatalogView',

  components: {
    CustomBtn,
    SlothsInfo,
  },

  data() {
    return {
      sloths: [] as Sloths,
    };
  },

  mounted() {
    this.getSloths();
  },

  methods: {
    async getSloths() {
      try {
        const res = await service.getAll();

        if (!res) throw Error(); // todo

        this.sloths = res.data;
      } catch (error) {
        errorHandler(error);
      }
    },
  },
});
</script>

<style scoped>
.catalog {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.catalog__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.catalog__showcase {
  margin: 0.5em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
}
</style>

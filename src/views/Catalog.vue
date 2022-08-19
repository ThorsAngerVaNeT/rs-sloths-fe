<template>
  <div class="catalog">
    <div class="catalog__aside">
      <h3>{{ $t('catalog.title') }}</h3>
      <custom-btn
        :text="$t('catalog.btn.new')"
        className="btn btn-primary"
        @click="showSlothInfo"
        v-show="getPageName === 'admin'"
      ></custom-btn>
      <custom-btn :text="$t('catalog.btn.reset')" className="btn btn-primary"></custom-btn>
    </div>
    <div class="catalog__showcase">
      <sloth-card v-for="sloth in sloths" :key="sloth.id" :slothsInfo="sloth" @delSloth="delSloth"></sloth-card>
    </div>
    <sloth-info
      :isSlothInfoVisible="isSlothInfoVisible"
      :headerText="$t('catalog.btn.new')"
      :isNew="true"
      @closeSlothInfo="closeSlothInfo"
      @createSloth="createSloth"
      @updSloth="updSloth"
    ></sloth-info>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { errorHandler } from '../services/error-handling/error-handler';
import { SlothsService } from '../services/sloths-service';
import CustomBtn from '../components/buttons/CustomBtn.vue';
import SlothInfo from '../components/catalog/SlothInfo.vue';
import SlothCard from '../components/catalog/SlothCard.vue';
import type { Sloth, Sloths } from '@/common/types';

const service = new SlothsService();

export default defineComponent({
  name: 'CatalogView',

  components: {
    CustomBtn,
    SlothCard,
    SlothInfo,
  },

  data() {
    return {
      sloths: [] as Sloths,
      isSlothInfoVisible: false,
    };
  },

  computed: {
    getPageName() {
      return this.$route.name === 'admin' ? 'admin' : 'catalog';
    },
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

    async delSloth(id: string) {
      try {
        const res = await service.deleteById(id);

        if (!res) throw Error(); // todo

        await this.getSloths();
      } catch (error) {
        errorHandler(error);
      }
    },

    async createSloth(sloth: Sloth) {
      try {
        const res = await service.create(sloth);

        if (!res) throw Error(); // todo

        await this.getSloths();
      } catch (error) {
        errorHandler(error);
      }
    },

    async updSloth(sloth: Sloth) {
      try {
        const res = await service.updateById(sloth.id, sloth);

        if (!res) throw Error(); // todo

        await this.getSloths();
      } catch (error) {
        errorHandler(error);
      }
    },

    showSlothInfo() {
      this.isSlothInfoVisible = true;
    },

    closeSlothInfo() {
      this.isSlothInfoVisible = false;
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
  width: 200px;

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

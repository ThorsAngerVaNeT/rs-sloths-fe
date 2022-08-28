<template>
  <div class="catalog">
    <div class="catalog__aside list-aside">
      <h3>{{ $t('catalog.title') }}: {{ count }}</h3>
      <custom-btn
        :text="$t('catalog.btn.new')"
        className="btn btn-primary"
        @click="showSlothInfoNew"
        v-show="getPageName === 'admin'"
      ></custom-btn>
      <list-controls
        @search="getSloths"
        @tags="getSloths"
        @sorting="getSloths"
        @clearAll="getSloths"
        :placeholder="$t('catalog.search')"
        :tags="tags"
        :title="$t('catalog.sorting')"
        :options="sortingOptions"
        :text="$t('btn.reset')"
      >
      </list-controls>
    </div>
    <div class="catalog__main list-main">
      <list-pagination :size="count" @getPage="getSloths"></list-pagination>
      <div class="catalog__list">
        <sloth-card
          v-for="sloth in sloths"
          :key="sloth.id"
          :slothsInfo="sloth"
          @editRating="updSlothRating"
          @delSloth="delSloth"
          @editSloth="showSlothInfoEdit"
          @showSloth="showSlothInfoView"
        ></sloth-card>
      </div>
      <sloth-info
        :isSlothInfoVisible="isSlothInfoVisible"
        :headerText="getHeaderSlothInfo"
        :modalEvents="modalEvents"
        @closeSlothInfo="closeSlothInfo"
        @createSloth="createSloth"
        @updSloth="updSloth"
      ></sloth-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';
import type { Sloth, Sloths } from '@/common/types';
import { errorHandler } from '@/services/error-handling/error-handler';
import { SLOTH_SORTING } from '@/common/const';
import { SlothsService } from '@/services/sloths-service';
import { ModalEvents } from '@/common/enums/modal-events';
import useLoader from '@/stores/loader';
import usePagination from '@/stores/pagination';
import useSearchText from '@/stores/search-text';
import useSelectedTags from '@/stores/tag-cloud';
import useSortingList from '@/stores/sorting-list';
import useSlothInfo from '@/stores/sloth-info';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import ListControls from '@/components/list-controls/ListControls.vue';
import ListPagination from '@/components/list-controls/ListPagination.vue';
import SlothCard from '@/components/catalog/SlothCard.vue';
import SlothInfo from '@/components/catalog/SlothInfo.vue';

const service = new SlothsService();

const { setEmptySlothInfo, setSlothInfo } = useSlothInfo();

const { getPerPage, getCurrPage } = usePagination();
const { getSearchText } = useSearchText();
const { getSelected } = useSelectedTags();
const { getSortingList } = useSortingList();

export default defineComponent({
  name: 'CatalogView',

  components: {
    CustomBtn,
    SlothCard,
    SlothInfo,
    ListControls,
    ListPagination,
  },

  data() {
    return {
      sloths: [] as Sloths,
      count: 0,
      isSlothInfoVisible: false,
      modalEvents: ModalEvents.view,
      searchText: '',
      tags: [] as string[],
      sortingOptions: SLOTH_SORTING,
    };
  },

  computed: {
    ...mapWritableState(useLoader, ['isLoad']),

    getPageName() {
      return this.$route.name === 'admin' ? 'admin' : 'catalog';
    },

    getHeaderSlothInfo() {
      if (this.modalEvents === ModalEvents.new) return this.$t('catalog.btn.new');
      if (this.modalEvents === ModalEvents.edit) return this.$t('btn.edit');
      return this.$t('catalog.info');
    },
  },

  mounted() {
    this.getSloths();
  },

  methods: {
    async getSloths() {
      this.isLoad = true;
      try {
        const currPage = getCurrPage();
        const perPage = getPerPage();
        const searchText = getSearchText();
        const selected = getSelected();
        const sorting = getSortingList();

        const res = await service.getPage(currPage, perPage, searchText, sorting, selected);

        if (!res.ok) throw Error(); // todo

        this.sloths = res.data.items;
        this.count = res.data.count;

        await this.getTags();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async delSloth(id: string) {
      this.isLoad = true;
      try {
        const res = await service.deleteById(id);

        if (!res.ok) throw Error(); // todo

        await this.getSloths();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async createSloth(sloth: Sloth, file: File) {
      this.isLoad = true;
      try {
        const res = await service.createImage(sloth, file);

        if (!res.ok) throw Error(); // todo

        await this.getSloths();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async updSlothRating(sloth: Sloth, rate: number) {
      this.isLoad = true;
      try {
        const res = await SlothsService.updateRatingById(sloth.id, rate);

        if (!res.ok) throw Error(); // todo

        await this.getSloths();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async updSloth(sloth: Sloth) {
      this.isLoad = true;
      try {
        const res = await SlothsService.updateByIdAndTags(sloth.id, sloth);

        if (!res.ok) throw Error(); // todo

        await this.getSloths();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async getTags() {
      this.isLoad = true;
      try {
        const res = await SlothsService.getTags();

        if (!res.ok) throw Error(); // todo

        this.tags = res.data.map((el) => el.value);
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    showSlothInfoView(sloth: Sloth) {
      this.modalEvents = ModalEvents.view;
      setSlothInfo(sloth);
      this.showSlothInfo();
    },

    showSlothInfoNew() {
      this.modalEvents = ModalEvents.new;
      setEmptySlothInfo();
      this.showSlothInfo();
    },

    showSlothInfoEdit(sloth: Sloth) {
      this.modalEvents = ModalEvents.edit;
      setSlothInfo(sloth);
      this.showSlothInfo();
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

  color: var(--color-text);
}
.catalog__aside {
  margin: 0.5em;
}

.catalog__list {
  margin: 0.5em 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--gap);
}

@media (max-width: 768px) {
  .catalog {
    flex-direction: column;
  }
}
</style>

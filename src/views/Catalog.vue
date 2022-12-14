<template>
  <div class="catalog" :class="isAdmin ? 'catalog_admin' : ''">
    <div class="catalog__aside list-aside">
      <custom-btn
        v-show="getPageName === 'admin'"
        :text="$t('catalog.btn.new')"
        className="btn btn-primary"
        @click="showSlothInfoNew"
      ></custom-btn>
      <custom-btn
        v-show="getPageName === 'catalog'"
        :imgPath="`./img/catalog/download-${$i18n.locale}-${currTheme}.svg`"
        :disabled="!isChecked"
        :text="$t('btn.download')"
        className="btn btn-download"
        @click="downloadFiles"
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
      <custom-btn
        v-show="getPageName === 'catalog'"
        :text="$t('merch.title')"
        :imgPath="'./img/catalog/merch.svg'"
        className="btn btn-catalog"
        @click="$router.push({ name: 'merch' })"
      ></custom-btn>
    </div>
    <div class="catalog__main list-main">
      <list-pagination ref="pagination" :size="count" @getPage="getSloths"></list-pagination>
      <div class="catalog__list">
        <sloth-card
          v-for="sloth in sloths"
          :key="sloth.id"
          :slothInfo="sloth"
          @editRating="updSlothRating"
          @delSloth="delSloth"
          @editSloth="showSlothInfoEdit"
          @showSloth="showSlothInfoView"
          @checkSloth="checkSlothInfoView"
        ></sloth-card>
      </div>
      <sloth-info
        :isSlothInfoVisible="isSlothInfoVisible"
        :headerText="getHeaderSlothInfo"
        :modalEvents="modalEvents"
        @closeSlothInfo="closeSlothInfo"
        @createSloth="createSloth"
        @updSloth="updSloth"
        @updSlothImage="updSlothImage"
      ></sloth-info>
    </div>
    <modal-window v-show="isDownloadShow" @close="closeModal">
      <template v-slot:header> {{ $t('modal.body.download') }} </template>

      <template v-slot:body>
        <div class="catalog__download">
          <sloth-card
            v-for="sloth in checked"
            :key="sloth.id"
            :slothInfo="sloth"
            :isDownload="true"
            @checkSloth="checkSlothInfoView"
          ></sloth-card>
        </div>
      </template>

      <template v-slot:footer>
        <div class="catalog__btn">
          <custom-btn
            :text="$t('btn.yes')"
            className="btn btn-primary"
            :onClick="approveDownload"
            :disabled="!isChecked"
          ></custom-btn>
          <custom-btn :text="$t('btn.no')" className="btn btn-primary" :onClick="closeModal"></custom-btn>
        </div>
      </template>
    </modal-window>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';
import themeProp from '@/stores/theme';
import type { PageSettings, Sloth, Sloths } from '@/common/types';
import { errorHandler } from '@/services/error-handling/error-handler';
import { BASE, PAGINATION_OPTIONS, SLOTH_SORTING } from '@/common/const';
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
import ListPagination, { type PaginationListElement } from '@/components/list-controls/ListPagination.vue';
import SlothCard from '@/components/catalog/SlothCard.vue';
import SlothInfo from '@/components/catalog/SlothInfo.vue';
import ModalWindow from '@/components/modal/ModalWindow.vue';
import usePagesStore from '@/stores/pages-store';

const service = new SlothsService();

const { setEmptySlothInfo, setSlothInfo } = useSlothInfo();

const { getPerPage, getCurrPage, setPerPage, setCurrPage } = usePagination();
const { getSearchText, setSearchText } = useSearchText();
const { getSelected, setSelected } = useSelectedTags();
const { getSortingList, setSortingList } = useSortingList();
const { getPageCatalogState, setPageCatalogState } = usePagesStore();

export default defineComponent({
  name: 'CatalogView',

  components: {
    CustomBtn,
    SlothCard,
    SlothInfo,
    ListControls,
    ListPagination,
    ModalWindow,
  },

  data() {
    return {
      sloths: [] as Sloths,
      count: 0,
      isSlothInfoVisible: false,
      modalEvents: ModalEvents.view,
      tags: [] as string[],
      sortingOptions: SLOTH_SORTING,
      isDownloadShow: false,
      checked: [] as Sloths,
    };
  },

  computed: {
    ...mapWritableState(useLoader, ['isLoad']),
    ...mapWritableState(themeProp, ['currTheme']),

    getPageName(): string {
      return this.$route.name === 'admin' ? 'admin' : 'catalog';
    },

    getHeaderSlothInfo(): string {
      if (this.modalEvents === ModalEvents.new) return this.$t('catalog.btn.new');
      if (this.modalEvents === ModalEvents.edit) return this.$t('btn.edit');
      return this.$t('catalog.info');
    },

    isChecked(): boolean {
      return !!this.checked.filter((el) => el.checked).length;
    },

    isAdmin() {
      return this.$route.name === 'admin';
    },
  },

  created() {
    this.loadStore();
  },

  async mounted() {
    await this.getSloths();
  },

  beforeUnmount() {
    this.saveStore();
  },

  watch: {
    isChecked(newVal) {
      if (!newVal) {
        this.isDownloadShow = false;
      }
    },
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

        const res = await service.getAll(currPage, perPage, sorting, searchText, selected.join(','));

        if (!res.ok) throw Error(); // todo

        this.sloths = res.data.items;
        this.count = res.data.count;

        if (!this.sloths.length && currPage !== 1) {
          const pagination = this.$refs.pagination as PaginationListElement;
          if (pagination) pagination.top();
        }

        this.setChecked();

        await this.getTags();

        this.saveStore();
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

    async updSlothImage(sloth: Sloth, file: File) {
      this.isLoad = true;
      try {
        const res = await SlothsService.updateByIdAndTagsImage(sloth.id, sloth, file);

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

    checkSlothInfoView(sloth: Sloth) {
      let slothIndex = this.sloths.indexOf(sloth);
      if (slothIndex !== -1) this.sloths[slothIndex].checked = !this.sloths[slothIndex].checked;

      slothIndex = this.checked.findIndex((el) => el.id === sloth.id);
      if (slothIndex !== -1) {
        this.checked.splice(slothIndex, 1);
      } else {
        this.checked.push(sloth);
      }

      this.saveStore();
    },

    setChecked() {
      this.sloths.forEach((sloth) => {
        const slothIndex = this.checked.findIndex((el) => el.id === sloth.id);
        this.sloths[this.sloths.indexOf(sloth)].checked = slothIndex !== -1;
      });
    },

    async showSlothInfoView(sloth: Sloth) {
      this.isLoad = true;
      try {
        const res = await service.getById(sloth.id);

        if (!res.ok) throw Error(); // todo

        const dataSloth = res.data;
        const slothIndex = this.sloths.findIndex((el) => el.id === sloth.id);

        if (slothIndex !== -1) this.sloths[slothIndex] = dataSloth;

        this.modalEvents = ModalEvents.view;
        setSlothInfo(dataSloth);
        this.showSlothInfo();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
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

    downloadFiles() {
      if (this.checked.length) this.isDownloadShow = true;
    },

    approveDownload() {
      const forDownload = this.checked.filter((el) => el.checked).map((el) => el.id);

      if (!forDownload.length) return;

      const downloadUrl = `${BASE}/download/${forDownload.join(',')}`;
      // download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.click();

      this.closeModal();
    },

    closeModal() {
      this.setChecked();
      this.isDownloadShow = false;
    },

    saveStore() {
      const savedProps = {
        currPage: getCurrPage(),
        perPage: getPerPage(),
        searchText: getSearchText(),
        selected: getSelected(),
        sorting: getSortingList(),
        checked: this.checked.filter((el) => el.checked).map((el) => el.id),
      };
      setPageCatalogState(JSON.stringify(savedProps));
    },

    loadStore() {
      const settings: PageSettings = {
        currPage: 1,
        perPage: PAGINATION_OPTIONS[0],
        searchText: '',
        selected: [] as string[],
        sorting: SLOTH_SORTING[1].value,
        checked: [] as string[],
      };

      const str = getPageCatalogState();
      if (str) {
        const data = JSON.parse(str);
        if (data) {
          settings.currPage = data.currPage;
          settings.perPage = data.perPage;
          settings.searchText = data.searchText;
          settings.selected = data.selected;
          settings.sorting = data.sorting;
          settings.checked = data.checked;
        }
      }

      setCurrPage(settings.currPage);
      setPerPage(settings.perPage);
      setSearchText(settings.searchText);
      setSelected(settings.selected);
      setSortingList(settings.sorting);

      const { checked } = settings;
      checked?.forEach((id: string) => {
        const found = this.sloths.find((el) => el.id === id);
        if (found) found.checked = true;
      });
    },
  },
});
</script>

<style scoped>
.catalog {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  color: var(--color-text);
}

.catalog_admin {
  flex-direction: column;
}

.catalog__main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--gap-2);
}

.catalog__aside {
  padding: 1rem;
}

.catalog_admin > .catalog__aside {
  width: 100%;
  margin: 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.catalog_admin > .catalog__main {
  width: 100%;
}

.catalog__list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}

.catalog__download {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap);

  max-height: 50rem;
  overflow: scroll;
}

.catalog__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap);
}

@media (max-width: 768px) {
  .catalog {
    flex-direction: column;
  }
}
</style>

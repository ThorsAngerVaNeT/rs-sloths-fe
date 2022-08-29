<template>
  <div class="suggest">
    <div class="suggest__aside list-aside">
      <h3>{{ $t('suggest.title') }}: {{ count }}</h3>
      <custom-btn
        :text="$t('suggest.btn.new')"
        className="btn btn-primary"
        @click="showSuggestionInfoNew"
        v-show="getPageName === 'admin'"
      ></custom-btn>
      <list-controls
        @search="getSuggestions"
        @tags="getSuggestions"
        @sorting="getSuggestions"
        @clearAll="getSuggestions"
        :placeholder="$t('suggest.search')"
        :tags="tags"
        :title="$t('suggest.sorting')"
        :options="sortingOptions"
        :text="$t('btn.reset')"
      >
      </list-controls>
    </div>
    <div class="suggest__main list-main">
      <list-pagination :size="count" @getPage="getSuggestions"></list-pagination>
      <div class="suggest__list">
        <suggestion-card
          v-for="suggest in suggestions"
          :key="suggest.id"
          :suggestInfo="suggest"
          @editRating="updSuggestionRating"
          @delSuggest="delSuggestion"
          @editSuggest="showSuggestionInfoEdit"
          @showSuggest="showSuggestionInfoView"
        ></suggestion-card>
      </div>
      <suggestion-info
        :isSuggestInfoVisible="isSuggestionInfoVisible"
        :headerText="getHeaderSuggestionInfo"
        :modalEvents="modalEvents"
        @closeSuggestInfo="closeSuggestionInfo"
        @createSuggest="createSuggestion"
        @updSuggest="updSuggestion"
      ></suggestion-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';
import type { Suggestion, Suggestions } from '@/common/types';
import { errorHandler } from '@/services/error-handling/error-handler';
import { SUGGESTION_SORTING } from '@/common/const';
import { SuggestionsService } from '@/services/suggestions-service';
import { ModalEvents } from '@/common/enums/modal-events';
import useLoader from '@/stores/loader';
import usePagination from '@/stores/pagination';
import useSearchText from '@/stores/search-text';
import useSelectedTags from '@/stores/tag-cloud';
import useSortingList from '@/stores/sorting-list';
import useSuggestionInfo from '@/stores/suggestion-info';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import ListControls from '@/components/list-controls/ListControls.vue';
import ListPagination from '@/components/list-controls/ListPagination.vue';
import SuggestionCard from '@/components/suggest/SuggestionCard.vue';
import SuggestionInfo from '@/components/suggest/SuggestionInfo.vue';
import { SuggestionStatus } from '@/common/enums/suggestion-status';

const service = new SuggestionsService();

const { setEmptySuggestionInfo, setSuggestionInfo } = useSuggestionInfo();

const { getPerPage, getCurrPage } = usePagination();
const { getSearchText } = useSearchText();
const { getSelected } = useSelectedTags();
const { getSortingList } = useSortingList();

export default defineComponent({
  name: 'SuggestionView',

  components: {
    CustomBtn,
    SuggestionCard,
    SuggestionInfo,
    ListControls,
    ListPagination,
  },

  data() {
    return {
      suggestions: [] as Suggestions,
      count: 0,
      isSuggestionInfoVisible: false,
      modalEvents: ModalEvents.view,
      searchText: '',
      tags: [SuggestionStatus.pending, SuggestionStatus.accepted, SuggestionStatus.decline],
      sortingOptions: SUGGESTION_SORTING,
    };
  },

  computed: {
    ...mapWritableState(useLoader, ['isLoad']),

    getPageName() {
      return this.$route.name === 'admin' ? 'admin' : 'suggest';
    },

    getHeaderSuggestionInfo() {
      if (this.modalEvents === ModalEvents.new) return this.$t('suggest.btn.new');
      if (this.modalEvents === ModalEvents.edit) return this.$t('btn.edit');
      return this.$t('suggest.info');
    },
  },

  mounted() {
    // this.getSuggestions();
    this.suggestions = [
      {
        id: 'cd86722d-e3cc-405c-9a46-8da7d7d2dfcf',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image_url: 'http://localhost:5173/test01.svg',
        // image_url: '',
        userId: 'cd86722d-e3cc-405c-9a46-8da7d7d2dfcf',
        rating: 3,
        createdAt: new Date('2022-08-29T17:32:47.207Z'),
        status: SuggestionStatus.pending,
      },
    ];
    this.count = 1;
  },

  methods: {
    async getSuggestions() {
      this.isLoad = true;
      try {
        const currPage = getCurrPage();
        const perPage = getPerPage();
        const searchText = getSearchText();
        const selected = getSelected();
        const sorting = getSortingList();

        const res = await service.getPage(currPage, perPage, searchText, sorting, selected);

        if (!res.ok) throw Error(); // todo

        this.suggestions = res.data.items;
        this.count = res.data.count;
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async delSuggestion(id: string) {
      this.isLoad = true;
      try {
        const res = await service.deleteById(id);

        if (!res.ok) throw Error(); // todo

        await this.getSuggestions();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async createSuggestion(suggestion: Suggestion, file: File) {
      this.isLoad = true;
      try {
        const res = await service.createImage(suggestion, file);

        if (!res.ok) throw Error(); // todo

        await this.getSuggestions();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async updSuggestionRating(suggestion: Suggestion, rate: number) {
      this.isLoad = true;
      try {
        const res = await SuggestionsService.updateRatingById(suggestion.id, rate);

        if (!res.ok) throw Error(); // todo

        await this.getSuggestions();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    async updSuggestion(suggestion: Suggestion) {
      this.isLoad = true;
      try {
        const res = await service.updateById(suggestion.id, suggestion);

        if (!res.ok) throw Error(); // todo

        await this.getSuggestions();
      } catch (error) {
        errorHandler(error);
      } finally {
        this.isLoad = false;
      }
    },

    showSuggestionInfoView(suggestion: Suggestion) {
      this.modalEvents = ModalEvents.view;
      setSuggestionInfo(suggestion);
      this.showSuggestionInfo();
    },

    showSuggestionInfoNew() {
      this.modalEvents = ModalEvents.new;
      setEmptySuggestionInfo();
      this.showSuggestionInfo();
    },

    showSuggestionInfoEdit(suggestion: Suggestion) {
      this.modalEvents = ModalEvents.edit;
      setSuggestionInfo(suggestion);
      this.showSuggestionInfo();
    },

    showSuggestionInfo() {
      this.isSuggestionInfoVisible = true;
    },

    closeSuggestionInfo() {
      this.isSuggestionInfoVisible = false;
    },
  },
});
</script>

<style scoped>
.suggest {
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  color: var(--color-text);
}
.suggest__aside {
  margin: 0.5em;
}

.suggest__list {
  margin: 0.5em 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--gap);
}

@media (max-width: 768px) {
  .suggest {
    flex-direction: column;
  }
}
</style>

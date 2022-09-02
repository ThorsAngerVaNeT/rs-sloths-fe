<template>
  <div class="pagination">
    <div class="pagination__per-page">
      <label class="pagination__label" for="perPage">{{ $t('pagination.perPage') }}: </label>
      <select
        class="pagination__select select-element"
        name="perPage"
        id="perPage"
        v-model="perPage"
        @change="setPerPage"
      >
        <option v-for="item in perPageArr" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>
    <div class="pagination__btns">
      <custom-btn
        :text="$t('pagination.top')"
        className="btn btn-pagination"
        @click="top"
        :disabled="checkTop"
      ></custom-btn>
      <custom-btn
        :text="$t('pagination.prev')"
        className="btn btn-pagination"
        @click="prev"
        :disabled="checkTop"
      ></custom-btn>

      <div class="pagination__page">
        <span>{{ currPage }}</span>
      </div>

      <custom-btn
        :text="$t('pagination.next')"
        className="btn btn-pagination"
        @click="next"
        :disabled="checkBottom"
      ></custom-btn>
      <custom-btn
        :text="$t('pagination.bottom')"
        className="btn btn-pagination"
        @click="bottom"
        :disabled="checkBottom"
      ></custom-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { PAGINATION_OPTIONS } from '@/common/const';
import usePagination from '@/stores/pagination';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import { defineComponent } from 'vue';

const { getPerPage, getCurrPage, setPerPage, setCurrPage } = usePagination();

const paginationList = defineComponent({
  name: 'ListPagination',

  components: {
    CustomBtn,
  },

  data() {
    return {
      perPageArr: PAGINATION_OPTIONS,
      perPage: getPerPage(),
      currPage: getCurrPage(),
    };
  },

  props: {
    size: {
      type: Number,
      required: true,
    },
  },

  computed: {
    pages(): number {
      return Math.ceil(this.size / this.perPage);
    },

    checkTop(): boolean {
      return this.currPage === 1;
    },

    checkBottom(): boolean {
      return this.currPage === this.pages;
    },
  },

  methods: {
    getPage() {
      setCurrPage(this.currPage);
      setPerPage(this.perPage);
      this.$emit('getPage');
    },

    setPerPage() {
      this.currPage = 1;
      this.getPage();
    },

    top() {
      this.currPage = 1;
      this.getPage();
    },

    next() {
      if (this.currPage < this.pages) this.currPage += 1;
      this.getPage();
    },

    prev() {
      if (this.currPage > 1) this.currPage -= 1;
      this.getPage();
    },

    bottom() {
      this.currPage = this.pages;
      this.getPage();
    },
  },
});
export default paginationList;
export type PaginationListElement = InstanceType<typeof paginationList>;
</script>

<style>
.pagination {
  position: relative;
  margin-right: var(--gap);
}

.pagination__per-page {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.pagination__select {
  width: 4rem;

  text-align: center;

  color: inherit;
  background-color: var(--color-background);
}

.pagination__btns {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap);
}

.pagination__page {
  width: 4rem;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background-color: var(--color-background);
}

.pagination__page span {
  font-weight: bold;
}

@media (max-width: 1100px) {
  .pagination {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .pagination__per-page {
    position: static;
  }
}
</style>

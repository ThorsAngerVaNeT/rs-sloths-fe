<template>
  <div class="pagination">
    <label for="perPage">{{ $t('pagination.perPage') }}</label>
    <select name="perPage" id="perPage" v-model="perPage" @change="setPerPage">
      <option v-for="item in perPageArr" :key="item" :value="item">{{ item }}</option>
    </select>
    <div>
      <button :disabled="checkTop" @click="top" class="btn btn-primary">{{ $t('pagination.top') }}</button>
      <button :disabled="checkTop" @click="prev" class="btn btn-primary">{{ $t('pagination.prev') }}</button>
      <span>{{ currPage }}</span>
      <button :disabled="checkBottom" @click="next" class="btn btn-primary">{{ $t('pagination.next') }}</button>
      <button :disabled="checkBottom" @click="bottom" class="btn btn-primary">{{ $t('pagination.bottom') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { PAGINATION_OPTIONS } from '@/common/const';
import usePagination from '@/stores/pagination';
import { defineComponent } from 'vue';

const { setPerPage, setCurrPage } = usePagination();

const paginationList = defineComponent({
  name: 'ListPagination',

  data() {
    return {
      perPageArr: PAGINATION_OPTIONS,
      perPage: PAGINATION_OPTIONS[0],
      currPage: 1,
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

<style scoped></style>

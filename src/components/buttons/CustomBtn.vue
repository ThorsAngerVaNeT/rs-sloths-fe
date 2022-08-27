<template>
  <button v-if="imgPath === ''" :class="className" @click="onClick" :disabled="disabled">{{ text }}</button>
  <button v-else class="btn-img" :class="className" @click="onClick" :disabled="disabled">
    <img :src="imgPath" :alt="text" />
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'CustomBtn',

  props: {
    text: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: 'btn btn-primary',
    },
    imgPath: {
      type: String,
      default: '',
    },
    onClick: {
      type: Function as PropType<(payload: MouseEvent) => void>,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style>
.btn {
  display: inline-block;
  padding: 0.4em 0.8em;
  background: none;
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
  border: none;
}

.btn-link {
  text-decoration: underline;
}

.btn-primary {
  color: var(--color-text-inverse);
  background-color: var(--color-background-inverse);
}
.btn-primary:hover {
  background-color: var(--color-background-inverse-soft);
}

.btn-pagination {
  width: 4rem;
  height: 4rem;

  border-radius: 50%;

  color: var(--color-text-inverse);
  background-color: var(--color-background-inverse);
}
.btn-pagination:hover:not([disabled]) {
  background-color: var(--color-background-inverse-soft);
}

.btn-pagination:disabled {
  cursor: not-allowed;
  background-color: gray;
}

.btn-img img {
  overflow: hidden;
  border: 0.2rem solid var(--color-border-inverse);
}
.btn-img:hover {
  transform: scale(1.1) rotate(10deg);
}

.btn-tab {
  border: 1px solid;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-bottom: -1px;
  margin-right: -1px;
  color: var(--color-text);
  background-color: var(--color-background-soft);
}

.btn-tab:hover {
  background-color: var(--color-background);
}

.btn-tab.btn-tab_active,
.btn-tab.btn-tab_active:hover {
  color: var(--color-text-inverse);
  background-color: var(--color-background-inverse);
}

.btn-search {
  position: absolute;
  top: 0.5rem;
  right: -0.5rem;

  background: none;
  color: inherit;
}
</style>

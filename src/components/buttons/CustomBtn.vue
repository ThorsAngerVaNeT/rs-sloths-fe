<template>
  <div v-if="imgPath === ''" :class="className" @click="onClick">{{ text }}</div>
  <div v-else class="btn-img" :class="className" @click="onClick">
    <img :src="imgPath" :alt="text" />
  </div>
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
  },
});
</script>

<style>
.btn {
  display: inline-block;
  padding: 0.4em 0.8em;
  color: var(--color-text-inverse);
  background-color: var(--color-background-inverse);
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
}

.btn-link {
  text-decoration: underline;
}

.btn-primary {
  border: none;
}

.btn-img {
  background: none;
}

.btn-img img {
  overflow: hidden;
  border: 0.2rem solid var(--color-border-inverse);
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

.btn-primary:hover {
  background-color: var(--color-background-inverse-soft);
}

.btn-img:hover {
  transform: scale(1.1) rotate(10deg);
}

.btn-tab:hover {
  background-color: var(--color-background);
}

.btn-tab.active,
.btn-tab.active:hover {
  color: var(--color-text-inverse);
  background-color: var(--color-background-inverse);
}
</style>

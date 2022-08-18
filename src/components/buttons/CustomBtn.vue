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
  cursor: pointer;
  user-select: none;
}

.btn-link {
  text-decoration: underline;
}

.btn-primary {
  border: 1px solid;
}

.btn-img img {
  overflow: hidden;
}

.btn-tab {
  border: 1px solid;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  margin-bottom: -1px;
  margin-right: -1px;
}
</style>

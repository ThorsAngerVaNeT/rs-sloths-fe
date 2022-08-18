<template>
  <div class="memory">
    <h2>{{ $t('memory.title') }}</h2>
    <game-field> </game-field>
  </div>
</template>

<script lang="ts">
import GameField from '../components/memory/GameField.vue';

export default {
  name: 'MemoryView',

  components: {
    GameField,
  },
};
</script>

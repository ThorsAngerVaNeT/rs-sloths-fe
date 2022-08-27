<template>
  <div class="create">
    <h2>{{ $t('create.title') }}</h2>
    <div class="journey">
      <img ref="image" src="http://localhost:5173/memory-level-junior.png" alt="s" @click="updateMemeCanvas" />

      <label>Top Text</label>
      <input type="text" v-model="topText" @change="updateMemeCanvas" />

      <label>Bottom Text</label>
      <input type="text" v-model="bottomText" @change="updateMemeCanvas" />

      <canvas id="imageCanvas" ref="canvas"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateView',

  data() {
    return {
      topText: '',
      bottomText: '',
    };
  },

  methods: {
    updateMemeCanvas() {
      const { canvas, image } = this.$refs;
      if (canvas instanceof HTMLCanvasElement && image instanceof HTMLImageElement) {
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const { width } = image;
        const { height } = image;
        const fontSize = Math.floor(width / 10);
        const yOffset = height / 25;

        // Update canvas background
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0);

        // Prepare text
        ctx.strokeStyle = 'black';
        ctx.lineWidth = Math.floor(fontSize / 4);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.lineJoin = 'round';
        ctx.font = `${fontSize}px sans-serif`;

        // Add top text
        ctx.textBaseline = 'top';
        ctx.strokeText(this.topText, width / 2, yOffset);
        ctx.fillText(this.topText, width / 2, yOffset);

        // Add bottom text
        ctx.textBaseline = 'bottom';
        ctx.strokeText(this.bottomText, width / 2, height - yOffset);
        ctx.fillText(this.bottomText, width / 2, height - yOffset);
      }
    },
  },
});
</script>
<style>
canvas {
  border: 1px solid;
}
</style>

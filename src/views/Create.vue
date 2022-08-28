<template>
  <div class="create">
    <h2>{{ $t('create.title') }}</h2>
    <div class="journey">
      <div class="list">
        <img
          ref="imgs"
          v-for="(item, index) in images"
          :key="index"
          :src="getImg(index)"
          alt="images"
          @click="updImage(index)"
        />
      </div>

      <label>Top Text</label>
      <input type="text" v-model="topText" @change="updMemeCanvas" />

      <label>Bottom Text</label>
      <input type="text" v-model="bottomText" @change="updMemeCanvas" />

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
      images: [] as string[],
      index: 0,
      topText: '',
      bottomText: '',
    };
  },

  mounted() {
    this.getImages();
  },

  methods: {
    async getImages() {
      // todo fetch

      this.images = [
        './test01.png',
        './test02.png',
        './test03.png',
        './test04.png',
        './test05.png',
        './test06.png',
        './test07.png',
        './test08.png',
        './test09.png',
        './test10.png',
        './test11.png',
        './test12.png',
      ];
    },

    getImg(i: number): string {
      return this.images[i];
    },

    updImage(i: number) {
      this.index = i;
      this.updMemeCanvas();
    },

    updMemeCanvas() {
      const { canvas, imgs } = this.$refs;
      if (!(imgs instanceof Array)) {
        return;
      }
      const image = imgs[this.index];
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

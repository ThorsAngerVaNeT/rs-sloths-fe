<template>
  <div class="meme">
    <div class="meme__list list-aside">
      <h2>{{ $t('create.title') }}</h2>
      <h3>{{ $t('create.description') }}</h3>
      <div class="meme__memes">
        <img
          ref="imgs"
          v-for="(item, index) in images"
          :key="index"
          :src="getImg(index)"
          alt="images"
          class="meme__image"
          @click="updImage(index)"
        />
      </div>
    </div>
    <div class="meme__generator list-main">
      <div class="meme__text">
        <label class="meme__label" for="color">{{ $t('create.color') }}</label>
        <input type="color" id="color" v-model="color" @change="draw(false)" />
        <label class="meme__label" for="strokeStyle">{{ $t('create.stroke') }}</label>
        <input type="color" id="strokeStyle" v-model="strokeStyle" @change="draw(false)" />
      </div>
      <div class="meme__text">
        <label class="meme__label" for="top">{{ $t('create.top') }}</label>
        <input type="text" class="meme__input" id="top" v-model="topText" @change="draw(false)" />
      </div>

      <div class="meme__canvas-wrapper">
        <div class="meme__control-buttons">
          <button @click="scaleUp" type="button" class="scale-up">+</button>
          <button @click="scaleDown" type="button" class="scale-down">-</button>
        </div>
        <canvas class="meme__canvas" ref="canvas"></canvas>
      </div>

      <div class="meme__text">
        <label class="meme__label" for="bottom">{{ $t('create.bottom') }}</label>
        <input type="text" class="meme__input" id="bottom" v-model="bottomText" @change="draw(false)" />
      </div>
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
      scaleSteps: 0,
      canvas: {} as HTMLCanvasElement,
      ctx: {} as CanvasRenderingContext2D,
      img: {} as HTMLImageElement,
      imageX: 0,
      imageY: 0,
      scaledImageWidth: 0,
      scaledImageHeight: 0,
      imageWidth: 0,
      imageHeight: 0,
      imageRight: 0,
      imageBottom: 0,
      color: '#ffffff',
      strokeStyle: '#000000',
    };
  },

  mounted() {
    this.getImages();

    const { canvas } = this.$refs;
    if (!(canvas instanceof HTMLCanvasElement)) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.canvas = canvas;
    this.ctx = ctx;
    this.img = document.createElement('img');
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

    scaleUp() {
      this.scaleSteps -= 1;
      this.draw(false);
    },

    scaleDown() {
      this.scaleSteps += 1;
      this.draw(false);
    },

    draw(withBorders = false) {
      // clear the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // some maths
      const scaleFactor = 1 - this.scaleSteps * 0.1;
      this.scaledImageWidth = this.img.width * scaleFactor;
      this.scaledImageHeight = this.scaledImageWidth * (this.img.height / this.img.width);

      this.canvas.width = this.scaledImageWidth || this.canvas.width;
      this.canvas.height = this.scaledImageHeight || this.canvas.height;

      // draw the image
      this.ctx.drawImage(
        this.img,
        0,
        0,
        this.img.width,
        this.img.height,
        this.imageX,
        this.imageY,
        this.scaledImageWidth,
        this.scaledImageHeight
      );

      this.imageRight = this.imageX + this.scaledImageWidth;
      this.imageBottom = this.imageY + this.scaledImageHeight;

      this.drawText();

      // optionally draw a box around the image (indicates "selected")
      if (withBorders) this.drawBorders();
    },

    updImage(i: number) {
      this.index = i;

      const { imgs } = this.$refs;
      if (!(imgs instanceof Array)) return;

      const image = imgs[this.index];
      if (!(image instanceof HTMLImageElement)) return;

      this.img = image;

      // Grab position info
      this.imageWidth = this.img.width;
      this.imageHeight = this.img.height;
      this.imageRight = this.imageX + this.imageWidth;
      this.imageBottom = this.imageY + this.imageHeight;

      // Update CTX
      this.draw(false);

      // Notify component
      // this.isImageLoaded = true;
    },

    drawText() {
      const width = this.scaledImageWidth;
      const height = this.scaledImageHeight;
      const fontSize = Math.floor(width / 10);
      const yOffset = height / 25;

      // Prepare text
      this.ctx.strokeStyle = this.strokeStyle; // 'black';
      this.ctx.lineWidth = Math.floor(fontSize / 4);
      this.ctx.fillStyle = this.color; // 'white';
      this.ctx.textAlign = 'center';
      this.ctx.lineJoin = 'round';
      this.ctx.font = `${fontSize}px sans-serif`;

      // Add top text
      this.ctx.textBaseline = 'top';
      this.ctx.strokeText(this.topText, width / 2, yOffset);
      this.ctx.fillText(this.topText, width / 2, yOffset);

      // Add bottom text
      this.ctx.textBaseline = 'bottom';
      this.ctx.strokeText(this.bottomText, width / 2, height - yOffset);
      this.ctx.fillText(this.bottomText, width / 2, height - yOffset);
    },

    drawBorders() {
      this.ctx.beginPath();
      this.ctx.moveTo(this.imageX, this.imageY);
      this.ctx.lineTo(this.imageRight, this.imageY);
      this.ctx.lineTo(this.imageRight, this.imageBottom);
      this.ctx.lineTo(this.imageX, this.imageBottom);
      this.ctx.closePath();
      this.ctx.stroke();
    },
  },
});
</script>
<style>
.meme {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--gap);

  color: var(--color-text);
}

.meme__canvas-wrapper {
  position: relative;
}

.meme__control-buttons {
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 10;
}

.meme__control-buttons button {
  margin: 0;
  padding: 0;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
}

.meme__canvas {
  /* width: 30rem;
  height: 30rem; */
  border: 1px solid;
}
</style>

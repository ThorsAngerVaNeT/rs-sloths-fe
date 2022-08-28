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
          object-fit="contain"
          class="meme__image"
          @click="updImage(index)"
        />
      </div>
    </div>
    <div class="meme__generator list-main">
      <div class="meme__settings">
        <div class="meme__settings-col">
          <div class="meme__property">
            <label class="meme__label" for="top">{{ $t('create.top') }}</label>
            <input type="text" class="meme__text" id="top" v-model="topText" @change="draw()" />
          </div>
          <div class="meme__property">
            <label class="meme__label" for="bottom">{{ $t('create.bottom') }}</label>
            <input type="text" class="meme__text" id="bottom" v-model="bottomText" @change="draw()" />
          </div>
          <div class="meme__property">
            <button @click="saveImage" class="btn btn-primary" type="button">{{ $t('btn.download') }}</button>
            <button @click="copyImage" class="btn btn-primary" type="button">{{ $t('btn.copy') }}</button>
          </div>
        </div>
        <div class="meme__settings-col">
          <div class="meme__property">
            <label class="meme__label" for="margin">{{ $t('create.margin') }}</label>
            <input type="number" id="margin" min="0" max="100" class="meme__number" v-model="margin" @change="draw()" />
          </div>
          <div class="meme__property">
            <label class="meme__label" for="color">{{ $t('create.color') }}</label>
            <input type="color" id="color" class="meme__color" v-model="color" @change="draw()" />
          </div>
          <div class="meme__property">
            <label class="meme__label" for="strokeStyle">{{ $t('create.stroke') }}</label>
            <input type="color" id="strokeStyle" class="meme__color" v-model="strokeStyle" @change="draw()" />
          </div>
        </div>
      </div>

      <div class="meme__canvas-wrapper">
        <div class="meme__control-buttons">
          <button @click="scaleUp" type="button" class="btn btn-pagination">+</button>
          <button @click="scaleDown" type="button" class="btn btn-pagination">-</button>
        </div>
        <canvas class="meme__canvas" ref="canvas"> </canvas>
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
      margin: 50,
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
        './test01.svg',
        './test02.svg',
        './test03.svg',
        './test04.svg',
        './test05.svg',
        './test06.svg',
        './test07.svg',
        './test08.svg',
        './test09.svg',
        './test10.svg',
        './test11.svg',
        './test12.svg',
      ];
    },

    getImg(i: number): string {
      return this.images[i];
    },

    scaleUp() {
      this.scaleSteps -= 1;
      this.draw();
    },

    scaleDown() {
      this.scaleSteps += 1;
      this.draw();
    },

    draw() {
      // clear the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // some maths
      const scaleFactor = 1 - this.scaleSteps * 0.1;
      this.scaledImageWidth = this.img.naturalWidth * scaleFactor;
      this.scaledImageHeight = this.scaledImageWidth * (this.img.naturalHeight / this.img.naturalWidth);

      this.imageX = this.margin * scaleFactor;
      this.imageY = this.margin * scaleFactor;

      // canvas size
      this.canvas.width = this.scaledImageWidth
        ? this.scaledImageWidth + this.margin * 2 * scaleFactor
        : this.canvas.width;
      this.canvas.height = this.scaledImageHeight
        ? this.scaledImageHeight + this.margin * 2 * scaleFactor
        : this.canvas.height;

      // draw the image
      this.ctx.drawImage(
        this.img,
        0,
        0,
        this.img.naturalWidth,
        this.img.naturalHeight,
        this.imageX,
        this.imageY,
        this.scaledImageWidth,
        this.scaledImageHeight
      );

      this.imageRight = this.imageX + this.scaledImageWidth;
      this.imageBottom = this.imageY + this.scaledImageHeight;

      this.drawText();
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
      this.draw();
    },

    drawText() {
      const { width, height } = this.canvas;
      const fontSize = Math.floor(width / 10);
      const yOffset = height / 25;

      this.ctx.strokeStyle = this.strokeStyle; // 'black';
      this.ctx.lineWidth = Math.floor(fontSize / 4);
      this.ctx.fillStyle = this.color; // 'white';
      this.ctx.textAlign = 'center';
      this.ctx.lineJoin = 'round';
      this.ctx.font = `${fontSize}px sans-serif`;

      this.ctx.textBaseline = 'top';
      this.drawTextMultiLineTop(this.topText, width / 2, yOffset, this.canvas.width, fontSize);

      this.ctx.textBaseline = 'bottom';
      this.drawTextMultiLineBottom(this.bottomText, width / 2, height - yOffset, this.canvas.width, fontSize);
    },

    drawTextMultiLineTop(text: string, x: number, top: number, maxWidth: number, lineHeight: number) {
      const words = text.split(' ');
      let line = '';
      let y = top;
      words.forEach((word, index) => {
        const testLine = `${line + word} `;
        const metrics = this.ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && index > 0) {
          this.ctx.strokeText(line, x, y);
          this.ctx.fillText(line, x, y);
          line = `${word} `;
          y += lineHeight;
        } else {
          line = testLine;
        }
      });
      this.ctx.strokeText(line, x, y);
      this.ctx.fillText(line, x, y);
    },

    drawTextMultiLineBottom(text: string, x: number, top: number, maxWidth: number, lineHeight: number) {
      const words = text.split(' ').reverse();
      let line = '';
      let y = top;
      words.forEach((word, index) => {
        const testLine = ` ${word + line}`;
        const metrics = this.ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && index > 0) {
          this.ctx.strokeText(line, x, y);
          this.ctx.fillText(line, x, y);
          line = ` ${word}`;
          y -= lineHeight;
        } else {
          line = testLine;
        }
      });
      this.ctx.strokeText(line, x, y);
      this.ctx.fillText(line, x, y);
    },

    saveImage() {
      this.canvas.toDataURL();
      const link = document.createElement('a');
      link.download = 'download.png';
      link.href = this.canvas.toDataURL();
      link.click();
    },

    copyImage() {
      this.canvas.toBlob((blob) => {
        const type = blob?.type;
        if (!type) return;
        const item = new ClipboardItem({ [type]: blob });
        navigator.clipboard.write([item]);
      });
    },
  },
});
</script>
<style>
.meme,
.meme__generator {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--gap);

  color: var(--color-text);
}
.meme__generator {
  flex-direction: column;
  align-items: center;
}

.meme__memes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--gap);
}

.meme__image {
  width: 14rem;
  height: 14rem;
}

.meme__property,
.meme__settings {
  /* margin: 0.5rem; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap);
}

.meme__settings-col {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  gap: var(--gap);
}

.meme__text,
.meme__number {
  margin: 0.5rem 0;
  padding: 0.5rem 0;

  border: none;
  border-bottom: 0.2rem solid gray;
  background-color: var(--color-background);
  color: inherit;
}
.meme__color {
  margin: 0.5rem 0;
  padding: 0 0;

  border: none;
  border-bottom: 0.2rem solid gray;
  background-color: var(--color-background);
  color: inherit;
}

.meme__canvas-wrapper {
  position: relative;
  padding-top: 2rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.meme__control-buttons {
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.meme__control-buttons button {
  margin: 0;
  padding: 0;
  width: 3rem;
  height: 3rem;
}

.meme__canvas {
  border: 0.2px solid gray;
}
</style>

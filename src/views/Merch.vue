<template>
  <div class="merch">
    <div class="merch__list list-aside">
      <h3>{{ $t('create.description') }}</h3>
      <div class="merch__merchs">
        <img
          ref="imgs"
          v-for="(item, index) in images"
          :key="index"
          :src="getImg(index)"
          alt="images"
          object-fit="contain"
          class="merch__image"
          @click="updImage(index)"
        />
      </div>
    </div>
    <div class="merch__generator list-main">
      <div class="merch__settings">
        <div class="merch__property">
          <label class="merch__label" for="top">{{ $t('create.top') }}</label>
          <input type="text" class="merch__text" id="top" v-model="topText" @input="draw()" />
        </div>
        <div class="merch__property">
          <label class="merch__label" for="bottom">{{ $t('create.bottom') }}</label>
          <input type="text" class="merch__text" id="bottom" v-model="bottomText" @input="draw()" />
        </div>
      </div>
      <div class="merch__settings">
        <div class="merch__property">
          <label class="merch__label" for="color">{{ $t('create.color') }}</label>
          <input type="color" id="color" class="merch__color" v-model="color" @input="draw()" />
        </div>
        <div class="merch__property">
          <label class="merch__label" for="strokeStyle">{{ $t('create.stroke') }}</label>
          <input type="color" id="strokeStyle" class="merch__color" v-model="strokeStyle" @input="draw()" />
        </div>
        <div class="merch__property">
          <label class="merch__label" for="backgroundColor">{{ $t('create.backgroundColor') }}</label>
          <input type="color" id="backgroundColor" class="merch__color" v-model="backgroundColor" @input="draw()" />
        </div>
        <div class="merch__property">
          <label class="merch__label" for="margin">{{ $t('create.margin') }}</label>
          <input type="number" id="margin" min="0" max="100" class="merch__number" v-model="margin" @input="draw()" />
        </div>
      </div>

      <div class="merch__canvas-wrapper">
        <div class="merch__control-buttons">
          <custom-btn
            :text="$t('btn.download')"
            imgPath="icon"
            className="btn btn-icon icon-download"
            @click="saveImage"
          ></custom-btn>
          <div class="merch__control-buttons-scale">
            <custom-btn
              :text="$t('btn.scaleUp')"
              imgPath="icon"
              className="btn btn-icon icon-plus"
              @click="scaleUp"
            ></custom-btn>
            <custom-btn
              :text="$t('btn.trueSize')"
              imgPath="icon"
              className="btn btn-icon icon-true"
              @click="scaleTrue"
            ></custom-btn>
            <custom-btn
              :text="$t('btn.scaleDown')"
              imgPath="icon"
              className="btn btn-icon icon-minus"
              @click="scaleDown"
            ></custom-btn>
          </div>
          <custom-btn
            :text="$t('btn.copy')"
            imgPath="icon"
            className="btn btn-icon icon-copy"
            @click="copyImage"
          ></custom-btn>
        </div>
        <canvas class="merch__canvas" ref="canvas"> </canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomBtn from '@/components/buttons/CustomBtn.vue';
import usePagesStore from '@/stores/pages-store';

const { getPageMerchState, setPageMerchState } = usePagesStore();

export default defineComponent({
  name: 'MerchView',

  components: {
    CustomBtn,
  },

  data() {
    return {
      images: [] as string[],
      index: 0,
      topText: '',
      bottomText: '',
      scaleSteps: 1,
      canvas: {} as HTMLCanvasElement,
      ctx: {} as CanvasRenderingContext2D,
      img: {} as HTMLImageElement,
      shirt: {} as HTMLImageElement,
      imageX: 0,
      imageY: 0,
      scaledImageWidth: 0,
      scaledImageHeight: 0,
      imageWidth: 0,
      imageHeight: 0,
      imageRight: 0,
      imageBottom: 0,
      color: '#ffffff',
      backgroundColor: '#777777',
      strokeStyle: '#000000',
      margin: 50,
    };
  },

  // mounted() {
  //   this.getImages();

  //   this.loadStore();

  //   const { canvas } = this.$refs;
  //   if (!(canvas instanceof HTMLCanvasElement)) return;

  //   const ctx = canvas.getContext('2d');
  //   if (!ctx) return;

  //   this.canvas = canvas;
  //   this.ctx = ctx;

  //   const image = new Image();
  //   image.onload = () => {
  //     // Grab position info
  //     this.imageRight = this.imageX + this.img.width;
  //     this.imageBottom = this.imageY + this.img.height;

  //     // Update CTX
  //     this.draw();
  //   };
  //   image.src = this.images[this.index];

  //   this.img = image;

  //   const shirt = new Image();
  //   // shirt.src = './T-Shirt.svg';
  //   shirt.src = './tshirt.png';

  //   this.shirt = shirt;
  // },

  mounted() {
    const { canvas } = this.$refs;
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.canvas = canvas;
    this.ctx = ctx;

    const img = new Image();

    const start = () => {
      // create an overlay with solid #00d9c6 color
      const tempCanvas = document.createElement('canvas');
      const tempctx = tempCanvas.getContext('2d');
      if (!tempctx) return;
      this.canvas.width = img.width;
      this.canvas.height = img.height;
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      tempctx.drawImage(img, 0, 0);
      tempctx.globalCompositeOperation = 'source-atop';
      tempctx.fillStyle = '#f51919';
      tempctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      //
      canvas.width = img.width;
      canvas.height = img.height;

      // use compositing to change the hue of the original image
      ctx.drawImage(img, 0, 0);
      ctx.globalCompositeOperation = 'overlay';
      ctx.drawImage(tempCanvas, 0, 0);

      // always clean up: reset compositing to its default
      ctx.globalCompositeOperation = 'source-over';
    };

    img.onload = start;
    img.src = './tshirt.png';
  },

  beforeRouteLeave() {
    setPageMerchState(JSON.stringify(this.$data));
  },

  methods: {
    async getImages() {
      // todo fetch

      this.images = [
        './img/meme/deadline.svg',
        './img/meme/expert.svg',
        './img/meme/git.svg',
        './img/meme/its_ok.svg',
        './img/meme/love.svg',
        './img/meme/mentor.svg',
        './img/meme/read_chat.svg',
        './img/meme/shocked.svg',
        './img/meme/so_close.svg',
        './img/meme/student_1.svg',
        './img/meme/without_mentor.svg',
        './img/meme/work_done.svg',
        './img/meme/wtf.svg',
      ];
    },

    getImg(i: number): string {
      return this.images[i];
    },

    scaleUp() {
      this.scaleSteps = Math.min(2, this.scaleSteps + 0.1);
      this.draw();
    },

    scaleTrue() {
      this.scaleSteps = 1;
      this.draw();
    },

    scaleDown() {
      this.scaleSteps = Math.max(0.1, this.scaleSteps - 0.1);
      this.draw();
    },

    setImgProps() {
      this.scaledImageWidth = this.img.naturalWidth * this.scaleSteps;
      this.scaledImageHeight = this.scaledImageWidth * (this.img.naturalHeight / this.img.naturalWidth);

      this.imageX = this.margin * this.scaleSteps;
      this.imageY = this.margin * this.scaleSteps;

      this.imageRight = this.imageX + this.scaledImageWidth;
      this.imageBottom = this.imageY + this.scaledImageHeight;
    },

    setCanvasProps() {
      this.canvas.width = this.scaledImageWidth
        ? this.scaledImageWidth + this.margin * 2 * this.scaleSteps
        : this.canvas.width;
      this.canvas.height = this.scaledImageHeight
        ? this.scaledImageHeight + this.margin * 2 * this.scaleSteps
        : this.canvas.height;
    },

    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // some maths
      this.setImgProps();

      // canvas size
      this.setCanvasProps();

      // image background
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.globalCompositeOperation = 'hue';

      // draw the t-shirt
      this.ctx.drawImage(this.shirt, 0, 0);

      this.ctx.globalCompositeOperation = 'source-over';

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
      this.imageRight = this.imageX + this.img.width;
      this.imageBottom = this.imageY + this.img.height;

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

    loadStore() {
      const str = getPageMerchState();
      if (!str) return;

      const data = JSON.parse(str);
      if (!data) return;

      Object.assign(this.$data, data);
    },
  },
});
</script>
<style>
.merch,
.merch__generator {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--gap);

  color: var(--color-text);
}

.merch {
  padding: 0 3rem;
}

.merch__generator {
  flex-direction: column;
  align-items: center;
}

.merch__merchs {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--gap);
}

.merch__image {
  width: 14rem;
  height: 14rem;
}

.merch__settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.merch__property {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap);
}

.merch__text,
.merch__number {
  margin: 0.5rem 0;
  padding: 0.5rem 0;

  border: none;
  border-bottom: 0.2rem solid gray;
  background-color: var(--color-background);
  color: inherit;
}
.merch__color {
  margin: 0.5rem 0;
  padding: 0 0;

  border: none;
  border-bottom: 0.2rem solid gray;
  background-color: var(--color-background);
  color: inherit;
}

.merch__canvas-wrapper {
  position: relative;
  padding-top: 2rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.merch__control-buttons {
  z-index: 10;

  display: flex;
  justify-content: center;
  gap: 1rem;
}

.merch__control-buttons-scale button {
  margin: 0 0.25rem;
  padding: 0;
}

.merch__canvas {
  border: 0.2px solid gray;
}
</style>

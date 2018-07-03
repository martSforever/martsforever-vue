<template>
  <div class="canvas-exmaple">

    <img :src="imageUrl"/>
    <canvas ref="canvas" class="canvas"></canvas>

  </div>
</template>

<script>
  export default {
    name: "canvas-example",
    props: {
      size: {
        type: Number,
        default: 200
      }
    },
    data() {
      return {
        imageUrl: 'http://www.pujia8.com/static/pics/20171215040134_26.jpg',
        image: new Image(),
      }
    },
    mounted() {
      this.image.src = this.imageUrl;
      this.image.addEventListener('load', () => {
        console.log('loaded...');
        this.loadImage();
      })
    },
    methods: {
      loadImage() {
        console.log('width:', this.image.width, 'height', this.image.height)
        let ctx = this.$refs.canvas.getContext('2d');
        this.$refs.canvas.width = this.size;
        this.$refs.canvas.height = this.size;

        ctx.beginPath();

        ctx.arc(this.size / 2, this.size / 2, this.size / 2, 0, 1.5 * Math.PI)
        ctx.lineTo(this.size, 0)
        ctx.lineTo(this.size, this.size / 2)
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(this.image, 0, 0, this.size, this.size);
      },
    }
  }
</script>

<style scoped lang="scss">
  .canvas {
    background-color: transparent;
  }
</style>

<template>
  <canvas ref="canvas" class="canvas"></canvas>
</template>

<script>
  export default {
    name: "a-avatar",
    props: {
      src: {
        type: String
      },
      size: {
        type: Number,
        default: 108
      }
    },
    data() {
      return {
        image: new Image(),
      }
    },
    created() {
      this.image.src = this.src
      this.image.addEventListener('load', this._handleImageOnLoad)
    },
    methods: {
      _handleImageOnLoad(e) {
        this.drawDrop(this.image)
      },

      drawDrop(image) {
        console.log('width:', image.width, 'height', image.height)
        let ctx = this.$refs.canvas.getContext('2d');
        this.$refs.canvas.width = this.size;
        this.$refs.canvas.height = this.size;

        ctx.beginPath();

        ctx.arc(this.size / 2, this.size / 2, this.size / 2, 0, 1.5 * Math.PI)
        ctx.lineTo(this.size, 0)
        ctx.lineTo(this.size, this.size / 2)
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(image, 0, 0, this.size, this.size);
      },
    }
  }
</script>

<style lang="scss">
</style>

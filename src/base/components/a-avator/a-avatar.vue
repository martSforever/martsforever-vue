<template>
  <canvas ref="canvas" class="a-avatar"></canvas>
</template>

<script>
  import {camelCase, oneOf} from "../../script/utils";

  export default {
    name: "a-avatar",
    props: {
      src: {
        type: String
      },
      size: {
        type: Number,
        default: 100
      },
      shape: {
        type: String,
        default: 'drop',
        validator(val) {
          return oneOf(val, ['drop', 'star'])
        },
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
        this[`draw${this.shape.charAt(0).toUpperCase() + this.shape.substring(1)}`](this.image)
      },

      /*水滴形*/
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

      drawStar(image) {
        let ctx = this.$refs.canvas.getContext('2d');
        this.$refs.canvas.width = this.size;
        this.$refs.canvas.height = this.size;

        let r = this.size / 4, R = this.size / 2, x = this.size / 2, y = this.size / 2 + this.size / 20, rot = 0
        ctx.beginPath();
        for (var i = 0; i < 5; i++) {
          ctx.lineTo(Math.cos((18 + 72 * i - rot) / 180 * Math.PI) * R + x, -Math.sin((18 + 72 * i - rot) / 180 * Math.PI) * R + y);
          ctx.lineTo(Math.cos((54 + 72 * i - rot) / 180 * Math.PI) * r + x, -Math.sin((54 + 72 * i - rot) / 180 * Math.PI) * r + y);
        }
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(image, 0, 0, this.size, this.size);
      }
    }
  }
</script>

<style lang="scss">
  .a-avatar {
    /*background-color: white;*/
  }
</style>

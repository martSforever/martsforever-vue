<template>
  <div class="a-carousel-example">


    <div class="btn-list">
      <a-input shape="round" v-model="index">
        <div slot="append">
          <a-button @click="scroll">scrollTo</a-button>
          <a-button @click="getIndex">getIndex</a-button>
        </div>
      </a-input>
    </div>

    <a-carousel width="500px" height="100px" class="carousel" ref="carousel" swipeable="Y">
      <div class="a-carousel-item item-cls" v-for="(item,index) in list" :style="getStyle(item)">
        {{item.name}}--{{index}}
      </div>
    </a-carousel>
  </div>
</template>

<script>
  import ACarousel from "../../base/components/a-carousel/a-carousel";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";
  import AInput from "../../base/components/a-input/a-input";

  export default {
    components: {
      AInput,
      AButton,
      AButtonGroup,
      ACarousel
    },
    name: "a-carousel-example",
    data() {
      return {
        list: [
          {name: 'input', color: '#abf', width: '100px'},
          {name: 'button', color: '#38ff2c', width: '200px'},
          {name: 'carousel', color: '#3fffe6', width: '200px'},
          {name: 'textarea', color: '#ff6d58', width: '200px'},
          {name: 'scrollbar', color: '#ffe72c', width: '200px'},
          {name: 'grid', color: '#d110ff', width: '200px'},
        ],
        index: 2
      };
    },
    methods: {
      getStyle(item) {
        return {
          width: item.width,
          backgroundColor: item.color
        }
      },
      scroll() {
        this.$refs.carousel.scrollTo(this.index);
      },
      getIndex() {
        console.log(this.$refs.carousel.getActiveIndex());
      },
    }
  }
</script>

<style scoped lang="scss">
  .a-carousel-example {
    @include fill-parent;
    .btn-list {
      margin-bottom: 12px;
    }
    .carousel {
      background-color: blueviolet;
    }
    .item-cls {
      color: black;
    }
  }
</style>

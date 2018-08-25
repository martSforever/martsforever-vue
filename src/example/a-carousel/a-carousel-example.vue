<template>
  <div class="a-carousel-example">
    <a-scrollbar>
      <div style="height: max-content">
        <div class="example-item">
          <a-title>基本用法</a-title>
          <a-carousel
            height="100px">
            <a-carousel-item classes="item-cls" v-for="(item,index) in list" :styles="getBgColor(item)" :key="index">
              <div>{{item.name}}--{{index}}</div>
            </a-carousel-item>
          </a-carousel>
        </div>
        <div class="example-item">
          <a-title>宽高设置</a-title>
          <a-carousel
            width="200px"
            height="50px">
            <div
              class="a-carousel-item item-cls"
              v-for="(item,index) in list"
              :style="getBgColor(item)"
            >
              <div>{{item.name}}--{{index}}</div>
            </div>
          </a-carousel>
        </div>
        <div class="example-item">
          <a-title>子元素宽度统一设置</a-title>
          <a-carousel
            item-width="50%"
            height="50px">
            <div
              class="a-carousel-item item-cls"
              v-for="(item,index) in list"
              :style="getBgColor(item)"
            >
              <div>{{item.name}}--{{index}}</div>
            </div>
          </a-carousel>
        </div>
        <div class="example-item">
          <a-title>子元素宽度不统一</a-title>
          <a-carousel
            width="500px"
            height="50px">
            <div
              class="a-carousel-item item-cls"
              v-for="(item,index) in list"
              :style="getStyle(item)"
            >
              <div>{{item.name}}--{{index}}</div>
            </div>
          </a-carousel>
        </div>
        <div class="example-item">
          <a-title>形状</a-title>
          <a-carousel
            shape="round"
            width="100px"
            height="50px">
            <div
              class="a-carousel-item item-cls"
              v-for="(item,index) in list"
              :style="getBgColor(item)"
            >
              <div>{{item.name}}--{{index}}</div>
            </div>
          </a-carousel>
          <a-carousel
            shape="fillet"
            width="100px"
            height="50px">
            <div
              class="a-carousel-item item-cls"
              v-for="(item,index) in list"
              :style="getBgColor(item)"
            >
              <div>{{item.name}}--{{index}}</div>
            </div>
          </a-carousel>
          <a-carousel
            shape="none"
            width="100px"
            height="50px">
            <div
              class="a-carousel-item item-cls"
              v-for="(item,index) in list"
              :style="getBgColor(item)"
            >
              <div>{{item.name}}--{{index}}</div>
            </div>
          </a-carousel>
        </div>
        <div class="example-item">
          <a-title>两个仅有的暴露的方法</a-title>
          <div style="display: flex;flex-direction: row">
            <a-input shape="round" v-model="index">
              <div slot="append">
                <a-button @click="scroll">scrollTo</a-button>
                <a-button @click="getIndex">getIndex</a-button>
              </div>
            </a-input>
            <a-carousel
              width="500px"
              height="27px"
              class="carousel"
              ref="carousel1"
              swipeable="Y"
              shape="round"
            >
              <div
                class="a-carousel-item item-cls"
                v-for="(item,index) in list"
                :style="getStyle(item)"
              >
                {{item.name}}--{{index}}
              </div>
            </a-carousel>
          </div>
        </div>
        <div class="example-item">
          <a-title>联动以及懒加载</a-title>
          <a-carousel
            width="500px"
            height="27px"
            class="carousel"
            ref="carousel"
            swipeable="Y"
            shape="round"
          >
            <div
              class="a-carousel-item item-cls"
              v-for="(item,index) in list"
              :style="getStyle(item)"
              @click="onItemClick(item,index)"
            >
              {{item.name}}--{{index}}
            </div>
          </a-carousel>
          <div class="content-wrapper">
            <a-carousel
              ref="content"
              swipeable="N"
              shape="none"
              width="1000px"
            >
              <div class="a-carousel-item" v-for="(item,index) in list">
                <!--{{item}}&#45;&#45;{{item.initialized}}-->
                <a-carousel-exmaple-item :name="item.name" v-if="item.initialized" :style="getStyle(item)"/>
              </div>
            </a-carousel>
          </div>
        </div>
        <div class="example-item">
          <a-title>多重包含</a-title>
          <a-carousel
            width="500px"
            height="27px"
            class="carousel"
            ref="carousel"
            swipeable="Y"
            shape="round"
          >
            <div
              class="a-carousel-item item-cls"
              v-for="(item,index) in list"
              :style="getStyle(item)"
              @click="onItemClick(item,index)"
            >
              {{item.name}}--{{index}}
            </div>
          </a-carousel>
          <div class="content-wrapper">
            <a-carousel
              ref="content"
              swipeable="N"
              shape="none"
              width="1000px"
            >
              <div class="a-carousel-item">
                <a-carousel
                  width="300px"
                  height="100px"
                  swipeable="Y"
                >
                  <div
                    class="a-carousel-item item-cls"
                    v-for="(item,index) in list"
                    :style="getStyle(item)"
                  >
                    {{item.name}}--{{index}}
                  </div>
                </a-carousel>
              </div>

              <div class="a-carousel-item" v-for="(item,index) in list">
                <!--{{item}}&#45;&#45;{{item.initialized}}-->
                <a-carousel-exmaple-item :name="item.name" v-if="item.initialized" :style="getStyle(item)"/>
              </div>
            </a-carousel>
          </div>
        </div>
      </div>
    </a-scrollbar>
  </div>
</template>

<script>
  import ACarousel from "../../base/components/a-carousel/a-carousel";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";
  import AInput from "../../base/components/a-input/a-input";
  import ACarouselExmapleItem from "./a-carousel-exmaple-item";
  import ATitle from "../../base/components/a-title/a-title";
  import AScrollbar from "../../base/components/a-scrollbar/a-scrollbar";
  import ACarouselItem from "../../base/components/a-carousel/a-carousel-item";

  export default {
    components: {
      ACarouselItem,
      AScrollbar,
      ATitle,
      ACarouselExmapleItem,
      AInput,
      AButton,
      AButtonGroup,
      ACarousel
    },
    name: "a-carousel-example",
    data() {
      return {
        list: [
          {name: 'input', color: '#abf', width: '100px', initialized: false},
          {name: 'button', color: '#ff7261', width: '200px', initialized: false},
          {name: 'textarea', color: '#598dff', width: '300px', initialized: false},
          {name: 'hello', color: '#4effbc', width: '200px', initialized: false},
          {name: 'balbala', color: '#ff24ad', width: '200px', initialized: false},
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
      getBgColor(item) {
        return {
          backgroundColor: item.color
        }
      },
      scroll() {
        this.$refs.carousel1.scrollTo(this.index);
      },
      getIndex() {
        alert(this.$refs.carousel1.getActiveIndex())
      },
      onItemClick(item, index) {
        item.initialized = true;
        this.$nextTick(() => {
          this.$refs.content.scrollTo(index);
        });
      },
    },
    mounted() {
      this.onItemClick(this.list[0], 0);
    },
  }
</script>

<style scoped lang="scss">
  .a-carousel-example {
    .a-title {
      display: block;
    }
    @include fill-parent;
    display: flex;
    flex-direction: column;
    .btn-list {
      margin-bottom: 12px;
    }
    .carousel {
      background-color: blueviolet;
    }
    .content-wrapper {
      height: 200px;
    }
    .item-cls {
      color: white;
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
    }
    .example-item {
      margin-bottom: 12px;
      display: block;
    }
  }
</style>

<template>
  <div class="a-scrollbar-example">

    <!--<div class="explain">
      <a-title>说明</a-title>
      <div class="detail">
        <div class="item">1、一般的自定义滚动条，都必须将外层设置为固定高度，再对里面一层进行初始化，无法实现自适应高度的问题</div>
        <div class="item">
          2、一般的自定义滚动条，一般都会有一个万恶的update函数供开发者调用，这个是用来干什么的呢？因为自定义滚动条必须得有一个高度，跟第一条一样，当滚动的内容发生变化的时候（节点增删，或者高度变更），
          需要开发者自己手动去调用update函数，重新计算高度；
        </div>
        <div class="item">
          3、当内容存在图片时，就算开发者手动去调用update函数，也可能会导致高度计算不准确的情况出现，为什么呢？比如一个图片数组数据imgs:Array，当他的数据加一的时候
          ，开发者可能这时候会马上调用update函数更新高度，
          这是不行的，因为img节点存在的时候，图片不一定加载完成，有的开发者可能会选择等待数秒在更新，还是一样，当网速波动的时候，高度还是计算不准确；
        </div>
        <div class="item">
          4、一般的自定义滚动条可能还存在一个内包含的问题，当两层自定义滚动条包含时，可能会有显示问题；
        </div>
        <div class="item">
          5、a-scrollbar可能是世界上最好用的自定义滚动条组件，因为不需要手动去刷新高度，也不需要担心图片加载时间问题，所有东西全都是自动完成，而且还可以高度自适应(可以看见左边菜单栏，高度是自适应的)；
        </div>
      </div>
    </div>

    <div class="dev-content">
      <a-button-group shape="round" style="margin-bottom: 20px">
        <a-button @click="add">add</a-button>
        <a-button @click="add2">add2</a-button>
        <a-button @click="remove">remove</a-button>
        <a-button @click="update">update</a-button>
        <a-button @click="toggleIf">toggleIf</a-button>
      </a-button-group>
      <div>
        <div class="container" v-if="showScrollBar">
          <a-scrollbar ref="scrollbara" :scroll-bar-size="scrollbarSize">
            <div class="row width-600" v-for="(item,index) in list">
              {{index}}
              <img :src="item.url"/>
            </div>
          </a-scrollbar>
        </div>
        <div class="container" v-if="showScrollBar">
          <a-scrollbar ref="scrollbara" :scroll-bar-size="scrollbarSize">
            <div class="row width-600" v-for="(item,index) in list2">
              {{index}}
              <img :src="item.url"/>
            </div>
          </a-scrollbar>
        </div>
        <div class="container" v-if="showScrollBar">
          <a-scrollbar ref="scrollbar" :scroll-bar-size="scrollbarSize">
            <div class="col" v-for="(item,index) in list">
              <img :src="item.url"/>
              {{index}}
            </div>
          </a-scrollbar>
        </div>
        <div class="container" v-if="showScrollBar">
          <a-scrollbar ref="scrollbara" :scroll-bar-size="scrollbarSize">
            <div class="row" v-for="(item,index) in list">
              {{index}}
              <img :src="item.url"/>
            </div>
          </a-scrollbar>
        </div>

      </div>
    </div>-->

    <div class="list">
      <a-scrollbar>
        <div class="item">
          <div class="sub-item">
            端口加上拉大锯拉开始就到拉萨将离客
            端口加上拉大锯拉开始就到拉萨将离客
            端口加上拉大锯拉开始就到拉萨将离客
            端口加上拉大锯拉开始就到拉萨将离客
            端口加上拉大锯拉开始就到拉萨将离客
            端口加上拉大锯拉开始就到拉萨将离客
            端口加上拉大锯拉开始就到拉萨将离客
            端口加上拉大锯拉开始就到拉萨将离客
            端口加上拉大锯拉开始就到拉萨将离客
            端口加上拉大锯拉开始就到拉萨将离客
            <!--<div class="sub-wrapper">
              <a-scrollbar>
                <div class="sub-wrapper-item">
                  的进口量撒娇的拉升建档立卡升级到了卡机
                  的进口量撒娇的拉升建档立卡升级到了卡机
                </div>
              </a-scrollbar>
            </div>-->
          </div>
        </div>
      </a-scrollbar>
    </div>

  </div>
</template>

<script>
  import AScrollbar from "../../base/components/a-scrollbar/a-scrollbar";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";
  import ATitle from "../../base/components/a-title/a-title";

  const imageUrl = 'http://www.pujia8.com/static/pics/20171215040134_26.jpg';

  export default {
    components: {
      ATitle,
      AButton,
      AButtonGroup,
      AScrollbar
    },
    name: "a-scrollbar-example",
    data() {
      let num = 20;
      let list = [];
      let list2 = [];
      for (let i = 0; i < num; i++) {
        list.push({
          url: `${imageUrl}`
        });
      }
      list2.push(list[0]);
      list2.push(list[1]);
      return {
        list,
        list2,
        scrollbarSize: 6,
        showScrollBar: true
      }
    },
    methods: {
      add() {
        this.list.push({
          url: `${imageUrl}?time=${this.getTime()}`
        });
      },
      add2() {
        this.list2.push({
          url: `${imageUrl}?time=${this.getTime()}`
        });
      },
      remove() {
        this.list.splice(0, 1);
      },
      update() {
        this.$refs.scrollbara.update();
      },
      toggleIf() {
        this.showScrollBar = !this.showScrollBar;
      },
      getTime() {
        return new Date().getTime();
      },
    }
  }
</script>

<style scoped lang="scss">
  .a-scrollbar-example {
    @include fill-parent;
    @include flex-center;
    flex-direction: column;
    .explain {
      width: 100%;
      .detail {
        padding-left: 24px;
        .item {
          margin-bottom: 6px;
          white-space: pre-line;
        }
      }
    }

    .dev-content {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      padding-top: 12px;
      .container {
        height: 360px;
        width: 400px;
        background-color: #495a80;
        display: inline-block;
        .row {
          margin-bottom: 12px;
          background-color: blueviolet;
          &.width-600 {
            width: 600px;
          }
        }
        .col {
          display: inline-block;
          width: max-content;
        }
      }

    }

    .list {
      height: 500px;
      width: 500px;
      .item {
        height: 222px;
        width: 100%;
        background-color: black;
        margin-bottom: 12px;
        .sub-item {
          height: 600px;
          width: 600px;
          background-color: blue;
          white-space: normal;
          word-break: break-all;
          .sub-wrapper {
            width: 100%;
            height: 300px;
            background-color: blueviolet;
            white-space: normal;
            word-break: break-all;
            .sub-wrapper-item {
              width: 800px;
              height: 400px;
            }
          }
        }
      }
    }

  }
</style>

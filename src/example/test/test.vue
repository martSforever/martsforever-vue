<template>
  <div class="test">
    <div>
      <div>
        <a-button @click="show">show--{{isShow}}</a-button>
      </div>
      <div class="shadow" v-dom-portal @click="close" v-show="isShow">
        <div class="content" @click.stop="handleContentClick">
          <div>{{isShow}}</div>
          <div>
            <a-button @click.stop="sayHello">sayHello</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AButton from "../../base/components/a-button/a-button";

  export default {
    components: {AButton},
    name: "test",
    data() {
      return {
        isShow: true,
      }
    },
    computed: {},
    methods: {
      sayHello() {
        console.log('hello haha!!!');
      },
      show() {
        this.isShow = true;
        console.log('show', this.isShow);

      },
      close() {
        this.isShow = false;
      },
      handleContentClick() {
        console.log('handleContentClick');
      },
    }
  }
</script>

<style lang="scss">
  div.shadow {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 80;
    .content {
      background-color: rgba(255, 255, 255, 0.3);
      height: 300px;
      width: 450px;
    }
  }
</style>

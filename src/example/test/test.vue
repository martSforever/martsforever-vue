<template>
  <div class="test">
    <a-button-group>
      <a-button @click="add">add</a-button>
      <a-button @click="remove">remove</a-button>
      <a-button @click="shuffle">shuffle</a-button>
    </a-button-group>
    <transition-group name="list-complete" tag="div" class="wrapper">
      <div class="item list-complete-item" v-for="(item,index) in cities" :key="item.name"
           @click="handleClick(item,index)">{{item.name}}
      </div>
    </transition-group>
  </div>
</template>

<script>
  import AButton from "../../base/components/a-button/a-button";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import ACollapseTransition from "../../base/components/a-collapse-transition/a-collapse-transition";
  import TestChild from "./test-child";
  import TestParent from "./test-parent";
  import APopover from "../../base/components/a-popover/a-popover";

  export default {
    components: {APopover, TestParent, TestChild, ACollapseTransition, AButtonGroup, AButton},
    name: "test",
    data() {
      return {
        isShow: true,
        name: 'ambzer',
        cities: [
          {name: '广州市'},
          {name: '上海市'},
          {name: '北京市'},
          {name: '深圳市'},
          {name: '长沙市'},
          {name: '南京市'},
        ]
      }
    },
    computed: {},
    methods: {
      handleClick(item, index) {
        this.cities.splice(index, 1)
      },
      add() {
        this.cities.push({name: new Date().getTime()})
      },
      remove() {
        this.cities.pop()
      },
      shuffle() {
        this.cities = _.shuffle(this.cities)
      },
    },
    mounted() {
    },
  }
</script>

<style lang="scss">

  .test {
    height: 100vh;
    overflow: auto;

    .message {
      padding: 3px 12px;
      background-color: $text-color-primary;
      color: white;
      display: inline-block;
      border-radius: $border-fillet;
    }

    .wrapper {
      .item {
        height: 60px;
        margin-bottom: 12px;
        border-radius: $border-fillet;
        width: 300px;
        padding: 12px;
        color: white;
        background-color: $text-color-primary;

      }
    }
  }

  .list-complete-item {
    transition: all 0.4s;
    display: block;
  }

  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translate(80%, 30%);
  }

  .list-complete-leave-active {
    position: absolute;
  }

</style>

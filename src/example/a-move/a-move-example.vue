<template>
  <div class="a-move-example">
    <div>
      <a-button-group>
        <a-button @click="add">add</a-button>
        <a-button @click="remove">remove</a-button>
        <a-button @click="shuffle">shuffle</a-button>
      </a-button-group>
    </div>

    <a-move-container>
      <a-move-item v-for="item in cities" :key="item.name" class="test-item" @click.native="handleClick">
        {{item.name}}
      </a-move-item>
    </a-move-container>
  </div>
</template>

<script>
  import AMoveContainer from "../../base/components/a-move/a-move-container";
  import AMoveItem from "../../base/components/a-move/a-move-item";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";

  export default {
    name: "a-move-example",
    components: {AButton, AButtonGroup, AMoveItem, AMoveContainer},
    data() {
      return {
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
    methods: {
      randomIndex: function () {
        return Math.floor(Math.random() * this.cities.length)
      },
      handleClick(item, index) {
        this.cities.splice(index, 1)
      },
      add() {
        this.cities.splice(this.randomIndex(), 0, {name: new Date().getTime()})
      },
      remove() {
        this.cities.splice(this.randomIndex(), 1)
      },
      shuffle() {
        this.cities = _.shuffle(this.cities)
      },
    }
  }
</script>

<style lang="scss">
  .test-item {
    height: 60px;
    margin-bottom: 12px;
    border-radius: $border-fillet;
    width: 300px;
    padding: 12px;
    color: white;
    background-color: $text-color-primary;
  }

</style>

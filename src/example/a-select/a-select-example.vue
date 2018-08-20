<template>
  <div class="a-select-example">
    <a-title>普通用法</a-title>
    <div>value:{{selectSingleValue}}</div>
    <a-select v-model="selectSingleValue">
      <a-select-option v-for="(item,index) in options"
                       :key="index"
                       :label="item.name"
                       :value="item.value"/>
    </a-select>

    <a-title>多选</a-title>
    <div>value:{{selectMultiValue}}</div>
    <a-select
      v-model="selectMultiValue"
      :multiple="true">
      <a-select-option v-for="(item,index) in options"
                       :key="index"
                       :label="item.name"
                       :value="item.value"/>
    </a-select>

  </div>
</template>

<script>
  import ASelect from "../../base/components/a-select/a-select";
  import ASelectOption from "../../base/components/a-select/a-select-option";
  import ATitle from "../../base/components/a-title/a-title";

  export default {
    name: "a-select-example",
    components: {ATitle, ASelectOption, ASelect},
    data() {
      return {
        currentShow: true,
        selectSingleValue: '3',
        selectMultiValue: null,

        options: [
          {name: '蛋糕', value: '1'},
          {name: '蛋挞', value: '2'},
          {name: '双皮奶', value: '3'},
          {name: '蛋糕', value: '4'},
          {name: '蛋挞', value: '5'},
          {name: '双皮奶', value: '6'},
          {name: '蛋糕', value: '7'},
          {name: '蛋挞', value: '8'},
          {name: '双皮奶', value: '9'},
          {name: '蛋糕', value: '10'},
          {name: '蛋挞', value: '11'},
          {name: '双皮奶', value: '12'},
        ]
      }
    },
  }
</script>

<style scoped lang="scss">
  .a-select-example {
    height: 100vh;
    width: 100vw;
    padding: 24px;
  }
</style>

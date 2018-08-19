<template>
  <div class="a-select-example">
    <div>
      --{{currentShow}}--
    </div>
    <a-select
      :show.sync="currentShow">
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

  export default {
    name: "a-select-example",
    components: {ASelectOption, ASelect},
    data() {
      return {
        currentShow: true,
        options: [
          {name: '蛋糕', value: '1'},
          {name: '蛋挞', value: '2'},
          {name: '双皮奶', value: '3'},
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

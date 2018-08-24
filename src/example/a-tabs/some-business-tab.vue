<template>
  <a-tab>
    some-business-tab
    <some-business-sub-content/>
  </a-tab>
</template>

<script>
  import ATab from "../../base/components/a-tabs/a-tab";
  import AIcon from "../../base/components/a-icon/a-icon";
  import SomeBusinessSubContent from "./some-business-sub-content";

  export default {
    name: "some-business-tab",
    components: {SomeBusinessSubContent, AIcon, ATab},
    data() {
      return {
        dates: []
      }
    },
    mounted() {
      /*测试是否存在内存泄漏*/
      let num = 10000
      while (num > 0) {
        this.dates.push(new Date())
        num--
      }
    },
  }
</script>

<style scoped lang="scss">

</style>

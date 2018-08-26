<template>
  <div>
    some-business-tab
    <some-business-sub-content name="invalid tab"/>
  </div>
</template>

<script>
  import ATab from "../../base/components/a-tabs/a-tab";
  import AIcon from "../../base/components/a-icon/a-icon";
  import SomeBusinessSubContent from "./some-business-sub-content";

  export default {
    name: "invalid-tab",
    components: {SomeBusinessSubContent, AIcon, ATab},
    data() {
      return {
        dates: []
      }
    },
    mounted() {
    },
  }
</script>

<style scoped lang="scss">

</style>

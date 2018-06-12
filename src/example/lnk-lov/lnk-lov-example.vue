<template>
  <div>
    <lnk-lov lov-type="STORE_TYPE" v-model="value1"/>
    <el-button>{{value1}}</el-button>
    <lnk-lov lov-type="AGENCY_LEVEL" v-model="value2"/>
    <el-button>{{value2}}</el-button>
  </div>
</template>

<script>
  import LnkLov from "../../base/components/lnk-lov/lnk-lov";

  export default {
    components: {LnkLov},
    name: "lnk-lov-example",
    data() {
      return {
        value1: undefined,
        value2: '_1'
      }
    },
  }
</script>

<style scoped lang="scss">

</style>

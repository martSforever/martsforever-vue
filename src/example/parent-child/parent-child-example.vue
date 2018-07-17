<template>
  <div class="parent-child example">
    <div>parent-child</div>
    <parent>
      <child name="rose">
        hai,rose
      </child>
      <child name="blibli">
        hai,bilibli
      </child>
      <div slot="sub">
        <child name="hello">
          hai,hello
        </child>
      </div>
    </parent>
  </div>
</template>

<script>
  import Parent from "./parent";
  import Child from "./child";

  export default {
    components: {
      Child,
      Parent
    },
    name: "parent-child-example"
  }
</script>

<style scoped lang="scss">

</style>

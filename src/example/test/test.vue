<template>
  <div class="test">
    <a-button-group shape="round">
      <a-button @click="log">log class</a-button>
      <a-button @click="add">add class</a-button>
      <a-button @click="remove">remove classes</a-button>

    </a-button-group>
    <div class="box head"></div>
    <div class="box target" ref="target">
      this is box
    </div>
  </div>
</template>

<script>
  import AButton from "../../base/components/a-button/a-button";
  import AButtonGroup from "../../base/components/a-button/a-button-group";

  export default {
    components: {AButtonGroup, AButton},
    name: "test",
    data() {
      return {
        isShow: true,
      }
    },
    computed: {},
    methods: {
      log() {
        console.log(this.$refs.target.className)
      },
      add() {
        this.$refs.target.addClass('hello-world')
      },
      remove() {
        this.$refs.target.removeClass('hello-world')
      },
    },
  }
</script>

<style lang="scss">
  .box {
    width: 100px;
    height: 100px;
    background-color: white;
    color: brown;
  }

  .target {
    padding: 10px;
    margin: 10px;
  }

</style>

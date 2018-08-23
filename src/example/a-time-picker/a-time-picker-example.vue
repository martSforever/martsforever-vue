<template>
  <div class="a-time-picker-example">
    <a-time-picker v-model="time" format="HH时mm分ss秒"/>
    <a-time-picker v-model="time" format="HH:mm:ss"/>
  </div>
</template>

<script>
  import ATimePicker from "../../base/components/a-time-picker/a-time-picker";
  import AScrollbar from "../../base/components/a-scrollbar/a-scrollbar";
  import {zeroize} from "../../base/script/utils";

  export default {
    name: "a-time-picker-example",
    components: {AScrollbar, ATimePicker},
    data() {

      let time = new Date()
      // time.setHours(20)
      // time.setMinutes(20)
      // time.setSeconds(20)
      return {
        time: time
      }
    },
    mounted() {
    },
    methods: {
      handleInput(e) {
        this.time = e
      },
    }
  }
</script>

<style scoped lang="scss">
  .a-time-picker-example {
    width: 100vw;
    height: 100vh;
    padding: 12px;
    text-align: center;

    .wrapper {
      width: 50px;
      height: 300px;
      background-color: #0ac2ff;
      display: inline-block;
      .item {
        height: 50px;
        margin-bottom: 12px;
        background-color: #5aff78;
      }
    }

  }
</style>

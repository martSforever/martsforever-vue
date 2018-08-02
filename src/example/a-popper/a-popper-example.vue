<template>
  <div class="a-popper-example">
    a-popper-example
    <div class="wrapper">
      <div class="reference" ref="reference">this is reference</div>
      <div class="popper" ref="popper">this is popper</div>
      <div class="other">hello haha</div>
      <div class="line">wahaha</div>
    </div>
  </div>
</template>

<script>

  import Popper from 'popper.js'

  export default {
    name: "a-popper-example",
    data() {
      return {
        popper: null
      }
    },
    mounted() {
      this.popper = new Popper(this.$refs.reference, this.$refs.popper, {
        placement: 'bottom'
      })
    },
  }
</script>

<style scoped lang="scss">
  * {
    color: white;
  }

  .reference, .popper, .other {
    display: inline-block;
  }

  .reference {
    background-color: brown;
    height: 200px;
  }

  .popper {
    background-color: blueviolet;
    height: 50px;
  }

  .line {
    background-color: black;
    height: 100px;
  }

  .wrapper {
    max-height: 200px;
    overflow-y: scroll;
    background-color: rgba(#000, 0.3);
  }
</style>

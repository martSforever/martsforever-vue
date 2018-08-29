<template>
  <div class="a-notice-example">
    <div>horizontal:{{horizontal}}</div>
    <div>vertical:{{vertical}}</div>
    <a-button-group>
      horizontal:
      <a-button @click="horizontal = 'start'">start</a-button>
      <a-button @click="horizontal = 'center'">center</a-button>
      <a-button @click="horizontal = 'end'">end</a-button>
    </a-button-group>
    <a-button-group>
      vertical:
      <a-button @click="vertical = 'start'">start</a-button>
      <a-button @click="vertical = 'center'">center</a-button>
      <a-button @click="vertical = 'end'">end</a-button>
    </a-button-group>

    <div>
      <a-button-group>
        <a-button @click="info">info</a-button>
      </a-button-group>
    </div>
  </div>
</template>

<script>
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";

  export default {
    name: "a-notice-example",
    components: {AButton, AButtonGroup},
    props: {},
    data() {
      return {
        horizontal: 'end',
        vertical: 'end'
      }
    },
    methods: {
      info() {
        this.$notice.info({
          message: 'add info message',
          horizontal: this.horizontal,
          vertical: this.vertical
        })
      },
    }
  }
</script>

<style scoped lang="scss">

</style>

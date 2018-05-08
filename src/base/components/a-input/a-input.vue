<template>
  <div class="a-input">
    this is a-input wahaha
    hhhkdjlaskj
    <input v-model="name"/>
  </div>
</template>

<script>
  export default {
    name: "a-input",
    data() {
      return {
        name: 'hello vue nc,asn'
      }
    },
    created(){
        console.log(process.env);
    },
  }
</script>

<style scoped lang="stylus">
  .a-input
    color: red
</style>

<template>
  <div class="pick-location">
    <a-dropdown :direction="!!isChild?'right':'bottom'" :disabled="!(!!options && options.length>0)">
      <a-button @click="_handleClick">{{label}}</a-button>
      <div slot="dropdown">
        <div v-for="(item,index) in options" :key="index" class="pick-location-item">
          <pick-location
            :label="item.label"
            :options="item.options"
            :is-child="true"
            @confirm="_handleConfirm"
          />
        </div>
      </div>
    </a-dropdown>
  </div>
</template>

<script>
  import ADropdown from "../../base/components/a-dropdown/a-dropdown";
  import AButton from "../../base/components/a-button/a-button";

  export default {
    name: "pick-location",
    components: {AButton, ADropdown},
    props: {
      label: {
        type: String,
        default: 'no name'
      },
      options: {
        type: Array,
        default: () => [],
      },
      direction: {
        type: String,
        default: 'right'
      },
      isChild: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      _handleClick() {
        this.$emit('confirm', this.label)
      },
      _handleConfirm(label) {
        this.$emit('confirm', `${this.label}/${label}`)
      },
    }
  }
</script>

<style lang="scss">
  .pick-location {
    display: inline-block;
    .pick-location-item {
      width: max-content;
      height: 32px;
      line-height: 32px;
    }
    .pick-location {
      display: block;
    }
  }
</style>

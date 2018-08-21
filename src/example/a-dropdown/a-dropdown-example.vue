<template>
  <div class="a-dropdown-example">
    <a-dropdown direction="left" tag="dropdown1111111">
      <a-button>dropdown show content</a-button>
      <div slot="dropdown" class="test-content">
        <a-dropdown direction="left" tag="dropdown22222222">
          <div>
            <a-button>more</a-button>
          </div>
          <div slot="dropdown">
            <a-dropdown direction="left" tag="dropdown1111111">
              <a-button>anymore</a-button>
              <div slot="dropdown">
                this is any more content
              </div>
            </a-dropdown>
          </div>
        </a-dropdown>
      </div>
    </a-dropdown>
  </div>
</template>

<script>
  import ADropdown from "../../base/components/a-dropdown/a-dropdown";
  import AButton from "../../base/components/a-button/a-button";

  export default {
    name: "a-dropdown-example",
    components: {AButton, ADropdown}
  }
</script>

<style scoped lang="scss">
  .a-dropdown-example {
    width: 100vw;
    height: 100vh;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    .test-content {
      width: 100px;
      height: 200px;
    }
  }
</style>

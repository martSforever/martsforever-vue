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
    <div>
      <pick-location :label="location" :options="locationOptions" @confirm="handleConfirm"/>
    </div>
  </div>
</template>

<script>
  import ADropdown from "../../base/components/a-dropdown/a-dropdown";
  import AButton from "../../base/components/a-button/a-button";
  import PickLocation from "./pick-location";

  export default {
    name: "a-dropdown-example",
    components: {PickLocation, AButton, ADropdown},
    data() {
      return {
        location: 'pick location',
        locationOptions: [
          {
            label: '河北省', options: [
              {label: '石家庄市', options: [{label: '长安区'}, {label: '新华区'}, {label: '井陉矿区'}]},
            ],
          },
          {
            label: '山西省', options: [
              {label: '太原市', options: [{label: '市辖区'}, {label: '迎泽区'}, {label: '尖草坪区'}]},
              {label: '太原市', options: [{label: '市辖区'}, {label: '迎泽区'}, {label: '尖草坪区'}]},
            ],
          },
          {
            label: '广东', options: [
              {label: '太原市', options: [{label: '市辖区'}, {label: '迎泽区'}, {label: '尖草坪区'}]},
              {label: '太原市', options: [{label: '市辖区'}, {label: '迎泽区'}, {label: '尖草坪区'}]},
              {label: '太原市', options: [{label: '市辖区'}, {label: '迎泽区'}, {label: '尖草坪区'}]},
            ],
          },
        ]
      }
    },
    methods: {
      handleConfirm(label) {
        let separatorIndex = label.indexOf('/')
        console.log(label.substr(separatorIndex > -1 ? separatorIndex + 1 : 0, label.length))
      },
    }
  }
</script>

<style scoped lang="scss">
  .a-dropdown-example {
    width: 100vw;
    height: 100vh;
    padding: 12px;
    .test-content {
      width: 100px;
      height: 200px;
    }
  }
</style>

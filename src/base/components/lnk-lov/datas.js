let ALL_LOVS = {
  STORE_TYPE: [
    {name: '一级门店', value: '1'},
    {name: '二级门店', value: '2'},
    {name: '三级门店', value: '3'},
    {name: '大型门店', value: '4'},
    {name: '超大门店', value: '5'},
    {name: '百货超市', value: '6'},
  ],
  AGENCY_LEVEL: [
    {name: '一级经销商', value: '_1'},
    {name: '二级经销商', value: '_2'},
    {name: '三级经销商', value: '_3'},
  ],
  STORE_STATUS: [
    {name: '正常营业', value: '_1'},
    {name: '已关闭', value: '_2'},
    {name: '三级经销商', value: '_3'},
  ],
};

export function getLov(type) {
  return ALL_LOVS[type];
}

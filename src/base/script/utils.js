// 判断参数是否是其中之一
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

//去掉px,返回数字
export function removePx(value) {
  return ((value + "").replace(/px/g, '') - 0);
}

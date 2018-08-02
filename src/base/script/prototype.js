import {oneOf} from "./utils";

/*
*  String字符串
*/

/*
*  去除字符串前后的空格换行符，以及ufeff字符
*/
String.prototype.trim = function () {
  return (this || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}

/*
*  HTML节点
*/

/*
*  判断是否存在class
*/
Element.prototype.hasClass = function (className) {
  return oneOf(className, this.classList.value.split(' '))
}

/*
*  添加class
*/
Element.prototype.addClass = function (classesStr) {
  if (!classesStr) return

  let curCLassesStr = this.className;
  const classes = classesStr.split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (this.classList) {
      this.classList.add(clsName);
    } else {
      if (!this.hasClass(clsName)) {
        curCLassesStr += ' ' + clsName;
      }
    }
  }
  if (!this.classList) {
    this.className = curCLassesStr;
  }
}

/*
*  删除class
*/
Element.prototype.removeClass = function (classesStr) {
  if (!classesStr) return

  const classes = classesStr.split(' ');
  let curClassesStr = ' ' + this.className + ' ';

  for (let i = 0; i < classes.length; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (this.classList) {
      this.classList.remove(clsName);
    } else {
      if (this.hasClass(clsName)) {
        curClassesStr = curClassesStr.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!this.classList) {
    this.className = curClassesStr.trim();
  }
}

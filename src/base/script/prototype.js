import {oneOf, zeroize} from "./utils";

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

/*
* 删除数组所有元素
*/

Object.defineProperty(Array.prototype, 'removeAll', {
  configurable: true,
  writable: true,
  enumerable: false,
  value: function () {
    this.splice(0, this.length)
  }
})


Object.defineProperty(Array.prototype, 'pushArray', {
  configurable: true,
  writable: true,
  enumerable: false,
  value: function (array) {
    array.forEach((item) => {
      this.push(item)
    })
    return this
  }
})
Object.defineProperty(Array.prototype, 'unshiftArray', {
  configurable: true,
  writable: true,
  enumerable: false,
  value: function (array) {
    array.forEach((item) => {
      this.unshift(item)
    })
    return this
  }
})

Object.defineProperty(Date.prototype, 'format', {
  value: function (formatStr) {
    return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
      switch ($0) {
        case 'd':
          return this.getDate();
        case 'dd':
          return zeroize(this.getDate());
        case 'ddd':
          return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][this.getDay()];
        case 'dddd':
          return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.getDay()];
        case 'M':
          return this.getMonth() + 1;
        case 'MM':
          return zeroize(this.getMonth() + 1);
        case 'MMM':
          return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][this.getMonth()];
        case 'MMMM':
          return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this.getMonth()];
        case 'yy':
          return new String(this.getFullYear()).substr(2);
        case 'yyyy':
          return this.getFullYear();
        case 'h':
          return this.getHours() % 12 || 12;
        case 'hh':
          return zeroize(this.getHours() % 12 || 12);
        case 'H':
          return this.getHours();
        case 'HH':
          return zeroize(this.getHours());
        case 'm':
          return this.getMinutes();
        case 'mm':
          return zeroize(this.getMinutes());
        case 's':
          return this.getSeconds();
        case 'ss':
          return zeroize(this.getSeconds());
        case 'l':
          return this.getMilliseconds();
        case 'll':
          return zeroize(this.getMilliseconds());
        case 'tt':
          return this.getHours() < 12 ? 'am' : 'pm';
        case 'TT':
          return this.getHours() < 12 ? 'AM' : 'PM';
      }
    });
  }
})

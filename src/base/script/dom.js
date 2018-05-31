export function moveCursorToEnd(obj) {
  if (window.getSelection) {//ie11 10 9 ff safari
    obj.focus(); //解决ff不获取焦点无法定位问题
    let range = window.getSelection();//创建range
    range.selectAllChildren(obj);//range 选择obj下所有子内容
    range.collapseToEnd();//光标移至最后
  }
  else if (document.selection) {//ie10 9 8 7 6 5
    let range = document.selection.createRange();//创建选择对象
    //var range = document.body.createTextRange();
    range.moveToElementText(obj);//range定位到obj
    range.collapse(false);//光标移至最后
    range.select();
  }
}

export function onPasteImage(obj, handler) {
  obj.addEventListener('paste', function (event) {
    // 添加到事件对象中的访问系统剪贴板的接口
    let clipboardData = event.clipboardData;
    let i = 0, items, item, types;

    if (clipboardData) {
      items = clipboardData.items;
      if (!items) return;
      item = items[0];
      // 保存在剪贴板中的数据类型
      types = clipboardData.types || [];
      for (; i < types.length; i++) {
        if (types[i] === 'Files') {
          item = items[i];
          break;
        }
      }
      // 判断是否为图片数据
      if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
        // 读取该图片
        imgReader(item, handler);
      }
    }
  });
}

function imgReader(target, handler) {
  let file = target.getAsFile(),
    reader = new FileReader();
  reader.onload = function (e) {
    handler(e.target.result)
  };
  reader.readAsDataURL(file);
}

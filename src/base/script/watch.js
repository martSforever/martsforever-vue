/*
* 监听dom中子元素变化
*/
export function watchDomChildList(target, handler) {
  handleImage(target, handler);
  // Firefox和Chrome早期版本中带有前缀
  let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  // 创建观察者对象
  let observer = new MutationObserver((mutations) => {
    handler(mutations);
    handleImage(target, handler);
  });
  // 配置观察选项:
  let config = {childList: true};
  // 传入目标节点和观察选项
  observer.observe(target, config);
  return observer;
}

function handleImage(target, handler) {
  let imgsHtmlCollection = target.getElementsByTagName('img');
  let imgs = [];
  for (let i = 0; i < imgsHtmlCollection.length; i++) {
    let imgHtmlCollection = imgsHtmlCollection[i];
    imgs.push(imgHtmlCollection);
  }
  /*把已经加载过的去除*/
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    if (!!img._isLoaded) {
      imgs.splice(i, 1);
      i--;
    }
  }
  let imgLength = imgs.length;
  let loadCount = 0;
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.onload = () => {
      img._isLoaded = true;
      loadCount++;
      if (loadCount === imgLength) {
        handler();
      }
    }
  }
}

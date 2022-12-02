/**
 * 节流函数 
 * @param {Function} fn  被节流的函数 
 * @param {Number} wait  毫秒数
 * @returns 
 */
export const debounce = (fn, wait) => {
  let callback = fn;
  let timerId = null;

  function debounced() {
    // 保存作用域
    let context = this;
    // 保存参数，例如 event 对象
    let args = arguments;

    clearTimeout(timerId);
    timerId = setTimeout(function () {
      callback.apply(context, args);
    }, wait);
  }

  // 返回一个闭包
  return debounced;
}

/**
 * 将数值转换为带px单位的String
 * @param {String | Number } value 
 * @returns {String} 
 */
export const pxCheck = (value) => {
  return isNaN(Number(value)) ? String(value) : `${value}px`;
}

export const findDeep = function (arr, target) {
  let results = [];
  arr.forEach(item => {
    if (Array.isArray(target)) {
      if (target.includes(item.id)) {
        results.push(item);
      }
    } else if (target === item.id) {
      results.push(item);
    }
    if (item.children && item.children.length) {
      results.push(...findDeep(item.children, target));
    }
  });
  return results;
}
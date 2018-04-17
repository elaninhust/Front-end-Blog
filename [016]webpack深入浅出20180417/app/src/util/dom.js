/**
 * 原生js判断是否包含某一个class
 * @param  {[DOM]}  el        [DOM节点]
 * @param  {[String]}  className [class名]
 * @return {Boolean}           [description]
 */
export function hasClass (el,className) {
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
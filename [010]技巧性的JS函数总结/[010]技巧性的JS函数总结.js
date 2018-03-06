/**
 * 奇思妙想类型的JS方法
 */

/**
 * 数组随机打乱顺序
 */

function randomSort (arr) {
	return arr.sort(function(){
		return Math.random() > 0.5 ? 0 : 1;
	});
}

/**
 * 找出数组中和为n的所有组合
 */

function combinations(array, n) {
  var lists = [],
      M = 1 << array.length;
  for (var i = 1; i < M; ++i) {
      var sublist = array.filter(function(c, k) {
          return i >> k & 1
      });
      if (sublist.reduce(function(p, c) {
              return p + c
          }, 0) === n)
          lists.push(sublist);
  }
  return lists;
}
/**
 * 奇思妙想类型的JS方法
 */

/**
 * 数组从小到大排序
 * @param {Array} 输入参数数组
 * @return {Array} 返回从小到大排序好的数组
 */

const qsort = ([x,...ax]) => 
	x === undefined ? [] : [...qsort(ax.filter(_ => _ <= x)),x,...qsort(ax.filter(_ => _>x))]

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
 * 穷举法，复杂度O(N*2^N)
 */

function combinations(array, n) {
  var lists = [],
      M = 1 << array.length; //2^arr.length次方，获得所有组合的个数
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

/**
 * 数组冒泡排序
 * 每次找出最大的值放在最后
 * 时间复杂度：o(n^2)
 */
function mpSort (arr){
	for(var i = 0;i<arr.length - 1 ;i++){
		for(var j = 0;j<arr.length - i - 1;j++){
			if(arr[j] > arr[j+1]){
				var tem = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = tem;
			}
		}
	}
	return arr;
}

/**
 * 二分法排序
 * 时间复杂度：o(n log n)
 */
function erSort(arr){
	if(arr.length <= 1){
		return arr;
	}
	var left = [],right = [];
	var m = Math.floor(arr.length/2);
	var mid = arr.splice(m,1)[0];

	for(var i=0;i<arr.length;i++){
		if(arr[i] < mid){
			left.push(arr[i])
		}else{
			right.push(arr[i])
		}
	}
	return erSort(left).concat([mid],erSort(right))
}

/**
 * 选择排序
 * 每次找出最小的，然后按照顺序收集起来
 * 时间复杂度：o(n^2)
 */
function minSort(arr){
	var min = 0;
	for(var i=0;i<arr.length-1;i++){
		min = i;
		for(var j = i;j<arr.length;j++){
			if(arr[j] < arr[min]){
				min = j
			}
		}
		var tem = arr[i];
		arr[i] = arr[min];
		arr[min] = tem;
	}
	return arr;
}

/**
 * 判断数据类型的方法
 * @author Elan
 * @param {any} x 传入判断类型的数据
 * @return {'array'}  返回结果为数组类型
 * @return {'object'} 返回结果为对象类型
 * @return {'function'} 返回结果为函数类型
 * @return {'number'} 返回结果为数字类型
 * @return {'string'} 返回结果为字符串类型
 * @return {'boolean'} 返回结果为布尔类型
 * @return {'null'} 返回结果为null
 * @return {'undefined'} 返回结果为undefined
 */

function getType (x){
	return Object.prototype.toString.call(x).slice(8,-1).toLowerCase();
}

function getType(x){
	return ({}).toString.call(x).slice(8,-1).toLowerCase();
}
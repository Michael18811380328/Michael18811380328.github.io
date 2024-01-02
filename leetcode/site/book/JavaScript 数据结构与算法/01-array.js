// 01 数组中的过滤器方法
function isEven(x) {
  return (x % 2 === 0) ? true : false
}
let num = [1,2,3,4,5];
console.log(num.every(isEven));
// every: 数组的每一项的函数返回值都是true，结果才是true，否则是false（&&）。方法不改变原始数组。返回值是boolean。
console.log(num.some(isEven));
// some: 数组的任何一项是true，some函数返回值及时true（||）方法不改变原始数组，返回值是boolean
num.forEach(function(x) {
  console.log(x * 2);
})
// forEach: 数组中每一项都执行后面的函数。返回值长度和原始数组相同（执行一次返回一次）。不改变原始数组。
console.log(num.map(isEven));
// map: 将数组中每一项都执行一次函数，将返回值组成一个新的数组返回，不改变原始的数组。
console.log(num.filter(isEven));
// filter: 将原始数组依次执行函数，将返回值为true的项组成一个新的数组返回。这个方法的功能很强大。

let a = num.reduce(function(previous, current, index){
  console.log(previous); //1
  console.log(current); //2
  console.log(index); //1
  return previous + current;
});
console.log(a); //15(累加)
// reduce：叠加器函数：依次执行数组的每一项。根据返回值进行计算。
// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
// total 初始值或者计算结束后的返回值；arr（可选）当前元素所属的数组对象。initialValue（可选）传递给函数的初始值。

// 02 字符串高级排序
// 通常情况下字符串按照ASCII编码进行排序。可以使用sort方法进行排序。
let array = ['Mike', 'John', 'jom', 'serry'];
console.log(array.sort());

let b = array.sort(function(a, b) {
  if ( a.toLowerCase() < b.toLowerCase() ) {
    return -1;
  }
  if ( a.toLowerCase() > b.toLowerCase() ) {
    return 1;
  }
});
console.log(b);

## 二分搜索

搜索过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束；如果某一特定元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。如果在某一步骤数组为空，则代表找不到。这种搜索算法每一次比较都使搜索范围缩小一半。

时间复杂度：折半搜索每次把搜索区域减少一半，时间复杂度为

![img](https://bkimg.cdn.bcebos.com/formula/5faf674bdd725a78fdc4c7a373b64e84.svg)

空间复杂度：虽以递归形式定义，但是[尾递归](https://baike.baidu.com/item/尾递归)，可改写为循环。

![img](https://bkimg.cdn.bcebos.com/formula/345aa0aa5ea18da36e05282e794aeee9.svg)

二分查找有两种实现：while 循环和递归函数调用（不同语言实现）

- 当while满足条件时，返回；如果不满足条件，改变开始和结束值，继续循环
- 递归：当满足条件时，返回index；不满足条件时，更改输入参数递归调用

注意事项：每次循环边界不能遗漏；需要处理搜索结果不存在时的情况（不会出现死循环）

### C 递归

```c
int binary_search(const int arr[], int start, int end, int khey) {
  if (start > end) return -1;
  int mid = start + (end - start) / 2;
  if (arr[mid] > khey)
    return binary_search(arr, start, mid - 1, khey);
  else if (arr[mid] < khey)
    return binary_search(arr, mid + 1, end, khey);
  else
    return mid;
}
```

### javascript 递归

```js
Array.prototype.binary_search = function(low, high, khey) {
  if (low > high) {
    return -1;
  }
  var mid = parseInt((high + low) / 2);
  if (this[mid] > khey) {
    return this.binary_search(low, mid - 1, khey);
  }
  else if (this[mid] < khey) {
    return this.binary_search(mid + 1, high, khey);
  }
  return mid;
}
```


### Python3 版本 递归

```python
def binary_search(arr,start,end,hkey):
  if start > end:
    return -1
  mid = start + (end - start) / 2
  if arr[mid] > hkey:
    return binary_search(arr, start, mid - 1, hkey)
  if arr[mid] < hkey:
    return binary_search(arr, mid + 1, end, hkey)
  return mid
```

### Python3 版本 while 循环

```python
def binary_search(arr, start, end, hkey):
  while start <= end:
    mid = start + (end - start)
    if arr[mid] < hkey:
      start = mid + 1
    elif arr[mid] > hkey:
      end = mid - 1
    else:
      return mid
```

## 实际案例

#### 二分法搜索有序数组

~~~js
function binSearch(oldArr, data) {
  // 如果传入无序数组，首先排序
  let arr = qSort(oldArr);
  // 设置初始上下边界
  let upperBound = arr.length - 1, lowerBound = 0;
  // 开始循环（二分）
  while (lowerBound <= upperBound) {
    var mid = Math.floor((upperBound + lowerBound) / 2);
    if(arr[mid] < data) {
      lowerBound = mid + 1;
    } else if(arr[mid] > data) {
      upperBound = mid - 1;
    } else {
      return mid;
    }
  }
  // 没有找到，返回 -1
  return -1;
}

var test = [1,2,3,4,5,6];
console.log(binSearch(test,2)); //位置"1"
~~~

#### 二分法实现快速排序

~~~js
function qSort(list) {
  if (list.length == 0) {
    return [];
  }
  
  //创建两个数组，一个用来存放比基准小的元素，另一个存放比基准值大的元素
  var left = [];
  var right = [];
  
  //基准值取自数组的第一个元素
  var pivot = list[0];
  
  //遍历数组，根据它们与基准值的关系放到合适的数组中
  for(var i = 1; i < list.length; i++) {
    if (list[i] < pivot) {
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }
  //然后对于较小的数组和较大的数组分别递归调用这个函数
  return qSort(left).concat(pivot,qSort(right));
}

var test = [4,3,5,1,2];
console.log(qSort(test)); //[1,2,3,4,5]
~~~

插入排序，选择排序，快速排序，希尔排序参考下面链接

https://blog.csdn.net/charlene0824/article/details/51387165


// sort
// 结论：越简单的方法，算法复杂度越差
function ArrayList() {

  let arr = [];
  this.insert = (item) => {
    arr.push(item);
  };

  function swap(a, b) {
    let tem = a;
    a = b;
    b = tem;
  }

  // bubble sort
  bubbleSort = () => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          swap(arr[j], arr[j + 1]);
        }
      }
    }
  }

  bubbleSortUpdate = () => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] < arr[j + 1]) {
          swap(arr[j], arr[j + 1]);
        }
      }
    }
  }

  // select sort
  selectSort = () => {
    let len = arr.length;
    let minItem;
    for (let i = 0; i < len; i++) {
      minItem = i;
      for (let j = i; j < len; j++) {
        if (arr[minItem] > arr[j]) {
          minItem = j;
        }
      }
      if (i !== minItem) {
        swap(arr[i], arr[minItem]);
      }
    }
  }

  // insertSort
  insertSort = () => {
    let len = arr.length;
    let j , temp;
    for (let i = 0; i < len; i++) {
      j = i;
      temp = arr[i];
      while (j > 0 && arr[j - 1] > temp) {
        arr[j] = arr[j - 1];
        j--;
      }
      arr[j] = temp;
    }
  }

  // mergeSort
  this.mergeSort = function() {
    return mergeSortRect(array);
  }

  let mergeSortRect = function(array) {
    let len = array.length;
    if (len === 1) {
      return array;
    }
    let mid = Math.floor(len / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid, len);
    return merge(mergeSortRect(left), mergeSortRect(right));
  }

  let merge = function(left, right) {
    let result = [];
    let indexLeft, rightRight;
    while (indexLeft < left.length && indexRight < right.length) {
      if (left[indexLeft] < right[indexRight]) {
        result.push(left[indexLeft]);
      } else {
        result.push(right[indexRight]);
      }
    }
    while (indexLeft < left.length) {
      result.push(left[indexLeft])
    }
    while (indexRight < right.length) {
      result.push(right[indexRight]);
    }
    return result;
  }

  // quickSort
  this.quickSort = function() {
    let len = array.length;
    quick(array, 0, len - 1);
  }

  function quick(array, left, right) {
    let index;
    if (array.length > 1) {
      index = partition(array, left, right);
      if (left < index - 1) {
        quick(array, left, index - 1);
      }
      if (index < right) {
        quick(array, index, right);
      }
    }
  }

  function partition(array, left, right) {
    let middle = array[Math.floor((left + right) / 2)];
    let i = left, j = right;
    while (i < j) {
      while (array[i] < middle) {
        i++;
      }
      while (array[j] > middle) {
        j--;
      }
      if (i <= j) {
        swapQuickSort(array, i, j);
        i++;
        j--;
      }
    }
    return i;
  }

  function swapQuickSort(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

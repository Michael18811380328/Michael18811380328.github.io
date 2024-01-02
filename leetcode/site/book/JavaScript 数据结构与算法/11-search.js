function sequentialSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }
}

function binarySearch = function(target) {
  // this.quickSort();
  let low = 0, height = array.length - 1;
  let middle, element;
  while (low <= height) {
    mid = Math.floor((low + height) / 2);
    element = array[mid];
    if (element < target) {
      low = middle + 1
    }
    else if (element > target) {
      height = middle - 1;
    }
    else {
      return middle;
    }
  }
  return -1;
}

function fibonacci(n) {
  if (n === 1 || n === 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function fib(num) {
  let result = 1;
  let n1 = 1, n2 = 1;
  for (let i = 3; i < num; i++) {
    result = n1 + n2;
    n1 = n2;
    n2 = result;
  }
  return result;
}


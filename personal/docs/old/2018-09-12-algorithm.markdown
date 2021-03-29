---
layout:     post
title:      "JS常用算法总结"
subtitle:   "冒泡排序、快排顺序、选择排序、插入排序、归并排序"
date:       2018-09-11 12:00:00
author:     "ZeFeng"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 算法
---

> “Yeah It's on. ”


## 前言

ZeFeng 的 Blog 就这么开通了。
## 正文
下面是前端比较常用的八个算法demo

冒泡算法：比较两个相邻的数值，if第一个>第二个，交换他们的位置元素项向上移动至正确的顺序。
```
function bubbleSort(arr) {
 let len = arr.length;
 for (let i = 0; i < len; i++) {
   for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j+1]) {        //相邻元素两两对比
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }
 return arr;
}
```
快排顺序：对冒泡算法的改进，分三步走，（1）在数组中选择一个中间项作为主元   （2）划分操作：创建两个指针，左边的指向数组的第一项，右边的指向数组的最后一项。然后移动左指针，直到找到一个比主元的项大。接着移动右边的指针，直到找到比主元小的项，最后交换它们。重复这个过程，直到左侧的指针超过了右侧的指针。这个使比主元小的都在左侧，比左元大的都在右侧。 （3）比主元小的值组成一个小数组，比主元大的值组成小数组，然后重复前面的两个步骤，直到排序完成。
```
function quickSort(arr, left, right) {
    let len = arr.length;
    let partitionIndex;
    left = typeof left !== 'number' ? 0 : left;
    right = typeof right !== 'number' ? len - 1 : right;
    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
}

function partition(arr, left, right) {     //分区操作
    let pivot = left;                      //设定基准值（pivot）
    let index = pivot + 1;
    for (let i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            [arr[i], arr[index]] = [arr[index], arr[i]];
            index++;
        }
    }
    [arr[pivot], arr[index - 1]] = [arr[index - 1], arr[pivot]];
    return index - 1;
}
```
选择排序：找到最小值放在第一位，找到第二小的放在第二位，以此类推
```
function selectionSort(arr) {
  let len = arr.length;
  let minIndex;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {     //寻找最小的数
         minIndex = j;                 //将最小数的索引保存
      }
    }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}
```
插入排序：每次排一个数组项，假设数组的第一项已经排序，接着，把第二项与第一项进行对比，第二项是该插入第一项前面还是后面，第三项是插到第一项前面还是后面
```
function insertionSort(arr) {
  let len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}
```
归并排序：前面三种排序性能不好，归并排序性能好，归并排序是一种分治算法，本质上就是把一个原始数组切分成比较小的数组，直到每个小数组只有一个位置，接着把最小数组归并成比较大的数组，在归并过程中也会完成排序，直到最后只有一个排序完毕的大数组。
```
function mergeSort(arr) { 
    //采用自上而下的递归方法
    let len = arr.length;
    if(len < 2) {
        return arr;
    }
    let middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right){
    let result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    result.push(...left);
    result.push(...right);
    return result;
}
```
堆排序：把数组当中的二叉树来排序，4个步骤：（1）索引0是根节点 （2）任意的节点的父节点是N/2(除了根节点)
（3）节点L的左子节点是2*L （4）节点R的子节点是2*R+1
堆排序其实就是先构建二叉树，然后把根节点与最后一个进行交换，接着对剩下的元素进行二叉树构建，进行交换、直到剩下最后一个。
```
var len;    //len设置成为全局变量

function buildMaxHeap(arr) {   //建立大顶堆
    len = arr.length;
    for (let i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i);
    }
}

function heapify(arr, i) {     //堆调整
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let largest = i;
    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, largest);
    }
}

function heapSort(arr) {
    buildMaxHeap(arr);
    for (let i = arr.length - 1; i > 0; i--) {
        [arr[0],arr[i]]=[arr[i],arr[0]];
        len--;
        heapify(arr, 0);
    }
    return arr;
}
```
未完待续

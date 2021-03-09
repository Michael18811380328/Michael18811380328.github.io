# 原地算法


In computer science, an in-place algorithm is an algorithm which transforms input using no auxiliary data structure. However a small amount of extra storage space is allowed for auxiliary variables. The input is usually overwritten by the output as the algorithm executes. In-place algorithm updates input sequence only through replacement or swapping of elements. An algorithm which is not in-place is sometimes called not-in-place or out-of-place.

像 wiki 里面说的，原地算法是基本上不需要额外辅助的数据结构,然而,允许少量额外的辅助变量来转换数据的算法。在计算复杂性理论中，原地算法包含使用O(1)空间复杂度的所有算法，DSPACE(1)类型。

```js
function reverse-in-place(a[0..n])
	for i from 0 to floor(n/2)
		swap(a[i], a[n-i])
```

## 数组翻转

比如我们在 JS 中，实现翻转数组，（array.prototype.reverse） 除外。[1,2,3] => [3,2,1]

```js
function reverseArray(arr) {
  var len = array.length;
  var middle = Math.floor(len / 2);
  for (var i = 0; i < middle; i += 1) {
    var temp = array[i];
    array[i] = array[n - 1 - i];
    array[n - 1 - i] = temp;
  }
}
```

这样我们就不用借助另外一个一个数组倒序循环了。

## 删除排序后数组的重复元素

比如我们给出一组排好后的数组，然后删除掉其中重复的元素

[1,2,3,3,3,4,5,5,5,6,7] to [1,2,3,4,5,6,7]

```js
var removeDuplicates = function(nums) {
  var i = 0;
  // 这里有问题，需要看 for-of 的循环
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of
  for (let n of nums) {
    if (i==0 || n > nums[i - 1]) {
      nums[i++] = n;
    }
  }
  return i;
};
```

### 判断回文

最近 **20200202** 比较火，这是比较常见的[回文](https://en.wikipedia.org/wiki/Palindrome)数字。类似单词比如 `bob` 或者句子 `Was it a car or a cat I saw?`。

```bash
'aba' => true
'accad' => false
'20200202' => true
```

我们如何判断一个字符串是回文的时候可以用到。

```js
function isPalindromeStr(str) {
  var middle = Math.floor(str.length / 2);
  for (var i = 0; i < middle; i++)
    if (str[i] !== str[str.length - i - 1]) {
      return false;
    }
  return true;
} 
```

对应下面三个题目

- [In-place algorithm](https://en.wikipedia.org/wiki/In-place_algorithm)
- [Palindrome](https://en.wikipedia.org/wiki/Palindrome)
- [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)



其他的例子，排序算法会原地重新排放阵列内容成为排序过的顺序，包含：

[冒泡排序](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=111984)

[选择排序](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=7538686)

[插入排序](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=7832934)

[堆排序](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=4838322)

[希尔排序](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=7835120)

快速排序通常被描述为一个原地算法，但是事实上并不是。大部份的实作需要O(log n)的空间来支持它的 [分治法](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=7824380)（divide-and-conquer）递回。大部份选择算法也是原地，虽然在找到最后结果的过程中，有某些相当地重新排列输入阵列，但却是固定大小的结果。



## 在计算上的复杂度

在[计算复杂性理论](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=174556523&ss_c=ssc.citiao.link)中，原地算法包含使用O(1) [空间复杂度](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=5026582)的所有算法，DSPACE(1)类型。这个类型是非常有限的；它与正规语言1相等。事实上，它甚至不包含上面所列的任何范例。

因为这个原因，我们也考虑在 L 的算法，这类型的问题需要O(log n)额外的空间，来成为原地。虽然这个似乎与我们先前的定义矛盾，但是我们必须认为在抽象的世界，输入的资料可以是任意巨大的。在一部真实的电脑，指标（pointer）仅需要一个小的固定数量空间，因为实体内存的数量是固定的，但是一般上一个大小为n的数列需要O(log n)位元来作为它的索引（index）。

结果是否意指快速排序是原地的？其实一点也不 — 技术上来说，它需要O(log2 n)空间，因为它的O(log n) 堆栈框架（stack frames）每一个都含有一个固定数量的指标（每一个大小为O(log n)）。

辨别拥有 L 的原地算法拥有某些有趣的含意；举例来说，它意指存在一个（相当地复杂）原地算法，决定在一个[无向图](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=541946&ss_c=ssc.citiao.link)（undirected graph）中的任两个节点（nodes）之间是否存在一条路径（path），这是一个需要O(n)个额外的空间，使用典型的算法像是深度优先搜寻(depth-first search)（每个节点有个走访的位元）的问题。有些问题像是决定一个图形是否为[二分图](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=412491&ss_c=ssc.citiao.link)（bipartite graph）或测试两个图形使否有相同数量的连结元件（[connected](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=8887224&ss_c=ssc.citiao.link) [component](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=106288&ss_c=ssc.citiao.link)），接着针对这些问题产出原地算法。参考SL有更多的资讯。

## 随意的角色

在很多情况，借由使用[随机化算法](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=1708671&ss_c=ssc.citiao.link)（randomized algorithms），一个算法的空间需求可以被极度地裁减掉。举个范例，我们希望知道一个有 n 个顶点（vertices）的图形中的两个顶点是否位于图中同一个连接元件（connected component）。没有已知简单、决定性的（deterministic）、原地算法来决定这件事，但是如果我们简单地由一个顶点开始，且执行大约20n3步的随机走路（random walk），那我们会偶遇到其他顶点来提供它不是在同一个元件（component）中的机会是非常地高。类似地，对于质数测试（primality test）有简单的随机化原地算法像是米勒-拉宾检验，也有简单原地[随机化](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=67142757&ss_c=ssc.citiao.link)[整数分解](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=63790654&ss_c=ssc.citiao.link)算法像是Pollard's rho 算法。参考RL和BPL有对这个现象更多的讨论。

## 在函数的程式设计

函数[程式设计](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=107828&ss_c=ssc.citiao.link)（functional programming）语言经常不鼓励或不支援会覆盖资料的原地算法，因为这是副作用的一种型态；反之，他们只允许建立新的资料。然而，好的函数语言 [编译器](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=106869&ss_c=ssc.citiao.link)（compiler）在当一个与以存在之非常相似的物件被建立时，都经常会辨识出来，然后旧的就会被丢弃掉，而且会最把这最佳化为一个简单的"[引擎盖](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=9318085&ss_c=ssc.citiao.link)之下"转换。

基本上，有可能小心地建构原地算法而部会更动资料（除非资料已不会再被使用），但是在实际上这却很少见到。参考纯函数数据结构（purely functional data structure）。

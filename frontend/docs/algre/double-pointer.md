# 双指针问题

## 什么是双指针

**双指针**，指的是在遍历对象的过程中，不是普通的使用单个指针进行访问，而是使用两个相同方向（*快慢指针*）或者相反方向（*对撞指针*）的指针进行扫描，从而达到相应的目的。

分类：对撞指针、快慢指针

换言之，双指针法充分使用了数组有序这一特征，从而在某些情况下能够简化一些运算。

在`LeetCode`题库中，关于**双指针**的问题还是挺多的。[双指针](https://leetcode-cn.com/tag/two-pointers/)

## JS例子

### 对撞指针

**对撞指针**是指在有序数组中，将指向最左侧的索引定义为`左指针(left)`，最右侧的定义为`右指针(right)`，然后从两头向中间进行数组遍历。对撞数组适用于**有序数组**，也就是说当你遇到题目给定有序数组时，应该第一时间想到用对撞指针解题。

伪代码大致如下：

```js
function fn (list) {
  var left = 0;
  var right = list.length - 1;

  //遍历数组
  while (left <= right) {
    left++;
    // 一些条件判断 和处理
    ... ...
    right--;
  }
}
```

举个LeetCode上的例子：

以**LeetCode 881[救生艇](https://leetcode-cn.com/problems/boats-to-save-people/)**问题为例

由于本题只要求计算出`最小船数`，所以原数组是否被改变，和元素索引位置都不考虑在内，所以可以先对于给定数组进行排序，再从数组两侧向中间遍历。所以解题思路如下：

1. 对给定数组进行升序排序
2. 初始化左右指针
3. 每次都用一个”最重的“和一个”最轻的“进行配对，如果二人重量小于`Limit`，则此时的”最轻的“上船，即（`left++`）。不管”最轻的“是否上船，”最重的“都要上船，即（`right--`）并且所需船数量加一，即（`num++`）

代码如下：

```js
var numRescueBoats = function(people, limit) {
  people.sort((a, b) => (a - b));
  var num = 0
  let left = 0
  let right = people.length - 1
  while (left <= right) {
    if ((people[left] + people[right]) <= limit) {
      left++
    }
    right--
    num++
  }
  return num
};
```

------

### 快慢指针

**快慢指针**也是双指针，但是两个指针从同一侧开始遍历数组，将这两个指针分别定义为`快指针（fast）`和`慢指针（slow）`，两个指针以不同的策略移动，直到两个指针的值相等（或其他特殊条件）为止，如fast每次增长两个，slow每次增长一个。

以[LeetCode 141.环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)为例,，判断给定链表中是否存在环，可以定义快慢两个指针，快指针每次增长一个，而慢指针每次增长两个，最后两个指针指向节点的值相等，则说明有环。就好像一个环形跑道上有一快一慢两个运动员赛跑，如果时间足够长，跑地快的运动员一定会赶上慢的运动员。

解题代码如下：

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  if (head === null || head.next === null) {
    return false;
  }

  let slow = head;
  let fast = head.next;

  while (slow !== fast) {
    if (fast === null || fast.next === null) {
      return false
    }
    slow = slow.next
    fast = fast.next.next
  }
  return true
};
```

再比如[LeetCode 26 删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)，这里还是定义快慢两个指针。快指针每次增长一个，慢指针只有当快慢指针上的值不同时，才增长一个（由于是有序数组，快慢指针值不等说明找到了新值）。

真实代码：

```js
var removeDuplicates = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  // Michael：这里的算法不完善，现在只获取了返回的不重复元素的个数，那么原来的数组后面的元素应该删除[1,1,1,1,2,3] 变成 [1,2,3,1,2,3] 后面的需要直接去掉，这样才能满足要求。这个思路比循环一次spliec更好
  return slow + 1;
};
```

### 总结

当遇到有序数组时，应该优先想到`双指针`来解决问题，因两个指针的同时遍历，会减少空间复杂度和时间复杂度。



## Go例子

双指针主要用于遍历数组，两个指针指向不同的元素，从而协同完成任务。双指针可以从不同的方向向中间逼近也可以朝着同一个方向遍历。

在LeedCode中有很多题目可以通过双指针的思想来解答。其中包括：

### **1、有序数组的 Two Sum**

**[Leetcode ：167. Two Sum II - Input array is sorted (Easy)](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/)**

```undefined
Input: numbers={2, 7, 11, 15}, target=9
Output: index1=1, index2=2
```

题目描述：在有序数组中找出两个数，使它们的和为 target。

使用双指针，一个指针指向值较小的元素，一个指针指向值较大的元素。
指向较小元素的指针从头向尾遍历，指向较大元素的指针从尾向头遍历。
如果两个指针指向元素的和 sum == target，那么得到要求的结果；
如果 sum > target，移动较大的元素，使 sum 变小一些；
如果 sum < target，移动较小的元素，使 sum 变大一些。

```go
func twoSum(numbers []int, target int) []int {
  for i,j :=0,len(numbers)-1;i<j;{
    if numbers[i] + numbers[j] == target {
      return []int{i+1,j+1}
    }
    if numbers[i] + numbers[j] < target {
      i++
      continue
    }
    if numbers[i] + numbers[j] > target {
      j--
      continue
    }
  }
  return []int{}
}
```

### **2、两数平方和**

[633. Sum of Square Numbers (Easy)](https://leetcode.com/problems/sum-of-square-numbers/description/)

```php
Input: 5
Output: True
Explanation: 1 * 1 + 2 * 2 = 5
```

题目描述：判断一个数是否为两个数的平方和。

```go
/*设置两个指针，一个从前（0）开始遍历，一个从后（sqrt(n)）开始遍历，直到找到合适的解
*/
func judgeSquareSum(c int) bool {
  for i,j:=0,int(math.Sqrt(float64(c)));i<=j;{
    if i*i + j*j  == c {
      return true
    }
    if i*i + j*j  < c {
      i++
      continue
    }
    if i*i + j*j  > c {
      j--
      continue
    }
  }
  return false
}
```

### **3、反转字符串中的元音字符**

[345. Reverse Vowels of a String (Easy)](https://leetcode.com/problems/reverse-vowels-of-a-string/description/)

```kotlin
Given s = "leetcode", return "leotcede".
```

```go
/*使用双指针指向待反转的两个元音字符，一个指针从头向尾遍历，一个指针从尾到头遍历，发现两个元音后交换*/
func reverseVowels(s string) string {
  bs := []byte(s)
  for i,j:=0,len(bs)-1;i<j;{
    if !isVowel(bs[i]){
      i++
      continue
    }
    if !isVowel(bs[j]){
      j--
      continue
    }
    temp:=bs[i]
    bs[i]=bs[j]
    bs[j]=temp
    i++
    j--
  }
  return string(bs)
}

func isVowel(b byte) bool {
  return b == 'a' || b == 'e' || b == 'i' || b == 'o' || b == 'u' || b == 'A' || b == 'E' || b == 'I' || b == 'O' || b == 'U'
}
```

### **4、回文字符串**

[680. Valid Palindrome II (Easy)](https://leetcode.com/problems/valid-palindrome-ii/description/)

```cpp
Input: "abca"
Output: True
Explanation: You could delete the character 'c'.
```

题目描述：可以删除一个字符，判断是否能构成回文字符串。

```go
/*两个指针，一个从前一个往后，一致继续往前，不一致则分别看过滤哪一边可以继续*/
func validPalindrome(s string) bool {
  bs := []byte(s)
  for i,j:=0,len(bs)-1;i<j;{
    if bs[i] != bs[j] { //发现不一致，分别看去掉左边还是去掉右边任意一个可以就通过
      return ispalindrome(bs,i+1,j) || ispalindrome(bs,i,j-1)
    }
    i++
    j--
  }
  return true
}

func ispalindrome(bs []byte, left,right int) bool {
  for ;left < right;{
    if bs[left] != bs[right]{
      return false
    }
    left++
    right--
  }
  return true
}
```

### **5、归并两个有序数组**

[88. Merge Sorted Array (Easy)](https://leetcode.com/problems/merge-sorted-array/description/)

```undefined
Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]
```

题目描述：把归并结果存到第一个数组上。

```go
/*从尾开始遍历,逐个比较添加到nums1上*/
func merge(nums1 []int, m int, nums2 []int, n int)  {
  index := m+n-1
  for index1,index2 := m-1,n-1;index1 >=0 || index2 >=0;index--{
    if index1< 0 {
      nums1[index] = nums2[index2]
      index2--
    }else if index2 < 0 {
      nums1[index] = nums1[index1]
      index1--
    }else if nums1[index1] <= nums2[index2] {
      nums1[index] = nums2[index2]
      index2--
    }else if nums1[index1] > nums2[index2]{
      nums1[index] = nums1[index1]
      index1--
    }
  }
}
```

### **6、判断链表是否存在环**

[141. Linked List Cycle (Easy)](https://leetcode.com/problems/linked-list-cycle/description/)

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
/*使用双指针，一个指针每次移动一个节点，一个指针每次移动两个节点，如果存在环，那么这两个指针一定会相遇。*/
class Solution {
  public:
  bool hasCycle(ListNode *head) {
    if (head == NULL || head->next==NULL){
      return false;
    }
    ListNode* l1 = head;
    ListNode* l2 = head->next;
    while(l2!=NULL && l2->next!=NULL){
      if (l1==l2){
        return true;
      }else{
        l1=l1->next;
        l2=l2->next->next;
      }
    }
    return false;
  }
};
```

### **7、最长子序列**

[524. Longest Word in Dictionary through Deleting (Medium)](https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/description/)

```bash
Input:
s = "abpcplea", d = ["ale","apple","monkey","plea"]
Output:
"apple"
```

题目描述：删除 s 中的一些字符，使得它构成字符串列表 d 中的一个字符串，找出能构成的最长字符串。如果有多个相同长度的结果，返回字典序的最大字符串。

```go
/*两个指针从头开始查看是否能吻合，如果查到d中字串的最后一个字符也吻合代表能够完全match，再处理同长度的问题*/
func findLongestWord(s string, d []string) string {
  result := ""
  for _,v := range d {
    if len(result) > len(v) || len(result) == len(v) && result <= v {
      continue
    }
    if isValid(s,v) {
      result = v
    }
  }
  return result 
}

func isValid(s string,v string) bool{  //看是不是能match上
  bs := []byte(s)
  bv := []byte(v)
  i,j:= 0,0
  for i< len(bs) && j<len(bv){
    if bs[i] == bv[j]{
      j++
    }
    i++
  }
  if j== len(bv) { //最后一个也符合。
    return true
  }
  return false
}
```

## C++例子

此类问题一般涉及几种情形：**in place** 的更新数组，需要一个index记录更新之后的数组，另一个index跑遍原来的数组； 还有就是找到数组里面的N个数使得这几个数满足一定的条件（如几个数之和必须为某一个特定的数）；还有就是一类特殊的问题雨水储存问题。

这里有几个关键问题需要理解:

首先数组是否排序，根据信息论的看法或者能量守恒的原理，数组是否排序与墒有关，墒的本质就是描述事物有序程度的度量，换句话说事物越有序墒的值越低，并且本质是墒会自然的会增大在无外力干扰的状况下，也就是事物总是向着无序发展的。而怎样让事物变的有序呢，那么就需要外力能量的输入来使得墒变小或者变的有序。那么在数组是否有序的问题上，我们希望它是有序的，如果不是那么就需要花费“能量”让他的墒变小，这样复杂度O(nlogn)就上去了，这里复杂度可以看作为外作用力的体现。

其次双指针问题的本质其实是由于有两个或者多个元素有相互作用或者相关联，因此在改变其中一个元素的同时其他几个元素也需要跟着改变，因此双指针问题一般是在满足几个元素关系不变的情况之下，改变一个元素的同时，寻找其他几个元素满足现有的关系情况。



### 实时更新数组

例题：[Remove Element](https://link.jianshu.com/?t=https://oj.leetcode.com/problems/remove-element/)
分析： 这道题有几个关键字需要注意: **in place**, **the order of elements can be changed**.所以我们可以尝试用two pointers，一个记录remove过后的数组最后一个元素位置，一个用来遍历整个数组，判断条件就是比较该元素和target的值，如果不相等就把它copy给另一个pointer.因为题目只需要求最后的数组长度，所以返回最后记录位置就可以了。
复杂度： 时间复杂度O(n)，空间复杂度O(1).

```cpp
class Solution {
  public:
  int removeElement(int A[], int n, int elem) {
    if(A == nullptr || n == 0) return 0;
    int index = 0;

    for(int i = 0; i < n ; ++i){
      if(A[i] != elem){
        A[index++] = A[i];
      }
    }        
    return index;
  }
};
```

接下来我们看一看这道题的一个变形：
例题： [Remove Duplicates from Sorted Array](https://link.jianshu.com/?t=https://oj.leetcode.com/problems/remove-duplicates-from-sorted-array/)
分析：这道题几乎和上一题一样，这里注意数组是排序的， 关键词： **in place with constant memory**. 有一个地方值得注意第二个pointer的起始点应该从第二个元素开始，因为实际上第二个指针是用来比较和前一个元素的值，如果相等就skip.
复杂度： 时间复杂度O(n), 空间复杂度O(1).

```cpp
class Solution {
  public:
  int removeDuplicates(int A[], int n) {
    if(A == nullptr || n == 0) return 0;
    int index = 0;

    for(int i = 1; i < n ; ++i){
      if(A[index] != A[i]){
        A[++index] = A[i];
      }
    }            
    return index + 1;
  }
};
```

下面增加了一点难度，如果同一个元素允许出现两次。
例题： ［Remove Duplicates from Sorted Array II]([https://oj.leetcode.com/problems/remove-duplicates-from-sorted-array-ii/](https://link.jianshu.com/?t=https://oj.leetcode.com/problems/remove-duplicates-from-sorted-array-ii/))
分析： 首先想到的是hashtable储存每个元素的个数，仔细观察题目可以发现其实不需要hashtable，因为数组是排序的，重复的元素应该会连在一起，这样遍历的时候多加一个判断就可以解决。
复杂度： 时间复杂度O(n),空间复杂度O(1).

先看一个解法建立在上一题的基础上，其中判断了前后元素是否相等，这样保证最多只有两个相同的元素：

```cpp
class Solution {
  public:
  int removeDuplicates(int A[], int n) {
    if(A == nullptr || n == 0) return 0;

    int index = 0;
    for(int i = 1; i < n ; ++i){
      if(A[index] == A[i] && (index == 0 || A[index-1] != A[index]))
        A[++index] = A[i];

      if(A[index] != A[i])
        A[++index] = A[i];
    }
    return index + 1;
  }
};
```

其实可以稍加改变，使得解法更有可扩展性，处理N个重复的元素的情形：

```cpp
class Solution {
  public:
  int removeDuplicates(int A[], int n) {
    if(A == nullptr || n == 0) return 0;
    if(n <= 2) return n;

    int index = 2;
    for(int i = 2; i < n ; ++i){
      if(A[i] != A[index - 2])
        A[index++] = A[i];
    }
    return index;
  }
};
```

这里直接从第三个元素开始比较，如果是允许N个重复元素，2可以改为N,代码比上个解法简洁也更具有可拓展性。

前面几道题都是删除元素，还有一类问题就是排序问题有时候也可以用Two Pointers的解法.
例题: [Sort Colors] ([https://oj.leetcode.com/problems/sort-colors/](https://link.jianshu.com/?t=https://oj.leetcode.com/problems/sort-colors/))
分析：这里有三个指针，但是实际是两个在操作，一个存red的index，一个存blue的index, 然后两边往中间走。
复杂度： 时间复杂度O(n), 空间复杂度O(1).

```cpp
class Solution {
  public:
  void sortColors(int A[], int n) {
    int j = 0, k = n-1;
    int i = 0;
    while(i < k + 1){
      if(A[i] == 0){
        int t = A[j];
        A[j] = A[i];
        A[i] = t;
        j++;
        i++;
      }else if(A[i] == 2){
        int t = A[k];
        A[k] = A[i];
        A[i] = t;
        k--;
      }else{
        i++;
      }    
    }
  }
};
```

此外这道题还有个非常巧妙的解法，利用到了partition中的原理：

```cpp
class Solution {
  public:
  void sortColors(int A[], int n) {
    int j = 0; 
    int k = 0;
    int i = 0;
    for(int m = 0; m < n ; ++m){
      if(A[m] == 2){
        A[k++] = 2;
      }else if(A[m] == 1){
        A[k++] = 2;
        A[j++] = 1;
      }else if(A[m] == 0){
        A[k++] = 2;
        A[j++] = 1;
        A[i++] = 0;
      }
    }
  }
};
```

### 雨水问题

此类问题表面上看跟双指针没有任何关系，但是经过仔细分析，会发现有很多共同之处。
例题： [Container with Most water](https://link.jianshu.com/?t=https://oj.leetcode.com/problems/container-with-most-water/)
分析：这道题可以先找几个数模拟一下，会发现如果想让容器储存的水多，需要左右两个数距离越远越好，并且两个数中较小的数值越大越好。首先考虑暴力解法，固定一边，然后找另一边越大越好，对每一个数都查找一下，就需要O(n^2).仔细研究发现，这道题是可以用双指针的，因为最后的结果被决定于左右两个数，那么怎么进行遍历呢，如果固定一边，永远希望找比这一边大的数，因此如果比这一边小可以skip掉。于是left 和right两边左右夹逼，遇到较小的数就skip掉直到重合。
复杂度： 时间复杂度O(n), 空间复杂度O(1).

```cpp
class Solution {
  public:
  int maxArea(vector<int> &height) {
    if(height.size() == 0) return 0;

    int i = 0;
    int j = height.size() -1;
    int maxA = INT_MIN;

    while(i < j){
      int area = min(height[j],height[i]) * (j-i);
      maxA = max(maxA, area);
      if(height[i] < height[j]){
        i++;
      }else {
        j--;
      }
    }

    return maxA;
  }
};
```

再来看一个类似的题目，这里container不止一个了。
题目： [Trapping Rain Water](https://link.jianshu.com/?t=https://oj.leetcode.com/problems/trapping-rain-water/)
分析：这里也是类似，对于每个柱子需要分别寻找它的左边和右边最高的柱子，这样该柱子能容纳的面积就是min(max_left, max_right) - height.因此解法自然变成了从左往右遍历，找到每个柱子左边最大值，然后从右向左遍历找到每个柱子右边最大值。最后一次遍历计算每个柱子可以容纳的面积。
复杂度：时间复杂度O(n), 空间复杂度O(n).

```cpp
class Solution {
  public:
  int trap(int A[], int n) {
    if(A == nullptr || n == 0) return 0;
    vector<int> right_height(n);
    vector<int> left_height(n);

    int height = 0, total = 0;

    for(int i = 0; i < n; ++i){
      if(A[i] > height) height = A[i];

      right_height[i] = height;
    }

    height = 0;

    for(int i = n -1; i >= 0; --i){
      if(A[i] > height) height = A[i];

      left_height[i] = height;
    }

    for(int i = 0; i < n; ++i){
      total += min(right_height[i], left_height[i]) - A[i];
    }

    return total;
  }
};
```

这道题还有一个分而治之的方法，可以先遍历一边数组找到最大值，然后在最高柱子的左边和右边分别遍历就可以计算出最后的结果。
复杂度： 时间复杂度O(n), 空间复杂度O(1).



```cpp
class Solution {
  public:
  int trap(int A[], int n) {
    if(A == nullptr || n == 0) return 0;

    int result = 0;
    int max = -1, index = 0;
    for(int i = 0; i < n ; ++i){
      if(A[i] > max){
        max = A[i];
        index = i;
      }
    }

    int left = -1;
    for(int i = 0; i < index; ++i){
      if(A[i] > left)
        left = A[i];
      else
        result += left - A[i];
    }

    int right = -1;
    for(int i = n-1; i > index; --i){
      if(A[i] > right)
        right = A[i];
      else
        result += right - A[i];
    }

    return result;
  }
};
```

### 求和问题

下面我们开始分析一下一系列关于元素求和的问题，这一系列问题特征如下，在一组任意排序数组中，寻找N个数使得它们的（积和差除）满足某一个条件，这里可以是它们经过一系列运算满足某一个值，或者求他们的最大值等等。处理此类问题的时候，首先看数组是否是有序的，根据之前的理论如果数组是无序的，那么需要额外的力使其有序，一般是排序或者hashtable来记录每个元素，复杂度会上升。然后在数组有序的情况下进行左右夹逼，找到满足条件的元素。

例题；[Two Sum](https://link.jianshu.com/?t=https://oj.leetcode.com/problems/two-sum/)
分析： 一个经典的求和问题，首先看数组是否有序， 很遗憾，没有！因此需要排序，但是注意这样复杂度就变成O(nlgn)了，有没有更好的方法，hashtable!可以保持复杂度在O(n)又可以起到排序的效果。这里注意在循环里面的判断条件，首先看target - number[i]是否在hashtable里面存在，如果存在就输出结果，如果不存在，记录当前的数进入hashtable里面。
复杂度： 时间复杂度O(n),空间复杂度O(1).



```cpp
class Solution {
  public:
  vector<int> twoSum(vector<int> &numbers, int target) {
    vector<int> answer(2,0);
    unordered_map<int, int> record;
    for(int i = 0; i < numbers.size(); ++i){
      int x = numbers[i];
      if(record.find(target - x) != record.end()){
        answer[1] = i + 1;
        answer[0] = record[target - numbers[i]];
        break;
      }
      record[numbers[i]] = i + 1;
    }
    return answer;
  }
};
```

例题： [3Sum Closest](https://link.jianshu.com/?t=https://oj.leetcode.com/problems/3sum-closest/)
分析：还是首先看是否数组是有序的，如果不是有序的就得排序，这道题涉及到三个元素（三体问题），原则上三体问题包含了一切三个元素及以上的问题，如果说两体问题可以通过一些技巧（如hashtable)解决的话，三体问题就是复杂度提高了一个台阶，一些普适于两体的技巧在三体问题这里行不通了。因此在这里首先要对数组排序， 此题涉及到三个元素，首先头尾各放一个元素，然后中间从第二个元素，左右夹逼，我们用一个gap来计算target和现在所有值的和之差，由于已经排好序，只要比较target和现在sum的值，如果target值较小，那么说明mid的值过小因此往中间靠拢，反之right的值过大因此向中间靠拢。就这样做两重遍历可以计算到最接近target的值，因为这道题只要找最接近的数因此没有3Sum那么限制条件多。
复杂度： 时间复杂度O(n^2),空间复杂度O(1).



```cpp
class Solution {
  public:
  int threeSumClosest(vector<int> &num, int target) {
    int sum = 0;
    sort(num.begin(), num.end());

    int min_gap = INT_MAX;
    for(auto start = num.begin(); start != prev(num.end(), 2); ++start){
      auto mid = next(start);
      auto last = prev(num.end(), 1);
      while(mid < last){
        int sumup = *start + *mid + *last;
        int gap = abs(target -sumup);
        if(gap < min_gap){
          min_gap = gap;
          sum = sumup;
        }

        if(sumup < target){
          mid++;
        }else{
          last--;
        }
      }
    }

    return sum;
  }
};
```

例题：[3Sum](https://link.jianshu.com/?t=https://oj.leetcode.com/problems/3sum/)
分析：这道题是标准的求和问题，方法与前面类似，但是要注意重复数的出现也就是while(b < c)里面不断夹逼如果出现近邻的元素相同的情况，需要一个while语句来移动,这样得到的最后数组一定没有重复数。还有就是a的重复情况也需要考虑。
复杂度：时间复杂度O(n^2), 空间复杂度O(1).



```dart
Solution {
  public:
  vector<vector<int> > threeSum(vector<int> &num) {
    vector<vector<int> > result;
    if(num.size() < 3) return result;
    sort(num.begin(), num.end());
    const int target = 0;

    for(auto a = 0; a < num.size()-2; ++a){
      if( a > 0 && num[a] == num[a-1]) continue;
      auto b = a + 1;
      auto c = num.size() - 1;

      while(b < c){
        if(num[a] + num[b] + num[c] < target){
          do{b++;}while(b < c&& num[b] == num[b-1]);
        }else if (num[a] + num[b] + num[c] > target){
          do{c--;}while(b < c && num[c] == num[c+1]);
        }else{
          result.push_back({num[a], num[b],num[c]});
          do{b++;} while(b < c && num[b] == num[b-1]);
          do{c--;} while(b < c && num[c] == num[c+1]);
        }
      }            
    }     
    return result;

  }
};
```

例题： [4Sum](https://link.jianshu.com/?t=https://oj.leetcode.com/problems/4sum/)
分析：如果使用上面类似的方法复杂度达到了O(N^3),有没有更省时间的方法呢？想到一共是四个数之和，自然想到可不可以两两配对，这样把问题可以简化为2Sum. 这里我们使用[multimap](https://link.jianshu.com/?t=http://www.cplusplus.com/reference/map/multimap/)来储存两个数的和，首先要弄清楚key是什么，因为不同的两个数可能有相同的和，因此key为两个数的和，value则是a pair of indexes记录两个数在数组的位置。这样遍历multimap的同时，找到另一组数使得两组数之后为target.
复杂度：时间复杂度O(N^2), 空间复杂度O(N^2).

```cpp
class Solution {
  public:
  vector<vector<int> > fourSum(vector<int> &num, int target) {
    vector<vector<int>> result;
    if (num.size() < 4) return result;
    sort(num.begin(), num.end());

    unordered_multimap<int, pair<int, int>> cache;
    for (int i = 0; i + 1 < num.size(); ++i)
      for (int j = i + 1; j < num.size(); ++j)
        cache.insert(make_pair(num[i] + num[j], make_pair(i, j)));

    for (auto i = cache.begin(); i != cache.end(); ++i) {
      int x = target - i->first;
      auto range = cache.equal_range(x);
      for (auto j = range.first; j != range.second; ++j) {
        auto a = i->second.first;
        auto b = i->second.second;
        auto c = j->second.first;
        auto d = j->second.second;
        if (a != c && a != d && b != c && b != d) {
          vector<int> vec = { num[a], num[b], num[c], num[d] };
          sort(vec.begin(), vec.end());
          result.push_back(vec);
        }
      }
    }
    sort(result.begin(), result.end());
    result.erase(unique(result.begin(), result.end()), result.end());
    return result;
  }
};
```
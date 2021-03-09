#  无权图 BFS 遍历

## 完全平方数

给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。

示例:

    输入: n = 12
    输出: 3 
    解释: 12 = 4 + 4 + 4.

来源: LeetCode第279题

## 思路

这一题其实最容易想到的思路是动态规划，我们放到后面专门来拆解。实际上用队列进行图的建模，也是可以顺利地用广度优先遍历的方式解决的。



看到这个图，你可能会有点懵，我稍微解释一下你就明白了。

在这个无权图中，每一个点指向的都是它可能经过的上一个节点。举例来说，对 5 而言，可能是 4 加上了1的平方转换而来，也可能是1 加上了2的平方转换而来，因此跟1和2都有联系，依次类推。

那么我们现在要做了就是寻找到从 n 转换到 0 最短的连线数。

举个例子， n = 8 时，我们需要找到它的邻居节点4和7，此时到达 4 和到达 7 的步数都为 1, 然后分别从 4 和 7 出发，4 找到邻居节点3和0，达到 3 和 0 的步数都为 2，考虑到此时已经到达 0，遍历终止，返回到达 0 的步数 2 即可。

Talk is cheap, show me your code. 我们接下来来一步步实现这个寻找的过程。

## 实现

接下来我们来实现第一版的代码。

    /**
     * @param {number} n
     * @return {number}
     */
    var numSquares = function(n) {
        let queue = [];
        queue.push([n, 0]);
        while(queue.length) {
            let [num, step] = queue.shift();
            for(let i = 1; ; i ++) {
                let nextNum = num - i * i;
                if(nextNum < 0) break;
                // 还差最后一步就到了，直接返回 step + 1
                if(nextNum == 0) return step + 1;
                queue.push([nextNum, step + 1]);
            }
        }
        // 最后是不需要返回另外的值的，因为 1 也是完全平方数，所有的数都能用 1 来组合
    };

这个解法从功能上来讲是没有问题的，但是其中隐藏了巨大的性能问题，你可以去LeetCode去测试一下，基本是超时。

那为什么会出现这样的问题？

出就出在这样一行代码:

    queue.push([nextNum, step + 1]);

1

只要是大于 0 的数，统统塞进队列。要知道 2 - 1 = 1， 5 - 4 = 1， 9 - 8 = 1 ......这样会重复非常多的 1, 依次类推，也会重复非常多的2,3等等等等。

这样大量的重复数字不仅仅消耗了更多的循环次数，同时也造成更加巨大的内存空间压力。

因此，我们需要对已经推入队列的数字进行标记，避免重复推入。改善代码如下:
~~~js
    var numSquares = function(n) {
        let map = new Map();
        let queue = [];
        queue.push([n, 0]);
        map.set(n, true);
        while(queue.length) {
            let [num, step] = queue.shift();
            for(let i = 1; ; i++) {
                let nextNum = num - i * i;
                if(nextNum < 0) break;
                if(nextNum == 0) return step + 1;
                // nextNum 未被访问过
                if(!map.get(nextNum)){
                    queue.push([nextNum, step + 1]);
                    // 标记已经访问过
                    map.set(nextNum, true);
                }
            }
        }
    };
~~~

## 单词接龙

给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换需遵循如下规则：

- 每次转换只能改变一个字母。
- 转换过程中的中间单词必须是字典中的单词。

说明:

1. 如果不存在这样的转换序列，返回 0。
2. 所有单词具有相同的长度。
3. 所有单词只由小写字母组成。
4. 字典中不存在重复的单词。
5. 你可以假设 beginWord 和 endWord 是非空的，且二者不相同。

示例:

    输入:
    beginWord = "hit",
    endWord = "cog",
    wordList = ["hot","dot","dog","lot","log","cog"]
    
    输出: 5
    
    解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
         返回它的长度 5。

来源: LeetCode第127题

## 思路

这一题是一个更加典型的用图建模的问题。如果每一个单词都是一个节点，那么只要和这个单词仅有一个字母不同，那么就是它的相邻节点。

这里我们可以通过 BFS 的方式来进行遍历。实现如下:

## 代码实现
~~~js
    /**
     * @param {string} beginWord
     * @param {string} endWord
     * @param {string[]} wordList
     * @return {number}
     */
    var ladderLength = function(beginWord, endWord, wordList) {
        // 两个单词在图中是否相邻
        const isSimilar = (a, b) => {
            let diff = 0
            for(let i = 0; i < a.length; i++) {
                if(a.charAt(i) !== b.charAt(i)) diff++;
                if(diff > 1) return false; 
            }
            return true;
        }
        let queue = [beginWord];
        let index = wordList.indexOf(beginWord);
        if(index !== -1) wordList.splice(index, 1);
        let res = 2;
        while(queue.length) {
            let size = queue.length;
            while(size --) {
                let front = queue.shift();
                for(let i = 0; i < wordList.length; i++) {
                    if(!isSimilar(front, wordList[i]))continue;
                    // 找到了
                    if(wordList[i] === endWord) {
                        return res;
                    }
                    else {
                        queue.push(wordList[i]);
                    }
                    // wordList[i]已经成功推入，现在不需要了，删除即可
                    // 这一步性能优化，相当关键，不然100%超时
                    wordList.splice(i, 1);
                    i --;
                }
            }
            // 步数 +1
            res += 1;
        }
        return 0;
    };
~~~


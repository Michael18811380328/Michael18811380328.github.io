# 进程和线程

### 概念

**进程（Process）和线程（Thread）**是操作系统处理任务的一个单位。进程类似于任务管理器中的程序，例如 QQ.exe 和 chrome.exe。一个进程包含一个或者多个线程，例如 word.exe 程序可以同时完成很多任务，编辑、保存、语句检查，其中每一个子任务就是一个线程。

**多进程多线程**：一个CPU可以完成一个计算，多核CPU就可以同时完成多个计算。实际上，不同进程和线程的任务在CPU上很快的切换，所以显示为多进程多线程同时处理。给单个进程分配多少资源和时间不是程序决定的，是操作系统决定的。通常有三种执行任务的模式：多线程、多进程、多线程进程，通常使用前两种。多任务的复杂度远远高度单任务。

### 前端使用

JS 通常可以理解为单线程（前端不考虑底层进程问题）。不同的任务放在主线程上依次执行（脚本语言的特征），同时可以将回调函数或者事件监听放在任务序列中处理。当主线程任务执行完后，JS 引擎会处理任务序列的其他任务。

### 服务器使用

如果服务器单进程单线程，那么遇到高并发的情况就不能很好的处理，所以使用多进程、多线程、IO多路复用等解决。进程是资源分配（内存）的最小单位，线程是程序执行的最小单位。

### 进程和线程的区别（面试题）

- 线程是最小的执行单元，进程至少由一个线程组成。
- 每启动一个进程需要开辟单独的资源，建立数据表维护代码堆栈，操作相当昂贵。不同线程间可以共享资源。所以CPU在线程间切换的开销更小，线程之间数据交换更方便。
- 线程可以使用全局变量或者静态变量做数据交换，进程需要用数据通信的方式（IPC）进行。
- 多线程程序中只要一个线程死掉整个进程就会死掉（共同内存），多进程程序中一个进程死掉不会影响其他。

>- fork is expensive. Memory is copied from the parent to the child, all descriptors are duplicated in the child, and so on. Current implementations use a technique called copy-on-write, which avoids a copy of the parent’s data space to the child until the child needs its own copy. But, regardless of this optimization, fork is expensive.
>- IPC is required to pass information between the parent and child after the fork. Passing information from the parent to the child before the fork is easy, since the child starts with a copy of the parent’s data space and with a copy of all the parent’s descriptors. But, returning information from the child to the parent takes more work.
>- Threads help with both problems. Threads are sometimes called lightweight processes since a thread is “lighter weight” than a process. That is, thread creation can be 10–100 times faster than process creation.
>- All threads within a process share the same global memory. This makes the sharing of information easy between the threads, but along with this simplicity comes the problem

摘自《Unix网络编程》



参考链接

https://www.liaoxuefeng.com/wiki/1016959663602400/1017627212385376

https://www.cnblogs.com/zhehan54/p/6130030.html
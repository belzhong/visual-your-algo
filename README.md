# visual your algo
visual your algo(下称vua)主要是用于从自定义的代码中把算法运行过程可视化地展示出来,与同类型网站[Algorithm Visualizer](https://github.com/algorithm-visualizer/algorithm-visualizer)相比，vua最大的优点在于使用简单,相比于Algorithm Visualizer需要在代码中显示地调用可视化的代码,vua自动化地记录代码的运行过程,这使得很容易把现有的代码修改为可被vua处理的代码

以[leetcode 62. Unique Paths](https://leetcode.com/problems/unique-paths/)为例来演示整个系统的用法
对于这道题可以再discuss区找到别人的[ac代码](https://leetcode.com/problems/unique-paths/discuss/934807/Two-JS-Solutions) 引用如下
```javascript
  // Bottom-Up approach
  var uniquePaths = function(m, n) {
    let dp = new Array(m).fill(0).map(() => new Array(n));
    // dp[r][c] represents the number of possible paths from row = 0, col = 0 to row = r, col = c
    for (let row = 0; row < m; row++) {
      for (let col = 0; col < n; col++) { if (row == 0 || col == 0) { // there is only one path to any point in first row or first column since robot can only move right or down
          dp[row][col] = 1;
        } else {
          dp[row][col] = dp[row-1][col] + dp[row][col-1];
        }
      }
    }
    return dp[m-1][n-1];
    // Time Complexity: O(m*n)
    // Space Complexity: O(m*n), for dp table
  };
```
为了使用vua 我们需要把
```
  let dp = new Array(m).fill(0).map(() => new Array(n));
```
这行写为vua专用的容器 在这里我们选择vuaMatrix(稍后会详细说明该容器的用法) 将代码改为
```
  let dp = new vuaMatrix(m, n, 0);
```
然后再往代码最后添加对该函数的调用
```
  uniquePaths(3, 7);
```
就完成了对从普通的代码到vua可处理代码的转换 最终代码如下
```javascript
  // Bottom-Up approach
  var uniquePaths = function(m, n) {
  let dp = new vuaMatrix(m, n, 0);
    // dp[r][c] represents the number of possible paths from row = 0, col = 0 to row = r, col = c
    for (let row = 0; row < m; row++) {
      for (let col = 0; col < n; col++) {
        if (row == 0 || col == 0) { // there is only one path to any point in first row or first column since robot can only move right or down
          dp[row][col] = 1;
        } else {
          dp[row][col] = dp[row-1][col] + dp[row][col-1];
        }
      }
    }
    return dp[m-1][n-1];
    // Time Complexity: O(m*n)
    // Space Complexity: O(m*n), for dp table
  };
  uniquePaths(3, 7);
```
以上代码就可以提交到vua网站观察效果了 运行效果如下
![demo](./public/demo.gif)

# API

## vuaVector
  vuaVector, 该容器实际上是Array类型加了代理后得到的 所以该容器可以当成Array来用 其初始化方法也和Array类型一致 但是该方法仅支持使用new初始化 这个容器以[TopK问题作为例子](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/) 我们将该题的一个[ac代码](https://xxoo521.com/2020-02-21-least-nums/)重写为以下形式
```javascript
  function partiton(arr, start, end) {
    const k = arr[start];
    let left = start + 1,
        right = end;
    while (1) {
      while (left <= end && arr[left] <= k) ++left;
      while (right >= start + 1 && arr[right] >= k) --right;

      if (left >= right) {
        break;
      }

      [arr[left], arr[right]] = [arr[right], arr[left]];
      ++left;
      --right;
    }
    [arr[right], arr[start]] = [arr[start], arr[right]];
    return right;
  }

  var getLeastNumbers = function (arr, k) {
    const length = arr.length;
    if (k >= length) return arr;
    let left = 0,
        right = length - 1;
    let index = partiton(arr, left, right);
    while (index !== k) {
      if (index < k) {
        left = index + 1;
        index = partiton(arr, left, right);
      } else if (index > k) {
        right = index - 1;
        index = partiton(arr, left, right);
      }
    }

    return arr.slice(0, k);
  };

  //###############################################################
  const data = new vuaVector(...[89, 19, 95, 40, 153, 134, 128, 182, 183, 61, 180, 62, 107, 147, 65, 108, 47, 20, 5,  7]);
  getLeastNumbers(data, 7);
  //###############################################################
```
我们仅仅添加了最后两行被#包围的两行代码 其余代码与原作者保持一致

## vuaMatrix
  vuaMatrix, 该容器的初始化方式为new vuaMatrix(numberOfRow, numberOfCol, cellValue); 与一般的二维数组使用方法类似 但是注意该容器大小在初始化的时候就定下了 不能修改行数或者列数 具体使用实例参考Unique Paths那个实例

## vuaSinglyLinkedListHead vuaSinglyLinkedListHead
  vuaSinglyLinkedListHead vuaSinglyLinkedListHead是两个单链表的相关引用类型 其原型如下
```javascript
  function vuaSinglyLinkedListHead(next = null) {
    this.next = null;
  }
  function vuaSinglyLinkedListNode(value = 0, next = null) {
    this.value = value;
    this.next = null;
  }
```

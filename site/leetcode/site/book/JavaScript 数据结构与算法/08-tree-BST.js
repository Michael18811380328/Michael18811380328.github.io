// BST： binary search tree 二叉搜索树是特殊的二叉树
// 树结构的核心就是遍历树节点，或者把字符串转化成树结构（DOM树）
// 遍历二叉树：左节点 自身 右节点

function BinarySearchTree() {
  
  let Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  this.root = null;

  this.insert = function(key) {
    let newNode = new Node(key);
    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  }

  let insertNode = function(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    }
    else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  }

  // 中序遍历
  this.inOrderTraverse = function(callback) {
    inOrderTraverseNode(root, callback);
  }
  let inOrderTraverseNode = function(root, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left);
      callback(node.key);
      inOrderTraverseNode(node.right);
    }
  }

  // 先序遍历 后续遍历
  let preOrderTraverseNode = function(root, fn) {
    if (root !== null) {
      fn(root.key);
      preOrderTraverseNode(root.left);
      preOrderTraverseNode(root.right);
    }
  }
  let postOrderTraverseNode = function(node, fn) {
    if (node.key !== null) {
      postOrderTraverseNode(node.left);
      postOrderTraverseNode(node.right);
      fn(node.key);
    }
  }

  this.min = function() {
    return minNode(root);
  }
  let minNode = function(node) {
    if (node) {
      while (node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  }

  this.max = function() {
    return maxNode(root);
  }
  let maxNode = function(node) {
    if (node) {
      while (node.right) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  }

  this.search = function(key) {
    return searchNode(root, key);
  }
  let searchNode = function(node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      searchNode(node.left, key);
    }
    else if (key > node.key) {
      searchNode(node.right, key);
    }
    else if (key === node.key) {
      return true;
    }
  }

  // remove node
  this.remove = function(key) {
    root = removeNode(root, key);
  }
  let removeNode = function(node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key);
      return node;
    }
    else if (key > node.key) {
      node.right = removeNode(node.right, key);
      return node;
    }
    else if (key === node.key) {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      }
      if (node.rigth === null) {
        node = node.right;
        return node;
      }
      let aux = findMinNode(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right, aux.key);
      return node;
    }
  }
}

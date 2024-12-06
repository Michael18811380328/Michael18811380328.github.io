let initializeColor = function() {
  let color = [];
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = 'white';
  }
}

let BFS = function(v) {
  let color = initializeColor();
  let queue = new Queue();
  let d = []; // 存放不同节点的路径
  let pred = []; // 存放前一个节点，用来计算最短距离
  
  queue.enqueue(v);
  
  // 初始化全部的路径距离是0，前一个节点是空
  for (let i = 0; i < vertices.length; i++) {
    d[vertices[i]] = 0;
    pred[vertices[i]] = null;
  }
  
  while (!queue.isEmpty()) {
    let u = queue.dequeue();
    let neighbors = adjList.get(u);
    color[u] = 'grey';
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if (color[w] === 'white') {
        color[w] = 'grey';
        // 路径增加，设置前一个节点为父节点
        d[w] = d[u] + 1;
        pred[w] = u;
        queue.enqueue(w);
      }
    }
    color[u] = 'black';
  }
  return {
    distances: d,
    predecessors: pred,
  };
};

let BFS = (v) => {
  let color = initializeColor();
  let queue = new Queue();
  let d = [];
  let pred = [];

  queue.enqueue(v);
  for (let i = 0; i < vertices.length; i++) {
    d[vertices[i]] = 0;
    pred[vertices[i]] = null;
  }

  while (!queue.isEmpty()) {
    let u = queue.dequeue();
    let neighbors = adjList.get(u);
    color[u] = 'grey';
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if (color[w] === 'white') {
        color[w] = 'grey';
        d[w] = d[u] + 1;
        pred[w] = u;
        queue.enqueue(w);
      }
    }
    color[u] = 'black';
  }
  return {
    distances: d,
    predecessors: pred,
  };
};

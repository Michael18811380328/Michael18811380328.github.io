function Graph() {
  let vertices = [];
  let adjList = new Dictionary();

  this.addVertex = function(point) {
    vertices.push(point);
    adjList.set(point, []);
  },

  this.addEdge = function(point, point2) {
    addList.get(point).push(point2);
    addList.get(point2).push(point);
  },

  this.toString = function() {
    let s = '';
    for (let i = 0; i < vertices.length; i++) {
      s += vertices[i] + ' ';
      let neighbors = adjList.get(vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += neighbors[j];
      }
      s += '\n';
    }
    return s;
  }

  // BFS 广度优先算法遍历图
  let initializeColor = function() {
    let color = [];
    for (let i = 0; i < vertices.length ; i++) {
      color[vertices[i]] = 'white';
    }
    return color;
  }

  this.bfs = function(v, callback) {
    let color = initializeColor();
    let queue = new Queue();
    queue.enqueue(v);

    while (!queue.isEmpty()) {
      let u = queue.dequeue();
      let neighbors = adjList.get(u);
      color[u] = 'grey';
      for (let i = 0; i < neighbors.length; i++) {
        let w = neighbors[i];
        if (color[w] === 'white') {
          color[w] === 'grey';
          queue.enqueue(w);
        }
      }
      color[u] = 'black';
      callback(u);
    }
  }

  this.BFS = function(v) {
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
  }

  // dfs 深度优先算法
  this.des = function(callback) {
    let color = initializeColor();
    for (let i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        dfsVisit(vertices[i], color, callback);
      }
    }
  }
  this.dfsVisit = function(u, color, callback) {
    color[u] = 'grey';
    if (callback) {
      callback(u);
    }
    let neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if (color[w] === 'white') {
        dfsVisit(w, color, callback);
      }
    }
    color[u] = 'black';
  }

  let time;
  this.DFS = function() {
    let color = initializeColor();
    time = 0;
    let discovery = [];
    let finished = [];
    let predecessors = [];
    for (let i = 0; i < vertices.length; i++) {
      discovery[vertices[i]] = 0;
      finished[vertices[i]] = 0;
      predecessors[vertices[i]] = 0;
    }
    for (let i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        dfsVisit(vertices[i], color, discovery, finished, predecessors)
      }
    }
    return { discovery, finished, predecessors };
  }

  dfsVisit = (u, color, d, f, p) => {
    color[u] = 'grey';
    d[u] = ++time;
    let neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if (color[w] === 'white') {
        dfsVisit(w, color, d, f, p);
        p[w] = u;
      }
      color[u] = 'black';
      f[u] = ++time;
    }
  }
}

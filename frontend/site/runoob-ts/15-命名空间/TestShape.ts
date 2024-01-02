/// <reference path="IShape.ts" />
/// <reference path="Circle.ts" />
/// <reference path="Triangle.ts" />

function drawAll(shape:Draw.Shape) {
  shape.draw();
}

drawAll(new Draw.Circle());
drawAll(new Draw.Triangle());
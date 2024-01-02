/// <reference path = "IShape.ts" /> 
var Draw;
(function (Draw) {
    var Circle = /** @class */ (function () {
        function Circle() {
        }
        Circle.prototype.draw = function () {
            console.log('circle');
        };
        return Circle;
    }());
    Draw.Circle = Circle;
})(Draw || (Draw = {}));
/// <reference path='IShape.ts' />
var Draw;
(function (Draw) {
    var Triangle = /** @class */ (function () {
        function Triangle() {
        }
        Triangle.prototype.draw = function () {
            console.log('triangle');
        };
        return Triangle;
    }());
    Draw.Triangle = Triangle;
})(Draw || (Draw = {}));
/// <reference path="IShape.ts" />
/// <reference path="Circle.ts" />
/// <reference path="Triangle.ts" />
function drawAll(shape) {
    shape.draw();
}
drawAll(new Draw.Circle());
drawAll(new Draw.Triangle());

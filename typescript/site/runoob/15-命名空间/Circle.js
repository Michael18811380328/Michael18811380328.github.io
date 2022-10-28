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

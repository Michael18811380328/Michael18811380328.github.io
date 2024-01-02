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

/// <reference path = "IShape.ts" /> 
namespace Draw {
  export class Circle implements Shape {
    public draw() {
      console.log('circle');
    }
  }
}
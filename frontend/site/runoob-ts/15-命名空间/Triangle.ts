/// <reference path='IShape.ts' />
namespace Draw {
  export class Triangle implements Shape {
    public draw() {
      console.log('triangle');
    }
  }
}
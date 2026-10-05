abstract class Shape {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  abstract area(): number;

  showInfo(): void {
    console.log(this.name + " พื้นที่ = " + this.area().toFixed(2));
  }
}

class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super("สี่เหลี่ยม"); 
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super("วงกลม");
    this.radius = radius;
  }

  area(): number {
    return 3.14 * this.radius * this.radius;
  }
}
const r = new Rectangle(4, 5);
const c = new Circle(3);
r.showInfo(); 
c.showInfo(); 

export {};
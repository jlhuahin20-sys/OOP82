interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Duck implements Flyable, Swimmable {
  fly(): void {
    console.log("เป็ดบินได้");
  }
  swim(): void {
    console.log("เป็ดว่ายน้ำได้");
  }
}

class Fish implements Swimmable {
  swim(): void {
    console.log("ปลาว่ายน้ำได้");
  }
}
function letSwim(x: Swimmable): void {
  x.swim();
}
letSwim(new Duck());
letSwim(new Fish());
interface Student {
  id: string;
  name: string;
  gpa?: number; 
}

const s1: Student = { id: "66001", name: "สมชาย" };
const s2: Student = { id: "66002", name: "สมหญิง", gpa: 3.5 };
console.log(s1.name, s2.gpa);

export {};
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak(): void {
    console.log(this.name + " ส่งเสียง");
  }
}

class Dog extends Animal {
  speak(): void {
    console.log(this.name + ": โฮ่ง โฮ่ง");
  }
}
class Cat extends Animal {
  speak(): void {
    console.log(this.name + ": เมี๊ยว");
  }
}
const animals: Animal[] = [new Dog("ตูบ"), new Cat("มีมี่"), new Animal("สัตว์ทั่วไป")];

for (const a of animals) {
  a.speak(); 
}
interface Payment {
  pay(amount: number): void;
}
class Cash implements Payment {
  pay(amount: number): void {
    console.log("จ่ายเงินสด " + amount + " บาท");
  }
}

class CreditCard implements Payment {
  pay(amount: number): void {
    console.log("รูดบัตรเครดิต " + amount + " บาท");
  }
}
function checkout(p: Payment, amount: number): void {
  p.pay(amount); 
}

checkout(new Cash(), 100);
checkout(new CreditCard(), 250);
for (const a of animals) {
  if (a instanceof Dog) {
    console.log(a.name + " เป็นหมา");
  }
}
export {};
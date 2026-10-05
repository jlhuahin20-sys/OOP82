class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat(): void {
    console.log(this.name + " กำลังกิน");
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(this.name + ": โฮ่ง");
  }
}

const dog = new Dog("ตูบ");
dog.eat(); 
dog.bark(); 
class Course {
  title: string;
  students: Student[] = [];
  constructor(title: string) {
    this.title = title;
  }
}
class Student {
  name: string;
  courses: Course[] = [];
  constructor(name: string) {
    this.name = name;
  }
  enroll(course: Course): void {
    this.courses.push(course);
    course.students.push(this);
  }
}

const oop = new Course("OOP");
const mana = new Student("มานะ");
const manee = new Student("มานี");
mana.enroll(oop);
manee.enroll(oop);
console.log(oop.title + " มีนักศึกษา " + oop.students.length + " คน");

class Teacher {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Department {
  teachers: Teacher[] = [];
  addTeacher(t: Teacher): void {
    this.teachers.push(t);
  }
}

const t1 = new Teacher("อ.สมศรี");
const dept = new Department();
dept.addTeacher(t1);
console.log("ภาควิชามีอาจารย์ " + dept.teachers.length + " คน");

class Room {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class House {
  rooms: Room[] = [];
  constructor() {
    this.rooms.push(new Room("ห้องนอน")); 
    this.rooms.push(new Room("ห้องครัว"));
  }
}

const house = new House();
console.log("บ้านมี " + house.rooms.length + " ห้อง");

export {};
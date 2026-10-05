class BankAccount {
  private owner: string;
  private balance: number; 
  constructor(owner: string) {
    this.owner = owner;
    this.balance = 0;
  }
  getOwner(): string {
    return this.owner;
  }
  getBalance(): number {
    return this.balance;
  }
  deposit(amount: number): boolean {
    if (amount <= 0) {
      return false; // ตรวจสอบข้อมูลก่อนเสมอ
    }
    this.balance += amount;
    return true;
  }
  withdraw(amount: number): boolean {
    if (amount <= 0 || amount > this.balance) {
      return false; // ถอนเกินยอดไม่ได้
    }
    this.balance -= amount;
    return true;
  }
}

const acc = new BankAccount("สมชาย");
acc.deposit(1000);
console.log("ถอน 1500:", acc.withdraw(1500));
console.log("ถอน 300:", acc.withdraw(300)); 
console.log("ยอดคงเหลือ:", acc.getBalance());
class Student {
  name: string;
  score: number;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }
}
class StudentPrinter {
  print(s: Student): void {
    console.log(s.name + " ได้ " + s.score + " คะแนน");
  }
}

new StudentPrinter().print(new Student("มานะ", 85));

export {};
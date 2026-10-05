export class student {
    constructor(private id:number ,private fullname:string ,private studentCode: string,private gpa: number){}

    public getId():number {return this.id};
    public getFullName():string {return this.fullname};
    public getStudentCode():string {return this.studentCode};
    public getGpa():number {return this.gpa};



    public getInfo(): string    {
        return `User: ${this.id} ${this.id} ${this.fullname} ${this.studentCode} ${this.gpa}`
    }
}
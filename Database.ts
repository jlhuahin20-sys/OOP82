export class User {
    constructor(private id:number ,private name:string , private email:string){}

    public getId():number {return this.id};
    public getName():string {return this.name};
    public getEmail():string {return this.email};

    public getInfo(): string    {
        return `User: ${this.id} ${this.name} ${this.email}`
    }
}
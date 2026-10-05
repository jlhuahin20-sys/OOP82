export class Product {
    constructor(
        private id: number,
        private name: string,
        private price: number,
        private stock: number
    ) {}

    public getId(): number { return this.id; }
    public getName(): string { return this.name; }
    public getPrice(): number { return this.price; }
    public getStock(): number { return this.stock; }

    public getInfo(): string {
        return `Product: ${this.id} ${this.name} ${this.price} ${this.stock}`;
    }
}
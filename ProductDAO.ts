import { Order } from "./Inventory";
import { Product } from "./Inventory"; 
import { ProductDAO } from "./ProductDAO";
import { BaseDAO } from "./baseDAO";
export class OrderDAO extends BaseDAO {
    private productDAO: ProductDAO;

    constructor() {
        super();
        this.productDAO = new ProductDAO();
    }

    protected initTable(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                productName TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                totalPrice REAL NOT NULL
            )
        `);
    }

    public createOrder(product: Product, quantity: number): boolean {
        const targetProduct = this.productDAO.findProductById(product.getId());

        if (!targetProduct) {
            console.log("Error: Product not found");
            return false;
        }
        if (targetProduct.getStock() < quantity) {
            
            console.log(`Error: Insufficient Stock (Available: ${targetProduct.getStock()}, Requested: ${quantity})`);
            return false;
        }
        const totalPrice = targetProduct.getPrice() * quantity;
        const stmt = this.db.prepare(`
            INSERT INTO orders (productName, quantity, totalPrice) VALUES (?, ?, ?)
        `);
        const result = stmt.run(targetProduct.getName(), quantity, totalPrice);

        if (result.changes > 0) {
            const newStock = targetProduct.getStock() - quantity;
            this.productDAO.updateStock(targetProduct.getId(), newStock);

            console.log("Order created successfully!");
            return true;
        }

        return false;
    }
}
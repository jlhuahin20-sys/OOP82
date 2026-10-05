import { ProductDAO } from "./ProductDAO";
import { OrderDAO } from "./OrderDAO";

const productDAO = new ProductDAO();
const orderDAO = new OrderDAO();

productDAO.addProduct("Laptop", 30000, 5);

const product = productDAO.findProductById(1);
if (product) {
    orderDAO.createOrder(product, 2);
    orderDAO.createOrder(product, 10);
}

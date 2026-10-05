import Database from "better-sqlite3";
class Book {
  private id: number;
  private isbn: string;
  private title: string;
  private author: string;
  private isAvailable: boolean;

  constructor(id: number, isbn: string, title: string, author: string, isAvailable: boolean) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
  }

  getId(): number { return this.id; }
  setId(id: number): void { this.id = id; }

  getIsbn(): string { return this.isbn; }
  setIsbn(isbn: string): void { this.isbn = isbn; }

  getTitle(): string { return this.title; }
  setTitle(title: string): void { this.title = title; }

  getAuthor(): string { return this.author; }
  setAuthor(author: string): void { this.author = author; }

  getIsAvailable(): boolean { return this.isAvailable; }
  setIsAvailable(isAvailable: boolean): void { this.isAvailable = isAvailable; }
  getInfo(): string {
    const status = this.isAvailable ? "Available" : "Borrowed";
    return "[" + this.isbn + "] " + this.title + " by " + this.author + " - Status: " + status;
  }
}
class BorrowRecord {
  private id: number;
  private borrowerName: string;
  private bookIsbn: string;
  private borrowDate: string;

  constructor(id: number, borrowerName: string, bookIsbn: string, borrowDate: string) {
    this.id = id;
    this.borrowerName = borrowerName;
    this.bookIsbn = bookIsbn;
    this.borrowDate = borrowDate;
  }

  getId(): number { return this.id; }
  setId(id: number): void { this.id = id; }

  getBorrowerName(): string { return this.borrowerName; }
  setBorrowerName(name: string): void { this.borrowerName = name; }

  getBookIsbn(): string { return this.bookIsbn; }
  setBookIsbn(isbn: string): void { this.bookIsbn = isbn; }

  getBorrowDate(): string { return this.borrowDate; }
  setBorrowDate(date: string): void { this.borrowDate = date; }
}
abstract class BaseDAO {
  protected db: Database.Database;
  constructor(db: Database.Database) {
    this.db = db;
  }
  abstract initTable(): void; 
}
interface BookRow {
  id: number;
  isbn: string;
  title: string;
  author: string;
  isAvailable: number;
}

class BookDAO extends BaseDAO {
  constructor(db: Database.Database) {
    super(db);
    this.initTable();
  }

  initTable(): void {
    this.db.exec(
      "CREATE TABLE IF NOT EXISTS books (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "isbn TEXT UNIQUE NOT NULL, " +
        "title TEXT NOT NULL, " +
        "author TEXT NOT NULL, " +
        "isAvailable INTEGER NOT NULL DEFAULT 1)"
    );
  }
  private toBook(row: BookRow): Book {
    return new Book(row.id, row.isbn, row.title, row.author, row.isAvailable === 1);
  }

  addBook(isbn: string, title: string, author: string): boolean {
    try {
      this.db
        .prepare("INSERT INTO books (isbn, title, author, isAvailable) VALUES (?, ?, ?, 1)")
        .run(isbn, title, author);
      return true;
    } catch (e) {
      return false; 
    }
  }

  findBookByIsbn(isbn: string): Book | null {
    const row = this.db.prepare("SELECT * FROM books WHERE isbn = ?").get(isbn) as BookRow | undefined;
    if (row === undefined) {
      return null;
    }
    return this.toBook(row);
  }

  updateAvailability(isbn: string, isAvailable: boolean): boolean {
    const value = isAvailable ? 1 : 0; 
    const result = this.db.prepare("UPDATE books SET isAvailable = ? WHERE isbn = ?").run(value, isbn);
    return result.changes > 0; 
  }

  findAll(): Book[] {
    const rows = this.db.prepare("SELECT * FROM books").all() as BookRow[];
    return rows.map((row) => this.toBook(row));
  }
}

class BorrowRecordDAO extends BaseDAO {
  private bookDAO: BookDAO;

  constructor(db: Database.Database, bookDAO: BookDAO) {
    super(db);
    this.bookDAO = bookDAO;
    this.initTable();
  }

  initTable(): void {
    this.db.exec(
      "CREATE TABLE IF NOT EXISTS borrow_records (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "borrowerName TEXT NOT NULL, " +
        "bookIsbn TEXT NOT NULL, " +
        "borrowDate TEXT NOT NULL)"
    );
  }
  borrowBook(borrowerName: string, isbn: string): boolean {
    const book = this.bookDAO.findBookByIsbn(isbn);
    if (book === null) {
      return false;
    }
    if (book.getIsAvailable() === false) {
      return false;
    }
    const doBorrow = this.db.transaction(() => {
      this.db
        .prepare("INSERT INTO borrow_records (borrowerName, bookIsbn, borrowDate) VALUES (?, ?, ?)")
        .run(borrowerName, isbn, new Date().toISOString());
      this.bookDAO.updateAvailability(isbn, false);
    });
    doBorrow();

    return true;
  }
}
const db = new Database("library.db");
const bookDAO = new BookDAO(db);
const borrowDAO = new BorrowRecordDAO(db, bookDAO);

bookDAO.addBook("ISBN-101", "Clean Code", "Robert C. Martin");
bookDAO.addBook("ISBN-102", "Refactoring", "Martin Fowler");
console.log("เพิ่มซ้ำ:", bookDAO.addBook("ISBN-101", "Clean Code", "Robert C. Martin")); 

console.log("--- ก่อนยืม ---");
bookDAO.findAll().forEach((b) => console.log(b.getInfo()));

console.log("สมชายยืม ISBN-101:", borrowDAO.borrowBook("สมชาย", "ISBN-101")); 
console.log("สมหญิงยืม ISBN-101:", borrowDAO.borrowBook("สมหญิง", "ISBN-101")); 
console.log("สมหญิงยืม ISBN-999:", borrowDAO.borrowBook("สมหญิง", "ISBN-999")); 

console.log("--- หลังยืม ---");
bookDAO.findAll().forEach((b) => console.log(b.getInfo()));

db.close();
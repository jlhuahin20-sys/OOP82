import { User } from "./Database";
import { BaseDAO } from "./baseDAO";

export class UserDAO extends BaseDAO {

    protected initTable(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            )
        `);
    }

    public insert(name: string, email: string): boolean {
        const stmt = this.db.prepare(`
            INSERT INTO user (name, email)
            VALUES (?, ?)
        `);

        const result = stmt.run(name, email);

        return result.changes > 0;
    }

    public findAll(): User[] {
        const stmt = this.db.prepare(`
            SELECT * FROM user
        `);

        const rows = stmt.all() as {
            id: number;
            name: string;
            email: string;
        }[];

        return rows.map(
            row => new User(
                row.id,
                row.name,
                row.email
            )
        );
    }
}
import { student } from "./DataModel1";
import { BaseDAO } from "./baseDAO";

export class StudentDAO extends BaseDAO {

    protected initTable(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                studentcode TEXT NOT NULL UNIQUE,
                fullname TEXT NOT NULL,
                gpa REAL NOT NULL
            )
        `);
    }

    public insert(studentCode: string, fullname: string, gpa: number): boolean {
        const stmt = this.db.prepare(`
            INSERT INTO students (studentcode, fullname, gpa)
            VALUES (?, ?, ?)
        `);

        const result = stmt.run(studentCode, fullname, gpa);
        return result.changes > 0;
    }

    public findAll(): student[] {
        const stmt = this.db.prepare(`
            SELECT * FROM students
        `);

        const rows = stmt.all() as {
            id: number;
            studentcode: string;
            fullname: string;
            gpa: number;
        }[];

        return rows.map(
            row => new student(
                row.id,
                row.studentcode,
                row.fullname,
                row.gpa
            )
        );
    }
}
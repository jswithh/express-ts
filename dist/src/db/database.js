import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
export const db = drizzle(mysql.createPool({
    host: process.env['DATABASE_HOST'],
    user: process.env['DATABASE_USERNAME'],
    database: process.env['DATABASE_NAME'],
    password: process.env['DATABASE_PASSWORD'],
}));
//# sourceMappingURL=database.js.map
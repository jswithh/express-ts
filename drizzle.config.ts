import 'dotenv/config';

import type { Config } from 'drizzle-kit';

const DB_HOST = process.env['DATABASE_HOST'] || 'localhost';
const DB_USER = process.env['DATABASE_USERNAME'] || 'user';
const DB_NAME = process.env['DATABASE_NAME'] || 'drizzle';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    port: 3306,
  },
} satisfies Config;

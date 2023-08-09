"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.users = (0, mysql_core_1.mysqlTable)('users', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    email: (0, mysql_core_1.varchar)('email', { length: 255 }).notNull(),
    password: (0, mysql_core_1.varchar)('password', { length: 255 }).notNull(),
    role: (0, mysql_core_1.mysqlEnum)('role', ['admin', 'user']).notNull().default('user'),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().notNull(),
}, (users) => ({
    emailIndex: (0, mysql_core_1.uniqueIndex)('email_idx').on(users.email),
}));
//# sourceMappingURL=users.js.map
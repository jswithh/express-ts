import bcrypt from 'bcryptjs';
import { db } from '../../db/database';
import { users } from '../../db/schema';
import { desc, eq } from 'drizzle-orm';
export class UsersService {
    async getAll(page, limit) {
        if (page <= 0 || limit <= 0) {
            throw new Error('Invalid page or limit value');
        }
        const offset = (page - 1) * limit;
        const pageUser = await db
            .select({
            id: users.id,
            name: users.name,
            email: users.email,
        })
            .from(users)
            .orderBy(desc(users.id))
            .limit(limit)
            .offset(offset);
        return pageUser;
    }
    async create(createUserDto) {
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, createUserDto.email));
        if (existingUser.length > 0) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = {
            ...createUserDto,
            password: hashedPassword,
        };
        await db.insert(users).values(newUser);
        return 'User created successfully!';
    }
    async show(id) {
        const user = await db
            .select({
            id: users.id,
            name: users.name,
            email: users.email,
        })
            .from(users)
            .where(eq(users.id, id));
        return user[0];
    }
    async update(id, updateUserDto) {
        await db.update(users).set(updateUserDto).where(eq(users.id, id));
        return 'User updated successfully!';
    }
    async delete(id) {
        await db.delete(users).where(eq(users.id, id));
        return 'User deleted successfully!';
    }
}
//# sourceMappingURL=users.service.js.map
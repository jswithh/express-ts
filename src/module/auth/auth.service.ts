import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/jwt';
import { users } from '../../db/schema';
import { db } from '../../db/database';
import { eq } from 'drizzle-orm';
export class AuthService {
  async login(loginDto: LoginDto) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, loginDto.email));

    if (user.length === 0) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user[0].password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      },
      config.jwt.secret!,
      {
        expiresIn: '24h',
        audience: config.jwt.audience,
        issuer: config.jwt.issuer,
      },
    );

    return token;
  }
}

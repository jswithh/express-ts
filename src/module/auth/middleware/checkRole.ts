import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from './checkAuth';
import { db } from '../../../db/database';
import { users } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as CustomRequest).token.payload.id;

    const user = await db.select().from(users).where(eq(users.id, userId));

    if (!user) {
      res.status(401).type('json').send('{"message": "Unauthorized"}');
      return;
    }
    if (roles.includes(user[0].role)) {
      next();
    } else {
      res.status(403).json({ message: 'Not enough permissions' });
      return;
    }
  };
};

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../config/jwt';
export interface CustomRequest extends Request {
  token: jwt.JwtPayload;
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  // Get the JWT from the request header.
  const token = <string>req.headers['authorization'];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token?.split(' ')[1], config.jwt.secret!, {
      complete: true,
      audience: config.jwt.audience,
      issuer: config.jwt.issuer,
      algorithms: ['HS256'],
      clockTolerance: 0,
      ignoreExpiration: false,
      ignoreNotBefore: false,
    });
    // Add the payload to the request so controllers may access it.
    (req as CustomRequest).token = jwtPayload;
  } catch (error) {
    res.status(401).type('json').send('{"message": "Unauthorized"}');
    return;
  }

  next();
};

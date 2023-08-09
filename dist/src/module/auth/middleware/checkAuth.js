import jwt from 'jsonwebtoken';
import config from '../../../config/jwt';
export const checkAuth = (req, res, next) => {
    // Get the JWT from the request header.
    const token = req.headers['authorization'];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token?.split(' ')[1], config.jwt.secret, {
            complete: true,
            audience: config.jwt.audience,
            issuer: config.jwt.issuer,
            algorithms: ['HS256'],
            clockTolerance: 0,
            ignoreExpiration: false,
            ignoreNotBefore: false,
        });
        // Add the payload to the request so controllers may access it.
        req.token = jwtPayload;
    }
    catch (error) {
        res.status(401).type('json').send('{"message": "Unauthorized"}');
        return;
    }
    next();
};
//# sourceMappingURL=checkAuth.js.map
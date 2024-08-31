import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    try {
        const result = jwt.verify(token, 'secret');
        req.user = result;
    } catch (err) {
        console.log(err)
        return res.sendStatus(401);
    }

    next();
}
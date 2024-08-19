import { Request, Response, NextFunction } from "express";

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) { res.status(401).send({ message: 'Auth header not provided or invalid' }) } 
    else {
        const token = authHeader.split(' ')[1];
        
        const [login, password] = atob(token).split(':');
        
        if (login === 'admin' && password === '12345') next();
        
        else {
            res.status(401).send({ message: 'Login or password are invalid' })
        }
    }
}
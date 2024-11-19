import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authentication (req: Request, res: Response, next: NextFunction): any {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = (authHeader || '').split(' ')[1]; // Extract the token (Assumes "Bearer <token>" format)

    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

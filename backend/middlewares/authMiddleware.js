import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const requireAuth = (req, res, next) => {


    const header = req.headers.authorization;
    const token = header && header.split(' ')[1]; // delete Bearer

    if (!token) {
        return res.status(401).json({ message: 'Aucun token fourni' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};
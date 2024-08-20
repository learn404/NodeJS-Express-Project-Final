import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function register(req, res) {
    const { email, password, username, name } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (user) {
        return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            username: username,
            name: name,
        },
    });
    res.status(201).json({ message: 'Inscription réussie' });
}



export async function login(req, res) {
    const { email, password } = req.body;

    console.log(email, password);
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!user) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    const token = jwt.sign({ id: user.id , username: user.username}, process.env.SECRET_KEY
        , { expiresIn: '1h' }
    );
    res.status(200).json({ token });
}
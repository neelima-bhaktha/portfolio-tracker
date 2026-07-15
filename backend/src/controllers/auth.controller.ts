import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);

        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const password_hash = await bcrypt.hash(password, 10);
        const user = userRepository.create({ email, password_hash });
        await userRepository.save(user);

        const { accessToken, refreshToken } = generateTokens(user.id);
        
        // In a real app, refresh token would be set as HttpOnly cookie
        return res.status(201).json({ user: { id: user.id, email: user.email }, accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error during registration' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = generateTokens(user.id);
        return res.status(200).json({ user: { id: user.id, email: user.email }, accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error during login' });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: 'Refresh token required' });

    try {
        const decoded: any = verifyRefreshToken(token);
        const tokens = generateTokens(decoded.userId);
        return res.status(200).json(tokens);
    } catch (error) {
        return res.status(403).json({ error: 'Invalid refresh token' });
    }
};

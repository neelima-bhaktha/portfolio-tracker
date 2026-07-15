import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_dev_only';
const JWT_EXPIRES_IN = '15m';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'superrefreshsecret_dev_only';
const REFRESH_EXPIRES_IN = '7d';

export const generateTokens = (userId: string) => {
    const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
    return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_SECRET);
};

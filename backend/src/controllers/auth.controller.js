"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        const password_hash = await bcrypt_1.default.hash(password, 10);
        const user = userRepository.create({ email, password_hash });
        await userRepository.save(user);
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(user.id);
        // In a real app, refresh token would be set as HttpOnly cookie
        return res.status(201).json({ user: { id: user.id, email: user.email }, accessToken, refreshToken });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error during registration' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(user.id);
        return res.status(200).json({ user: { id: user.id, email: user.email }, accessToken, refreshToken });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error during login' });
    }
};
exports.login = login;
const refreshToken = async (req, res) => {
    const { token } = req.body;
    if (!token)
        return res.status(401).json({ error: 'Refresh token required' });
    try {
        const decoded = (0, jwt_1.verifyRefreshToken)(token);
        const tokens = (0, jwt_1.generateTokens)(decoded.userId);
        return res.status(200).json(tokens);
    }
    catch (error) {
        return res.status(403).json({ error: 'Invalid refresh token' });
    }
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=auth.controller.js.map
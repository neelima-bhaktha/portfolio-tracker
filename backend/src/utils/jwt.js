"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_dev_only';
const JWT_EXPIRES_IN = '15m';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'superrefreshsecret_dev_only';
const REFRESH_EXPIRES_IN = '7d';
const generateTokens = (userId) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jsonwebtoken_1.default.sign({ userId }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=jwt.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwt_1 = require("../utils/jwt");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Access token missing' });
        return;
    }
    try {
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ error: 'Invalid or expired token' });
        return;
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.middleware.js.map
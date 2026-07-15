"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Basic health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const portfolio_routes_1 = __importDefault(require("./routes/portfolio.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const marketData_routes_1 = __importDefault(require("./routes/marketData.routes"));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/portfolios', portfolio_routes_1.default);
app.use('/api/transactions', transaction_routes_1.default);
app.use('/api/market', marketData_routes_1.default);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
});
exports.default = app;
//# sourceMappingURL=app.js.map
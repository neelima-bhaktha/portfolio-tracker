"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marketData_controller_1 = require("../controllers/marketData.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken); // Can be public or protected, protecting to prevent abuse
router.get('/quote/:symbol', marketData_controller_1.getStockQuote);
router.get('/search', marketData_controller_1.searchStockSymbols);
exports.default = router;
//# sourceMappingURL=marketData.routes.js.map
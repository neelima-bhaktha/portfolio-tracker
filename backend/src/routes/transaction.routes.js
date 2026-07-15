"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken);
router.post('/', transaction_controller_1.addTransaction);
router.get('/:portfolio_id', transaction_controller_1.getTransactions);
exports.default = router;
//# sourceMappingURL=transaction.routes.js.map
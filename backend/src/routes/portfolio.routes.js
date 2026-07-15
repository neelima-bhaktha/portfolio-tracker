"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolio_controller_1 = require("../controllers/portfolio.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken); // Protect all portfolio routes
router.post('/', portfolio_controller_1.createPortfolio);
router.get('/', portfolio_controller_1.getPortfolios);
router.get('/:id', portfolio_controller_1.getPortfolioById);
router.delete('/:id', portfolio_controller_1.deletePortfolio);
exports.default = router;
//# sourceMappingURL=portfolio.routes.js.map
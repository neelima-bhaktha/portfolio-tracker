"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.addTransaction = void 0;
const data_source_1 = require("../config/data-source");
const Transaction_1 = require("../entities/Transaction");
const Asset_1 = require("../entities/Asset");
const Portfolio_1 = require("../entities/Portfolio");
const addTransaction = async (req, res) => {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const { portfolio_id, ticker_symbol, quantity, price_per_share, type } = req.body;
        // Verify portfolio belongs to user
        const portfolio = await queryRunner.manager.findOne(Portfolio_1.Portfolio, { where: { id: portfolio_id, user_id: req.user.userId } });
        if (!portfolio) {
            await queryRunner.rollbackTransaction();
            return res.status(404).json({ error: 'Portfolio not found' });
        }
        // Create transaction record
        const transaction = queryRunner.manager.create(Transaction_1.Transaction, {
            portfolio_id,
            user_id: req.user.userId,
            ticker_symbol: ticker_symbol.toUpperCase(),
            quantity,
            price_per_share,
            type
        });
        await queryRunner.manager.save(transaction);
        // Update or create Asset record
        let asset = await queryRunner.manager.findOne(Asset_1.Asset, { where: { portfolio_id, ticker_symbol: ticker_symbol.toUpperCase() } });
        const txQuantity = Number(quantity);
        const txPrice = Number(price_per_share);
        if (!asset) {
            if (type === 'sell') {
                await queryRunner.rollbackTransaction();
                return res.status(400).json({ error: 'Cannot sell an asset you do not own' });
            }
            asset = queryRunner.manager.create(Asset_1.Asset, {
                portfolio_id,
                ticker_symbol: ticker_symbol.toUpperCase(),
                total_quantity: txQuantity,
                average_purchase_price: txPrice
            });
        }
        else {
            let currentQuantity = Number(asset.total_quantity);
            let currentAvgPrice = Number(asset.average_purchase_price);
            if (type === 'buy') {
                const totalCost = (currentQuantity * currentAvgPrice) + (txQuantity * txPrice);
                const newQuantity = currentQuantity + txQuantity;
                asset.total_quantity = newQuantity;
                asset.average_purchase_price = totalCost / newQuantity;
            }
            else if (type === 'sell') {
                if (currentQuantity < txQuantity) {
                    await queryRunner.rollbackTransaction();
                    return res.status(400).json({ error: 'Insufficient quantity to sell' });
                }
                asset.total_quantity = currentQuantity - txQuantity;
                // Average purchase price does not change on sell
            }
        }
        await queryRunner.manager.save(asset);
        await queryRunner.commitTransaction();
        return res.status(201).json(transaction);
    }
    catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("Transaction Error: ", error);
        return res.status(500).json({ error: 'Error processing transaction' });
    }
    finally {
        await queryRunner.release();
    }
};
exports.addTransaction = addTransaction;
const getTransactions = async (req, res) => {
    try {
        const { portfolio_id } = req.params;
        const transactionRepo = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
        const transactions = await transactionRepo.find({
            where: { portfolio_id: portfolio_id, user_id: req.user.userId },
            order: { transaction_date: 'DESC' }
        });
        return res.status(200).json(transactions);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error fetching transactions' });
    }
};
exports.getTransactions = getTransactions;
//# sourceMappingURL=transaction.controller.js.map
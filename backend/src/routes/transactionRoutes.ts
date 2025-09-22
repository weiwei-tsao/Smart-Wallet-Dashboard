import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';

const router = Router();
const transactionController = new TransactionController();

// GET /api/transactions?address=0x...&page=1&limit=20
router.get('/', transactionController.getTransactions.bind(transactionController));

// GET /api/transactions/:hash
router.get('/:hash', transactionController.getTransactionByHash.bind(transactionController));

export default router;

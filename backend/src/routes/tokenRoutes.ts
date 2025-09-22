import { Router } from 'express';
import { TokenController } from '../controllers/tokenController';

const router = Router();
const tokenController = new TokenController();

// GET /api/tokens?address=0x...
router.get('/', tokenController.getTokens.bind(tokenController));

// GET /api/tokens/specific?address=0x...&tokenAddress=0x...
router.get('/specific', tokenController.getTokenByAddress.bind(tokenController));

export default router;

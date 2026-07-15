import { Router } from 'express';
import { register, login, refreshToken } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register as any);
router.post('/login', login as any);
router.post('/refresh', refreshToken as any);

export default router;

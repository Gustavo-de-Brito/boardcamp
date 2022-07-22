import { Router } from 'express';
import { getGames } from '../controllers/gamesControllers.js';

const router = Router();

router.get('/games', getGames);

export default router;
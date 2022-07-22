import { Router } from 'express';
import { getGames, setGame } from '../controllers/gamesControllers.js';
import gameValidation from '../middlewares/gameValidation.js';

const router = Router();

router.get('/games', getGames);
router.post('/games', gameValidation, setGame);

export default router;
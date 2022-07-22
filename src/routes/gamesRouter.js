import { Router } from 'express';
import { getGames, setGame } from '../controllers/gamesControllers.js';
import gameValidation from '../middlewares/gameValidation.js';
import alreadyRegisteredGame from '../middlewares/alreadyRegisteredGame.js';

const router = Router();

router.get('/games', getGames);
router.post('/games', gameValidation, alreadyRegisteredGame, setGame);

export default router;
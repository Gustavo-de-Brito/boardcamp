import { Router } from 'express';
import { getRentals, setRent, finishRent } from '../controllers/rentalsControllers.js';
import rentalValidation from '../middlewares/rentalValidation.js';
import registeredCustomer from '../middlewares/registeredCustomer.js';
import registerdGame from '../middlewares/registeredGame.js';
import availableGame from '../middlewares/availableGame.js';
import alreadyFinishedRent from '../middlewares/alreadyFinishedRent.js';

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', rentalValidation, registeredCustomer, registerdGame, availableGame, setRent);
router.get('/rentals/:id/return', alreadyFinishedRent, finishRent);

export default router;
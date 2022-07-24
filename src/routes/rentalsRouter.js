import { Router } from 'express';
import { getRentals, setRent } from '../controllers/rentalsControllers.js';
import rentalValidation from '../middlewares/rentalValidation.js';
import registeredCustomer from '../middlewares/registeredCustomer.js';
import registerdGame from '../middlewares/registeredGame.js';
import availableGame from '../middlewares/availableGame.js';

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', rentalValidation, registeredCustomer, registerdGame, availableGame, setRent);

export default router;
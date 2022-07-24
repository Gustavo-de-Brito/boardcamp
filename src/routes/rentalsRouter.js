import { Router } from 'express';
import { getRentals, setRent, finishRent, deleteRent} from '../controllers/rentalsControllers.js';
import rentalValidation from '../middlewares/rentalValidation.js';
import registeredCustomer from '../middlewares/registeredCustomer.js';
import registeredGame from '../middlewares/registeredGame.js';
import availableGame from '../middlewares/availableGame.js';
import alreadyFinishedRent from '../middlewares/alreadyFinishedRent.js';
import registeredRent from '../middlewares/regiteredRent.js';

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', rentalValidation, registeredCustomer, registeredGame, availableGame, setRent);
router.get('/rentals/:id/return', alreadyFinishedRent, finishRent);
router.delete('/rentals/:id', registeredRent, deleteRent);

export default router;
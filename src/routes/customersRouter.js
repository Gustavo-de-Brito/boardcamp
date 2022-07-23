import { Router } from 'express';
import { getCustomers, getCustomersById, setCustomer } from '../controllers/customersControllers.js';
import customerValidation from '../middlewares/customerValidation.js';

const router = Router();

router.get('/customers', getCustomers);
router.post('/customers', customerValidation, setCustomer);

router.get('/customers/:id', getCustomersById);

export default router;
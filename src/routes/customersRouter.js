import { Router } from 'express';
import { getCustomers, getCustomersById, setCustomer } from '../controllers/customersControllers.js';
import customerValidation from '../middlewares/customerValidation.js';
import alreadyRegiteredCustormer from '../middlewares/alreadyRegiteredCustomer.js';

const router = Router();

router.get('/customers', getCustomers);
router.post('/customers', customerValidation, alreadyRegiteredCustormer, setCustomer);

router.get('/customers/:id', getCustomersById);

export default router;
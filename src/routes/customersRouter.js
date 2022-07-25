import { Router } from 'express';
import { getCustomers, getCustomersById, setCustomer, updateCustomer } from '../controllers/customersControllers.js';
import customerValidation from '../middlewares/customerValidation.js';
import alreadyRegiteredCustormer from '../middlewares/alreadyRegiteredCustomer.js';
import alreadyRegisteredCpf from '../middlewares/alreadyRegisteredCpf.js';

const router = Router();

router.get('/customers', getCustomers);
router.post('/customers', customerValidation, alreadyRegiteredCustormer, setCustomer);

router.get('/customers/:id', getCustomersById);
router.put('/customers/:id',customerValidation, alreadyRegisteredCpf, updateCustomer);

export default router;
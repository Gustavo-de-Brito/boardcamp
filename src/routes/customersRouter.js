import { Router } from 'express';
import { getCustomers, getCustomersById } from '../controllers/customersControllers.js';

const router = Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomersById);

export default router;
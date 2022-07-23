import { Router } from 'express';
import { getCustomers } from '../controllers/customersControllers.js';

const router = Router();

router.get('/customers', getCustomers);

export default router;
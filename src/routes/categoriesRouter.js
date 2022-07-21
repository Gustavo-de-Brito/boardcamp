import { Router } from 'express';
import { getCategories, setCategories } from '../controllers/categoriesControllers.js';
import categoryValidation from '../middlewares/categoryValidation.js';

const router = Router();

router.get('/categories', getCategories);
router.post('/categories', categoryValidation, setCategories);

export default router;
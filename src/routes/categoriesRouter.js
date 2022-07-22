import { Router } from 'express';
import { getCategories, setCategories } from '../controllers/categoriesControllers.js';
import categoryValidation from '../middlewares/categoryValidation.js';
import alreadyRegisteredCategory from '../middlewares/alredyRegisteredCategory.js';

const router = Router();

router.get('/categories', getCategories);
router.post('/categories', categoryValidation, alreadyRegisteredCategory, setCategories);

export default router;
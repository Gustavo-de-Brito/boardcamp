import categorySchema from '../schema/categorySchema.js';

async function categoryValidation(req, res, next) {
  const category = req.body;

  const { error } = categorySchema.validate(category);

  if(error) return res.sendStatus(400);

  res.locals.category = category;

  next();
}

export default categoryValidation;
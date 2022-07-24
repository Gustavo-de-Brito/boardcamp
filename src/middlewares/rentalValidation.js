import rentalSchema from '../schema/rentalSchema.js';

function rentalValidation(req, res, next) {
  const newRental = req.body;

  const { error } = rentalSchema.validate(newRental);

  if(error) return res.sendStatus(422);

  next();
}

export default rentalValidation;
import customerSchema from '../schema/customerSchema.js';

function customerValidation(req, res, next) {
  const newCustomer = req.body;

  const { error } = customerSchema.validate(newCustomer);

  if(error) {
    return res.sendStatus(400);
  }

  next();
}

export default customerValidation;
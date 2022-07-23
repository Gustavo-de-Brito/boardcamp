import joi from 'joi';

const customerSchema = joi.object(
  {
    name: joi.string().required(),
    phone: joi.string().required(),
    cpf: joi.string().required(),
    birthday: joi.date().max('2022-01-01').min('1850-01-01').required()
  }
);

export default customerSchema;
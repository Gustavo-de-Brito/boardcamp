import joi from 'joi';

const phoneRegex = /^[0-9]{10,11}$/;
const cpfRegex = /^[0-9]{11}$/;

const customerSchema = joi.object(
  {
    name: joi.string().required(),
    phone: joi.string().pattern(phoneRegex).required(),
    cpf: joi.string().pattern(cpfRegex).required(),
    birthday: joi.date().max('2022-01-01').min('1850-01-01').required()
  }
);

export default customerSchema;
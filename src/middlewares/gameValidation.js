import gameSchema from '../schema/gameSchema.js';

function gameValidation(req, res, next) {
  const newGame = req.body;

  const { error } = gameSchema.validateAsync(newGame);

  if(error) {
    console.log(error.details);
    return res.sendStatus(400);}

  next();
}

export default gameValidation;
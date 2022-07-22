import gameSchema from '../schema/gameSchema.js';
import connection from '../databases/postgres.js';

async function gameValidation(req, res, next) {
  const newGame = req.body;

  const { error } = gameSchema.validateAsync(newGame);

  if(error) return res.sendStatus(400);

  try{
    const { rows:isValidCategory } = await connection.query(
      `
      SELECT * FROM categories
      WHERE id = $1;
      `,
      [ newGame.categoryId ]
    );

    if(isValidCategory.length === 0) return res.sendStatus(400);

    next();
  } catch(err) {
    res.sendStatus(500);
  }

}

export default gameValidation;
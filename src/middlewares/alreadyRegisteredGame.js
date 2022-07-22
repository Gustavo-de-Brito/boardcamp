import connection from '../databases/postgres.js';

async function alreadyRegisteredGame(req, res, next) {
  const { name } = req.body;

  try {
    const { rows:isRegisteredGame } = await connection.query(
      `
      SELECT * FROM games
      WHERE LOWER(name) = LOWER($1);
      `,
      [ name ]
    );

    if(isRegisteredGame.length !== 0) return res.sendStatus(409);

    next();
  } catch(err) {
    res.sendStatus(500);
  }
}

export default alreadyRegisteredGame;
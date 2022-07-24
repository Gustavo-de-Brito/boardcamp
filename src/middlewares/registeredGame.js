import connection from '../databases/postgres.js';

async function registerdGame(req, res, next) {
  const { gameId } = req.body;

  try {
    const { rows: validGame } = await connection.query(
      `
      SELECT * FROM games WHERE id = $1
      `,
      [ gameId ]
    );

    if(!validGame[0]) return res.sendStatus(400);

    res.locals.gamePrice = validGame[0].pricePerDay;

    next();
  } catch(err) {
    res.sendStatus(500);
  }
}

export default registerdGame;
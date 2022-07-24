import connection from '../databases/postgres.js';

async function availableGame(req, res, next) {
  const { gameId } = req.body;

  try {
    const { rows:game } = await connection.query(
      `
      SELECT * FROM games
      WHERE id = $1;
      `,
      [ gameId ]
    );

    if(game[0].stockTotal === 0) return res.sendStatus(400);

    next();
  } catch(err) {
    req.sendStatus(500);
  }
}

export default availableGame;
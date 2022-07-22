import connection from '../databases/postgres.js';

export async function getGames(req, res) {
  try {
    const { rows: games } = await connection.query(
      `
      SELECT games.*, categories.name as "categoryName"
      FROM games
      JOIN categories
      ON games."categoryId" = categories.id
      `
    );

    res.status(200).send(games);
  } catch(err) {
    res.sendStatus(500);
  }
}
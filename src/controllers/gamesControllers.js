import connection from '../databases/postgres.js';

export async function getGames(req, res) {
  const { name } = req.query;

  try {
    let games;

    if(!name) {
      const { rows } = await connection.query(
        `
        SELECT games.*, categories.name as "categoryName"
        FROM games
        JOIN categories
        ON games."categoryId" = categories.id
        `
      );

      games = rows;
    } else {
      const { rows } = await connection.query(
        `
        SELECT games.*, categories.name as "categoryName"
        FROM games
        JOIN categories
        ON games."categoryId" = categories.id
        WHERE LOWER(games.name)
        LIKE LOWER($1)
        `,
        [ name + '%' ]
        );

        games = rows;
      }

    res.status(200).send(games);
  } catch(err) {
    res.sendStatus(500);
  }
}
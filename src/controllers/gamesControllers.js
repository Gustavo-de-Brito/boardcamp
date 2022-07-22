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

export async function setGame(req, res) {
  const {
    name,
    image,
    stockTotal,
    categoryId,
    pricePerDay
  } = req.body;

  try {
    await connection.query(
      `
      INSERT INTO games
      ( name, image, "stockTotal", "categoryId", "pricePerDay" )
      VALUES ( $1, $2, $3, $4, $5 );
      `,
      [ name, image, stockTotal, categoryId, pricePerDay ]
    )

    res.sendStatus(201);
  } catch(err) {
    res.sendStatus(500);
  }
}
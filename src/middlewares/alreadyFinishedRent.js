import connection from '../databases/postgres.js';

async function alreadyFinishedRent(req, res, next) {
  const { id } = req.params;

  try {
    const { rows:rent } = await connection.query(
      `
      SELECT * FROM rentals
      WHERE id = $1
      `,
      [ id ]
    );

    if(!rent[0]) return res.sendStatus(404);
    if(rent[0].returnDate) return res.sendStatus(400);

    res.locals.rent = rent[0];

    next();
  } catch(err) {
    res.sendStatus(500);
  }
}

export default alreadyFinishedRent;
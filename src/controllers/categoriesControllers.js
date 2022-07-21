import connection from '../databases/postgres.js';

export async function getCategories(_, res) {
  const categories = await connection.query('SELECT * FROM categories;');

  res.status(200).send(categories.rows);
}

export async function setCategories(req, res) {
  const { category } = res.locals;

  res.sendStatus(200);
}
import connection from '../databases/postgres.js';

export async function getCategories(req, res) {
  const categories = await connection.query('SELECT * FROM categories;');

  res.status(200).send(categories.rows);
}
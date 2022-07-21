import connection from '../databases/postgres.js';

export async function getCategories(_, res) {
  try {
    const categories = await connection.query('SELECT * FROM categories;');
  
    res.status(200).send(categories.rows);
  } catch(err) {
    res.sendStatus(500);
  }
}

export async function setCategories(req, res) {
  const { category } = res.locals;

  res.sendStatus(200);
}
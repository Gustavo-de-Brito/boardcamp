import connection from '../databases/postgres.js';

async function alreadyRegisteredCategory(req, res, next) {
  const { category } = res.locals;

  try {
    const registeredCategory = await connection.query(
      'SELECT * FROM categories WHERE LOWER(name) = LOWER($1);', [category.name]
    );

    if(registeredCategory.rows.length !== 0) return res.sendStatus(409);

    next();
  } catch(err) {
    console.log(err)
    res.sendStatus(500);
  }
}

export default alreadyRegisteredCategory;
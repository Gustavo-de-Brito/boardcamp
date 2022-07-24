import connection from '../databases/postgres.js';

async function registerdCustomer(req, res, next) {
  const { customerId } = req.body;

  try {
    const { rows: validCustomer } = await connection.query(
      `
      SELECT * FROM customers WHERE id = $1
      `,
      [ customerId ]
    );

    if(!validCustomer[0]) return res.sendStatus(400);

    next();
  } catch(err) {
    res.sendStatus(500);
  }
}

export default registerdCustomer;
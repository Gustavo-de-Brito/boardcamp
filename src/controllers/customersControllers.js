import connection from '../databases/postgres.js';

export async function getCustomers(req, res) {
  try {
    const { rows:customers } = await connection.query(
      `SELECT * FROM customers`
    );

    res.status(200).send(customers);
  } catch(err) {
    res.sendStatus(500);
  }
}
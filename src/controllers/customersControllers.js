import connection from '../databases/postgres.js';

export async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    let customersList;

    console.log(cpf);

    if(cpf) {
      const { rows:customers } = await connection.query(
        `
        SELECT * FROM customers
        WHERE cpf
        LIKE $1`
        ,
        [ cpf + '%' ]
      );

      customersList = customers;
    } else {
      const { rows:customers } = await connection.query(
        `SELECT * FROM customers`
      );

      customersList = customers;
    }

    res.status(200).send(customersList);
  } catch(err) {
    res.sendStatus(500);
  }
}
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

export async function getCustomersById(req, res) {
  const { id } = req.params;

  try {
    const { rows: customer } = await connection.query(
      `
      SELECT * FROM customers WHERE id = $1
      `,
      [ id ]
    );

    if(customer.length === 0) {
      return res.sendStatus(404);
    }

    res.status(200).send(customer[0]);
  } catch(err) {
    res.sendStatus(500);
  }
}

export async function setCustomer(req, res) {
  res.sendStatus(201);
}
import connection from '../databases/postgres.js';

export async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    let customersList;

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

    if(customer.length === 0) return res.sendStatus(404);

    res.status(200).send(customer[0]);
  } catch(err) {
    res.sendStatus(500);
  }
}

export async function setCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try{
    await connection.query(
      `
      INSERT INTO customers
      (name, phone, cpf, birthday)
      VALUES ($1, $2, $3, $4);
      `,
      [ name, phone, cpf, birthday ]
    );

    res.sendStatus(201);
  } catch(err) {
    res.sendStatus(500);
  }
}

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;

  try{
    await connection.query(
      `
      UPDATE customers
      SET name = $1, phone = $2, cpf = $3, birthday = $4
      WHERE id = $5
      `,
      [ name, phone, cpf, birthday, id ]
    );

    res.sendStatus(200);
  } catch(err) {
    res.sendStatus(500);
  }
}
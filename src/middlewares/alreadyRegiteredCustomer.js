import connection from '../databases/postgres.js';

async function alreadyRegiteredCustormer(req, res, next) {
  const customer = req.body;

  const { rows:regitredCustomer } = await connection.query(
    `
    SELECT * FROM customers
    WHERE cpf = $1
    `,
    [ customer.cpf ]
  )

  if(regitredCustomer.length !== 0) return res.sendStatus(409);

  next();
}

export default alreadyRegiteredCustormer;
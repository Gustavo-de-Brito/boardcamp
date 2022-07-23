import connection from '../databases/postgres.js';

async function alreadyRegiteredCustormer(req, res, next) {
  const newCustomer = req.body;

  try {
    const { rows:regitredCustomer } = await connection.query(
      `
      SELECT * FROM customers
      WHERE cpf = $1
      `,
      [ newCustomer.cpf ]
    )
  
    if(regitredCustomer.length !== 0) return res.sendStatus(409);
  
    next();
  } catch(err) {
    res.sendStatus(500);
  }
}

export default alreadyRegiteredCustormer;
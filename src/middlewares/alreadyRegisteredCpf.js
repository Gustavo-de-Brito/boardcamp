import connection from '../databases/postgres.js';

async function alreadyRegisteredCpf(req, res, next) {
  const { cpf } = req.body;
  const { id } = req.params;

  try {
    const { rows:registeredCpf } = await connection.query(
      `
      SELECT * FROM customers
      WHERE cpf = $1 AND id <> $2;
      `,
      [ cpf, id ]
    );

    if(registeredCpf[0]) return res.sendStatus(409);

    next();
  } catch(err) {
    res.sendStatus(500);
  }
}

export default alreadyRegisteredCpf;
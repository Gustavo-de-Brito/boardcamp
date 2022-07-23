import connection from '../databases/postgres.js';

function formatRental(unformattedRentals) {
  const formatteddRentals = unformattedRentals.map(rental => {
    const formatteddRent = {
      ...rental,
      customer: {
        id: rental.customerId,
        name: rental.customerName
      },
      game: {
        id: rental.gameId,
        name: rental.gameName,
        categoryId: rental.categoryId,
        category: rental.categoryName
      }
    };

    delete formatteddRent.customerName;
    delete formatteddRent.gameName;
    delete formatteddRent.categoryName;

    return formatteddRent;
  })

  return formatteddRentals;
}

export async function getRentals(req, res) {
  try {
    const { rows:rentals } = await connection.query(
      `
      SELECT rentals.*, categories.name as "categoryName",
      games.name as "gameName", customers.name as "customerName"
      FROM rentals
      JOIN games
      ON games.id = rentals."gameId"
      JOIN categories
      ON games."categoryId" = categories.id
      JOIN customers
      ON customers.id = rentals."customerId";
      `
    );

    const formatteddRentals = formatRental(rentals);

    res.status(200).send(formatteddRentals);
  } catch(err) {
    console.log(err)
    res.sendStatus(500);
  }
}
import connection from '../databases/postgres.js';
import dayjs from 'dayjs';

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

async function getAllRentals() {
  const { rows:rentals } = await connection.query(
    `
    SELECT rentals.*, categories.name as "categoryName",
    games.name as "gameName", games."categoryId",
    customers.name as "customerName"
    FROM rentals
    JOIN games
    ON games.id = rentals."gameId"
    JOIN categories
    ON games."categoryId" = categories.id
    JOIN customers
    ON customers.id = rentals."customerId";
    `
  );

  return rentals;
}

async function filterByCustomerId(customerId) {
  const { rows:rentals } = await connection.query(
    `
    SELECT rentals.*, categories.name as "categoryName",
    games.name as "gameName", games."categoryId",
    customers.name as "customerName"
    FROM rentals
    JOIN games
    ON games.id = rentals."gameId"
    JOIN categories
    ON games."categoryId" = categories.id
    JOIN customers
    ON customers.id = rentals."customerId"
    WHERE customers.id = $1;
    `,
    [ customerId ]
  );

  return rentals;
}

async function filterByGameId(gameId) {
  const { rows:rentals } = await connection.query(
    `
    SELECT rentals.*, categories.name as "categoryName",
    games.name as "gameName", games."categoryId",
    customers.name as "customerName"
    FROM rentals
    JOIN games
    ON games.id = rentals."gameId"
    JOIN categories
    ON games."categoryId" = categories.id
    JOIN customers
    ON customers.id = rentals."customerId"
    WHERE games.id = $1;
    `,
    [ gameId ]
  );

  return rentals;
}

async function filterByCustomerAndGameId(customerId, gameId) {
  const { rows:rentals } = await connection.query(
    `
    SELECT rentals.*, categories.name as "categoryName",
    games.name as "gameName", games."categoryId",
    customers.name as "customerName"
    FROM rentals
    JOIN games
    ON games.id = rentals."gameId"
    JOIN categories
    ON games."categoryId" = categories.id
    JOIN customers
    ON customers.id = rentals."customerId"
    WHERE customers.id = $1 AND games.id = $2;
    `,
    [ customerId, gameId ]
  );

  return rentals;
}

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;

  try {
    let rentals;

    if(customerId && gameId) {
      rentals = await filterByCustomerAndGameId(customerId, gameId);
    } else if(customerId) {
      rentals = await filterByCustomerId(customerId);
    } else if(gameId) {
      rentals = await filterByGameId(gameId);
    } else {
      rentals = await getAllRentals();
    }

    const formatteddRentals = formatRental(rentals);

    res.status(200).send(formatteddRentals);
  } catch(err) {
    console.log(err)
    res.sendStatus(500);
  }
}

export async function setRent(req, res) {
  const newRent = req.body;
  const { gamePrice } = res.locals;

  try {
    const formattedRent = {
      ...newRent,
      rentDate: dayjs().format('YYYY-MM-DD'),
      originalPrice: gamePrice * newRent.daysRented,
      returnDate: null,
      delayFee: null
    }

    console.log(formattedRent);

    res.sendStatus(201);
  } catch(err) {
    res.sendStatus(500);
  }
}
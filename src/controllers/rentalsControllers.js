import connection from '../databases/postgres.js';
import dayjs from 'dayjs';

// auxiliary functions
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

async function calculateFee(gameId, rentDate, daysRented) {
  const { rows: game } = await connection.query(
    `
    SELECT * FROM games
    WHERE id = $1`,
    [ gameId ]
  );

  const currentDate = dayjs();
  const totalDaysRented = currentDate.diff(rentDate, 'days');

  let totalFee;
  const feeDays = totalDaysRented - daysRented;

  if(feeDays > 0) {
    totalFee = feeDays * game[0].pricePerDay;
  } else {
    totalFee = 0;
  }

  return totalFee;
}

// controllers
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
  const { customerId, gameId, daysRented } = req.body;
  const { gamePrice, gameStock } = res.locals;

  try {
    const rentDate = dayjs().format('YYYY-MM-DD');
    const originalPrice = gamePrice * daysRented;

    await connection.query(
      `
      INSERT INTO rentals
      ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [ customerId, gameId, rentDate, daysRented, null, originalPrice, null ]
    );

    const updateStock = gameStock - 1;

    await connection.query(
      `
      UPDATE games SET "stockTotal" = $1
      WHERE id = $2
      `,
      [ updateStock, gameId ]
    );

    res.sendStatus(201);
  } catch(err) {
    res.sendStatus(500);
  }
}

export async function finishRent(req, res) {
  const { id } = req.params;
  const { rent } = res.locals;

  try {
    const delayFee = await calculateFee(rent.gameId, rent.rentDate, rent.daysRented);
    const returnDate = dayjs().format('YYYY-MM-DD');

    await connection.query(
      `
      UPDATE rentals
      SET "delayFee" = $1, "returnDate" = $2
      WHERE id = $3;
      `,
      [ delayFee, returnDate, id ]
    );

    res.sendStatus(200);
  } catch(err) {
    res.sendStatus(500);
  }
}

export async function deleteRent(req, res) {
  const { id } = req.params;

  try{
    await connection.query(
      `
      DELETE FROM rentals
      WHERE id = $1;
      `,
      [ id ]
    );

    res.sendStatus(200);
  } catch(err) {
    res.sendStatus(500);
  }
}
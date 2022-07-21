import express, { json } from 'express';
import cors from 'cors';
import connection from './databases/postgres.js';

const app = express();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.status(200).send('Servidor no ar');
})

app.listen(4000);
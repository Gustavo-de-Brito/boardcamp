import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoriesRouter from './routes/categoriesRouter.js';
import gamesRouter from './routes/gamesRouter.js';
import customersRouter from './routes/customersRouter.js';
import rentalsRouter from './routes/rentalsRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(rentalsRouter);

app.use(customersRouter);

app.listen(process.env.PORT);
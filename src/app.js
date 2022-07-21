import express, { json } from 'express';
import cors from 'cors';
import categoriesRouter from "./routes/categoriesRouter.js";

const app = express();

app.use(cors());
app.use(json());

app.use(categoriesRouter);

app.listen(4000);
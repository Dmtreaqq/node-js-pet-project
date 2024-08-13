import express from 'express'
import { boardgamesRouter } from './routes/boardgames';

export const app = express()

app.use(express.json());

app.use('/boardgames', boardgamesRouter);



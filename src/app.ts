import express from 'express'
import { boardgamesRouter } from './routes/boardgames.router';

export const app = express()

app.use(express.json());

app.use('/boardgames', boardgamesRouter);



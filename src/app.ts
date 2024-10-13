import express from 'express'
import { boardgamesRouter } from './routes/boardgames.router';
import { authRouter } from './routes/auth.router';
import { emailRouter } from './routes/email.router';

export const app = express()

app.use(express.json());

app.use('/auth', authRouter);
app.use('/email', emailRouter);

app.use('/boardgames', boardgamesRouter);



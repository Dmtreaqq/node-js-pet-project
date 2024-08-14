import express, { Response } from "express";
import crypto from 'crypto'
import { Boardgame, HTTP_STATUSES, RequestWbody, RequestWparams, RequestWparamsAndBody, RequestWquery } from '../types';
import { BoardgameUpdateModel } from "../models/BoardgameUpdateModel";
import { BoardgameApiModel } from "../models/BoardgameApiModel";
import { BoardgameURLParamsModel } from "../models/BoardgameURLParamsModel";

let boardgames: Boardgame[] = [{ id: '2', title: 'Brum', players: '1' }]

export const boardgamesRouter = express.Router();

boardgamesRouter.delete('/tests', (_, res: Response) => {
  boardgames = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

boardgamesRouter.get('/', (req: RequestWquery<GetBoardgamesQueryModel>, res: Response<BoardgameApiModel[]>) => {
  const { title } = req.query

  if (title) {
    const gamesByTitle = boardgames.filter(game => game.title.includes(title));
    res.send(gamesByTitle);
  } else {

    res.send(boardgames);
  }
})

boardgamesRouter.post('/', (req: RequestWbody<{ title: string, players: string }>, res: Response) => {
  const body = req.body

  const boardgame = {
    id: crypto.randomUUID(),
    title: body.title,
    players: body.players
  }

  if (body && body.title !== undefined && body.players !== undefined) {
    boardgames.push(boardgame);
    res.status(HTTP_STATUSES.CREATED_201).send(boardgame);
  } else {
    res.status(HTTP_STATUSES.BAD_REQUEST_400);
    res.send({ message: 'Body is empty or incorrect' });
  }
})

boardgamesRouter.put('/:id', (req: RequestWparamsAndBody<BoardgameURLParamsModel, BoardgameUpdateModel>, res: Response<Boardgame | { message: 'Game Not Found' }>) => {
  const foundGame = boardgames.find(game => game.id === req.params.id)

  if (foundGame) {
    const updatedGame = {
      id: foundGame.id,
      title: req.body.title || foundGame.title,
      players: req.body.players || foundGame.players
    }

    boardgames = boardgames.map(game => game.id === foundGame.id ? updatedGame : game)

    res.send(updatedGame);
  } else {
    res.status(HTTP_STATUSES.NOT_FOUND_404);
    res.send({ message: 'Game Not Found' })
  }
})

boardgamesRouter.get('/:id', (req: RequestWparams<BoardgameURLParamsModel>, res: Response<Boardgame | { message: 'Game Not Found' }>) => {
  const foundGame = boardgames.find(game => game.id === req.params.id)

  if (foundGame) {
    res.send(foundGame);
  } else {
    res.status(HTTP_STATUSES.NOT_FOUND_404);
    res.send({ message: 'Game Not Found' })
  }
})

boardgamesRouter.delete('/:id', (req: RequestWparams<BoardgameURLParamsModel>, res: Response) => {
  const foundGame = boardgames.find(game => game.id === req.params.id)

  if (!foundGame) {
    res.status(HTTP_STATUSES.NOT_FOUND_404);
    res.send({ message: 'Game Not Found' })
  } else {
    boardgames = boardgames.filter(game => game.id !== foundGame.id);
    res.send(HTTP_STATUSES.NO_CONTENT_204);
  }
})

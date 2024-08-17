import express, { Response } from "express";
import { HTTP_STATUSES, RequestWbody, RequestWparams, RequestWparamsAndBody, RequestWquery } from '../types';
import { BoardgameUpdateModel } from "../models/BoardgameUpdateModel";
import { BoardgameApiModel } from "../models/BoardgameApiModel";
import { BoardgameURLParamsModel } from "../models/BoardgameURLParamsModel";
import { getGames, deleteGameById, getGameById, deleteBoardgamesBeforeTest, updateGameById, createBoardgame } from "../repositories/boardgames.repository";
import { BoardgameCreateModel } from "../models/BoardgameCreateModel";

export const boardgamesRouter = express.Router();

boardgamesRouter.delete('/tests', (_, res: Response) => {
  deleteBoardgamesBeforeTest();
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

boardgamesRouter.get('/', (req: RequestWquery<GetBoardgamesQueryModel>, res: Response<BoardgameApiModel[]>) => {
  const { title } = req.query

  const boardgames = getGames(title);

  res.send(boardgames);
})

boardgamesRouter.post('/', (req: RequestWbody<BoardgameCreateModel>, res: Response<BoardgameApiModel | { message: string }>) => {
  const body = req.body

  const createdBoardgame = createBoardgame(body);

  if (createdBoardgame) {
    res.status(HTTP_STATUSES.CREATED_201)
    res.send(createdBoardgame);
  } else {
    res.status(HTTP_STATUSES.BAD_REQUEST_400);
    res.send({ message: 'Body is empty or incorrect' });
  }
})

boardgamesRouter.put('/:id', (req: RequestWparamsAndBody<BoardgameURLParamsModel, BoardgameUpdateModel>, res: Response<BoardgameApiModel | { message: string }>) => {
    const updatedGame = updateGameById(req.params.id, req.body);

    if (updatedGame) {
      res.send(updatedGame);
    } else {
    res.status(HTTP_STATUSES.NOT_FOUND_404);
    res.send({ message: 'Game Not Found' })
  }
})

boardgamesRouter.get('/:id', (req: RequestWparams<BoardgameURLParamsModel>, res: Response<BoardgameApiModel | { message: 'Game Not Found' }>) => {
  const foundGame = getGameById(req.params.id);

  if (foundGame) {
    res.send(foundGame);
  } else {
    res.status(HTTP_STATUSES.NOT_FOUND_404);
    res.send({ message: 'Game Not Found' })
  }
})

boardgamesRouter.delete('/:id', (req: RequestWparams<BoardgameURLParamsModel>, res: Response) => {
  try {
    deleteGameById(req.params.id);
    
    res.send(HTTP_STATUSES.NO_CONTENT_204);
  } catch (e: any) {
    if (e.message === 'Game not found') {
      res.status(HTTP_STATUSES.NOT_FOUND_404);
      res.send({ message: 'Game Not Found' })
    }
  }
})

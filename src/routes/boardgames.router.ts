import express, { Response } from "express";
import { ValidationError } from "express-validator";
import { HTTP_STATUSES, RequestWbody, RequestWparams, RequestWparamsAndBody, RequestWquery } from '../types';
import { BoardgameUpdateModel } from "../models/BoardgameUpdateModel";
import { BoardgameApiModel } from "../models/BoardgameApiModel";
import { BoardgameURLParamsModel } from "../models/BoardgameURLParamsModel";
import { boardgamesService } from "../services/boardgames.service";
import { BoardgameCreateModel } from "../models/BoardgameCreateModel";
import { createPlayersChain, createQueryPaginationChain, createQueryTitleChain, createTitleChain } from "../middlewares/validationChains";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { basicAuthMiddleware } from "../middlewares/basicAuth.middlewares";
import { MultipleBoardgameApiModel } from "../models/MultipleBoardgameApiModel";

export const boardgamesRouter = express.Router();

boardgamesRouter.delete('/tests', async (_, res: Response) => {
  await boardgamesService.deleteBoardgamesBeforeTest();
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

boardgamesRouter.get('/',
  createQueryTitleChain(),
  createQueryPaginationChain(),
  validationMiddleware,
  async (req: RequestWquery<GetBoardgamesQueryModel>, res: Response<MultipleBoardgameApiModel>) => {
  const { title, page, pageSize } = req.query

  const boardgames = await boardgamesService.getGames(title, page, pageSize);

  res.json(boardgames);
})

boardgamesRouter.post('/',
  basicAuthMiddleware,
  createTitleChain(),
  createPlayersChain(),
  validationMiddleware,
  async (req: RequestWbody<BoardgameCreateModel>, res: Response<BoardgameApiModel | { errors: ValidationError[] }>) => {

  const createdBoardgame = await boardgamesService.createBoardgame(req.body);

  res.status(HTTP_STATUSES.CREATED_201).send(createdBoardgame);
})

boardgamesRouter.put('/:id',
  createTitleChain(),
  createPlayersChain(),
  validationMiddleware,
  async (req: RequestWparamsAndBody<BoardgameURLParamsModel, BoardgameUpdateModel>, res: Response<BoardgameApiModel | any>) => {
    
    const updatedGame = await boardgamesService.updateGameById(req.params.id, req.body);

    if (updatedGame) {
      res.send(updatedGame);
    } else {
    res.status(HTTP_STATUSES.NOT_FOUND_404);
    res.send({ message: 'Game Not Found' })
  }
})

boardgamesRouter.get('/:id', async (req: RequestWparams<BoardgameURLParamsModel>, res: Response<BoardgameApiModel | { message: 'Game Not Found' }>) => {
  const foundGame = await boardgamesService.getGameById(req.params.id);

  if (foundGame) {
    res.send(foundGame);
  } else {
    res.status(HTTP_STATUSES.NOT_FOUND_404);
    res.send({ message: 'Game Not Found' })
  }
})

boardgamesRouter.delete('/:id', async (req: RequestWparams<BoardgameURLParamsModel>, res: Response) => {
  try {
    await boardgamesService.deleteGameById(req.params.id);
    
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  } catch (e: any) {
    if (e.message === 'Game not found') {
      res.status(HTTP_STATUSES.NOT_FOUND_404);
      res.send({ message: 'Game Not Found' })
    }
  }
})

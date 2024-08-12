import express, { Response } from 'express'
import crypto from 'crypto'
import { Boardgame, HTTP_STATUSES, RequestWbody, RequestWparams, RequestWparamsAndBody, RequestWquery } from './types';
import { BoardgameUpdateModel } from './models/BoardgameUpdateModel';
import { BoardgameApiModel } from './models/BoardgameApiModel';
import { BoardgameURLParamsModel } from './models/BoardgameURLParamsModel';

export const app = express()
const port = process.env.PORT || 3000;

let boardgames: Boardgame[] = [{ id: '2', title: 'Brum', players: '1' }]

app.use(express.json());

app.get('/boardgames', (req: RequestWquery<GetBoardgamesQueryModel>, res: Response<BoardgameApiModel[]>) => {
  const { title } = req.query

  if (title) {
    const gamesByTitle = boardgames.filter(game => game.title.includes(title));
    res.send(gamesByTitle);
  } else {

    const result = boardgames.map(game => {
      return {
        title: game.title,
        players: game.players
      }
    })

    res.send(result);
  }
})

app.post('/boardgames', (req: RequestWbody<{ title: string, players: string }>, res: Response) => {
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

app.put('/boardgames/:id', (req: RequestWparamsAndBody<BoardgameURLParamsModel, BoardgameUpdateModel>, res: Response<Boardgame | { message: 'Game Not Found' }>) => {
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

app.get('/boardgames/:id', (req: RequestWparams<BoardgameURLParamsModel>, res: Response<Boardgame | { message: 'Game Not Found' }>) => {
  const foundGame = boardgames.find(game => game.id === req.params.id)

  if (foundGame) {
    res.send(foundGame);
  } else {
    res.status(HTTP_STATUSES.NOT_FOUND_404);
    res.send({ message: 'Game Not Found' })
  }
})

app.delete('/boardgames/:id', (req: RequestWparams<BoardgameURLParamsModel>, res: Response) => {
  const foundGame = boardgames.find(game => game.id === req.params.id)

  if (!foundGame) {
    res.status(HTTP_STATUSES.NOT_FOUND_404);
    res.send({ message: 'Game Not Found' })
  } else {
    boardgames = boardgames.filter(game => game.id !== foundGame.id);
    res.send(HTTP_STATUSES.NO_CONTENT_204);
  }
})

app.delete('/tests', (_, res: Response) => {
  boardgames = [];
  res.send(HTTP_STATUSES.NO_CONTENT_204);
})

export const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
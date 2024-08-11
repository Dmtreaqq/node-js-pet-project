import express, { Response } from 'express'
import crypto from 'crypto'
import { Boardgame, RequestWbody, RequestWparams, RequestWparamsAndBody, RequestWquery } from './types';
import { BoardgameUpdateModel } from './models/BoardgameUpdateModel';
import { BoardgameApiModel } from './models/BoardgameApiModel';

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
    res.send(boardgames);
  }
})

app.post('/boardgames', (req: RequestWbody<{ title: string, players: string }>, res: Response) => {
  const body = req.body
  
  const boardgame = {
    id: crypto.randomUUID(),
    title: req.body.title || 'No title',
    players: req.body.players || 'Empty'
  }

  if (body) {
    boardgames.push(boardgame);
    res.status(201).send(boardgame);
  } else {
    res.status(400);
    res.send({ message: 'Body is empty' });
  }
})

app.put('/boardgames/:id', (req: RequestWparamsAndBody<{ id: string }, BoardgameUpdateModel>, res: Response<Boardgame | { message: 'Game Not Found' }>) => {
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
    res.status(404);
    res.send({ message: 'Game Not Found' })
  }
})

app.get('/boardgames/:id', (req: RequestWparams<{ id: string }>, res: Response<Boardgame | { message: 'Game Not Found' }>) => {
  const foundGame = boardgames.find(game => game.id === req.params.id)

  if (foundGame) {
    res.send(foundGame);
  } else {
    res.status(404);
    res.send({ message: 'Game Not Found' })
  }
})

app.delete('/boardgames/:id', (req: RequestWparams<{ id: string }>, res: Response) => {
  const foundGame = boardgames.find(game => game.id === req.params.id)

  if (!foundGame) {
    res.status(404);
    res.send({ message: 'Game Not Found' })
  } else {
    boardgames = boardgames.filter(game => game.id !== foundGame.id);
    res.send(204);
  }
})

export const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
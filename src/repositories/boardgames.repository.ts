import { BoardgameCreateModel } from "../models/BoardgameCreateModel";
import { BoardgameUpdateModel } from "../models/BoardgameUpdateModel";
import { Boardgame } from "../types";

let boardgames: Boardgame[] = [{ id: '2', title: 'Brum', players: '1' }]

export const getGameById = (id: string): Boardgame | undefined => {
  return boardgames.find(game => game.id === id);
}

export const getGames = (title: string = ''): Boardgame[] => {
  if (title) {
    const gamesByTitle = boardgames.filter(game => game.title.includes(title));
    return gamesByTitle;
  } else {
    return boardgames
  }
}

export const createBoardgame = (boardgame: BoardgameCreateModel): Boardgame | undefined => {
  const createdBoardgame = {
    id: crypto.randomUUID(),
    title: boardgame.title,
    players: boardgame.players
  }

  if (boardgame && boardgame.title !== undefined && boardgame.players !== undefined) {
    boardgames.push(createdBoardgame);
    return createdBoardgame;
  } else {
    // todo 404 throw
  }
}

export const updateGameById = (id: string, boardgame: BoardgameUpdateModel): Boardgame | undefined => {
  const foundGame = boardgames.find(game => game.id === id);

  if (foundGame) {
    const updatedGame: Boardgame = {
      id: foundGame.id,
      ...boardgame
    }

    boardgames = boardgames.map(game => game.id === foundGame.id ? updatedGame : game)

    return updatedGame;
  } else {
    // TODO - throw http error 404
  }
}

export const deleteGameById = (id: string) => {
  const foundGame = boardgames.find(game => game.id === id);

  if (!foundGame) {
    throw new Error('Game not found');
  } else {
    boardgames = boardgames.filter(game => game.id !== foundGame.id);
  }
}

export const deleteBoardgamesBeforeTest = () => {
  boardgames = [];
}
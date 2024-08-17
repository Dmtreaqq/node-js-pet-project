import { BoardgameCreateModel } from "../models/BoardgameCreateModel";
import { BoardgameUpdateModel } from "../models/BoardgameUpdateModel";
import { Boardgame } from "../types";
import boardgameJson from '../boardgames.json';

let boardgames: Boardgame[] = [...boardgameJson.boardgames];

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
  if (boardgame && boardgame.title !== undefined) {
    const createdBoardgame = { ...boardgame, id: crypto.randomUUID() }

    boardgames.push(createdBoardgame);
    return createdBoardgame;
  }
}

export const updateGameById = (id: string, boardgame: BoardgameUpdateModel): Boardgame | undefined => {
  const foundGame = boardgames.find(game => game.id === id);

  if (foundGame) {
    const updatedGame = { ...boardgame, id: foundGame.id, }

    boardgames = boardgames.map(game => game.id === foundGame.id ? updatedGame : game)

    return updatedGame;
  } else {
    return foundGame;
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
import { BoardgameCreateModel } from "../models/BoardgameCreateModel";
import { BoardgameUpdateModel } from "../models/BoardgameUpdateModel";
import { Boardgame } from "../types";
import boardgameJson from '../boardgames.json';

let boardgames: Boardgame[] = [...boardgameJson.boardgames];

export const getGameById = async (id: string): Promise<Boardgame | null> => {
  return boardgames.find(game => game.id === id) || null;
}

export const getGames = async (title: string = ''): Promise<Boardgame[]> => {
  if (title) {
    const gamesByTitle = boardgames.filter(game => game.title.includes(title));
    return gamesByTitle;
  } else {
    return boardgames
  }
}

export const createBoardgame = async (boardgame: BoardgameCreateModel): Promise<Boardgame | undefined> => {
  if (boardgame && boardgame.title !== undefined) {
    const createdBoardgame = { id: crypto.randomUUID(), ...boardgame }

    boardgames.push(createdBoardgame);
    return createdBoardgame;
  }
}

export const updateGameById = async (id: string, boardgame: BoardgameUpdateModel): Promise<Boardgame | undefined> => {
  const foundGame = boardgames.find(game => game.id === id);

  if (foundGame) {
    const updatedGame = { ...boardgame, id: foundGame.id, }

    boardgames = boardgames.map(game => game.id === foundGame.id ? updatedGame : game)

    return updatedGame;
  } else {
    return foundGame;
  }
}

export const deleteGameById = async (id: string) => {
  const foundGame = boardgames.find(game => game.id === id);

  if (!foundGame) {
    throw new Error('Game not found');
  } else {
    boardgames = boardgames.filter(game => game.id !== foundGame.id);
  }
}

export const deleteBoardgamesBeforeTest = async () => {
  boardgames = [];
}
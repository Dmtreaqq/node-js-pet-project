import { boardgamesCollection } from "./db";
import { BoardgameCreateModel } from "../models/BoardgameCreateModel";
import { BoardgameUpdateModel } from "../models/BoardgameUpdateModel";
import { Boardgame } from "../types";


export const getGameById = async (id: string): Promise<Boardgame | null> => {
    return boardgamesCollection.findOne({ id })
}

export const getGames = async (title: string = ''): Promise<Boardgame[]> => {
  if (title) {
    return boardgamesCollection.find({ title: { $regex: title } }).toArray();
  } else {
    return boardgamesCollection.find({}).toArray();
  }
}

export const createBoardgame = async (boardgame: BoardgameCreateModel): Promise<Boardgame> => {
  if (boardgame && boardgame.title !== undefined) {
    const createdBoardgame: Boardgame = { id: crypto.randomUUID(), ...boardgame }

    await boardgamesCollection.insertOne(createdBoardgame);

    return createdBoardgame;
  } else {
    // TODO
    throw new Error('')
  }
}

export const updateGameById = async (id: string, boardgame: BoardgameUpdateModel): Promise<Boardgame> => {
  const updatedGame = { ...boardgame, id, }

  await boardgamesCollection.replaceOne({ id }, updatedGame);

  return updatedGame;
}

export const deleteGameById = async (id: string) => {
    await boardgamesCollection.deleteOne({ id })
}

export const deleteBoardgamesBeforeTest = async () => {

}
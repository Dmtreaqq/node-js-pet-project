import { boardgamesCollection } from "./db";
import { BoardgameCreateModel } from "../models/BoardgameCreateModel";
import { BoardgameUpdateModel } from "../models/BoardgameUpdateModel";
import { Boardgame } from "../types";

export const boardgamesRepository = {
    async getGameById(id: string): Promise<Boardgame | null> {
        return boardgamesCollection.findOne({ id })
    },
    
    async getGames(title: string = ''): Promise<Boardgame[]> {
      if (title) {
        return boardgamesCollection.find({ title: { $regex: title } }).toArray();
      } else {
        return boardgamesCollection.find({}).toArray();
      }
    },
    
    async createBoardgame(boardgame: Boardgame): Promise<Boardgame> {
        await boardgamesCollection.insertOne(boardgame);

        return boardgame;
    },

    async updateGameById(id: string, boardgame: Boardgame): Promise<Boardgame> {
      await boardgamesCollection.replaceOne({ id }, boardgame);
    
      return boardgame;
    },
    
    async deleteGameById(id: string) {
        await boardgamesCollection.deleteOne({ id })
    },
    
    async deleteBoardgamesBeforeTest() {
    
    }
}
import { boardgamesCollection } from "./db";
import { Boardgame } from "../types";
import { MultipleBoardgameApiModel } from "../models/MultipleBoardgameApiModel";
import { BoardgameApiModel } from "../models/BoardgameApiModel";

export const boardgamesRepository = {
    async getGameById(id: string): Promise<Boardgame | null> {
        return boardgamesCollection.findOne({ id })
    },
    
    async getGames(title: string = '', page: number, pageSize: number): Promise<MultipleBoardgameApiModel> {
      if (title) {
        const itemsCount = await boardgamesCollection.countDocuments({ title: { $regex: title }})
        const pagesCount = Math.floor(itemsCount / pageSize)
        const boardgames: BoardgameApiModel[] = await boardgamesCollection
          .find({ title: { $regex: title } })
          .skip((page - 1) * pageSize)
          .limit(pageSize).toArray()

        return {
          pagesCount,
          page,
          pageSize,
          boardgames
        }
      } else {
        const itemsCount = await boardgamesCollection.estimatedDocumentCount({});
        const pagesCount = Math.floor(itemsCount / pageSize)
        const boardgames: BoardgameApiModel[] = await boardgamesCollection
        .find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize).toArray();

        return {
          pagesCount,
          page,
          pageSize,
          boardgames
        }
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
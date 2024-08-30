import { BoardgameApiModel } from "./BoardgameApiModel"

export type MultipleBoardgameApiModel = {
    page: number;
    pageSize: number;
    pagesCount: number;
    boardgames: BoardgameApiModel[];
}
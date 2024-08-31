import { Request } from "express"

declare global {
  namespace Express {
      export interface Request {
          user: any
      }
  }
}

export type RequestWbody<T> = Request<{}, {}, T>
export type RequestWquery<T> = Request<{}, {}, {}, T>
export type RequestWparams<T> = Request<T>
export type RequestWparamsAndBody<T, L> = Request<T, {}, L>

export type Boardgame = {
  id: string;
  title: string;
  yearPublished: string;
  minPlayers: string;
  maxPlayers: string;
  playTimeMinutes: string;
  genre: string;
};


export enum HTTP_STATUSES {
  OK_200 = 200,
  BAD_REQUEST_400 = 400,
  NOT_FOUND_404 = 404,
  CREATED_201 = 201,
  NO_CONTENT_204 = 204
}
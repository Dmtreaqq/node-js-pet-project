import { Request } from "express"

export type RequestWbody<T> = Request<{}, {}, T>
export type RequestWquery<T> = Request<{}, {}, {}, T>
export type RequestWparams<T> = Request<T>
export type RequestWparamsAndBody<T, L> = Request<T, {}, L>

export type Boardgame = {
  id: string
  title: string
  players: string
}
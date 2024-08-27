import { body, query } from "express-validator"

export const createTitleChain = () => body('title').trim()
    .notEmpty().withMessage('Should not be empty').bail()
    .isLength({ min: 3, max: 10 }).withMessage('Min - 3 symbols, Max - 10 symbols')

export const createPlayersChain = () => body(['minPlayers', 'maxPlayers'])
    .isString().withMessage('Should be a string').bail()
    .isNumeric().withMessage('Should be a number inside string')

export const createQueryTitleChain = () => query('title').optional().isAlpha().withMessage('Can\'t be a number')

export const createQueryPaginationChain = () => query(['page', 'pageSize']).isNumeric().withMessage('Can\'t be a string');

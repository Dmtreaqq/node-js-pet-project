import { Router, Response } from "express";
import { RequestWbody } from "../types";
import { usersService } from '../services/users.service'
import { hashService } from "../services/hash.service";
import { usersRepository } from '../repositories/users-db.repository'
import { jwtAuthService } from "../services/jwtAuth.service";

export const authRouter = Router()

authRouter.post('/register', async (req: RequestWbody<{ login: string, password: string }>, res: Response) => {
    await usersService.createUser(req.body);

    return res.json({ message: "User created" })
})

authRouter.post('/login', async (req: RequestWbody<{ login: string, password: string }>, res: Response) => {
    const user = await usersRepository.getUserByLogin(req.body.login);
    const token = jwtAuthService.createToken(user);
    
    const isHashValid = await hashService.checkPassword(req.body.password, user.password);

    if (!isHashValid) return res.sendStatus(401);

    return res.json({ token: `${token}` })
})

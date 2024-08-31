import { usersRepository } from "../repositories/users-db.repository"
import { hashService } from "./hash.service"

export const usersService = {
    async createUser(user: any) {
        const hashedPassword = await hashService.hashPassword(user.password)

        const userFromRepository = await usersRepository.createUser({ login: user.login, password: hashedPassword })
        
        return userFromRepository;
    }
}
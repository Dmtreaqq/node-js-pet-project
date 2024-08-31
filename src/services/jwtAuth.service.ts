import jwt from 'jsonwebtoken'

export const jwtAuthService = {
    createToken(user: any): string {
        const token = jwt.sign(user, 'secret');
    
        return token;
    }    
}


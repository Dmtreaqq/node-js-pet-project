import bcrypt from 'bcrypt'

export const hashService = {
    async hashPassword(password: string): Promise<string | null> {
        try {
            const hash = await bcrypt.hash(password, 10)
            return hash;
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
        const isValidPassword = await bcrypt.compare(password, hashedPassword);

        return isValidPassword;
    }
}
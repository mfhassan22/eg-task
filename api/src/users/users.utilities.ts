import * as bcrypt from 'bcrypt';

export class UserUtilities {
    public static async hashPassowrd(password: string): Promise<string> {
        const _password = await bcrypt.hash(password, 10);
        return _password;
    }
}

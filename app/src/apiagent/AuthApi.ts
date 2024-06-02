import { _post } from "./ApiClient"
import User from '../contracts/User'

const loginApi = async (email: string, password: string): Promise<User> => {
    const result = await _post('/auth/login', { email, password });
    return result.data;
}

export { loginApi };
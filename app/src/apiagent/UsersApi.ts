import { _delete, _get, _post } from "./ApiClient"
import User from '../contracts/User'
const usersListApi = async (): Promise<User[]> => {
    const result = await _get('/users');
    return result.data;
}
const signupApi = async (name: string, email: string, password: string): Promise<User> => {
    const result = await _post('/users', { name, email, password });
    return result.data;
}
const userDeleteApi = async (_id: string) => {
    const result = await _delete('/users/' + _id);
    return result.data;
}
export { usersListApi, signupApi, userDeleteApi };
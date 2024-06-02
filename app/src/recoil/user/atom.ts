import { atom } from 'recoil'
import User from '../../contracts/User';

const userAtom = atom<User>({
    key: 'user',
    default: {
        _id: '',
        name: '',
        email: ''
    }
});
export default userAtom;
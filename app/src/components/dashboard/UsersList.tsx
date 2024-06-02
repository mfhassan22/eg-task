import React, { useEffect, useState } from 'react';
import { userDeleteApi, usersListApi } from '../../apiagent/UsersApi';
import User from '../../contracts/User';
import { TrashIcon } from '@heroicons/react/24/solid';
export function UsersList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        console.log('loading data');
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await usersListApi();
        setUsers(result)
    }
    const deleteUser = async (_id: string) => {
        const result = await userDeleteApi(_id);
        fetchData();
    }
    return (
        <div className="max-w mx-auto">
            <h1 className="text-3xl font-semibold text-right mb-6">Users List</h1>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">Email</th>
                        <th className="text-left">ID</th>
                        <th className="text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="border-t">
                            <td className="py-4">{user.name}</td>
                            <td className="py-4">{user.email}</td>
                            <td className="py-4">{user._id}</td>
                            <td className="py-4"><TrashIcon onClick={() => deleteUser(user._id)} className="size-6 text-orange-500 hover:text-red-500" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
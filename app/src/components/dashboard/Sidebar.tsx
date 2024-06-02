import React from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
const Sidebar = (): React.ReactNode => {
    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove(import.meta.env.VITE_USER_TOKEN_NAME);
        navigate('/');
    }
    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4">
            <div className="mb-8">
                <Link to="/dashboard"> <h1 className="text-2xl font-bold">Dashboard</h1></Link>
            </div>
            <nav>
                <ul>
                    <li className="mb-4 hover:font-bold">
                        <Link to="/dashboard/users" className="text-lg">Users</Link>
                    </li>
                    <li className="mb-4 hover:font-bold">
                        <Link to="/" className="text-lg" onClick={logout}>Logout</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;

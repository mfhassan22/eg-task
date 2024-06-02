import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import { useRecoilState, useResetRecoilState } from "recoil";
import userAtom from "../../recoil/user/atom";
import { useEffect } from "react";
import Cookies from 'js-cookie';

export function Dashboard(props: { children?: JSX.Element }) {
    const navigate = useNavigate();
    const resetUserState = useResetRecoilState(userAtom);
    const [user, setUser] = useRecoilState(userAtom);

    useEffect(() => {
        const userCookie = Cookies.get(import.meta.env.VITE_USER_TOKEN_NAME);
        if (!userCookie) {
            resetUserState();
            navigate('/');
        }
    }, [navigate, resetUserState]);
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-6"></h2>
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
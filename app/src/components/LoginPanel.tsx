import React, { useState } from 'react';
import { loginApi } from '../apiagent/AuthApi';
import { signupApi } from '../apiagent/UsersApi';
import { useRecoilState } from 'recoil';
import userAtom from '../recoil/user/atom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import User from '../contracts/User';
import { EyeIcon as SolidEyeIcon } from '@heroicons/react/24/solid';
import { EyeIcon as OutlineEyeIcon } from '@heroicons/react/24/outline';
const LoginPanel = (): React.ReactNode => {
  const [activeTab, setActiveTab] = useState('login');
  const [user, setUser] = useRecoilState<User>(userAtom);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handlePasswordChange = (e: string) => {
    const newPassword = e;
    setPassword(newPassword);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.');
    } else {
      setPasswordError('');
    }
  };

  const login = async () => {
    const result = await loginApi(email, password);
    setUser(result);
    const userCookie = Cookies.get(import.meta.env.VITE_USER_TOKEN_NAME);
    if (userCookie) {
      navigate('/dashboard');
    }
  };

  const signup = async () => {
    if (!passwordError) {
      const result = await signupApi(name, email, password);
      setActiveTab('login');
      login();
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-5 rounded-lg shadow-lg">
      <div className="mb-4">
        <ul className="flex border-b">
          <li className={`mr-1 ${activeTab === 'login' && 'bg-gray-800'}`}>
            <button
              className={`bg-white inline-block py-2 px-4 font-semibold ${activeTab === 'login' ? 'text-gray-800 border-b-2 border-gray-800' : 'text-gray-500'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
          </li>
          <li className={`mr-1 ${activeTab === 'signup' && 'border-gray-800'}`}>
            <button
              className={`bg-white inline-block py-2 px-4 font-semibold ${activeTab === 'signup' ? 'text-gray-800 border-b-2 border-gray-800' : 'text-gray-500'}`}
              onClick={() => setActiveTab('signup')}
            >
              Signup
            </button>
          </li>
        </ul>
      </div>
      {activeTab === 'login' ? (
        <div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(x) => setEmail(x.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(x) => setPassword(x.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              onClick={login}
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(x) => setName(x.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(x) => setEmail(x.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(x) => handlePasswordChange(x.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                />
                {showPassword ? <SolidEyeIcon onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex align-bottom items-center px-3 size-12 text-gray-800 hover:text-gray-700" /> : <OutlineEyeIcon onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex align-bottom items-center px-3 size-12 text-gray-800 hover:text-gray-700" />}
              </div>
              {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
            </div>
            <button onClick={signup} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Signup
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPanel;


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Landing from './routes/Landing'
import Dashboard from './routes/protected/Dashboard'
import UsersList from './components/dashboard/UsersList';
import Info from './components/dashboard/Info';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <Info />,
      },
      {
        path: "/dashboard/users",
        element: <UsersList />,
      }
    ]
  }
]);
function App() {
  return <RouterProvider router={router} />
}

export default App

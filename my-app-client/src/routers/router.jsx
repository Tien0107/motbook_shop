import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from '../App';
import Home from "../homes/Home";
import Shop from "../shops/Shop";
import About from "../Components/About";
import Blog from "../Components/Blog";
import SingleBook from "../shops/SingleBook";
import DashboradLayout from "../dashboard/DashboradLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import Signup from "../Components/Signup";
import Login from "../Components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../Components/Logout";
import Profile from "../dashboard/Profile";
import Details from "../dashboard/Details";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children : [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/about",
        element: <About />
      }
      ,{
        path: "/blog",
        element: <Blog />
      }
      ,{
        path: "/book/:id",
        element: <SingleBook />,
        loader: ({params}) => fetch(`http://localhost:3000/book/${params.id}`)
      }
    ]
  },
  {
    path: '/admin/dashboard',
    element: <DashboradLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadBook />

      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageBooks />
      },
      {
        path: "/admin/dashboard/edit-books/:id",
        element: <EditBooks />,
        loader: ({params}) => fetch(`http://localhost:3000/book/${params.id}`)
      },
      {
        path: "/admin/dashboard/profile",
        element: <Profile />
      },
      {
      path: "/admin/dashboard/details",
      element: <Details />
      }

    ]
  },
  {
    path: "sign-up",
    element: <Signup />
  },{
    path: "login",
    element: <Login />
  },{
    path: "logout",
    element: <Logout />
  }
  
]);

export default router;
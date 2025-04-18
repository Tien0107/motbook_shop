import {
  createBrowserRouter
} from "react-router-dom";
import App from '../App';
import About from "../Components/About";
import AuthForm from '../components/Auth/AuthForm';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import Blog from "../Components/Blog";
import Cart from "../Components/Cart";
import Checkout from "../Components/Checkout";
import Login from "../Components/Login";
import Logout from "../Components/Logout";
import Orders from "../Components/Orders";
import Signup from "../Components/Signup";
import Dashboard from "../dashboard/Dashboard";
import DashboardLayout from "../dashboard/DashboardLayout";
import Details from "../dashboard/Details";
import EditBooks from "../dashboard/EditBooks";
import ManageBooks from "../dashboard/ManageBooks";
import Profile from "../dashboard/Profile";
import UploadBook from "../dashboard/UploadBook";
import Home from "../homes/Home";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Shop from "../shops/Shop";
import SingleBook from "../shops/SingleBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: "/book/:id",
        element: <SingleBook />,
        loader: ({ params }) => fetch(`http://localhost:3000/book/${params.id}`)
      },
      {
        path: "/cart",
        element: <ProtectedRoute><Cart /></ProtectedRoute>
      },
      {
        path: "/orders",
        element: <ProtectedRoute><Orders /></ProtectedRoute>
      },
      {
        path: "/checkout",
        element: <ProtectedRoute><Checkout /></ProtectedRoute>
      }
    ]
  },
  {
    path: '/admin/dashboard',
    element: <DashboardLayout />,
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
        loader: ({ params }) => fetch(`http://localhost:3000/book/${params.id}`)
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
  }, {
    path: "login",
    element: <Login />
  }, {
    path: "logout",
    element: <Logout />
  },
  {
    path: '/login',
    element: <AuthForm />,
  },
  {
    path: '/register',
    element: <AuthForm />,
  },
]);

export default router;
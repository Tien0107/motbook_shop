import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../Components/About";
import PrivateRoute from "../Components/Auth/PrivateRoute";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import Blog from "../Components/Blog";
import Cart from "../Components/Cart";
import Checkout from "../Components/Checkout";
import Orders from "../Components/Orders";
import Home from "..//pages/homes/Home";
import DealBooks from "../pages/homes/DealBooks";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignupPage";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Details from "../pages/dashboard/Details";
import EditBooks from "../pages/dashboard/EditBooks";
import ManageBooks from "../pages/dashboard/ManageBooks";
import Profile from "../pages/dashboard/Profile";
import UploadBook from "../pages/dashboard/UploadBook";
import Shop from "../pages/shops/Shop";
import SingleBook from "../pages/shops/SingleBook";
import SearchPage from "../../src/Components/Search";

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
        path: "/deals",
        element: <DealBooks />
      },
      {
        path: "/shop",
        element: <Shop />,
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
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/api/books/${params.id}`);
            const json = await res.json();     
            if (!json) {
              throw new Error("Book not found");
            }
            return json.data;
        },
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
      },
      {
        path: "/search",
        element: <SearchPage />,
      }
    ]
  },
  {
    path: '/admin/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadBook />,
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageBooks />,
      },
      {
        path: "/admin/dashboard/edit-books/:id",
        element: <EditBooks />,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/api/books/${params.id}`);
          const json = await res.json();
          return json.data;
        },
      },
      {
        path: "/admin/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/admin/dashboard/details",
        element: <Details />,
      },
    ],
  },
  {
    path: "sign-up",
    element: <SignUpPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);

export default router;

import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(
	lazy(() => import('../layouts/blank/BlankLayout')),
);

/* ****Pages***** */
// Dashboard
const Dashboard = Loadable(lazy(() => import('../pages/analytics/Dashboard')));

// Products
const ProductList = Loadable(
	lazy(() => import('../pages/products/ProductList')),
);
const ProductForm = Loadable(
	lazy(() => import('../pages/products/ProductForm')),
);
const ProductDetail = Loadable(
	lazy(() => import('../pages/products/ProductDetail')),
);

// Orders
const OrderList = Loadable(lazy(() => import('../pages/orders/OrderList')));
const OrderDetail = Loadable(lazy(() => import('../pages/orders/OrderDetail')));

// Customers
const CustomerList = Loadable(
	lazy(() => import('../pages/customers/CustomerList')),
);
const CustomerDetail = Loadable(
	lazy(() => import('../pages/customers/CustomerDetail')),
);
const CustomerForm = Loadable(
	lazy(() => import('../features/customers/components/CustomerForm')),
);

// Auth
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(
	lazy(() => import('../pages/authentication/Register')),
);
const Error = Loadable(lazy(() => import('../pages/authentication/Error')));

// Analytics
const Analytics = Loadable(lazy(() => import('../pages/analytics/Analytics')));

const Router = [
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<FullLayout />
			</ProtectedRoute>
		),
		children: [
			{ path: '/', element: <Navigate to="/dashboard" /> },
			{ path: '/dashboard', element: <Dashboard /> },
			{ path: '/analytics', element: <Analytics /> },

			// Products routes
			{ path: '/products', element: <ProductList /> },
			{ path: '/products/add', element: <ProductForm /> },
			{ path: '/products/:id', element: <ProductDetail /> },
			{ path: '/products/:id/edit', element: <ProductForm /> },

			// Orders routes
			{ path: '/orders', element: <OrderList /> },
			{ path: '/orders/:id', element: <OrderDetail /> },

			// Customers routes
			{ path: '/customers', element: <CustomerList /> },
			{ path: '/customers/:id', element: <CustomerDetail /> },
			{ path: '/customers/:id/edit', element: <CustomerForm /> },

			{ path: '*', element: <Navigate to="/auth/404" /> },
		],
	},
	{
		path: '/auth',
		element: <BlankLayout />,
		children: [
			{ path: 'login', element: <Login /> },
			{ path: 'register', element: <Register /> },
			{ path: '404', element: <Error /> },
		],
	},
];

export default Router;

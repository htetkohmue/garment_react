import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import TailorList from './pages/TailorList';
// import ProductList from './pages/ProductList';
import ProductInList from './pages/ProductInList';
import ProductInRegister from './pages/ProductInRegister';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import TailorsRegister from './pages/TailorsRegister';
import RawMaterial from './pages/RawMaterial';
import Supplier from './pages/Supplier';
import SupplierTransactionList from './pages/SupplierTransactionList';
import CustomerRegister from './pages/CustomerRegister';
import CustomerList from './pages/CustomerList';
import CustomerTransaction from './pages/CustomerTransaction';
import CustomerTransactionList from './pages/CustomerTransactionList';


// ----------------------------------------------------------------------

export default function Router(props) {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout props={props} />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'tailors-list', element: <TailorList /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'tailors-register', element: <TailorsRegister /> },
        { path: 'supplier', element: <Supplier /> },
        { path: 'tailors-register/:id', element: <TailorsRegister /> },
        { path: 'product-in-register', element: <ProductInRegister /> },
        { path: 'product-in-register/:id', element: <ProductInRegister /> },
        // { path: 'product-list', element: <ProductList /> },
        { path: 'product-in-list', element: <ProductInList /> },
        { path: 'raws', element: <RawMaterial /> },
        { path: 'supplier-transaction-list', element: <SupplierTransactionList /> },
        { path: 'customers-register', element: <CustomerRegister /> },
        { path: 'customers-register/:id', element: <CustomerRegister /> },
        { path: 'customers-list', element: <CustomerList /> },
        { path: 'customers-transaction', element: <CustomerTransaction /> },
        { path: 'customers-transaction/:id', element: <CustomerTransaction /> },
        { path: 'customers-transaction-list', element: <CustomerTransactionList /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/Login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Tailor',
    path : null,
    icon: getIcon('eva:people-fill'),
    children: [
          {
            title: "Tailors Register",
            path: "/dashboard/tailors-register",
            icon: getIcon('eva:person-add-fill'),
          },
          {
            title: "Tailors List",
            path: "/dashboard/tailors-list",
            icon: getIcon('eva:people-fill'),
          },
          {
            title: "Supplier",
            path: "/dashboard/supplier",
            icon: getIcon('eva:people-fill'),
          }

    ],
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;

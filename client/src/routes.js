import Admin from './pages/Admin';
import Basket from './pages/Basket';
import Auth from './pages/Auth';
import Bank from './pages/Bank';
import DevicePage from './pages/DevicePage';
import Activation from './pages/Activation';
import { ACTIVATION_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, BANK_ROUTE, CARDS_ROUTE } from "./utils/consts";
import Cards from './pages/Cards';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: ACTIVATION_ROUTE,
        Component: Activation
    }
]

export const publicRoutes = [
    {
        path: BANK_ROUTE,
        Component: Bank
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: CARDS_ROUTE,
        Component: Cards
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    }
]
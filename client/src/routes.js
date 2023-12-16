import Admin from './pages/Admin';
import Basket from './pages/Basket';
import Auth from './pages/Auth';
import Bank from './pages/Bank';
import DevicePage from './pages/DevicePage';
import Activation from './pages/Activation';
import { ACTIVATION_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, BANK_ROUTE, CARDS_ROUTE, PERSONAL_ACCOUNT_ROUTE, WORKER_ROUTE } from "./utils/consts";
import Cards from './pages/Cards';
import PersonalAccount from './pages/PersonalAccount';
import Worker from './pages/Worker';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ACTIVATION_ROUTE,
        Component: Activation
    },
    {
        path: PERSONAL_ACCOUNT_ROUTE,
        Component: PersonalAccount
    },
    {
        path: WORKER_ROUTE,
        Component: Worker
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
    }
]
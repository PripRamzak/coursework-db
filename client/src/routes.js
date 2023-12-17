import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Bank from './pages/Bank';
import Activation from './pages/Activation';
import Cards from './pages/Cards';
import PersonalAccount from './pages/PersonalAccount';
import Worker from './pages/Worker';
import Loans from './pages/Loans';
import { ACTIVATION_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, BANK_ROUTE, CARDS_ROUTE, PERSONAL_ACCOUNT_ROUTE, WORKER_ROUTE, LOANS_ROUTE } from "./utils/consts";

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
    },
    {
        path: LOANS_ROUTE,
        Component: Loans
    }
]
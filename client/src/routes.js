import Auth from './pages/Auth';
import Bank from './pages/Bank';
import Activation from './pages/Activation';
import Cards from './pages/Cards';
import PersonalAccount from './pages/PersonalAccount';
import Loans from './pages/Loans';
import { ACTIVATION_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, BANK_ROUTE, CARDS_ROUTE, PERSONAL_ACCOUNT_ROUTE, WORKER_ROUTE, LOANS_ROUTE, PAYMENTS_ROUTE, USRES_ROUTE, PRODUCT_REQUESTS_ROUTE, ACTIVATION_REQUESTS_ROUTE } from "./utils/consts";
import WorkerCards from './pages/WorkerCards';
import WorkerLoans from './pages/WorkerLoans';
import Payments from './pages/Payments';
import AdminPayments from './pages/AdminPayments';
import AdminUsers from './pages/AdminUsers';
import AdminCards from './pages/AdminCards';
import AdminLoans from './pages/AdminLoans';
import WorkerProductRequests from './pages/WorkerProductRequests';
import WorkerActivationRequests from './pages/WorkerActivationRequests';

export const adminRoutes = [
    {
        path: ADMIN_ROUTE + PAYMENTS_ROUTE,
        Component: AdminPayments
    },
    {
        path: ADMIN_ROUTE + USRES_ROUTE,
        Component: AdminUsers
    },
    {
        path: ADMIN_ROUTE + CARDS_ROUTE,
        Component: AdminCards
    },
    {
        path: ADMIN_ROUTE + LOANS_ROUTE,
        Component: AdminLoans
    }
]

export const workerRoutes = [
    {
        path: WORKER_ROUTE + PRODUCT_REQUESTS_ROUTE,
        Component: WorkerProductRequests
    },
    {
        path: WORKER_ROUTE + ACTIVATION_REQUESTS_ROUTE,
        Component: WorkerActivationRequests
    },
    {
        path: WORKER_ROUTE + CARDS_ROUTE,
        Component: WorkerCards
    },
    {
        path: WORKER_ROUTE + LOANS_ROUTE,
        Component: WorkerLoans
    }
]

export const authRoutes = [
    {
        path: ACTIVATION_ROUTE,
        Component: Activation
    },
    {
        path: PERSONAL_ACCOUNT_ROUTE,
        Component: PersonalAccount
    },
    {
        path: PAYMENTS_ROUTE,
        Component: Payments
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
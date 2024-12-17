import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DeviceStore from './store/DeviceStore';
import AccountStore from './store/AccountStore';
import CardStore from './store/CardStore';
import LoanStore from './store/LoanStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        account: new AccountStore(),
        device: new DeviceStore(),
        card: new CardStore(),
        loan: new LoanStore()
    }}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Context.Provider>
);
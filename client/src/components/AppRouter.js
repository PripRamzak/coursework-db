import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { BANK_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const { account } = useContext(Context);
    console.log(account);

    return (
        <Routes>
            {account.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            <Route path="*" element={<Navigate to={BANK_ROUTE} replace />}
            />
        </Routes>
    )
})

export default AppRouter;

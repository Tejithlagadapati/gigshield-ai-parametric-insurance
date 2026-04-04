import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import { clearClaim, clearPolicy, findUserByEmail, resetLegacyTestDataOnce } from './utils/storage';
import { clearSession, getSessionUserEmail, setSessionUserEmail } from './utils/auth';

function App() {
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        resetLegacyTestDataOnce();

        const sessionEmail = getSessionUserEmail();
        if (!sessionEmail) {
            return;
        }

        const user = findUserByEmail(sessionEmail);
        if (!user) {
            clearSession();
            return;
        }

        setWorker(user);
    }, []);

    const handleRegistered = (newUser) => {
        setWorker(newUser);
        setSessionUserEmail(newUser.email);
    };

    const handleLogin = (user) => {
        setWorker(user);
        setSessionUserEmail(user.email);
    };

    const handleLogout = () => {
        setWorker(null);
        clearPolicy();
        clearClaim();
        clearSession();
    };

    return React.createElement(
        'div',
        { className: 'app-container' },
        React.createElement(
            'header',
            { className: 'app-header' },
            React.createElement('h1', null, 'GigShield AI'),
            React.createElement('p', null, 'AI-powered parametric insurance simulation for gig delivery workers')
        ),
        worker
            ? React.createElement(DashboardPage, { worker, onLogout: handleLogout })
            : React.createElement(Home, {
                onRegistered: handleRegistered,
                onLogin: handleLogin
            })
    );
}

export default App;

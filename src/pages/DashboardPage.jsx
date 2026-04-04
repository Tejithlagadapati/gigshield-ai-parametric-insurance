import React from 'react';
import Dashboard from '../components/Dashboard';

function DashboardPage({ worker, onLogout }) {
    return <Dashboard worker={worker} onLogout={onLogout} />;
}

export default DashboardPage;

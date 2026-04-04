import React from 'react';
import Login from '../components/Login';
import Registration from '../components/Registration';

function Home({ onRegistered, onLogin }) {
    return (
        <div>
            <Login onLogin={onLogin} />
            <Registration onRegistered={onRegistered} />
        </div>
    );
}

export default Home;

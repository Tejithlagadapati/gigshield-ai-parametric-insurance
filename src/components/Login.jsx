import React, { useState } from 'react';
import { authenticateUser, getUsers } from '../utils/storage';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (getUsers().length === 0) {
            setError('No worker profile found. Please register first.');
            return;
        }

        const user = authenticateUser(email, password);
        if (!user) {
            setError('Invalid email or password.');
            return;
        }

        setError('');
        onLogin(user);
    };

    return (
        <section className="card">
            <h2 className="section-title">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="loginEmail">Email</label>
                    <input
                        id="loginEmail"
                        name="loginEmail"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your registered email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input
                        id="loginPassword"
                        name="loginPassword"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                {error && <p className="error-text">{error}</p>}

                <button className="btn btn-primary" type="submit">
                    Login to Dashboard
                </button>
            </form>
        </section>
    );
}

export default Login;

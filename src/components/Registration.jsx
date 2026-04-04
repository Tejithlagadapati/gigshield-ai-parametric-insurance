import React, { useState } from 'react';
import { clearClaim, clearPolicy, registerUser } from '../utils/storage';

function Registration({ onRegistered }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        platform: '',
        location: '',
        dailyIncome: ''
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const result = registerUser(form);
        if (!result.ok) {
            setError(result.error);
            return;
        }

        setError('');
        clearPolicy();
        clearClaim();
        onRegistered(result.user);
    };

    return (
        <section className="card">
            <h2 className="section-title">Worker Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        minLength="6"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="platform">Platform (Swiggy, Zomato, etc.)</label>
                    <input id="platform" name="platform" type="text" value={form.platform} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input id="location" name="location" type="text" value={form.location} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="dailyIncome">Daily Income</label>
                    <input
                        id="dailyIncome"
                        name="dailyIncome"
                        type="number"
                        min="1"
                        value={form.dailyIncome}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <p className="error-text">{error}</p>}

                <button className="btn btn-primary" type="submit">
                    Register & Go to Dashboard
                </button>
            </form>
        </section>
    );
}

export default Registration;

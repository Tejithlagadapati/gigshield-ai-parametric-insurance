import React, { useEffect, useState } from 'react';
import ClaimCard from './ClaimCard';
import PolicyCard from './PolicyCard';
import TriggerButtons from './TriggerButtons';
import { calculatePremium } from '../utils/premium';
import { createClaimFromTrigger, getRandomTriggerEvent, NO_DISASTER_EVENT } from '../utils/trigger';
import { appendClaimHistory, clearClaim, getClaim, getClaimHistoryByEmail, getPolicy, saveClaim, savePolicy } from '../utils/storage';

function Dashboard({ worker, onLogout }) {
    const [policy, setPolicy] = useState(null);
    const [claim, setClaim] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [claimHistory, setClaimHistory] = useState([]);
    const [historyFilter, setHistoryFilter] = useState('all');

    const filteredHistory = claimHistory.filter((item) => {
        if (historyFilter === 'severe') {
            return item.severity === 'Severe';
        }

        if (historyFilter === 'last7days') {
            if (!item.createdAt) {
                return false;
            }
            const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
            return new Date(item.createdAt).getTime() >= sevenDaysAgo;
        }

        return true;
    });

    useEffect(() => {
        setPolicy(getPolicy());
        setClaim(getClaim());
        setClaimHistory(getClaimHistoryByEmail(worker.email));
    }, []);

    const handleActivatePolicy = () => {
        const newPolicy = calculatePremium();
        savePolicy(newPolicy);
        clearClaim();
        setClaim(null);
        setPolicy(newPolicy);
        setStatusMessage('');
    };

    const handleTrigger = (type) => {
        if (type === NO_DISASTER_EVENT) {
            clearClaim();
            setClaim(null);
            setStatusMessage('No disaster detected at current location. No claim generated.');
            return;
        }

        const newClaim = createClaimFromTrigger(type, worker.dailyIncome);
        saveClaim(newClaim);
        appendClaimHistory(worker.email, newClaim);
        setClaim(newClaim);
        setClaimHistory(getClaimHistoryByEmail(worker.email));
        setStatusMessage('');
    };

    useEffect(() => {
        if (!policy || claim) {
            return;
        }

        const timer = setTimeout(() => {
            handleTrigger(getRandomTriggerEvent());
        }, 3000);

        return () => clearTimeout(timer);
    }, [policy, claim]);

    return (
        <div>
            <section className="card">
                <div className="section-header">
                    <h2 className="section-title">Worker Details</h2>
                    <button className="btn btn-danger btn-inline" type="button" onClick={onLogout}>
                        Logout
                    </button>
                </div>
                <div className="grid">
                    <div>
                        <div className="label">Name</div>
                        <div className="value">{worker.name}</div>
                    </div>
                    <div>
                        <div className="label">Platform</div>
                        <div className="value">{worker.platform}</div>
                    </div>
                    <div>
                        <div className="label">Location</div>
                        <div className="value">{worker.location}</div>
                    </div>
                    <div>
                        <div className="label">Daily Income</div>
                        <div className="value">Rs {worker.dailyIncome.toFixed(2)}</div>
                    </div>
                </div>
            </section>

            <PolicyCard policy={policy} onActivate={handleActivatePolicy} />
            {policy && <TriggerButtons onTrigger={handleTrigger} />}

            {statusMessage && (
                <section className="card status-card">
                    <h3 className="section-title">Claim Update</h3>
                    <p className="muted-text no-claim-text">{statusMessage}</p>
                </section>
            )}

            <ClaimCard claim={claim} />

            <section className="card">
                <h3 className="section-title">Claims History</h3>
                <div className="filter-row">
                    <button
                        type="button"
                        className={`filter-chip ${historyFilter === 'all' ? 'filter-chip-active' : ''}`}
                        onClick={() => setHistoryFilter('all')}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        className={`filter-chip ${historyFilter === 'severe' ? 'filter-chip-active' : ''}`}
                        onClick={() => setHistoryFilter('severe')}
                    >
                        Severe Only
                    </button>
                    <button
                        type="button"
                        className={`filter-chip ${historyFilter === 'last7days' ? 'filter-chip-active' : ''}`}
                        onClick={() => setHistoryFilter('last7days')}
                    >
                        Last 7 Days
                    </button>
                </div>

                {filteredHistory.length === 0 ? (
                    <p className="muted-text">
                        {claimHistory.length === 0
                            ? 'No claims in history yet.'
                            : 'No claims match the selected filter.'}
                    </p>
                ) : (
                    <div className="history-list">
                        {filteredHistory.map((item, index) => (
                            <div className="history-item" key={`${item.createdAt}-${index}`}>
                                <div className="history-top">
                                    <span className="value">{item.type}</span>
                                    <span className="label">{new Date(item.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="history-meta">
                                    <span>Severity: {item.severity}</span>
                                    <span>Loss: Rs {Number(item.lossAmount).toFixed(2)}</span>
                                    <span>Status: {item.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Dashboard;

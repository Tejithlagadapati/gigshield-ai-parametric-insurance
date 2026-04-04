import React from 'react';

function PolicyCard({ policy, onActivate }) {
    return (
        <section className="card">
            <h3 className="section-title">Policy Information</h3>
            <button className="btn btn-success" onClick={onActivate} disabled={policy?.status === 'ACTIVE'}>
                Activate Weekly Insurance
            </button>

            {policy && (
                <div>
                    <p>
                        <strong>AI Calculated Premium:</strong> Rs {policy.premium.toFixed(2)}
                    </p>
                    <p className="muted-text">
                        <strong>Status:</strong> <span className="badge">{policy.status}</span>
                    </p>
                    <div className="alert">⚠️ High risk of disruption detected. Coverage active.</div>
                </div>
            )}
        </section>
    );
}

export default PolicyCard;

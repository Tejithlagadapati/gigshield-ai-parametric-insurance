import React from 'react';

function ClaimCard({ claim }) {
    if (!claim) {
        return null;
    }

    const getMeasuredValueLabel = () => {
        if (claim.type === 'Heavy Rain') {
            return 'Rainfall (mm)';
        }
        if (claim.type === 'Heat') {
            return 'Temperature (C)';
        }
        return 'AQI';
    };

    const getSeverityClass = () => {
        if (claim.severity === 'Moderate') {
            return 'severity-badge severity-moderate';
        }
        if (claim.severity === 'Severe') {
            return 'severity-badge severity-severe';
        }
        return 'severity-badge severity-mild';
    };

    return (
        <section className="card">
            <h3 className="section-title">Claim Status</h3>
            <div className="grid">
                <div>
                    <div className="label">Disruption Type</div>
                    <div className="value">{claim.type}</div>
                </div>
                <div>
                    <div className="label">{getMeasuredValueLabel()}</div>
                    <div className="value">{claim.value ?? '-'}</div>
                </div>
                <div>
                    <div className="label">Severity</div>
                    <div className={getSeverityClass()}>{claim.severity || 'Mild'}</div>
                </div>
                <div>
                    <div className="label">Loss Amount</div>
                    <div className="value">Rs {Number(claim.lossAmount).toFixed(2)}</div>
                </div>
                <div>
                    <div className="label">Status</div>
                    <div className="value">{claim.status}</div>
                </div>
                <div>
                    <div className="label">Payout</div>
                    <div className="value">{claim.payout}</div>
                </div>
            </div>
        </section>
    );
}

export default ClaimCard;

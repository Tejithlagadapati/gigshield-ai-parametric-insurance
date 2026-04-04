import React from 'react';
import { NO_DISASTER_EVENT } from '../utils/trigger';

function TriggerButtons({ onTrigger }) {
    return (
        <section className="card">
            <h3 className="section-title">Disruption Triggers</h3>
            <div className="btn-row">
                <button className="btn btn-trigger" type="button" onClick={() => onTrigger('Heavy Rain')}>
                    Simulate Heavy Rain
                </button>
                <button className="btn btn-trigger" type="button" onClick={() => onTrigger('Heat')}>
                    Simulate Heat
                </button>
                <button className="btn btn-trigger" type="button" onClick={() => onTrigger('Pollution')}>
                    Simulate Pollution
                </button>
                <button className="btn btn-neutral" type="button" onClick={() => onTrigger(NO_DISASTER_EVENT)}>
                    No Disaster at Location
                </button>
            </div>
            <p className="muted-text">Auto-trigger runs in 3 seconds after policy activation if no manual trigger is created.</p>
        </section>
    );
}

export default TriggerButtons;

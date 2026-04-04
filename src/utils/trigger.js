const DISRUPTIONS = ['Heavy Rain', 'Heat', 'Pollution'];
export const NO_DISASTER_EVENT = 'No Disaster';
const ALL_EVENTS = [...DISRUPTIONS, NO_DISASTER_EVENT];

export const getDisruptionEvents = () => DISRUPTIONS;

export const getRandomTriggerEvent = () => {
    const index = Math.floor(Math.random() * ALL_EVENTS.length);
    return ALL_EVENTS[index];
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRainfallSeverity = (rainfall) => {
    if (rainfall <= 40) {
        return { severity: 'Mild', lossFactor: 0.2 };
    }
    if (rainfall <= 70) {
        return { severity: 'Moderate', lossFactor: 0.5 };
    }
    return { severity: 'Severe', lossFactor: 0.8 };
};

const getHeatSeverity = (temperature) => {
    if (temperature <= 40) {
        return { severity: 'Mild', lossFactor: 0.2 };
    }
    if (temperature <= 45) {
        return { severity: 'Moderate', lossFactor: 0.5 };
    }
    return { severity: 'Severe', lossFactor: 0.8 };
};

const getPollutionSeverity = (aqi) => {
    if (aqi <= 200) {
        return { severity: 'Mild', lossFactor: 0.2 };
    }
    if (aqi <= 350) {
        return { severity: 'Moderate', lossFactor: 0.5 };
    }
    return { severity: 'Severe', lossFactor: 0.8 };
};

export const createClaimFromTrigger = (type, dailyIncome) => {
    let value = 0;
    let severityInfo = { severity: 'Mild', lossFactor: 0.2 };

    if (type === 'Heavy Rain') {
        value = randomInt(0, 100);
        severityInfo = getRainfallSeverity(value);
    } else if (type === 'Heat') {
        value = randomInt(35, 50);
        severityInfo = getHeatSeverity(value);
    } else {
        value = randomInt(100, 500);
        severityInfo = getPollutionSeverity(value);
    }

    return {
        type,
        value,
        severity: severityInfo.severity,
        lossAmount: Math.round(dailyIncome * severityInfo.lossFactor),
        status: 'APPROVED',
        payout: 'Credited'
    };
};

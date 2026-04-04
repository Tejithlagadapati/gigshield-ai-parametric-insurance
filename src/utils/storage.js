const USERS_KEY = 'users';
const POLICY_KEY = 'policy';
const CLAIM_KEY = 'claim';
const CLAIM_HISTORY_KEY = 'claimHistoryByUser';
const RESET_KEY = 'gigshieldResetV2';

const parseJSON = (value) => {
    if (!value) {
        return null;
    }

    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};

const normalizeEmail = (email) => email.trim().toLowerCase();

export const getUsers = () => parseJSON(localStorage.getItem(USERS_KEY)) || [];

export const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email) => {
    const normalized = normalizeEmail(email);
    return getUsers().find((user) => user.email === normalized) || null;
};

export const registerUser = (userInput) => {
    const email = normalizeEmail(userInput.email);
    const users = getUsers();

    if (users.some((user) => user.email === email)) {
        return {
            ok: false,
            error: 'This email is already registered. Please use another email.'
        };
    }

    const user = {
        name: userInput.name.trim(),
        email,
        password: userInput.password,
        platform: userInput.platform.trim(),
        location: userInput.location.trim(),
        dailyIncome: Number(userInput.dailyIncome)
    };

    saveUsers([...users, user]);
    return { ok: true, user };
};

export const authenticateUser = (email, password) => {
    const user = findUserByEmail(email);
    if (!user) {
        return null;
    }

    return user.password === password ? user : null;
};

export const resetLegacyTestDataOnce = () => {
    if (localStorage.getItem(RESET_KEY) === 'done') {
        return;
    }

    ['worker', 'policy', 'claim', 'isLoggedIn', 'sessionUserEmail', USERS_KEY, CLAIM_HISTORY_KEY].forEach((key) => {
        localStorage.removeItem(key);
    });

    localStorage.setItem(RESET_KEY, 'done');
};

export const getPolicy = () => parseJSON(localStorage.getItem(POLICY_KEY));
export const savePolicy = (policy) => localStorage.setItem(POLICY_KEY, JSON.stringify(policy));

export const getClaim = () => parseJSON(localStorage.getItem(CLAIM_KEY));
export const saveClaim = (claim) => localStorage.setItem(CLAIM_KEY, JSON.stringify(claim));

export const getClaimHistoryByEmail = (email) => {
    if (!email) {
        return [];
    }

    const allHistory = parseJSON(localStorage.getItem(CLAIM_HISTORY_KEY)) || {};
    return allHistory[email] || [];
};

export const appendClaimHistory = (email, claim) => {
    if (!email || !claim) {
        return;
    }

    const allHistory = parseJSON(localStorage.getItem(CLAIM_HISTORY_KEY)) || {};
    const userHistory = allHistory[email] || [];

    const entry = {
        ...claim,
        createdAt: new Date().toISOString()
    };

    allHistory[email] = [entry, ...userHistory];
    localStorage.setItem(CLAIM_HISTORY_KEY, JSON.stringify(allHistory));
};

export const clearPolicy = () => localStorage.removeItem(POLICY_KEY);
export const clearClaim = () => localStorage.removeItem(CLAIM_KEY);

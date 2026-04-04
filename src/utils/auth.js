const SESSION_KEY = 'sessionUserEmail';

export const getSessionUserEmail = () => localStorage.getItem(SESSION_KEY);

export const setSessionUserEmail = (email) => {
    localStorage.setItem(SESSION_KEY, email);
};

export const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
};

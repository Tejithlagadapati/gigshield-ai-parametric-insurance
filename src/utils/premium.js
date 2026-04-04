export const calculatePremium = () => {
    const riskScore = Math.random();
    const premium = 15 + riskScore * 25;

    return {
        riskScore,
        premium,
        status: 'ACTIVE'
    };
};

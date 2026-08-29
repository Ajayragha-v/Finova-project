function calculateProfitMargin(profit, revenue) {
    if (!Number.isFinite(profit) || !Number.isFinite(revenue)) {
        throw new Error("Profit and revenue must be valid numbers.");
    }

    if (revenue <= 0) {
        return 0;
    }

    return (profit / revenue) * 100;
}

module.exports = calculateProfitMargin;
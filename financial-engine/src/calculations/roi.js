function calculateROI(profit, investment) {
    if (!Number.isFinite(profit)) {
        throw new Error("Profit must be a valid number.");
    }

    if (!Number.isFinite(investment) || investment <= 0) {
        throw new Error("Investment must be greater than zero.");
    }

    return (profit / investment) * 100;
}

module.exports = calculateROI;
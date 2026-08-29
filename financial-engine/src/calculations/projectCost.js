function calculateProjectCost(marginCapital) {
    if (!Number.isFinite(marginCapital) || marginCapital <= 0) {
        throw new Error("Margin capital must be greater than zero.");
    }

    return marginCapital / 0.10;
}

module.exports = calculateProjectCost;
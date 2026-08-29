function calculateBreakEvenUnits(fixedCosts, sellingPrice, variableCost) {
    if (!Number.isFinite(fixedCosts) || fixedCosts < 0) {
        throw new Error("Fixed costs must be zero or greater.");
    }

    if (!Number.isFinite(sellingPrice) || sellingPrice <= 0) {
        throw new Error("Selling price must be greater than zero.");
    }

    if (!Number.isFinite(variableCost) || variableCost < 0) {
        throw new Error("Variable cost must be zero or greater.");
    }

    const contributionPerUnit = sellingPrice - variableCost;

    if (contributionPerUnit <= 0) {
        throw new Error("Selling price must be greater than variable cost.");
    }

    return fixedCosts / contributionPerUnit;
}

module.exports = calculateBreakEvenUnits;
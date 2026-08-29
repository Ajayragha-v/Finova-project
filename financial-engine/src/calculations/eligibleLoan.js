function calculateEligibleLoan(calculatedLoan, schemeMaximumLoan) {
    if (!Number.isFinite(calculatedLoan) || calculatedLoan <= 0) {
        throw new Error("Calculated loan must be greater than zero.");
    }

    if (!Number.isFinite(schemeMaximumLoan) || schemeMaximumLoan <= 0) {
        throw new Error("Scheme maximum loan must be greater than zero.");
    }

    return Math.min(calculatedLoan, schemeMaximumLoan);
}

module.exports = calculateEligibleLoan;
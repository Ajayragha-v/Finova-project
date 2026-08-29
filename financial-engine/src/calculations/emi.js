function calculateEMI(principal, annualInterestRate, tenureYears, moratoriumMonths = 0) {
    if (!Number.isFinite(principal) || principal <= 0) {
        throw new Error("Loan amount must be greater than zero.");
    }

    if (!Number.isFinite(annualInterestRate) || annualInterestRate < 0) {
        throw new Error("Interest rate cannot be negative.");
    }

    if (!Number.isFinite(tenureYears) || tenureYears <= 0) {
        throw new Error("Loan tenure must be greater than zero.");
    }

    if (!Number.isFinite(moratoriumMonths) || moratoriumMonths < 0) {
        throw new Error("Moratorium cannot be negative.");
    }

    const totalMonths = tenureYears * 12;

    if (moratoriumMonths >= totalMonths) {
        throw new Error("Moratorium cannot be equal to or greater than loan tenure.");
    }

    const repaymentMonths = totalMonths - moratoriumMonths;
    const monthlyRate = annualInterestRate / 12 / 100;

    if (monthlyRate === 0) {
        return principal / repaymentMonths;
    }

    const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) /
        (Math.pow(1 + monthlyRate, repaymentMonths) - 1);

    return emi;
}

module.exports = calculateEMI;
function selectScheme(projectCost) {
    if (typeof projectCost !== "number" || !Number.isFinite(projectCost)) {
        throw new Error("Project cost must be a valid number.");
    }

    if (projectCost <= 0) {
        throw new Error("Project cost must be greater than zero.");
    }

    if (projectCost <= 140000) {
        return {
            scheme: "Micro Finance Scheme",
            interestRate: 6.5,
            tenureYears: 3,
            moratoriumMonths: 3,
            maximumLoan: 125000
        };
    }

    if (projectCost <= 5000000) {
        return {
            scheme: "Term Loan Scheme",
            interestRate: 8,
            tenureYears: 7,
            moratoriumMonths: 6,
            maximumLoan: 4500000
        };
    }

    return {
        scheme: null,
        eligible: false,
        reason: "Project cost exceeds the ₹50 lakh maximum limit."
    };
}

module.exports = selectScheme;
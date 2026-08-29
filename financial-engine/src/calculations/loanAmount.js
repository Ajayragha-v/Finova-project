function calculateLoanAmount(projectCost) {
    if (!Number.isFinite(projectCost) || projectCost <= 0) {
        throw new Error("Project cost must be greater than zero.");
    }

    return projectCost * 0.90;
}

module.exports = calculateLoanAmount;
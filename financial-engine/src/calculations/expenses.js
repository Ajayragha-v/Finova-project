function calculateTotalExpenses(expenses) {
    if (!expenses || typeof expenses !== "object") {
        throw new Error("Expenses must be provided as an object.");
    }

    const values = Object.values(expenses);

    for (const expense of values) {
        if (!Number.isFinite(expense) || expense < 0) {
            throw new Error("Expenses must contain valid numbers.");
        }
    }

    return values.reduce((total, expense) => total + expense, 0);
}

module.exports = calculateTotalExpenses;
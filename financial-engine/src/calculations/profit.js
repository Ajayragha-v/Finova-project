function calculateProfit(revenue, expenses) {
    if (!Number.isFinite(revenue) || !Number.isFinite(expenses)) {
        throw new Error("Revenue and expenses must be valid numbers.");
    }

    return revenue - expenses;
}

module.exports = calculateProfit;
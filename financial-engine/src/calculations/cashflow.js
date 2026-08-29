function calculateCashFlow(cashInflow, cashOutflow) {
    if (!Number.isFinite(cashInflow) || !Number.isFinite(cashOutflow)) {
        throw new Error("Cash inflow and outflow must be valid numbers.");
    }

    return cashInflow - cashOutflow;
}

module.exports = calculateCashFlow;
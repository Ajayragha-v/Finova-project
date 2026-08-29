function calculateOverallFeasibility({
    profit,
    emi,
    opportunity,
    competitorCount,
    marketPopulation
}) {
    if (!Number.isFinite(profit)) {
        throw new Error("Profit must be a valid number.");
    }

    if (!Number.isFinite(emi) || emi < 0) {
        throw new Error("EMI must be zero or greater.");
    }

    if (!Number.isFinite(competitorCount) || competitorCount < 0) {
        throw new Error("Competitor count must be zero or greater.");
    }

    if (!Number.isFinite(marketPopulation) || marketPopulation < 0) {
        throw new Error("Market population must be zero or greater.");
    }

    let score = 0;
    const reasons = [];

    if (profit > 0) {
        score += 25;
        reasons.push("The business is currently profitable");
    } else {
        reasons.push("The business is currently not profitable");
    }

    if (emi === 0) {
        score += 35;
        reasons.push("There is no monthly loan repayment burden");
    } else if (profit <= 0) {
        reasons.push("Loan repayment cannot currently be supported by profit");
    } else {
        const emiRatio = emi / profit;

        if (emiRatio <= 0.3) {
            score += 35;
            reasons.push("Loan repayment is comfortably supported by profit");
        } else if (emiRatio <= 0.5) {
            score += 28;
            reasons.push("Loan repayment is reasonably supported by profit");
        } else if (emiRatio <= 0.6) {
            score += 20;
            reasons.push("Loan repayment is manageable but should be monitored");
        } else if (emiRatio <= 0.75) {
            score += 10;
            reasons.push("A large portion of profit will be used for loan repayment");
        } else if (emiRatio <= 1) {
            score += 3;
            reasons.push("Most of the profit will be used for loan repayment");
        } else {
            reasons.push("Loan repayment is higher than the current profit");
        }
    }

    if (opportunity === "High") {
        score += 20;
        reasons.push("The local market shows strong potential");
    } else if (opportunity === "Medium") {
        score += 12;
        reasons.push("The local market shows moderate potential");
    } else {
        score += 3;
        reasons.push("The local market shows limited potential");
    }

    if (marketPopulation >= 20000) {
        score += 10;
        reasons.push("A large potential customer base is available");
    } else if (marketPopulation >= 10000) {
        score += 7;
        reasons.push("A moderate potential customer base is available");
    } else if (marketPopulation >= 5000) {
        score += 4;
        reasons.push("A smaller potential customer base is available");
    } else {
        score += 1;
        reasons.push("The potential local customer base is relatively small");
    }

    if (competitorCount <= 2) {
        score += 10;
        reasons.push("There are relatively few nearby competitors");
    } else if (competitorCount <= 4) {
        score += 6;
        reasons.push("There is moderate local competition");
    } else {
        score += 2;
        reasons.push("There is relatively high local competition");
    }

    score = Math.max(0, Math.min(100, Math.round(score)));

    let overallFeasibility;
    let recommendation;

    if (score >= 75) {
        overallFeasibility = "High";
        recommendation = "Proceed";
    } else if (score >= 50) {
        overallFeasibility = "Moderate";
        recommendation = "Proceed with caution";
    } else {
        overallFeasibility = "Low";
        recommendation = "Reconsider";
    }

    return {
        score,
        overallFeasibility,
        recommendation,
        reasons
    };
}

module.exports = calculateOverallFeasibility;
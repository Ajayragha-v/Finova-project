function generateSWOT(category, population, competitorCount) {
    const strengths = [
        "Access to a defined local customer base",
        `Business focused on the ${category} sector`
    ];

    const weaknesses = [
        "Limited initial market information",
        "Dependence on local purchasing power"
    ];

    const opportunities = [];

    if (population >= 10000) {
        opportunities.push("Large potential local customer base");
    } else {
        opportunities.push("Potential to expand into nearby markets");
    }

    if (competitorCount <= 2) {
        opportunities.push("Low local competition");
    }

    const threats = [
        "Supply chain and transportation challenges",
        "Changes in local demand"
    ];

    return {
        category,
        strengths,
        weaknesses,
        opportunities,
        threats
    };
}
module.exports = generateSWOT;

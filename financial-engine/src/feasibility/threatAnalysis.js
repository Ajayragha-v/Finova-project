function analyzeThreats(category, competitorCount) {
    const threats = [];

    if (competitorCount >= 5) {
        threats.push("High local competition");
    }

    const seasonalBusinesses = ["dairy", "agriculture", "textiles"];

    if (seasonalBusinesses.includes(category.toLowerCase())) {
        threats.push("Seasonal demand fluctuations");
    }

    threats.push("Supply chain and transportation risk");

    return {
        category,
        threatCount: threats.length,
        threats
    };
}

module.exports = analyzeThreats;

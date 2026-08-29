function analyzeOpportunity(population, competitorCount) {
    if (!Number.isFinite(population) || population < 0) {
        throw new Error("Population must be a valid number.");
    }

    if (!Number.isFinite(competitorCount) || competitorCount < 0) {
        throw new Error("Competitor count must be a valid number.");
    }

    let opportunity;
    let competitionLevel;

    if (competitorCount === 0) {
        competitionLevel = "Very Low";
        opportunity = "Very High";
    } else if (competitorCount <= 2) {
        competitionLevel = "Low";
        opportunity = "High";
    } else if (competitorCount <= 5) {
        competitionLevel = "Moderate";
        opportunity = "Moderate";
    } else {
        competitionLevel = "High";
        opportunity = "Low";
    }

    return {
        population,
        competitorCount,
        competitionLevel,
        opportunity
    };
}

module.exports = analyzeOpportunity;

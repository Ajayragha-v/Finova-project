const competitors = require("../data/competitorData");
const calculateDistance = require("./distance");

function calculateCompetitors(target, category) {
    const results = [];

    for (const competitor of competitors) {
        if (competitor.category.toLowerCase() !== category.toLowerCase()) {
            continue;
        }

        const distance = calculateDistance(
            target.latitude,
            target.longitude,
            competitor.latitude,
            competitor.longitude
        );

        if (distance <= 10) {
            results.push({
                name: competitor.name,
                category: competitor.category,
                distanceKm: Number(distance.toFixed(2))
            });
        }
    }
    return {
        category,
        totalCompetitors: results.length,
        competitors: results
    };
}
module.exports = calculateCompetitors;

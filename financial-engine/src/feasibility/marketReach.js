const villages = require("../data/villageData");
const calculateDistance = require("./distance");

function calculateMarketReach(targetVillage) {
    const target = villages.find(
        village =>
            village.name.toLowerCase() === targetVillage.toLowerCase()
    );

    if (!target) {
        throw new Error("Village not found.");
    }

    let population5Km = 0;
    let population10Km = 0;

    const nearbyVillages = [];

    for (const village of villages) {
        const distance = calculateDistance(
            target.latitude,
            target.longitude,
            village.latitude,
            village.longitude
        );

        if (distance <= 10) {
            population10Km += village.population;

            if (distance <= 5) {
                population5Km += village.population;
            }

            nearbyVillages.push({
                name: village.name,
                population: village.population,
                distanceKm: Number(distance.toFixed(2))
            });
        }
    }

    return {
        village: target.name,
        marketReach: {
            within5Km: population5Km,
            within10Km: population10Km
        },
        nearbyVillages
    };
}

module.exports = calculateMarketReach;

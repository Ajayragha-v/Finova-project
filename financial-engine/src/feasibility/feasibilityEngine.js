const marketReach = require("./marketReach");
const competitorMapping = require("./competitorMapping");
const opportunityAnalysis = require("./opportunityAnalysis");
const threatAnalysis = require("./threatAnalysis");
const swotAnalysis = require("./swotAnalysis");
const villages = require("../data/villageData");
const productMarketValue = require("./productMarketValue");

function analyzeFeasibility(villageName, category) {
  const village = villages.find(
    (v) => v.name.toLowerCase() === villageName.toLowerCase(),
  );

  if (!village) {
    throw new Error("Village not found.");
  }

  const market = marketReach(villageName);

  const competitors = competitorMapping(village, category);

  const opportunity = opportunityAnalysis(
    market.marketReach.within10Km,
    competitors.totalCompetitors,
  );

  const threats = threatAnalysis(category, competitors.totalCompetitors);

  const swot = swotAnalysis(
    category,
    market.marketReach.within10Km,
    competitors.totalCompetitors,
  );
  const productValue = productMarketValue(category, 100);

  return {
    location: village,
    marketReach: market,
    competitors,
    opportunity,
    threats,
    swot,
    productMarketValue: productValue
  };
}
module.exports = analyzeFeasibility;

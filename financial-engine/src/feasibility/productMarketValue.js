function analyzeProductMarketValue(category, sellingPrice) {
    if (!Number.isFinite(sellingPrice) || sellingPrice <= 0) {
        throw new Error("Selling price must be greater than zero.");
    }

    let pricingStrategy;

    if (category.toLowerCase() === "dairy") {
        pricingStrategy = "Competitive local pricing with freshness premium";
    } else if (category.toLowerCase() === "retail") {
        pricingStrategy = "Competitive pricing with volume-based discounts";
    } else if (category.toLowerCase() === "textiles") {
        pricingStrategy = "Market-based pricing with product differentiation";
    } else {
        pricingStrategy = "Compare local competitors and use market-based pricing";
    }

    return {
        category,
        currentSellingPrice: sellingPrice,
        pricingStrategy
    };
}

module.exports = analyzeProductMarketValue;

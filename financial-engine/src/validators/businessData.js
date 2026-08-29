function validateBusinessData(data) {
    const errors = [];

    if (!data || typeof data !== "object") {
        errors.push("Business data must be an object.");
        return errors;
    }

    const fields = [
        "revenue",
        "cashInflow",
        "cashOutflow",
        "fixedCosts",
        "sellingPrice",
        "variableCost",
        "marginCapital",
        "investment"
    ];

    fields.forEach(field => {
        if (typeof data[field] !== "number" || !Number.isFinite(data[field])) {
            errors.push(`${field} must be a valid number.`);
        } else if (data[field] < 0) {
            errors.push(`${field} cannot be negative.`);
        }
    });

    if (!data.expenses || typeof data.expenses !== "object") {
        errors.push("Expenses must be provided as an object.");
    } else {
        for (const [name, value] of Object.entries(data.expenses)) {
            if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
                errors.push(`${name} expense must be a valid number.`);
            }
        }
    }

    if (
        typeof data.sellingPrice === "number" &&
        typeof data.variableCost === "number" &&
        data.sellingPrice <= data.variableCost
    ) {
        errors.push("Selling price must be greater than variable cost.");
    }

    if (data.marginCapital <= 0) {
        errors.push("Margin capital must be greater than zero.");
    }

    if (data.investment <= 0) {
        errors.push("Investment must be greater than zero.");
    }

    return errors;
}

module.exports = validateBusinessData;
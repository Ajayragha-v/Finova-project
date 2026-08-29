const analyzeBusiness = require("./financialEngine");

const businessData = {
    village: "Sekuru",
    category: "dairy",
    revenue: 50000,

    expenses: {
        rent: 5000,
        salaries: 10000,
        materials: 12000,
        electricity: 3000,
        transport: 2000
    },

    cashInflow: 50000,
    cashOutflow: 32000,
    fixedCosts: 20000,
    sellingPrice: 100,
    variableCost: 60,
    investment: 100000,
    marginCapital: 100000
};

const result = analyzeBusiness(businessData);

console.log(JSON.stringify(result, null, 2));
const calculateProfit = require("./calculations/profit");
const calculateProfitMargin = require("./calculations/profitMargin");
const calculateTotalExpenses = require("./calculations/expenses");
const calculateCashFlow = require("./calculations/cashflow");
const calculateBreakEvenUnits = require("./calculations/breakeven");
const calculateROI = require("./calculations/roi");
const calculateProjectCost = require("./calculations/projectCost");
const calculateLoanAmount = require("./calculations/loanAmount");
const selectScheme = require("./calculations/schemeRouter");
const calculateEligibleLoan = require("./calculations/eligibleLoan");
const validateBusinessData = require("./validators/businessData");
const generateRepaymentSchedule = require("./calculations/repaymentSchedule");
const generateQuarterlyRepayment = require("./calculations/quarterlyRepayment");
const analyzeFeasibility = require("./feasibility/feasibilityEngine");
const calculateOverallFeasibility = require("./feasibility/overallFeasibility");

function analyzeBusiness(data) {
  const errors = validateBusinessData(data);

  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }
  const totalExpenses = calculateTotalExpenses(data.expenses);

  const profit = calculateProfit(data.revenue, totalExpenses);

  const profitMargin = calculateProfitMargin(profit, data.revenue);

  const cashFlow = calculateCashFlow(data.cashInflow, data.cashOutflow);

  const breakEvenUnits = calculateBreakEvenUnits(
    data.fixedCosts,
    data.sellingPrice,
    data.variableCost,
  );

  const roi = calculateROI(profit, data.investment);
  const feasibleProjectCost = calculateProjectCost(data.marginCapital);
  const calculatedLoan = calculateLoanAmount(feasibleProjectCost);

  const scheme = selectScheme(feasibleProjectCost);

  let eligibleLoan = 0;
  let repayment = null;
  if (scheme.eligible !== false) {
    eligibleLoan = calculateEligibleLoan(calculatedLoan, scheme.maximumLoan);

    const repaymentSchedule = generateRepaymentSchedule(
      eligibleLoan,
      scheme.interestRate,
      scheme.tenureYears,
      scheme.moratoriumMonths,
    );

    const quarterlySchedule = generateQuarterlyRepayment(
      repaymentSchedule.schedule,
    );
    repayment = {
      emi: repaymentSchedule.emi,
      totalMonths: repaymentSchedule.totalMonths,
      repaymentMonths:
        repaymentSchedule.totalMonths - repaymentSchedule.moratoriumMonths,
      moratoriumMonths: repaymentSchedule.moratoriumMonths,
      monthlySchedule: repaymentSchedule.schedule,
      quarterlySchedule,
    };
  }

  const feasibility = analyzeFeasibility(data.village, data.category);
  const overallFeasibility = calculateOverallFeasibility({
    profit,
    emi: repayment ? repayment.emi : 0,
    opportunity: feasibility.opportunity.opportunity,
    competitorCount: feasibility.competitors.totalCompetitors,
    marketPopulation: feasibility.marketReach.marketReach.within10Km,
  });
  return {
    financials: {
      revenue: data.revenue,
      totalExpenses,
      profit,
      profitMargin,
      cashFlow,
      breakEvenUnits,
      roi,
    },
    financing: {
      marginCapital: data.marginCapital,
      feasibleProjectCost,
      calculatedLoan,
      eligibleLoan,
      scheme: scheme.scheme,
      interestRate: scheme.interestRate,
      tenureYears: scheme.tenureYears,
      moratoriumMonths: scheme.moratoriumMonths,
      emi: repayment ? repayment.emi : 0,
    },
    repayment,
    feasibility,
    overallFeasibility
  };
}

module.exports = analyzeBusiness;

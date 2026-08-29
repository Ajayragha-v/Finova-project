function generateQuarterlyRepayment(monthlySchedule) {
  if (!Array.isArray(monthlySchedule)) {
    throw new Error("Monthly repayment schedule must be an array.");
  }

  const quarterlySchedule = [];

  for (let i = 0; i < monthlySchedule.length; i += 3) {
    const quarterMonths = monthlySchedule.slice(i, i + 3);

    const totalPayment = quarterMonths.reduce(
      (sum, month) => sum + month.payment,
      0,
    );

    const totalInterest = quarterMonths.reduce(
      (sum, month) => sum + month.interest,
      0,
    );

    const totalPrincipal = quarterMonths.reduce(
      (sum, month) => sum + month.principal,
      0,
    );

    const endingBalance =
      quarterMonths[quarterMonths.length - 1].remainingBalance;

    const isMoratorium = quarterMonths.every((month) => month.payment === 0);

    quarterlySchedule.push({
      quarter: Math.floor(i / 3) + 1,
      months: `${quarterMonths[0].month}-${quarterMonths[quarterMonths.length - 1].month}`,
      totalPayment: Number(totalPayment.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      totalPrincipal: Number(totalPrincipal.toFixed(2)),
      endingBalance: Number(endingBalance.toFixed(2)),
      moratorium: isMoratorium,
    });
  }
  return quarterlySchedule;
}
module.exports = generateQuarterlyRepayment;

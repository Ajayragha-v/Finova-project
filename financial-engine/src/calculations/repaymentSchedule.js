function generateRepaymentSchedule(
    loanAmount,
    annualInterestRate,
    tenureYears,
    moratoriumMonths
) {
    if (!Number.isFinite(loanAmount) || loanAmount <= 0) {
        throw new Error("Loan amount must be greater than zero.");
    }

    if (!Number.isFinite(annualInterestRate) || annualInterestRate < 0) {
        throw new Error("Interest rate cannot be negative.");
    }

    if (!Number.isFinite(tenureYears) || tenureYears <= 0) {
        throw new Error("Tenure must be greater than zero.");
    }

    if (!Number.isFinite(moratoriumMonths) || moratoriumMonths < 0) {
        throw new Error("Moratorium cannot be negative.");
    }

    const totalMonths = tenureYears * 12;

    if (moratoriumMonths >= totalMonths) {
        throw new Error("Moratorium cannot be equal to or greater than loan tenure.");
    }

    const repaymentMonths = totalMonths - moratoriumMonths;
    const monthlyRate = annualInterestRate / 12 / 100;

    let emi;

    if (monthlyRate === 0) {
        emi = loanAmount / repaymentMonths;
    } else {
        const factor = Math.pow(1 + monthlyRate, repaymentMonths);
        emi = (loanAmount * monthlyRate * factor) / (factor - 1);
    }

    const schedule = [];
    let remainingBalance = loanAmount;

    for (let month = 1; month <= totalMonths; month++) {
        const interest = remainingBalance * monthlyRate;

        let payment = 0;
        let principal = 0;

        if (month > moratoriumMonths) {
            payment = emi;
            principal = payment - interest;

            if (principal >= remainingBalance) {
                principal = remainingBalance;
                payment = principal + interest;
            }

            remainingBalance -= principal;
        }

        if (Math.abs(remainingBalance) < 0.01) {
            remainingBalance = 0;
        }

        schedule.push({
            month,
            payment: Number(payment.toFixed(2)),
            interest: Number(interest.toFixed(2)),
            principal: Number(principal.toFixed(2)),
            remainingBalance: Number(remainingBalance.toFixed(2))
        });
    }

    return {
        emi: Number(emi.toFixed(2)),
        totalMonths,
        moratoriumMonths,
        schedule
    };
}

module.exports = generateRepaymentSchedule;
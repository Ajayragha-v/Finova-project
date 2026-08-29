const form = document.getElementById("businessForm");
const result = document.getElementById("result");

function money(value) {
    if (!Number.isFinite(Number(value))) return "₹0";

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(Number(value));
}

function number(value) {
    if (!Number.isFinite(Number(value))) return "0";

    return new Intl.NumberFormat("en-IN").format(Number(value));
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getValue(id) {
    const element = document.getElementById(id);

    if (!element) {
        throw new Error(`Missing field: ${id}`);
    }

    return element.value;
}

function buildData() {
    return {
        revenue: Number(getValue("revenue")),

        expenses: {
            rawMaterial: Number(getValue("rawMaterial")),
            labor: Number(getValue("labor")),
            rent: Number(getValue("rent")),
            utilities: Number(getValue("utilities")),
            other: Number(getValue("other"))
        },

        cashInflow: Number(getValue("cashInflow")),
        cashOutflow: Number(getValue("cashOutflow")),
        fixedCosts: Number(getValue("fixedCosts")),
        sellingPrice: Number(getValue("sellingPrice")),
        variableCost: Number(getValue("variableCost")),
        investment: Number(getValue("investment")),
        marginCapital: Number(getValue("marginCapital")),
        village: getValue("village"),
        category: getValue("category")
    };
}

function renderList(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return "<p class=\"empty-state\">No information available.</p>";
    }

    return items
        .map(item => `<div class="reason">${escapeHtml(item)}</div>`)
        .join("");
}

function renderCompetitors(competitors) {
    if (!Array.isArray(competitors) || competitors.length === 0) {
        return "<p class=\"empty-state\">No nearby competitors found.</p>";
    }

    return competitors.map(competitor => `
        <div class="data-row">
            <span>${escapeHtml(competitor.name)}</span>
            <strong>${competitor.distanceKm} km</strong>
        </div>
    `).join("");
}

function renderQuarterlySchedule(schedule) {
    if (!Array.isArray(schedule) || schedule.length === 0) {
        return "<p class=\"empty-state\">Repayment schedule unavailable.</p>";
    }

    return schedule.map(item => `
        <div class="repayment-row">
            <div>
                <strong>Quarter ${item.quarter}</strong>
                <span>Months ${escapeHtml(item.months)}</span>
            </div>

            <div>
                <strong>${money(item.totalPayment)}</strong>
                <span>${item.moratorium ? "Moratorium" : "Repayment"}</span>
            </div>

            <div>
                <strong>${money(item.endingBalance)}</strong>
                <span>Balance</span>
            </div>
        </div>
    `).join("");
}

function renderResults(output) {
    const financials = output.financials || {};
    const financing = output.financing || {};
    const feasibility = output.feasibility || {};
    const overall = output.overallFeasibility || {};
    const repayment = output.repayment || {};

    const location = feasibility.location || {};
    const marketReach = feasibility.marketReach || {};
    const opportunity = feasibility.opportunity || {};
    const competitors = feasibility.competitors || {};
    const threats = feasibility.threats || {};
    const swot = feasibility.swot || {};
    const productMarketValue = feasibility.productMarketValue || {};

    result.innerHTML = `
        <div class="results-card">

            <div class="result-top">

                <div class="score-card">
                    <span class="label">OVERALL FEASIBILITY</span>

                    <div class="score-number">
                        ${number(overall.score)}
                        <small>/100</small>
                    </div>

                    <span class="score-level">
                        ${escapeHtml(overall.overallFeasibility)}
                    </span>
                </div>

                <div class="recommendation-card">
                    <span>RECOMMENDATION</span>

                    <h3>
                        ${escapeHtml(overall.recommendation)}
                    </h3>

                    <p>
                        The assessment combines financial performance,
                        repayment capacity and local market conditions.
                    </p>
                </div>

            </div>

            <div class="metric-grid">

                <div class="metric">
                    <span>REVENUE</span>
                    <strong>${money(financials.revenue)}</strong>
                </div>

                <div class="metric">
                    <span>NET PROFIT</span>
                    <strong>${money(financials.profit)}</strong>
                </div>

                <div class="metric">
                    <span>PROFIT MARGIN</span>
                    <strong>${number(financials.profitMargin)}%</strong>
                </div>

                <div class="metric">
                    <span>MONTHLY EMI</span>
                    <strong>${money(financing.emi)}</strong>
                </div>

            </div>

            <div class="result-columns">

                <div class="result-box">
                    <h3>Financial health</h3>

                    <div class="data-row">
                        <span>Total expenses</span>
                        <strong>${money(financials.totalExpenses)}</strong>
                    </div>

                    <div class="data-row">
                        <span>Cash flow</span>
                        <strong>${money(financials.cashFlow)}</strong>
                    </div>

                    <div class="data-row">
                        <span>Break-even units</span>
                        <strong>${number(financials.breakEvenUnits)}</strong>
                    </div>

                    <div class="data-row">
                        <span>Return on investment</span>
                        <strong>${number(financials.roi)}%</strong>
                    </div>
                </div>

                <div class="result-box">
                    <h3>Loan analysis</h3>

                    <div class="data-row">
                        <span>Eligible loan</span>
                        <strong>${money(financing.eligibleLoan)}</strong>
                    </div>

                    <div class="data-row">
                        <span>Interest rate</span>
                        <strong>${number(financing.interestRate)}%</strong>
                    </div>

                    <div class="data-row">
                        <span>Tenure</span>
                        <strong>${number(financing.tenureYears)} years</strong>
                    </div>

                    <div class="data-row">
                        <span>Moratorium</span>
                        <strong>${number(financing.moratoriumMonths)} months</strong>
                    </div>
                </div>

            </div>

            <div class="result-box market-section">

                <div class="section-heading">
                    <div>
                        <span class="section-kicker">MARKET INTELLIGENCE</span>
                        <h3>Local market opportunity</h3>
                    </div>

                    <span class="market-badge">
                        ${escapeHtml(opportunity.opportunity || "N/A")}
                    </span>
                </div>

                <div class="metric-grid market-metrics">

                    <div class="metric">
                        <span>LOCATION</span>
                        <strong>${escapeHtml(location.name || "N/A")}</strong>
                    </div>

                    <div class="metric">
                        <span>WITHIN 5 KM</span>
                        <strong>${number(marketReach.marketReach?.within5Km)}</strong>
                    </div>

                    <div class="metric">
                        <span>WITHIN 10 KM</span>
                        <strong>${number(marketReach.marketReach?.within10Km)}</strong>
                    </div>

                    <div class="metric">
                        <span>COMPETITORS</span>
                        <strong>${number(competitors.totalCompetitors)}</strong>
                    </div>

                </div>

                <div class="result-columns">

                    <div>
                        <h4>Competition</h4>

                        <div class="data-row">
                            <span>Competition level</span>
                            <strong>${escapeHtml(opportunity.competitionLevel || "N/A")}</strong>
                        </div>

                        <div class="data-row">
                            <span>Category</span>
                            <strong>${escapeHtml(competitors.category || "N/A")}</strong>
                        </div>

                        ${renderCompetitors(competitors.competitors)}
                    </div>

                    <div>
                        <h4>Product market value</h4>

                        <div class="data-row">
                            <span>Category</span>
                            <strong>${escapeHtml(productMarketValue.category || "N/A")}</strong>
                        </div>

                        <div class="data-row">
                            <span>Current selling price</span>
                            <strong>${money(productMarketValue.currentSellingPrice)}</strong>
                        </div>

                        <div class="data-row">
                            <span>Pricing strategy</span>
                            <strong>${escapeHtml(productMarketValue.pricingStrategy || "N/A")}</strong>
                        </div>
                    </div>

                </div>

            </div>

            <div class="result-box">

                <div class="section-heading">
                    <div>
                        <span class="section-kicker">BUSINESS REVIEW</span>
                        <h3>SWOT analysis</h3>
                    </div>
                </div>

                <div class="swot-grid">

                    <div class="swot-card">
                        <span>STRENGTHS</span>
                        ${renderList(swot.strengths)}
                    </div>

                    <div class="swot-card">
                        <span>WEAKNESSES</span>
                        ${renderList(swot.weaknesses)}
                    </div>

                    <div class="swot-card">
                        <span>OPPORTUNITIES</span>
                        ${renderList(swot.opportunities)}
                    </div>

                    <div class="swot-card">
                        <span>THREATS</span>
                        ${renderList(swot.threats)}
                    </div>

                </div>

            </div>

            <div class="result-columns">

                <div class="result-box">

                    <div class="section-heading">
                        <div>
                            <span class="section-kicker">RISK REVIEW</span>
                            <h3>Key threats</h3>
                        </div>
                    </div>

                    <div class="reason-list">
                        ${renderList(threats.threats)}
                    </div>

                </div>

                <div class="result-box">

                    <div class="section-heading">
                        <div>
                            <span class="section-kicker">DECISION BASIS</span>
                            <h3>Why this score?</h3>
                        </div>
                    </div>

                    <div class="reason-list">
                        ${renderList(overall.reasons)}
                    </div>

                </div>

            </div>

            <div class="result-box repayment-section">

                <div class="section-heading">
                    <div>
                        <span class="section-kicker">LOAN REPAYMENT</span>
                        <h3>Quarterly repayment plan</h3>
                    </div>

                    <div class="repayment-summary">
                        <strong>${money(repayment.emi)}</strong>
                        <span>Monthly EMI</span>
                    </div>
                </div>

                <div class="repayment-list">
                    ${renderQuarterlySchedule(repayment.quarterlySchedule)}
                </div>

            </div>

            <button class="new-analysis" type="button" id="newAnalysis">
                Start another analysis
                <span>↗</span>
            </button>

        </div>
    `;

    const newAnalysis = document.getElementById("newAnalysis");

    if (newAnalysis) {
        newAnalysis.addEventListener("click", () => {
            form.reset();
            result.innerHTML = "";
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

form.addEventListener("submit", async event => {
    event.preventDefault();

    const button = form.querySelector("button");

    button.disabled = true;

    const buttonText = button.querySelector("span:first-child");

    if (buttonText) {
        buttonText.textContent = "Analyzing...";
    }

    result.innerHTML = `
        <div class="results-card">
            <div class="analysis-loading">
                <div class="loading-spinner"></div>
                <h3>Analyzing your business</h3>
                <p>Calculating financial health, loan capacity and market potential.</p>
            </div>
        </div>
    `;

    try {
        const data = buildData();

        const response = await fetch("http://localhost:3000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
            throw new Error("The server returned an unexpected response.");
        }

        const output = await response.json();

        if (!response.ok) {
            throw new Error(
                output.message ||
                output.error ||
                "Unable to analyze the business."
            );
        }

        renderResults(output);

    } catch (error) {
        result.innerHTML = `
            <div class="results-card">
                <div class="result-box error-box">
                    <span class="section-kicker">ANALYSIS ERROR</span>
                    <h3>We couldn't complete the analysis</h3>
                    <p>${escapeHtml(error.message)}</p>
                    <p class="error-help">
                        Make sure the financial engine is running on
                        <strong>localhost:3000</strong> and try again.
                    </p>
                </div>
            </div>
        `;

        result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } finally {
        button.disabled = false;

        if (buttonText) {
            buttonText.textContent = "Analyze feasibility";
        }
    }
});
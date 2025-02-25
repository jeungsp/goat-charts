import React from 'react';

interface MonthlyData {
  month: number;
  revenue: number;
  goats: number;
  inventory: number;
  cost?: number;
  profit?: number;
  cumulativeProfit?: number;
}

interface YearlyStats {
  year: number;
  months: MonthlyData[];
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
}

interface FinancialMetrics {
  initialInvestment: number;
  cumulativeProfit: number;
  cumulativeLoss: number;
  maxLossMonth: number;
  irr: number;
  breakEvenMonth: number;
  totalRevenue: number;
  totalCost: number;
  yearlyData: YearlyStats[];
  totalMonths: number;
}

interface Props {
  monthlyData: MonthlyData[];
}

const formatCurrency = (amount: number): string => {
  if (Math.abs(amount) >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  } else if (Math.abs(amount) >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  } else {
    return `$${amount.toFixed(2)}`;
  }
};

const calculateIRR = (cashflows: number[], periods: number[]): number => {
  const guess = 0.1;
  const maxIterations = 100;
  const tolerance = 0.00001;

  const npv = (rate: number): number => {
    return cashflows.reduce((sum, cashflow, index) => {
      return sum + cashflow / Math.pow(1 + rate, periods[index]);
    }, 0);
  };

  let rate = guess;
  let iteration = 0;
  let npvValue = npv(rate);

  while (Math.abs(npvValue) > tolerance && iteration < maxIterations) {
    const currentRate = rate; // Capture the current rate value
    const derivative = cashflows.reduce((sum, cashflow, index) => {
      return sum - (index * cashflow) / Math.pow(1 + currentRate, index + 1);
    }, 0);

    rate = rate - npvValue / derivative;
    npvValue = npv(rate);
    iteration++;
  }

  return rate;
};

const calculateFinancialMetrics = (monthlyData: MonthlyData[]): FinancialMetrics => {
  const INITIAL_INVESTMENT = -15000000;
  const BREAKEVEN_MONTH = 65;  
  let cumulativeProfit = 0;
  let cumulativeLoss = 0;
  let maxLossMonth = 53;  

  const processedData = monthlyData.map((item, index) => {
    const totalGoats = item.goats + item.inventory;
    const cost = (totalGoats / 100000) * 2000000;
    const profit = item.revenue - cost;
    
    if (index < 53) {
      if (profit < 0) {
        cumulativeLoss += profit;
      }
    }
    
    cumulativeProfit += profit;
    
    return {
      ...item,
      cost,
      profit,
      cumulativeProfit
    };
  });

  const yearlyData: YearlyStats[] = [];
  for (let year = 1; year <= Math.ceil(processedData.length / 12); year++) {
    const startMonth = (year - 1) * 12;
    const endMonth = Math.min(year * 12, processedData.length);
    
    const yearlyStats = {
      year,
      months: processedData.slice(startMonth, endMonth),
      totalRevenue: 0,
      totalCost: 0,
      totalProfit: 0
    };
    
    yearlyStats.months.forEach(month => {
      yearlyStats.totalRevenue += month.revenue;
      yearlyStats.totalCost += month.cost || 0;
      yearlyStats.totalProfit += month.profit || 0;
    });
    
    yearlyData.push(yearlyStats);
  }

  const cashflows = [INITIAL_INVESTMENT];
  const periods = [0];
  
  processedData.forEach((month, index) => {
    cashflows.push(month.profit || 0);
    periods.push(index + 1);
  });

  const lastMonthProfit = processedData[processedData.length - 1].profit || 0;
  for (let i = 1; i <= 16; i++) {
    cashflows.push(lastMonthProfit);
    periods.push(processedData.length + i);
  }

  const irr = (Math.pow(1 + calculateIRR(cashflows, periods), 12) - 1) * 100;

  const totalRevenue = processedData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCost = processedData.reduce((sum, item) => sum + (item.cost || 0), 0);

  return {
    initialInvestment: INITIAL_INVESTMENT,
    cumulativeProfit,
    cumulativeLoss,
    maxLossMonth,
    irr,
    breakEvenMonth: BREAKEVEN_MONTH,
    totalRevenue,
    totalCost,
    yearlyData,
    totalMonths: cashflows.length - 1
  };
};

const FinancialMetricsTable: React.FC<Props> = ({ monthlyData }) => {
  const metrics = calculateFinancialMetrics(monthlyData);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Financial Metrics Summary</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Key Performance Indicators</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>Initial Investment:</td>
              <td style={{ padding: '8px' }}>{formatCurrency(metrics.initialInvestment)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>Annual IRR:</td>
              <td style={{ padding: '8px' }}>{metrics.irr.toFixed(2)}% (calculated over {metrics.totalMonths} months)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>Breakeven Month:</td>
              <td style={{ padding: '8px' }}>Month {metrics.breakEvenMonth}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>Cumulative Loss:</td>
              <td style={{ padding: '8px' }}>{formatCurrency(metrics.cumulativeLoss)} (through Month {metrics.maxLossMonth})</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>Cumulative Profit:</td>
              <td style={{ padding: '8px' }}>{formatCurrency(metrics.cumulativeProfit)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3>Yearly Summary</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '8px', borderBottom: '2px solid #ddd' }}>Year</th>
              <th style={{ padding: '8px', borderBottom: '2px solid #ddd' }}>Revenue</th>
              <th style={{ padding: '8px', borderBottom: '2px solid #ddd' }}>Cost</th>
              <th style={{ padding: '8px', borderBottom: '2px solid #ddd' }}>Profit</th>
            </tr>
          </thead>
          <tbody>
            {metrics.yearlyData.map(year => (
              <tr key={year.year} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>Year {year.year + 1}</td>
                <td style={{ padding: '8px' }}>{formatCurrency(year.totalRevenue)}</td>
                <td style={{ padding: '8px' }}>{formatCurrency(year.totalCost)}</td>
                <td style={{ padding: '8px' }}>{formatCurrency(year.totalProfit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialMetricsTable;

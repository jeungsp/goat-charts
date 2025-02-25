import React from 'react';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart, ReferenceLine } from 'recharts';
import FinancialMetricsTable from './components/FinancialMetricsTable';
import InventoryAndSalesChart from './components/InventoryAndSalesChart';
import RestaurantGrowthChart from './components/RestaurantGrowthChart';
import BarnChart from './components/BarnChart';

interface MonthlyData {
  month: number;
  revenue: number;
  goats: number;
  inventory: number;
  cost?: number;
  profit?: number;
  cumulativeProfit?: number;
}

interface QuarterlyData {
  name: string;
  revenue: number;
  cost: number;
  profit: number;
  growthRate: number;
  profitMargin: number;
  tooltipRevenue: string;
  tooltipCost: string;
  tooltipProfit: string;
  tooltipGrowth: string;
  tooltipMargin: string;
  avgGoats: number;
  barns: number;
}

const QuarterlyRevenueChart: React.FC = () => {
  // Financial data from monthly information
  const calculateQuarterlyFinancials = (): QuarterlyData[] => {
    const monthlyData: MonthlyData[] = [
      { month: 1, revenue: 129000, goats: 6800, inventory: 14 },
      { month: 2, revenue: 132000, goats: 11800, inventory: 26 },
      { month: 3, revenue: 137000, goats: 11800, inventory: 36 },
      { month: 4, revenue: 141000, goats: 11800, inventory: 42 },
      { month: 5, revenue: 146000, goats: 11700, inventory: 45 },
      { month: 6, revenue: 153000, goats: 11600, inventory: 43 },
      { month: 7, revenue: 161000, goats: 12000, inventory: 36 },
      { month: 8, revenue: 171000, goats: 11900, inventory: 22 },
      { month: 9, revenue: 183000, goats: 11800, inventory: 0 },
      { month: 10, revenue: 197000, goats: 16700, inventory: 719 },
      { month: 11, revenue: 213000, goats: 17100, inventory: 677 },
      { month: 12, revenue: 230000, goats: 17000, inventory: 624 },
      { month: 13, revenue: 245000, goats: 17000, inventory: 560 },
      { month: 14, revenue: 260000, goats: 17000, inventory: 488 },
      { month: 15, revenue: 275000, goats: 20000, inventory: 405 },
      { month: 16, revenue: 293000, goats: 20000, inventory: 210 },
      { month: 17, revenue: 315000, goats: 20500, inventory: 0 },
      { month: 18, revenue: 336000, goats: 25500, inventory: 1776 },
      { month: 19, revenue: 356000, goats: 26500, inventory: 1540 },
      { month: 20, revenue: 374000, goats: 27000, inventory: 1291 },
      { month: 21, revenue: 392000, goats: 27000, inventory: 1030 },
      { month: 22, revenue: 408000, goats: 27000, inventory: 757 },
      { month: 23, revenue: 425000, goats: 35500, inventory: 599 },
      { month: 24, revenue: 440000, goats: 35500, inventory: 306 },
      { month: 25, revenue: 459000, goats: 36500, inventory: 0 },
      { month: 26, revenue: 482000, goats: 42000, inventory: 1679 },
      { month: 27, revenue: 507000, goats: 43000, inventory: 1591 },
      { month: 28, revenue: 540000, goats: 44750, inventory: 1232 },
      { month: 29, revenue: 578000, goats: 44750, inventory: 846 },
      { month: 30, revenue: 624000, goats: 44750, inventory: 431 },
      { month: 31, revenue: 678000, goats: 58750, inventory: 1978 },
      { month: 32, revenue: 746000, goats: 59750, inventory: 1482 },
      { month: 33, revenue: 824000, goats: 60751, inventory: 1182 },
      { month: 34, revenue: 920000, goats: 66751, inventory: 2570 },
      { month: 35, revenue: 1000000, goats: 68251, inventory: 2380 },
      { month: 36, revenue: 1200000, goats: 75001, inventory: 1912 },
      { month: 37, revenue: 1300000, goats: 75126, inventory: 1022 },
      { month: 38, revenue: 1500000, goats: 76501, inventory: 0 },
      { month: 39, revenue: 1800000, goats: 92843, inventory: 3570 },
      { month: 40, revenue: 2100000, goats: 93843, inventory: 2201 },
      { month: 41, revenue: 2400000, goats: 93967, inventory: 729 },
      { month: 42, revenue: 2800000, goats: 94467, inventory: 3767 },
      { month: 43, revenue: 3300000, goats: 94904, inventory: 3570 },
      { month: 44, revenue: 3800000, goats: 99279, inventory: 4898 },
      { month: 45, revenue: 4300000, goats: 99029, inventory: 2514 },
      { month: 46, revenue: 4800000, goats: 99701, inventory: 0 },
      { month: 47, revenue: 5300000, goats: 100951, inventory: 16871 },
      { month: 48, revenue: 5700000, goats: 101076, inventory: 14331 },
      { month: 49, revenue: 6100000, goats: 100574, inventory: 12253 },
      { month: 50, revenue: 6500000, goats: 100543, inventory: 15181 },
      { month: 51, revenue: 6900000, goats: 100293, inventory: 12238 },
      { month: 52, revenue: 7200000, goats: 102957, inventory: 18439 },
      { month: 53, revenue: 7500000, goats: 102207, inventory: 13510 },
      { month: 54, revenue: 7900000, goats: 101207, inventory: 9525 },
      { month: 55, revenue: 8200000, goats: 100957, inventory: 28006 },
      { month: 56, revenue: 8400000, goats: 100676, inventory: 24631 },
      { month: 57, revenue: 8700000, goats: 97796, inventory: 21828 },
      { month: 58, revenue: 9000000, goats: 97544, inventory: 16600 },
      { month: 59, revenue: 9200000, goats: 96880, inventory: 11304 },
      { month: 60, revenue: 9400000, goats: 99087, inventory: 26882 },
      { month: 61, revenue: 9700000, goats: 98649, inventory: 21191 },
      { month: 62, revenue: 9900000, goats: 96961, inventory: 16602 },
      { month: 63, revenue: 10100000, goats: 96946, inventory: 20593 },
      { month: 64, revenue: 10300000, goats: 96694, inventory: 15064 },
      { month: 65, revenue: 10400000, goats: 100587, inventory: 16921 },
      { month: 66, revenue: 10600000, goats: 100211, inventory: 9893 },
      { month: 67, revenue: 10800000, goats: 99711, inventory: 3461 },
      { month: 68, revenue: 10900000, goats: 99586, inventory: 26649 },
      { month: 69, revenue: 11100000, goats: 99446, inventory: 20391 },
      { month: 70, revenue: 11200000, goats: 99106, inventory: 14417 },
      { month: 71, revenue: 11300000, goats: 98982, inventory: 7227 },
    ];

    // Calculate cost for each month
    monthlyData.forEach(item => {
      const totalGoats = item.goats + item.inventory;
      item.cost = (totalGoats / 100000) * 2000000;
      item.profit = item.revenue - (item.cost || 0);
    });

    // Group by quarters (3 months per quarter)
    const quarterlyData: QuarterlyData[] = [];
    for (let i = 0; i < monthlyData.length; i += 3) {
      const quarterIndex = Math.floor(i / 3);
      const quarterNumber = Math.floor(i / 3) % 4 + 1;
      const yearNumber = Math.floor(i / 12) + 2;  // Start from Year 2
      
      if (i + 2 < monthlyData.length) {
        const quarterRevenue = monthlyData[i].revenue + monthlyData[i+1].revenue + monthlyData[i+2].revenue;
        const quarterCost = (monthlyData[i].cost || 0) + (monthlyData[i+1].cost || 0) + (monthlyData[i+2].cost || 0);
        const quarterProfit = quarterRevenue - quarterCost;
        
        let previousQuarterRevenue = 0;
        if (quarterIndex > 0 && i - 1 >= 0 && i - 3 >= 0) {
          previousQuarterRevenue = monthlyData[i-3].revenue + monthlyData[i-2].revenue + monthlyData[i-1].revenue;
        }
        
        const growthRate = previousQuarterRevenue > 0 
          ? ((quarterRevenue / previousQuarterRevenue) - 1) * 100 
          : 0;
        
        const avgGoats = (monthlyData[i].goats + monthlyData[i+1].goats + monthlyData[i+2].goats) / 3;
        
        const totalGoats = [
          monthlyData[i].goats + monthlyData[i].inventory,
          monthlyData[i+1].goats + monthlyData[i+1].inventory,
          monthlyData[i+2].goats + monthlyData[i+2].inventory
        ];
        const avgTotalGoats = totalGoats.reduce((a, b) => a + b, 0) / 3;
        
        quarterlyData.push({
          name: `Y${yearNumber}Q${quarterNumber}`,
          revenue: Math.round(quarterRevenue / 10000) / 100,  // Round to nearest 0.01M
          cost: Math.round(quarterCost / 10000) / 100,  // Round to nearest 0.01M
          profit: Math.round(quarterProfit / 10000) / 100,  // Round to nearest 0.01M
          growthRate: growthRate,
          profitMargin: Math.round((quarterProfit / quarterRevenue) * 100),  // Round to nearest %
          tooltipRevenue: `$${(Math.round(quarterRevenue / 10000) / 100).toFixed(2)}M`,
          tooltipCost: `$${(Math.round(quarterCost / 10000) / 100).toFixed(2)}M`,
          tooltipProfit: `$${(Math.round(quarterProfit / 10000) / 100).toFixed(2)}M`,
          tooltipGrowth: `${Math.round(growthRate)}%`,
          tooltipMargin: `${Math.round((quarterProfit / quarterRevenue) * 100)}%`,
          avgGoats: avgTotalGoats,
          barns: Math.round(avgTotalGoats / 1000)  // Round to nearest whole barn
        });
      }
    }
    return quarterlyData;
  };

  const quarterlyData = calculateQuarterlyFinancials();

  // Find min and max values for y-axis scaling
  const maxValue = Math.max(...quarterlyData.map(d => Math.max(d.revenue, d.cost)));
  
  // Split data into positive and negative profit
  const positiveData = quarterlyData.map(d => ({
    ...d,
    profit: d.profit > 0 ? d.profit : null
  }));
  
  const negativeData = quarterlyData.map(d => ({
    ...d,
    profit: d.profit < 0 ? d.profit : null
  }));

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Quarterly Financial Performance</h3>
      
      {/* Positive profit chart */}
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <ComposedChart
            data={positiveData}
            margin={{ top: 20, right: 70, bottom: 0, left: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={false}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              domain={[0, maxValue]}
              hide={true}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[0, 35]}
              label={{ value: 'Profit (Millions)', angle: 90, position: 'insideRight', offset: 35 }}
              tickFormatter={(value) => value.toFixed(1)}
            />
            <Tooltip 
              formatter={(value: any, name: string) => {
                if (name === 'Revenue') return quarterlyData[quarterlyData.findIndex(d => d.revenue === value)].tooltipRevenue;
                if (name === 'Cost') return quarterlyData[quarterlyData.findIndex(d => d.cost === value)].tooltipCost;
                if (name === 'Profit') return value ? value.toFixed(2) + 'M' : '-';
                return value;
              }}
            />
            <Bar yAxisId="left" dataKey="revenue" fill="#82ca9d" name="Revenue" />
            <Bar yAxisId="left" dataKey="cost" fill="#8884d8" name="Cost" />
            <Bar yAxisId="right" dataKey="profit" fill="#ff7300" opacity={0.7} legendType="none" name=" " />
            <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#ff7300" name="Profit" strokeWidth={2} connectNulls dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Negative profit chart */}
      <div style={{ width: '100%', height: '280px' }}>
        <ResponsiveContainer>
          <ComposedChart
            data={negativeData}
            margin={{ top: 0, right: 70, bottom: 30, left: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              label={{ value: 'Quarter', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              domain={[0, maxValue]}
              hide={true}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[-2.5, 0]}
              label={{ value: 'Loss (Millions)', angle: 90, position: 'insideRight', offset: 35 }}
              tickFormatter={(value) => value.toFixed(1)}
              ticks={[-2.5, -2, -1.5, -1, -0.5, 0]}
            />
            <Tooltip 
              formatter={(value: any, name: string) => {
                if (name === 'Revenue') return quarterlyData[quarterlyData.findIndex(d => d.revenue === value)].tooltipRevenue;
                if (name === 'Cost') return quarterlyData[quarterlyData.findIndex(d => d.cost === value)].tooltipCost;
                if (name === 'Profit') return value ? value.toFixed(2) + 'M' : '-';
                return value;
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px', paddingBottom: '20px' }} />
            <Bar yAxisId="left" dataKey="revenue" fill="#82ca9d" name="Revenue" />
            <Bar yAxisId="left" dataKey="cost" fill="#8884d8" name="Cost" />
            <Bar yAxisId="right" dataKey="profit" fill="#ff7300" opacity={0.7} legendType="none" name=" " />
            <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#ff7300" name="Profit" strokeWidth={2} connectNulls dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const monthlyData: MonthlyData[] = [
    { month: 1, revenue: 129000, goats: 6800, inventory: 14 },
    { month: 2, revenue: 132000, goats: 11800, inventory: 26 },
    { month: 3, revenue: 137000, goats: 11800, inventory: 36 },
    { month: 4, revenue: 141000, goats: 11800, inventory: 42 },
    { month: 5, revenue: 146000, goats: 11700, inventory: 45 },
    { month: 6, revenue: 153000, goats: 11600, inventory: 43 },
    { month: 7, revenue: 161000, goats: 12000, inventory: 36 },
    { month: 8, revenue: 171000, goats: 11900, inventory: 22 },
    { month: 9, revenue: 183000, goats: 11800, inventory: 0 },
    { month: 10, revenue: 197000, goats: 16700, inventory: 719 },
    { month: 11, revenue: 213000, goats: 17100, inventory: 677 },
    { month: 12, revenue: 230000, goats: 17000, inventory: 624 },
    { month: 13, revenue: 245000, goats: 17000, inventory: 560 },
    { month: 14, revenue: 260000, goats: 17000, inventory: 488 },
    { month: 15, revenue: 275000, goats: 20000, inventory: 405 },
    { month: 16, revenue: 293000, goats: 20000, inventory: 210 },
    { month: 17, revenue: 315000, goats: 20500, inventory: 0 },
    { month: 18, revenue: 336000, goats: 25500, inventory: 1776 },
    { month: 19, revenue: 356000, goats: 26500, inventory: 1540 },
    { month: 20, revenue: 374000, goats: 27000, inventory: 1291 },
    { month: 21, revenue: 392000, goats: 27000, inventory: 1030 },
    { month: 22, revenue: 408000, goats: 27000, inventory: 757 },
    { month: 23, revenue: 425000, goats: 35500, inventory: 599 },
    { month: 24, revenue: 440000, goats: 35500, inventory: 306 },
    { month: 25, revenue: 459000, goats: 36500, inventory: 0 },
    { month: 26, revenue: 482000, goats: 42000, inventory: 1679 },
    { month: 27, revenue: 507000, goats: 43000, inventory: 1591 },
    { month: 28, revenue: 540000, goats: 44750, inventory: 1232 },
    { month: 29, revenue: 578000, goats: 44750, inventory: 846 },
    { month: 30, revenue: 624000, goats: 44750, inventory: 431 },
    { month: 31, revenue: 678000, goats: 58750, inventory: 1978 },
    { month: 32, revenue: 746000, goats: 59750, inventory: 1482 },
    { month: 33, revenue: 824000, goats: 60751, inventory: 1182 },
    { month: 34, revenue: 920000, goats: 66751, inventory: 2570 },
    { month: 35, revenue: 1000000, goats: 68251, inventory: 2380 },
    { month: 36, revenue: 1200000, goats: 75001, inventory: 1912 },
    { month: 37, revenue: 1300000, goats: 75126, inventory: 1022 },
    { month: 38, revenue: 1500000, goats: 76501, inventory: 0 },
    { month: 39, revenue: 1800000, goats: 92843, inventory: 3570 },
    { month: 40, revenue: 2100000, goats: 93843, inventory: 2201 },
    { month: 41, revenue: 2400000, goats: 93967, inventory: 729 },
    { month: 42, revenue: 2800000, goats: 94467, inventory: 3767 },
    { month: 43, revenue: 3300000, goats: 94904, inventory: 3570 },
    { month: 44, revenue: 3800000, goats: 99279, inventory: 4898 },
    { month: 45, revenue: 4300000, goats: 99029, inventory: 2514 },
    { month: 46, revenue: 4800000, goats: 99701, inventory: 0 },
    { month: 47, revenue: 5300000, goats: 100951, inventory: 16871 },
    { month: 48, revenue: 5700000, goats: 101076, inventory: 14331 },
    { month: 49, revenue: 6100000, goats: 100574, inventory: 12253 },
    { month: 50, revenue: 6500000, goats: 100543, inventory: 15181 },
    { month: 51, revenue: 6900000, goats: 100293, inventory: 12238 },
    { month: 52, revenue: 7200000, goats: 102957, inventory: 18439 },
    { month: 53, revenue: 7500000, goats: 102207, inventory: 13510 },
    { month: 54, revenue: 7900000, goats: 101207, inventory: 9525 },
    { month: 55, revenue: 8200000, goats: 100957, inventory: 28006 },
    { month: 56, revenue: 8400000, goats: 100676, inventory: 24631 },
    { month: 57, revenue: 8700000, goats: 97796, inventory: 21828 },
    { month: 58, revenue: 9000000, goats: 97544, inventory: 16600 },
    { month: 59, revenue: 9200000, goats: 96880, inventory: 11304 },
    { month: 60, revenue: 9400000, goats: 99087, inventory: 26882 },
    { month: 61, revenue: 9700000, goats: 98649, inventory: 21191 },
    { month: 62, revenue: 9900000, goats: 96961, inventory: 16602 },
    { month: 63, revenue: 10100000, goats: 96946, inventory: 20593 },
    { month: 64, revenue: 10300000, goats: 96694, inventory: 15064 },
    { month: 65, revenue: 10400000, goats: 100587, inventory: 16921 },
    { month: 66, revenue: 10600000, goats: 100211, inventory: 9893 },
    { month: 67, revenue: 10800000, goats: 99711, inventory: 3461 },
    { month: 68, revenue: 10900000, goats: 99586, inventory: 26649 },
    { month: 69, revenue: 11100000, goats: 99446, inventory: 20391 },
    { month: 70, revenue: 11200000, goats: 99106, inventory: 14417 },
    { month: 71, revenue: 11300000, goats: 98982, inventory: 7227 },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Goat Farm Financial Dashboard</h1>
      </header>
      <main style={{ padding: '20px', marginBottom: '100px' }}>
        <QuarterlyRevenueChart />
        <FinancialMetricsTable monthlyData={monthlyData} />
        <BarnChart />
        <InventoryAndSalesChart />
        <RestaurantGrowthChart />

      </main>
    </div>
  );
};

export default App;

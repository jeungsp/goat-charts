import React, { useState } from 'react';
import './App.css';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import InventoryAndSalesChart from './components/InventoryAndSalesChart';
import RestaurantGrowthChart from './components/RestaurantGrowthChart';
import BarnChart from './components/BarnChart';
import FinancialMetricsTable from './components/FinancialMetricsTable';
import { useLanguage, translations, LanguageProvider } from './context/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import { monthlyData } from './data/monthlyData';
import Login from './components/Login';
import { QuarterlyData } from './types/data';

const QuarterlyRevenueChart: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const formatKoreanCurrency = (value: number): string => {
    // Convert USD to KRW (1 USD = 1000 KRW)
    const krwValue = value * 1000; // Just multiply by 1000 for KRW conversion
    const absValue = Math.abs(krwValue);
    const sign = krwValue < 0 ? '-' : '';
    
    const billion = 100000000; // 1억원
    return `${sign}${(absValue / billion).toFixed(1)}억원`;
  };

  // Financial data from monthly information
  const calculateQuarterlyFinancials = (): QuarterlyData[] => {
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
        
        const totalGoats = [
          monthlyData[i].goats + monthlyData[i].inventory,
          monthlyData[i+1].goats + monthlyData[i+1].inventory,
          monthlyData[i+2].goats + monthlyData[i+2].inventory
        ];
        const avgTotalGoats = totalGoats.reduce((a, b) => a + b, 0) / 3;

        // Convert values to 억원 scale for Korean display
        const koreanScale = language === 'ko' ? 10 : 1;
        const scaledRevenue = Math.round(quarterRevenue / 10000) / 100 * koreanScale;
        const scaledCost = Math.round(quarterCost / 10000) / 100 * koreanScale;
        const scaledProfit = Math.round(quarterProfit / 10000) / 100 * koreanScale;
        
        quarterlyData.push({
          name: `Y${yearNumber}Q${quarterNumber}`,
          revenue: scaledRevenue,
          cost: scaledCost,
          profit: scaledProfit,
          growthRate: growthRate,
          profitMargin: Math.round((quarterProfit / quarterRevenue) * 100),  // Round to nearest %
          tooltipRevenue: language === 'ko' 
            ? formatKoreanCurrency(quarterRevenue)  // Pass the raw value
            : `$${(quarterRevenue / 1000000).toFixed(2)}M`,
          tooltipCost: language === 'ko'
            ? formatKoreanCurrency(quarterCost)  // Pass the raw value
            : `$${(quarterCost / 1000000).toFixed(2)}M`,
          tooltipProfit: language === 'ko'
            ? formatKoreanCurrency(quarterProfit)  // Pass the raw value
            : `$${(quarterProfit / 1000000).toFixed(2)}M`,
          tooltipGrowth: `${Math.round(growthRate)}%`,
          tooltipMargin: `${Math.round((quarterProfit / quarterRevenue) * 100)}%`,
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

  // Adjust y-axis label based on language
  const yAxisLabel = language === 'ko' ? '억원' : 'Million';
  const yAxisDomain = language === 'ko' ? [0, 350] : [0, 35];
  const negativeDomain = language === 'ko' ? [-25, 0] : [-2.5, 0];
  const yAxisTicks = language === 'ko' 
    ? [0, 50, 100, 150, 200, 250, 300, 350]
    : [0, 5, 10, 15, 20, 25, 30, 35];
  const negativeYAxisTicks = language === 'ko'
    ? [-25, -20, -15, -10, -5, 0]
    : [-2.5, -2.0, -1.5, -1.0, -0.5, 0];

  const yAxisTickFormatter = (value: number) => language === 'ko' ? `${value}` : value.toFixed(1);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>{t.quarterlyFinancial}</h3>
      
      {/* Positive profit chart */}
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <ComposedChart
            data={positiveData}
            margin={{ top: 20, right: 110, bottom: 0, left: 50 }}
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
              domain={yAxisDomain}
              label={{ value: yAxisLabel, angle: 90, position: 'right', offset: 12, fontSize: 24, fontWeight: 'medium' }}
              tick={{ fontSize: 16 }}
              tickFormatter={yAxisTickFormatter}
              ticks={yAxisTicks}
            />
            <Tooltip 
              formatter={(value: any, name: string) => {
                if (name === t.revenue) return quarterlyData[quarterlyData.findIndex(d => d.revenue === value)].tooltipRevenue;
                if (name === t.cost) return quarterlyData[quarterlyData.findIndex(d => d.cost === value)].tooltipCost;
                if (name === t.profit) return quarterlyData[quarterlyData.findIndex(d => d.profit === value)].tooltipProfit;
                return value;
              }}
            />
            <Bar yAxisId="left" dataKey="revenue" fill="#82ca9d" name={t.revenue} />
            <Bar yAxisId="left" dataKey="cost" fill="#8884d8" name={t.cost} />
            <Bar yAxisId="right" dataKey="profit" fill="#ff7300" opacity={0.7} legendType="none" name=" " />
            <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#ff7300" name={t.profit} strokeWidth={2} connectNulls dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Negative profit chart */}
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <ComposedChart
            data={negativeData}
            margin={{ top: 0, right: 110, bottom: 70, left: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              label={{ value: t.quarter, position: 'bottom', offset: 12, fontSize: 24, fontWeight: 'medium' }}
              tick={{ fontSize: 16 }}
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
              domain={negativeDomain}
              label={{ value: yAxisLabel, angle: 90, position: 'right', offset: 12, fontSize: 24, fontWeight: 'medium' }}
              tick={{ fontSize: 16 }}
              tickFormatter={yAxisTickFormatter}
              ticks={negativeYAxisTicks}
            />
            <Tooltip 
              formatter={(value: any, name: string) => {
                if (name === t.revenue) return quarterlyData[quarterlyData.findIndex(d => d.revenue === value)].tooltipRevenue;
                if (name === t.cost) return quarterlyData[quarterlyData.findIndex(d => d.cost === value)].tooltipCost;
                if (name === t.profit) return quarterlyData[quarterlyData.findIndex(d => d.profit === value)].tooltipProfit;
                return value;
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '80px', paddingBottom: '40px', fontSize: '24px', fontWeight: 'bold' }} />
            <Bar yAxisId="left" dataKey="revenue" fill="#82ca9d" name={t.revenue} />
            <Bar yAxisId="left" dataKey="cost" fill="#8884d8" name={t.cost} />
            <Bar yAxisId="right" dataKey="profit" fill="#ff7300" opacity={0.7} legendType="none" name=" " />
            <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#ff7300" name={t.profit} strokeWidth={2} connectNulls dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Clear any existing authentication on app load
    localStorage.removeItem('isAuthenticated');
    return false;
  });

  const handleLogin = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
    if (authenticated) {
      localStorage.setItem('isAuthenticated', 'true');
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <LanguageToggle />
      <header className="App-header">
        <h1>{t.goatFarmDashboard}</h1>
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

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
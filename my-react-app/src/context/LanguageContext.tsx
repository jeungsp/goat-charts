import React, { createContext, useContext, useState } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    restaurantGrowth: 'Restaurant Growth',
    totalRestaurants: 'Total Restaurants',
    weeklyRestaurantsNeeded: 'Weekly Restaurants Needed',
    newRestaurantsMonthly: 'New Restaurants Monthly',
    newRestaurantsNeeded: 'New Restaurants',
    month: 'Month',
    restaurants: 'Restaurants',
    marketPenetration: 'Market penetration',
    showFullView: 'Show Full View',
    showDetailedView: 'Show Detailed View',
    previous: '← Previous',
    next: 'Next →',
    goatAssumption: 'Note: We assume that one restaurant will on average purchase 0.33 goats per day',
    inventoryAndSales: 'Inventory & Sales',
    newInventory: 'New Inventory',
    available: 'Available',
    inventoryLeft: 'Inventory Left',
    sold: 'Sold',
    sales: 'Sales',
    quarterlyFinancial: 'Quarterly Financial Performance',
    revenue: 'Revenue',
    cost: 'Cost',
    profit: 'Profit',
    loss: 'Loss',
    quarter: 'Quarter',
    profitMillions: 'Profit (Millions)',
    lossMillions: 'Loss (Millions)',
    goatFarmDashboard: 'Goat Farm Financial Dashboard',
    financialMetricsSummary: 'Financial Metrics Summary',
    goats: 'Goats',
    inventory: 'Inventory',
    keyPerformanceIndicators: 'Key Performance Indicators',
    initialInvestment: 'Initial Investment',
    annualIRR: 'Annual IRR',
    calculatedOver: 'calculated over',
    months: 'months',
    breakEvenMonth: 'Breakeven Month',
    cumulativeLoss: 'Cumulative Loss',
    through: 'through',
    cumulativeProfit: 'Cumulative Profit',
    yearlySummary: 'Yearly Summary',
    year: 'Year',
    monthLabel: 'Month',
    currency: '$',
    million: 'M',
    thousand: 'K',
    barnsNeeded: 'Barns Needed',
    numberOfBarns: 'Number of Barns',
    financialMetricsTable: {
      revenueGrowthRate: 'Revenue Growth Rate',
      expenseGrowthRate: 'Expense Growth Rate',
      netProfitGrowthRate: 'Net Profit Growth Rate',
      averageMonthlyRevenue: 'Average Monthly Revenue',
      averageMonthlyExpense: 'Average Monthly Expense',
      averageMonthlyNetProfit: 'Average Monthly Net Profit',
      totalRevenue: 'Total Revenue',
      totalExpense: 'Total Expense',
      totalNetProfit: 'Total Net Profit',
      revenuePerRestaurant: 'Revenue per Restaurant',
      expensePerRestaurant: 'Expense per Restaurant',
      netProfitPerRestaurant: 'Net Profit per Restaurant',
    }
  },
  ko: {
    restaurantGrowth: '식당 성장',
    totalRestaurants: '총 식당 수',
    weeklyRestaurantsNeeded: '주간 필요 식당 수',
    newRestaurantsMonthly: '월간 신규 식당 수',
    newRestaurantsNeeded: '신규 식당',
    month: '월',
    restaurants: '식당',
    marketPenetration: '시장 점유율',
    showFullView: '전체 보기',
    showDetailedView: '상세 보기',
    previous: '← 이전',
    next: '다음 →',
    goatAssumption: '참고: 한 식당당 하루 평균 0.33마리의 염소를 구매한다고 가정합니다',
    inventoryAndSales: '재고 및 판매',
    newInventory: '신규 재고',
    available: '가용 재고',
    inventoryLeft: '남은 재고',
    sold: '판매량',
    sales: '판매',
    quarterlyFinancial: '분기별 재무 실적',
    revenue: '매출',
    cost: '비용',
    profit: '이익',
    loss: '손실',
    quarter: '분기',
    profitMillions: '이익 (백만원)',
    lossMillions: '손실 (백만원)',
    goatFarmDashboard: '염소 농장 재무 현황',
    financialMetricsSummary: '재무 지표 요약',
    goats: '염소',
    inventory: '재고',
    keyPerformanceIndicators: '핵심 성과 지표',
    initialInvestment: '초기 투자',
    annualIRR: '연간 IRR',
    calculatedOver: '계산 기간',
    months: '개월',
    breakEvenMonth: '손익분기점 도달 월',
    cumulativeLoss: '누적 손실',
    through: '까지',
    cumulativeProfit: '누적 이익',
    yearlySummary: '연간 요약',
    year: '년도',
    monthLabel: '월',
    currency: '₩',
    million: '백만',
    thousand: '천',
    barnsNeeded: '필요 축사 수',
    numberOfBarns: '축사 수',
    financialMetricsTable: {
      revenueGrowthRate: '매출 성장률',
      expenseGrowthRate: '비용 성장률',
      netProfitGrowthRate: '순이익 성장률',
      averageMonthlyRevenue: '월평균 매출',
      averageMonthlyExpense: '월평균 비용',
      averageMonthlyNetProfit: '월평균 순이익',
      totalRevenue: '총 매출',
      totalExpense: '총 비용',
      totalNetProfit: '총 순이익',
      revenuePerRestaurant: '식당당 매출',
      expensePerRestaurant: '식당당 비용',
      netProfitPerRestaurant: '식당당 순이익',
    }
  }
};

export const formatCurrency = (value: number, language: Language) => {
  if (language === 'ko') {
    // Convert USD to KRW (1 USD = 1000 KRW)
    const krwValue = value * 1000;
    
    const billion = 100000000; // 1억원
    const million = 10000000;  // 1천만원
    
    if (krwValue >= billion) {
      return `${(krwValue / billion).toFixed(1)}억원`;
    } else if (krwValue >= million) {
      return `${(krwValue / million).toFixed(1)}천만원`;
    } else {
      return `${krwValue.toLocaleString('ko-KR')}원`;
    }
  } else {
    // English formatting
    if (Math.abs(value) >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  }
};

export const formatNumber = (value: number, language: Language) => {
  return language === 'ko' 
    ? value.toLocaleString('ko-KR')
    : value.toLocaleString('en-US');
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

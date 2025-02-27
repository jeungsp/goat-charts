export interface MonthlyData {
  month: number;
  revenue: number;
  goats: number;
  inventory: number;
  cost?: number;
  profit?: number;
  cumulativeProfit?: number;
}

export interface QuarterlyData {
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
  barns: number;
}

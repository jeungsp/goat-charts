import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { useLanguage, translations, formatCurrency, formatNumber } from '../context/LanguageContext';

interface RestaurantData {
  month: number;
  weeklyRestaurants: number;
  newRestaurants: number;
  sold: number;
  totalRestaurants: number;
}

// Using the same data but only restaurant-related metrics
const rawData: RestaurantData[] = [
  { month: 24, weeklyRestaurants: 0, newRestaurants: 0, sold: 86, totalRestaurants: 0 },
  { month: 25, weeklyRestaurants: 0.5, newRestaurants: 2, sold: 88, totalRestaurants: 0 },
  { month: 26, weeklyRestaurants: 0.7, newRestaurants: 3, sold: 91, totalRestaurants: 0 },
  { month: 27, weeklyRestaurants: 0.8, newRestaurants: 3, sold: 94, totalRestaurants: 0 },
  { month: 28, weeklyRestaurants: 0.9, newRestaurants: 4, sold: 97, totalRestaurants: 0 },
  { month: 29, weeklyRestaurants: 1.1, newRestaurants: 5, sold: 102, totalRestaurants: 0 },
  { month: 30, weeklyRestaurants: 1.4, newRestaurants: 5, sold: 107, totalRestaurants: 0 },
  { month: 31, weeklyRestaurants: 1.6, newRestaurants: 7, sold: 114, totalRestaurants: 0 },
  { month: 32, weeklyRestaurants: 2.0, newRestaurants: 8, sold: 122, totalRestaurants: 0 },
  { month: 33, weeklyRestaurants: 2.3, newRestaurants: 9, sold: 131, totalRestaurants: 0 },
  { month: 34, weeklyRestaurants: 2.8, newRestaurants: 11, sold: 142, totalRestaurants: 0 },
  { month: 35, weeklyRestaurants: 2.7, newRestaurants: 11, sold: 153, totalRestaurants: 0 },
  { month: 36, weeklyRestaurants: 2.5, newRestaurants: 10, sold: 163, totalRestaurants: 0 },
  { month: 37, weeklyRestaurants: 2.4, newRestaurants: 10, sold: 173, totalRestaurants: 0 },
  { month: 38, weeklyRestaurants: 2.5, newRestaurants: 10, sold: 183, totalRestaurants: 0 },
  { month: 39, weeklyRestaurants: 3.0, newRestaurants: 12, sold: 195, totalRestaurants: 0 },
  { month: 40, weeklyRestaurants: 3.6, newRestaurants: 15, sold: 210, totalRestaurants: 0 },
  { month: 41, weeklyRestaurants: 3.5, newRestaurants: 14, sold: 224, totalRestaurants: 0 },
  { month: 42, weeklyRestaurants: 3.3, newRestaurants: 13, sold: 237, totalRestaurants: 0 },
  { month: 43, weeklyRestaurants: 3.1, newRestaurants: 13, sold: 249, totalRestaurants: 0 },
  { month: 44, weeklyRestaurants: 3.0, newRestaurants: 12, sold: 261, totalRestaurants: 0 },
  { month: 45, weeklyRestaurants: 2.8, newRestaurants: 11, sold: 272, totalRestaurants: 0 },
  { month: 46, weeklyRestaurants: 2.7, newRestaurants: 11, sold: 283, totalRestaurants: 0 },
  { month: 47, weeklyRestaurants: 2.6, newRestaurants: 10, sold: 293, totalRestaurants: 0 },
  { month: 48, weeklyRestaurants: 3.1, newRestaurants: 12, sold: 306, totalRestaurants: 0 },
  { month: 49, weeklyRestaurants: 3.7, newRestaurants: 15, sold: 321, totalRestaurants: 0 },
  { month: 50, weeklyRestaurants: 4.4, newRestaurants: 18, sold: 338, totalRestaurants: 0 },
  { month: 51, weeklyRestaurants: 5.3, newRestaurants: 21, sold: 360, totalRestaurants: 0 },
  { month: 52, weeklyRestaurants: 6.4, newRestaurants: 26, sold: 385, totalRestaurants: 0 },
  { month: 53, weeklyRestaurants: 7.7, newRestaurants: 31, sold: 416, totalRestaurants: 0 },
  { month: 54, weeklyRestaurants: 9.2, newRestaurants: 37, sold: 452, totalRestaurants: 0 },
  { month: 55, weeklyRestaurants: 11.0, newRestaurants: 44, sold: 497, totalRestaurants: 0 },
  { month: 56, weeklyRestaurants: 13.2, newRestaurants: 53, sold: 549, totalRestaurants: 0 },
  { month: 57, weeklyRestaurants: 15.9, newRestaurants: 63, sold: 613, totalRestaurants: 0 },
  { month: 58, weeklyRestaurants: 19.0, newRestaurants: 76, sold: 689, totalRestaurants: 0 },
  { month: 59, weeklyRestaurants: 22.9, newRestaurants: 91, sold: 780, totalRestaurants: 0 },
  { month: 60, weeklyRestaurants: 27.4, newRestaurants: 110, sold: 890, totalRestaurants: 0 },
  { month: 61, weeklyRestaurants: 32.9, newRestaurants: 132, sold: 1022, totalRestaurants: 0 },
  { month: 62, weeklyRestaurants: 39.5, newRestaurants: 158, sold: 1180, totalRestaurants: 0 },
  { month: 63, weeklyRestaurants: 47.4, newRestaurants: 190, sold: 1369, totalRestaurants: 0 },
  { month: 64, weeklyRestaurants: 56.9, newRestaurants: 227, sold: 1597, totalRestaurants: 0 },
  { month: 65, weeklyRestaurants: 68.2, newRestaurants: 273, sold: 1870, totalRestaurants: 0 },
  { month: 66, weeklyRestaurants: 81.9, newRestaurants: 328, sold: 2197, totalRestaurants: 0 },
  { month: 67, weeklyRestaurants: 88.0, newRestaurants: 352, sold: 2549, totalRestaurants: 0 },
  { month: 68, weeklyRestaurants: 83.6, newRestaurants: 335, sold: 2884, totalRestaurants: 0 },
  { month: 69, weeklyRestaurants: 79.5, newRestaurants: 318, sold: 3202, totalRestaurants: 0 },
  { month: 70, weeklyRestaurants: 75.5, newRestaurants: 302, sold: 3504, totalRestaurants: 0 },
  { month: 71, weeklyRestaurants: 71.7, newRestaurants: 287, sold: 3791, totalRestaurants: 0 },
  { month: 72, weeklyRestaurants: 68.1, newRestaurants: 272, sold: 4063, totalRestaurants: 0 },
  { month: 73, weeklyRestaurants: 64.7, newRestaurants: 259, sold: 4322, totalRestaurants: 0 },
  { month: 74, weeklyRestaurants: 61.5, newRestaurants: 246, sold: 4568, totalRestaurants: 0 }
].map(item => ({
  ...item,
  // Recalculate restaurants based on goats sold and round to 2 decimal places
  newRestaurants: Number(((item.newRestaurants / 30) * 3).toFixed(2)),  // Monthly restaurants = (newRestaurants / 30) * 3
  weeklyRestaurants: Number(((item.newRestaurants / 30) * 3 / 4).toFixed(2)),  // Weekly restaurants = monthly restaurants / 4
  totalRestaurants: Number((item.sold / 30 * 3).toFixed(2))  // Total restaurants = (goats sold / 30) * 3
}));

const RestaurantGrowthChart: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const [viewWindow, setViewWindow] = useState({ start: 24, end: 48 }); // Show 24 months by default

  const handleScroll = (direction: 'left' | 'right') => {
    if (!isZoomedOut) {
      const step = 6; // Scroll 6 months at a time
      setViewWindow(prev => {
        const newStart = direction === 'left' ? 
          Math.max(24, prev.start - step) : 
          Math.min(rawData[rawData.length - 1].month - 24, prev.start + step);
        return {
          start: newStart,
          end: newStart + 24
        };
      });
    }
  };

  const visibleData = isZoomedOut ? rawData : rawData.slice(
    rawData.findIndex(d => d.month === viewWindow.start),
    rawData.findIndex(d => d.month === viewWindow.end)
  );

  return (
    <div style={{ marginTop: '20px' }}>
      <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>{t.restaurantGrowth}</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
        <button 
          onClick={() => setIsZoomedOut(!isZoomedOut)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isZoomedOut ? t.showDetailedView : t.showFullView}
        </button>
      </div>
      {!isZoomedOut && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={() => handleScroll('left')}
            disabled={viewWindow.start <= rawData[0].month}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: viewWindow.start <= rawData[0].month ? 'not-allowed' : 'pointer',
              opacity: viewWindow.start <= rawData[0].month ? 0.5 : 1
            }}
          >
            {t.previous}
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={viewWindow.end >= rawData[rawData.length - 1].month}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: viewWindow.end >= rawData[rawData.length - 1].month ? 'not-allowed' : 'pointer',
              opacity: viewWindow.end >= rawData[rawData.length - 1].month ? 0.5 : 1
            }}
          >
            {t.next}
          </button>
        </div>
      )}
      <div style={{ width: '100%', height: '800px' }}>
        <ResponsiveContainer>
          <ComposedChart
            data={visibleData}
            margin={{ top: 20, right: 110, bottom: 70, left: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: t.month, position: 'bottom', offset: 12, fontSize: 24, fontWeight: 'medium' }}
              tick={{ fontSize: 16 }}
            />
            <YAxis
              yAxisId="left"
              label={{ value: t.totalRestaurants, angle: -90, position: 'left', offset: 12, fontSize: 24, fontWeight: 'medium' }}
              tick={{ fontSize: 16 }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: t.newRestaurantsNeeded, angle: 90, position: 'right', offset: 12, fontSize: 24, fontWeight: 'medium' }}
              tick={{ fontSize: 16 }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === t.totalRestaurants) {
                  const marketPenetration = ((value / 5000) * 100).toFixed(1);
                  return [`${formatNumber(value, language)} (${t.marketPenetration}: ${marketPenetration}%)`, name];
                }
                return [formatNumber(value, language), name];
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '80px', paddingBottom: '40px', fontSize: '24px', fontWeight: 'bold' }} />
            <Line yAxisId="left" type="monotone" dataKey="totalRestaurants" stroke="#ff7300" name={t.totalRestaurants} strokeWidth={2} />
            <Bar yAxisId="right" dataKey="weeklyRestaurants" fill="#8884d8" name={t.weeklyRestaurantsNeeded} />
            <Bar yAxisId="right" dataKey="newRestaurants" fill="#82ca9d" name={t.newRestaurantsMonthly} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '200px', paddingBottom: '200px', color: '#666', fontSize: '1.45em' }}>
        {t.goatAssumption}
      </div>
    </div>
  );
};

export default RestaurantGrowthChart;

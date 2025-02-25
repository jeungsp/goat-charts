import React from 'react';
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

interface RestaurantData {
  month: number;
  weeklyRestaurants: number;
  newRestaurants: number;
  sold: number;
}

// Using the same data but only restaurant-related metrics
const rawData: RestaurantData[] = [
  { month: 24, weeklyRestaurants: 0, newRestaurants: 0, sold: 86 },
  { month: 25, weeklyRestaurants: 0.5, newRestaurants: 2, sold: 88 },
  { month: 26, weeklyRestaurants: 0.7, newRestaurants: 3, sold: 91 },
  { month: 27, weeklyRestaurants: 0.8, newRestaurants: 3, sold: 94 },
  { month: 28, weeklyRestaurants: 0.9, newRestaurants: 4, sold: 97 },
  { month: 29, weeklyRestaurants: 1.1, newRestaurants: 5, sold: 102 },
  { month: 30, weeklyRestaurants: 1.4, newRestaurants: 5, sold: 107 },
  { month: 31, weeklyRestaurants: 1.6, newRestaurants: 7, sold: 114 },
  { month: 32, weeklyRestaurants: 2.0, newRestaurants: 8, sold: 122 },
  { month: 33, weeklyRestaurants: 2.3, newRestaurants: 9, sold: 131 },
  { month: 34, weeklyRestaurants: 2.8, newRestaurants: 11, sold: 142 },
  { month: 35, weeklyRestaurants: 2.7, newRestaurants: 11, sold: 153 },
  { month: 36, weeklyRestaurants: 2.5, newRestaurants: 10, sold: 163 },
  { month: 37, weeklyRestaurants: 2.4, newRestaurants: 10, sold: 173 },
  { month: 38, weeklyRestaurants: 2.5, newRestaurants: 10, sold: 183 },
  { month: 39, weeklyRestaurants: 3.0, newRestaurants: 12, sold: 195 },
  { month: 40, weeklyRestaurants: 3.6, newRestaurants: 15, sold: 210 },
  { month: 41, weeklyRestaurants: 3.5, newRestaurants: 14, sold: 224 },
  { month: 42, weeklyRestaurants: 3.3, newRestaurants: 13, sold: 237 },
  { month: 43, weeklyRestaurants: 3.1, newRestaurants: 13, sold: 249 },
  { month: 44, weeklyRestaurants: 3.0, newRestaurants: 12, sold: 261 },
  { month: 45, weeklyRestaurants: 2.8, newRestaurants: 11, sold: 272 },
  { month: 46, weeklyRestaurants: 2.7, newRestaurants: 11, sold: 283 },
  { month: 47, weeklyRestaurants: 2.6, newRestaurants: 10, sold: 293 },
  { month: 48, weeklyRestaurants: 3.1, newRestaurants: 12, sold: 306 },
  { month: 49, weeklyRestaurants: 3.7, newRestaurants: 15, sold: 321 },
  { month: 50, weeklyRestaurants: 4.4, newRestaurants: 18, sold: 338 },
  { month: 51, weeklyRestaurants: 5.3, newRestaurants: 21, sold: 360 },
  { month: 52, weeklyRestaurants: 6.4, newRestaurants: 26, sold: 385 },
  { month: 53, weeklyRestaurants: 7.7, newRestaurants: 31, sold: 416 },
  { month: 54, weeklyRestaurants: 9.2, newRestaurants: 37, sold: 452 },
  { month: 55, weeklyRestaurants: 11.0, newRestaurants: 44, sold: 497 },
  { month: 56, weeklyRestaurants: 13.2, newRestaurants: 53, sold: 549 },
  { month: 57, weeklyRestaurants: 15.9, newRestaurants: 63, sold: 613 },
  { month: 58, weeklyRestaurants: 19.0, newRestaurants: 76, sold: 689 },
  { month: 59, weeklyRestaurants: 22.9, newRestaurants: 91, sold: 780 },
  { month: 60, weeklyRestaurants: 27.4, newRestaurants: 110, sold: 890 },
  { month: 61, weeklyRestaurants: 32.9, newRestaurants: 132, sold: 1022 },
  { month: 62, weeklyRestaurants: 39.5, newRestaurants: 158, sold: 1180 },
  { month: 63, weeklyRestaurants: 47.4, newRestaurants: 190, sold: 1369 },
  { month: 64, weeklyRestaurants: 56.9, newRestaurants: 227, sold: 1597 },
  { month: 65, weeklyRestaurants: 68.2, newRestaurants: 273, sold: 1870 },
  { month: 66, weeklyRestaurants: 81.9, newRestaurants: 328, sold: 2197 },
  { month: 67, weeklyRestaurants: 88.0, newRestaurants: 352, sold: 2549 },
  { month: 68, weeklyRestaurants: 83.6, newRestaurants: 335, sold: 2884 },
  { month: 69, weeklyRestaurants: 79.5, newRestaurants: 318, sold: 3202 },
  { month: 70, weeklyRestaurants: 75.5, newRestaurants: 302, sold: 3504 },
  { month: 71, weeklyRestaurants: 71.7, newRestaurants: 287, sold: 3791 },
  { month: 72, weeklyRestaurants: 68.1, newRestaurants: 272, sold: 4063 },
  { month: 73, weeklyRestaurants: 64.7, newRestaurants: 259, sold: 4322 },
  { month: 74, weeklyRestaurants: 61.5, newRestaurants: 246, sold: 4568 }
];

const RestaurantGrowthChart: React.FC = () => {
  return (
    <div style={{ marginTop: '120px', width: '100%', height: '600px' }}>
      <h3 style={{ paddingTop: '20px' }}>Restaurant Growth</h3>
      <ResponsiveContainer>
        <ComposedChart 
          data={rawData}
          margin={{ top: 20, right: 70, bottom: 30, left: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            yAxisId="left"
            label={{ value: 'Total Restaurants', angle: -90, position: 'insideLeft', offset: -15 }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            label={{ value: 'New Restaurants Added', angle: 90, position: 'insideRight', offset: 35 }}
          />
          <Tooltip />
          <Legend wrapperStyle={{ paddingTop: '20px', paddingBottom: '20px' }} />
          <Line yAxisId="left" type="monotone" dataKey="sold" stroke="#ff7300" name="Total Restaurants" strokeWidth={2} />
          <Bar yAxisId="right" dataKey="weeklyRestaurants" fill="#8884d8" name="Weekly Restaurants Needed" />
          <Bar yAxisId="right" dataKey="newRestaurants" fill="#82ca9d" name="New Restaurants Monthly" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RestaurantGrowthChart;

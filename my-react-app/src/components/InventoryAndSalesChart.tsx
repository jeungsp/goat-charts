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

interface MonthlyInventoryData {
  month: number;
  newInventory: number;
  sold: number;
  available: number;
  left: number;
  weeklyRestaurants: number;
  newRestaurants: number;
}

const rawData: MonthlyInventoryData[] = [
  { month: 1, newInventory: 100, sold: 86, available: 100, left: 14, weeklyRestaurants: 0, newRestaurants: 0 },
  { month: 2, newInventory: 100, sold: 88, available: 114, left: 26, weeklyRestaurants: 0.5, newRestaurants: 2 },
  { month: 3, newInventory: 100, sold: 91, available: 126, left: 36, weeklyRestaurants: 0.7, newRestaurants: 3 },
  { month: 4, newInventory: 100, sold: 94, available: 136, left: 42, weeklyRestaurants: 0.8, newRestaurants: 3 },
  { month: 5, newInventory: 100, sold: 97, available: 142, left: 45, weeklyRestaurants: 0.9, newRestaurants: 4 },
  { month: 6, newInventory: 100, sold: 102, available: 145, left: 43, weeklyRestaurants: 1.1, newRestaurants: 5 },
  { month: 7, newInventory: 100, sold: 107, available: 143, left: 36, weeklyRestaurants: 1.4, newRestaurants: 5 },
  { month: 8, newInventory: 100, sold: 114, available: 136, left: 22, weeklyRestaurants: 1.6, newRestaurants: 7 },
  { month: 9, newInventory: 100, sold: 122, available: 122, left: 0, weeklyRestaurants: 2.0, newRestaurants: 8 },
  { month: 10, newInventory: 850, sold: 131, available: 850, left: 719, weeklyRestaurants: 2.3, newRestaurants: 9 },
  { month: 11, newInventory: 100, sold: 142, available: 819, left: 677, weeklyRestaurants: 2.8, newRestaurants: 11 },
  { month: 12, newInventory: 100, sold: 153, available: 777, left: 624, weeklyRestaurants: 2.7, newRestaurants: 11 },
  { month: 13, newInventory: 100, sold: 163, available: 724, left: 560, weeklyRestaurants: 2.5, newRestaurants: 10 },
  { month: 14, newInventory: 100, sold: 173, available: 660, left: 488, weeklyRestaurants: 2.4, newRestaurants: 10 },
  { month: 15, newInventory: 100, sold: 183, available: 588, left: 405, weeklyRestaurants: 2.5, newRestaurants: 10 },
  { month: 16, newInventory: 0, sold: 195, available: 405, left: 210, weeklyRestaurants: 3.0, newRestaurants: 12 },
  { month: 17, newInventory: 0, sold: 210, available: 210, left: 0, weeklyRestaurants: 3.6, newRestaurants: 15 },
  { month: 18, newInventory: 2000, sold: 224, available: 2000, left: 1776, weeklyRestaurants: 3.5, newRestaurants: 14 },
  { month: 19, newInventory: 0, sold: 237, available: 1776, left: 1540, weeklyRestaurants: 3.3, newRestaurants: 13 },
  { month: 20, newInventory: 0, sold: 249, available: 1540, left: 1291, weeklyRestaurants: 3.1, newRestaurants: 13 },
  { month: 21, newInventory: 0, sold: 261, available: 1291, left: 1030, weeklyRestaurants: 3.0, newRestaurants: 12 },
  { month: 22, newInventory: 0, sold: 272, available: 1030, left: 757, weeklyRestaurants: 2.8, newRestaurants: 11 },
  { month: 23, newInventory: 125, sold: 283, available: 882, left: 599, weeklyRestaurants: 2.7, newRestaurants: 11 },
  { month: 24, newInventory: 0, sold: 293, available: 599, left: 306, weeklyRestaurants: 2.6, newRestaurants: 10 },
  { month: 25, newInventory: 0, sold: 306, available: 306, left: 0, weeklyRestaurants: 3.1, newRestaurants: 12 },
  { month: 26, newInventory: 2000, sold: 321, available: 2000, left: 1679, weeklyRestaurants: 3.7, newRestaurants: 15 },
  { month: 27, newInventory: 250, sold: 338, available: 1929, left: 1591, weeklyRestaurants: 4.4, newRestaurants: 18 },
  { month: 28, newInventory: 0, sold: 360, available: 1591, left: 1232, weeklyRestaurants: 5.3, newRestaurants: 21 },
  { month: 29, newInventory: 0, sold: 385, available: 1232, left: 846, weeklyRestaurants: 6.4, newRestaurants: 26 },
  { month: 30, newInventory: 0, sold: 416, available: 846, left: 431, weeklyRestaurants: 7.7, newRestaurants: 31 },
  { month: 31, newInventory: 2000, sold: 452, available: 2431, left: 1978, weeklyRestaurants: 9.2, newRestaurants: 37 },
  { month: 32, newInventory: 0, sold: 497, available: 1978, left: 1482, weeklyRestaurants: 11.0, newRestaurants: 44 },
  { month: 33, newInventory: 250, sold: 549, available: 1732, left: 1182, weeklyRestaurants: 13.2, newRestaurants: 53 },
  { month: 34, newInventory: 2000, sold: 613, available: 3182, left: 2570, weeklyRestaurants: 15.9, newRestaurants: 63 },
  { month: 35, newInventory: 500, sold: 689, available: 3070, left: 2380, weeklyRestaurants: 19.0, newRestaurants: 76 },
  { month: 36, newInventory: 312, sold: 780, available: 2692, left: 1912, weeklyRestaurants: 22.9, newRestaurants: 91 },
  { month: 37, newInventory: 0, sold: 890, available: 1912, left: 1022, weeklyRestaurants: 27.4, newRestaurants: 110 },
  { month: 38, newInventory: 0, sold: 1022, available: 1022, left: 0, weeklyRestaurants: 32.9, newRestaurants: 132 },
  { month: 39, newInventory: 4750, sold: 1180, available: 4750, left: 3570, weeklyRestaurants: 39.5, newRestaurants: 158 },
  { month: 40, newInventory: 0, sold: 1369, available: 3570, left: 2201, weeklyRestaurants: 47.4, newRestaurants: 190 },
  { month: 41, newInventory: 125, sold: 1597, available: 2326, left: 729, weeklyRestaurants: 56.9, newRestaurants: 227 },
  { month: 42, newInventory: 4908, sold: 1870, available: 5637, left: 3767, weeklyRestaurants: 68.2, newRestaurants: 273 },
  { month: 43, newInventory: 2000, sold: 2197, available: 5767, left: 3570, weeklyRestaurants: 81.9, newRestaurants: 328 },
  { month: 44, newInventory: 3877, sold: 2549, available: 7447, left: 4898, weeklyRestaurants: 88.0, newRestaurants: 352 },
  { month: 45, newInventory: 500, sold: 2884, available: 5398, left: 2514, weeklyRestaurants: 83.6, newRestaurants: 335 },
  { month: 46, newInventory: 688, sold: 3202, available: 3202, left: 0, weeklyRestaurants: 79.5, newRestaurants: 318 },
  { month: 47, newInventory: 20375, sold: 3504, available: 20375, left: 16871, weeklyRestaurants: 75.5, newRestaurants: 302 },
  { month: 48, newInventory: 1250, sold: 3791, available: 18121, left: 14331, weeklyRestaurants: 71.7, newRestaurants: 287 },
  { month: 49, newInventory: 1985, sold: 4063, available: 16316, left: 12253, weeklyRestaurants: 68.1, newRestaurants: 272 },
  { month: 50, newInventory: 7250, sold: 4322, available: 19503, left: 15181, weeklyRestaurants: 64.7, newRestaurants: 259 },
  { month: 51, newInventory: 1625, sold: 4568, available: 16806, left: 12238, weeklyRestaurants: 61.5, newRestaurants: 246 },
  { month: 52, newInventory: 11002, sold: 4801, available: 23240, left: 18439, weeklyRestaurants: 58.4, newRestaurants: 234 },
  { month: 53, newInventory: 94, sold: 5023, available: 18533, left: 13510, weeklyRestaurants: 55.5, newRestaurants: 222 },
  { month: 54, newInventory: 1250, sold: 5234, available: 14760, left: 9525, weeklyRestaurants: 52.7, newRestaurants: 211 },
  { month: 55, newInventory: 23915, sold: 5434, available: 33440, left: 28006, weeklyRestaurants: 50.1, newRestaurants: 200 },
  { month: 56, newInventory: 2250, sold: 5625, available: 30256, left: 24631, weeklyRestaurants: 47.6, newRestaurants: 190 },
  { month: 57, newInventory: 3002, sold: 5806, available: 27633, left: 21828, weeklyRestaurants: 45.2, newRestaurants: 181 },
  { month: 58, newInventory: 750, sold: 5977, available: 22578, left: 16600, weeklyRestaurants: 42.9, newRestaurants: 172 },
  { month: 59, newInventory: 844, sold: 6140, available: 17444, left: 11304, weeklyRestaurants: 40.8, newRestaurants: 163 },
  { month: 60, newInventory: 21873, sold: 6295, available: 33177, left: 26882, weeklyRestaurants: 38.7, newRestaurants: 155 },
  { month: 61, newInventory: 752, sold: 6443, available: 27634, left: 21191, weeklyRestaurants: 36.8, newRestaurants: 147 },
  { month: 62, newInventory: 1993, sold: 6582, available: 23184, left: 16602, weeklyRestaurants: 35.0, newRestaurants: 140 },
  { month: 63, newInventory: 10707, sold: 6715, available: 27308, left: 20593, weeklyRestaurants: 33.2, newRestaurants: 133 },
  { month: 64, newInventory: 1313, sold: 6842, available: 21906, left: 15064, weeklyRestaurants: 31.6, newRestaurants: 126 },
  { month: 65, newInventory: 8818, sold: 6962, available: 23882, left: 16921, weeklyRestaurants: 30.0, newRestaurants: 120 },
  { month: 66, newInventory: 47, sold: 7075, available: 16968, left: 9893, weeklyRestaurants: 28.5, newRestaurants: 114 },
  { month: 67, newInventory: 752, sold: 7184, available: 10645, left: 3461, weeklyRestaurants: 27.1, newRestaurants: 108 },
  { month: 68, newInventory: 30475, sold: 7287, available: 33936, left: 26649, weeklyRestaurants: 25.7, newRestaurants: 103 },
  { month: 69, newInventory: 1126, sold: 7384, available: 27775, left: 20391, weeklyRestaurants: 24.4, newRestaurants: 98 },
  { month: 70, newInventory: 1503, sold: 7477, available: 21894, left: 14417, weeklyRestaurants: 23.2, newRestaurants: 93 },
  { month: 71, newInventory: 375, sold: 7565, available: 14792, left: 7227, weeklyRestaurants: 22.0, newRestaurants: 88 },
  { month: 72, newInventory: 422, sold: 7649, available: 7649, left: 0, weeklyRestaurants: 20.9, newRestaurants: 84 },
  { month: 73, newInventory: 18664, sold: 7749, available: 18664, left: 10915, weeklyRestaurants: 25.1, newRestaurants: 100 },
  { month: 74, newInventory: 376, sold: 7870, available: 11291, left: 3421, weeklyRestaurants: 30.2, newRestaurants: 121 }
];

// Process the raw data to include all months up to 74
const monthlyData = Array.from({ length: 74 }, (_, i) => {
  const month = i + 1;
  const data = rawData.find(d => d.month === month) || {
    month,
    newInventory: 0,
    sold: 0,
    available: 0,
    left: 0,
    weeklyRestaurants: 0,
    newRestaurants: 0
  };
  return data;
});

const InventoryGrowthChart: React.FC = () => {
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const [viewWindow, setViewWindow] = useState({ start: 24, end: 48 }); // Show 24 months by default

  // Adjust month numbers to start at 24
  const monthlyAdjustedData = monthlyData.map((item, index) => ({
    ...item,
    month: index + 24  // Start at month 24
  }));

  const data = monthlyAdjustedData;
  
  const handleScroll = (direction: 'left' | 'right') => {
    if (!isZoomedOut) {
      const step = 6; // Scroll 6 months at a time
      setViewWindow(prev => {
        const newStart = direction === 'left' ? 
          Math.max(24, prev.start - step) : 
          Math.min(monthlyAdjustedData.length - 24, prev.start + step);
        return {
          start: newStart,
          end: newStart + 24
        };
      });
    }
  };

  const visibleData = isZoomedOut ? data : data.slice(
    viewWindow.start - 24,
    viewWindow.end - 24
  );

  return (
    <div style={{ width: '100%', height: '600px', marginTop: '20px', marginBottom: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h3 style={{ marginBottom: '10px' }}>Inventory & Sales</h3>
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
            {isZoomedOut ? 'Show Detailed View' : 'Show Full View'}
          </button>
        </div>
        {!isZoomedOut && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button
              onClick={() => handleScroll('left')}
              disabled={viewWindow.start <= 24}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: viewWindow.start <= 24 ? 'not-allowed' : 'pointer',
                opacity: viewWindow.start <= 24 ? 0.5 : 1
              }}
            >
              ← Previous
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={viewWindow.end >= monthlyAdjustedData.length}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: viewWindow.end >= monthlyAdjustedData.length ? 'not-allowed' : 'pointer',
                opacity: viewWindow.end >= monthlyAdjustedData.length ? 0.5 : 1
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
      <ResponsiveContainer>
        <ComposedChart 
          data={visibleData}
          margin={{ top: 20, right: 50, bottom: 30, left: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month"
            label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            yAxisId="left"
            label={{ value: 'Inventory', angle: -90, position: 'insideLeft', offset: -15 }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            label={{ value: 'Sales', angle: 90, position: 'insideRight', offset: 35 }}
          />
          <Tooltip />
          <Legend wrapperStyle={{ paddingTop: '20px', paddingBottom: '20px' }} />
          <Bar yAxisId="left" dataKey="newInventory" fill="#8884d8" name="New Inventory" />
          <Bar yAxisId="left" dataKey="available" fill="#82ca9d" name="Available" />
          <Bar yAxisId="left" dataKey="left" fill="#ffc658" name="Inventory Left" />
          <Line yAxisId="right" type="monotone" dataKey="sold" stroke="#ff7300" name="Sold" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryGrowthChart;

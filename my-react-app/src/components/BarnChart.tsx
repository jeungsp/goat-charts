import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface QuarterlyData {
  name: string;
  barns: number;
}

const calculateQuarterlyData = (): QuarterlyData[] => {
  const monthlyData = [
    { month: 1, goats: 6800, inventory: 14 },
    { month: 2, goats: 11800, inventory: 26 },
    { month: 3, goats: 11800, inventory: 36 },
    { month: 4, goats: 11800, inventory: 42 },
    { month: 5, goats: 11700, inventory: 45 },
    { month: 6, goats: 11600, inventory: 43 },
    { month: 7, goats: 12000, inventory: 36 },
    { month: 8, goats: 11900, inventory: 22 },
    { month: 9, goats: 11800, inventory: 0 },
    { month: 10, goats: 16700, inventory: 719 },
    { month: 11, goats: 17100, inventory: 677 },
    { month: 12, goats: 17000, inventory: 624 },
    { month: 13, goats: 17000, inventory: 560 },
    { month: 14, goats: 17000, inventory: 488 },
    { month: 15, goats: 20000, inventory: 405 },
    { month: 16, goats: 20000, inventory: 210 },
    { month: 17, goats: 20500, inventory: 0 },
    { month: 18, goats: 25500, inventory: 1776 },
    { month: 19, goats: 26500, inventory: 1540 },
    { month: 20, goats: 27000, inventory: 1291 },
    { month: 21, goats: 27000, inventory: 1030 },
    { month: 22, goats: 27000, inventory: 757 },
    { month: 23, goats: 35500, inventory: 599 },
    { month: 24, goats: 35500, inventory: 306 },
    { month: 25, goats: 36500, inventory: 0 },
    { month: 26, goats: 42000, inventory: 1679 },
    { month: 27, goats: 43000, inventory: 1591 },
    { month: 28, goats: 44750, inventory: 1232 },
    { month: 29, goats: 44750, inventory: 846 },
    { month: 30, goats: 44750, inventory: 431 },
    { month: 31, goats: 58750, inventory: 1978 },
    { month: 32, goats: 59750, inventory: 1482 },
    { month: 33, goats: 60751, inventory: 1182 },
    { month: 34, goats: 66751, inventory: 2570 },
    { month: 35, goats: 68251, inventory: 2380 },
    { month: 36, goats: 75001, inventory: 1912 },
    { month: 37, goats: 75126, inventory: 1022 },
    { month: 38, goats: 76501, inventory: 0 },
    { month: 39, goats: 92843, inventory: 3570 },
    { month: 40, goats: 93843, inventory: 2201 },
    { month: 41, goats: 93967, inventory: 729 },
    { month: 42, goats: 94467, inventory: 3767 },
    { month: 43, goats: 94904, inventory: 3570 },
    { month: 44, goats: 99279, inventory: 4898 },
    { month: 45, goats: 99029, inventory: 2514 },
    { month: 46, goats: 99701, inventory: 0 },
    { month: 47, goats: 100951, inventory: 16871 },
    { month: 48, goats: 101076, inventory: 14331 },
    { month: 49, goats: 100574, inventory: 12253 },
    { month: 50, goats: 100543, inventory: 15181 },
    { month: 51, goats: 100293, inventory: 12238 },
    { month: 52, goats: 102957, inventory: 18439 },
    { month: 53, goats: 102207, inventory: 13510 },
    { month: 54, goats: 101207, inventory: 9525 },
    { month: 55, goats: 100957, inventory: 28006 },
    { month: 56, goats: 100676, inventory: 24631 },
    { month: 57, goats: 97796, inventory: 21828 },
    { month: 58, goats: 97544, inventory: 16600 },
    { month: 59, goats: 96880, inventory: 11304 },
    { month: 60, goats: 99087, inventory: 26882 },
    { month: 61, goats: 98649, inventory: 21191 },
    { month: 62, goats: 96961, inventory: 16602 },
    { month: 63, goats: 96946, inventory: 20593 },
    { month: 64, goats: 96694, inventory: 15064 },
    { month: 65, goats: 100587, inventory: 16921 },
    { month: 66, goats: 100211, inventory: 9893 },
    { month: 67, goats: 99711, inventory: 3461 },
    { month: 68, goats: 99586, inventory: 26649 },
    { month: 69, goats: 99446, inventory: 20391 },
    { month: 70, goats: 99106, inventory: 14417 },
    { month: 71, goats: 98982, inventory: 7227 },
  ];

  const quarterlyData: QuarterlyData[] = [];
  for (let i = 0; i < monthlyData.length; i += 3) {
    if (i + 2 < monthlyData.length) {
      const quarterIndex = Math.floor(i / 3);
      const quarterNumber = Math.floor(i / 3) % 4 + 1;
      const yearNumber = Math.floor(i / 12) + 2;  // Start from Year 2

      const totalGoats = [
        monthlyData[i].goats + monthlyData[i].inventory,
        monthlyData[i+1].goats + monthlyData[i+1].inventory,
        monthlyData[i+2].goats + monthlyData[i+2].inventory
      ];
      const avgTotalGoats = totalGoats.reduce((a, b) => a + b, 0) / 3;
      
      quarterlyData.push({
        name: `Y${yearNumber}Q${quarterNumber}`,
        barns: Math.round(avgTotalGoats / 1000)  // Round to nearest whole barn
      });
    }
  }
  return quarterlyData;
};

const BarnChart: React.FC = () => {
  const quarterlyData = calculateQuarterlyData();
  const maxBarns = Math.max(...quarterlyData.map(d => d.barns));

  return (
    <div style={{ width: '100%', height: '400px', marginTop: '20px', marginBottom: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h3>Barns Needed</h3>
      </div>
      <ResponsiveContainer>
        <ComposedChart
          data={quarterlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name"
            label={{ value: 'Quarter', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ value: 'Number of Barns', angle: -90, position: 'insideLeft', offset: -5 }}
            domain={[0, maxBarns + 5]}
          />
<Tooltip 
  formatter={(value: any, name: string) => [Math.round(Number(value)), name]}
/>
          <Legend />
          <Bar dataKey="barns" fill="#8884d8" name="Barns Needed" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarnChart;

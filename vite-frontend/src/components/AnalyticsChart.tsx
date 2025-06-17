import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface AnalyticsData {
  name: string;
  value: number;
  fill: string;
}
interface AnalyticsChartProps {
  title: string;
  data: AnalyticsData[];
}
const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  data
}) => {
  return <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" tick={{
            fill: '#fff'
          }} />
            <YAxis tick={{
            fill: '#fff'
          }} />
            <Tooltip contentStyle={{
            backgroundColor: '#333',
            border: 'none'
          }} labelStyle={{
            color: '#fff'
          }} />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>;
};
export default AnalyticsChart;
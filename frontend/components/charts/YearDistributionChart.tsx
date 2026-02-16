'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface YearData {
  _id: string;
  count: number;
  avgIntensity: number;
}

interface YearDistributionChartProps {
  data: YearData[] | null;
  loading?: boolean;
}

export default function YearDistributionChart({
  data,
  loading,
}: YearDistributionChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Year Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Year Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">No data available</div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    year: item._id,
    count: item.count,
    intensity: Number(item.avgIntensity.toFixed(2)),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Distribution by Year</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="count"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              name="Record Count"
            />
            <Area
              type="monotone"
              dataKey="intensity"
              stackId="2"
              stroke="#10b981"
              fill="#10b981"
              name="Avg Intensity"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

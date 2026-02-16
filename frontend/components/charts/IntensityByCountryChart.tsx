'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface IntensityData {
  _id: string;
  avgIntensity: number;
  count: number;
}

interface IntensityByCountryChartProps {
  data: IntensityData[] | null;
  loading?: boolean;
}

export default function IntensityByCountryChart({
  data,
  loading,
}: IntensityByCountryChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Intensity by Country</CardTitle>
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
          <CardTitle>Intensity by Country</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">No data available</div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    country: item._id.length > 15 ? item._id.substring(0, 15) + '...' : item._id,
    intensity: Number(item.avgIntensity.toFixed(2)),
    count: item.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Intensity by Country</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="country"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="intensity" fill="#3b82f6" name="Avg Intensity" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface LikelihoodData {
  _id: string;
  avgLikelihood: number;
  count: number;
}

interface LikelihoodByTopicChartProps {
  data: LikelihoodData[] | null;
  loading?: boolean;
}

export default function LikelihoodByTopicChart({
  data,
  loading,
}: LikelihoodByTopicChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Likelihood by Topic</CardTitle>
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
          <CardTitle>Likelihood by Topic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">No data available</div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    topic: item._id,
    likelihood: Number(item.avgLikelihood.toFixed(2)),
    count: item.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Likelihood by Topic</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="topic"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="likelihood"
              stroke="#10b981"
              strokeWidth={2}
              name="Avg Likelihood"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

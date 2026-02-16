'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function RelevanceAsiaEuropeChart({ data }: any) {
  const filtered = data?.filter((d: any) =>
    ['Asia', 'Eastern Asia', 'Southern Asia', 'Western Asia', 'Europe', 'Western Europe', 'Eastern Europe'].includes(d._id)
  );

  if (!filtered?.length) return null;

  const chartData = filtered.map((d: any) => ({
    name: d._id,
    value: Number(d.avgRelevance.toFixed(2)),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Relevance – Asia & Europe</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={120}
              label
            >
              {chartData.map((_: any, i: number) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

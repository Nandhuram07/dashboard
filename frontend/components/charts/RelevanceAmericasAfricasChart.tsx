'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#ef4444', '#06b6d4', '#22c55e', '#eab308', '#a855f7'];

export default function RelevanceAmericasAfricaChart({ data }: any) {
  const filtered = data?.filter((d: any) =>
    ['North America', 'South America', 'Africa', 'Western Africa', 'Northern Africa', 'Central America', 'Oceania', 'World'].includes(d._id)
  );

  if (!filtered?.length) return null;

  const chartData = filtered.map((d: any) => ({
    name: d._id,
    value: Number(d.avgRelevance.toFixed(2)),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Relevance – Americas, Africa & Others</CardTitle>
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

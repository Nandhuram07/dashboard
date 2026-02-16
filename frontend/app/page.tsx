'use client';

import { useState, useEffect, useCallback } from 'react';
import FilterPanel from '../components/filters/FilterPanel';
import StatsCards from '../components/dashboard/StatsCards';
import IntensityByCountryChart from '../components/charts/IntensityByCountryChart';
import LikelihoodByTopicChart from '../components/charts/LikelihoodByTopicChart'
import RelevanceAsiaEuropeChart from '../components/charts/RelevanceAsiaEuropeChart';
import YearDistributionChart from '../components/charts/YearDistributionChart';
import { dataService, FilterOptions, DashboardStats } from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart3, Loader2 } from 'lucide-react';
import RelevanceAmericasAfricasChart from '../components/charts/RelevanceAmericasAfricasChart';

export default function Dashboard() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [intensityData, setIntensityData] = useState<any[] | null>(null);
  const [likelihoodData, setLikelihoodData] = useState<any[] | null>(null);
  const [relevanceData, setRelevanceData] = useState<any[] | null>(null);
  const [yearData, setYearData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Pre-load filter options immediately on mount for faster filter panel loading
  useEffect(() => {
    dataService.getFilterOptions().catch((error) => {
      console.error('Failed to pre-load filter options:', error);
    });
  }, []);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, intensityRes, likelihoodRes, relevanceRes, yearRes] = await Promise.all([
        dataService.getStats(filters),
        dataService.getIntensityByCountry(filters),
        dataService.getLikelihoodByTopic(filters),
        dataService.getRelevanceByRegion(filters),
        dataService.getYearDistribution(filters),
      ]);

      setStats(statsRes.stats.data || null);
      setIntensityData(intensityRes.data.data || []);
      setLikelihoodData(likelihoodRes.data.data || []);
      setRelevanceData(relevanceRes.data.data || []);
      setYearData(yearRes.data.data || []);

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Blackcoffer Dashboard
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Interactive Data Visualization & Analytics
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-slate-600 dark:text-slate-400">Loading dashboard data...</p>
            </div>
          </div>
        )}

        {!loading && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <StatsCards stats={stats} loading={loading} />

            {/* Filters and Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />
                </div>
              </div>

              {/* Charts Grid */}
              <div className="lg:col-span-3 space-y-6">
                {/* Charts - One per row for all screen sizes */}
                <IntensityByCountryChart data={intensityData} loading={loading} />
                <LikelihoodByTopicChart data={likelihoodData} loading={loading} />
                <RelevanceAsiaEuropeChart data={relevanceData} />
                <RelevanceAmericasAfricasChart data={relevanceData} />

                <YearDistributionChart data={yearData} loading={loading} />

                {/* Additional Insights Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Data Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          Regions Covered
                        </p>
                        <p className="text-2xl font-bold">{stats?.regionsCount || 0}</p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          Topics Analyzed
                        </p>
                        <p className="text-2xl font-bold">{stats?.topicsCount || 0}</p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          Avg Relevance
                        </p>
                        <p className="text-2xl font-bold">
                          {stats?.avgRelevance.toFixed(2) || '0.00'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            © 2026 Blackcoffer Data Visualization Dashboard. Built with Next.js, TypeScript, and
            Recharts.
          </p>
        </div>
      </footer>
    </div>
  );
}

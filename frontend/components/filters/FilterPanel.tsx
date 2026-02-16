'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { dataService, FilterOptions } from '@/lib/api';
import { X, Loader2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const [filterOptions, setFilterOptions] = useState<any>(null);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        );
        
        const responsePromise = dataService.getFilterOptions();
        const response = await Promise.race([responsePromise, timeoutPromise]) as any;
        
        if (response && response.options) {
          setFilterOptions(response.options);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error: any) {
        console.error('Failed to load filter options:', error);
        setError(error.message || 'Failed to load filter options. Please refresh the page.');
        // Retry after 3 seconds
       
      } finally {
        setLoading(false);
      }
    };
    loadOptions();
  }, []);

  const handleFilterChange = (
    key: keyof FilterOptions,
    value?: string | string[]
  ) => {
    const newFilters: FilterOptions = { ...localFilters };
  
    // Remove filter
    if (
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete newFilters[key];
      setLocalFilters(newFilters);
      return;
    }
  
    switch (key) {
      case 'endYear':
        if (typeof value === 'string') {
          newFilters.endYear = value;
        }
        break;
  
      case 'topics':
      case 'sector':
      case 'region':
      case 'pestle':
      case 'source':
      case 'country':
      case 'city':
        if (Array.isArray(value)) {
          newFilters[key] = value;
        }
        break;
    }
  
    setLocalFilters(newFilters);
  };
  
  
  

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterOptions = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const removeFilter = (key: keyof FilterOptions, value: string) => {
    const currentValues = Array.isArray(localFilters[key]) ? localFilters[key] : [];
    const newValues = (currentValues as string[]).filter((v) => v !== value);
    const newFilters = { ...localFilters, [key]: newValues.length > 0 ? newValues : undefined };
    setLocalFilters(newFilters);
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-3 py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm text-slate-600 dark:text-slate-400">Loading filters...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-3 py-8">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline" size="sm">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!filterOptions) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-3 py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm text-slate-600 dark:text-slate-400">Loading filters...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* End Year Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">End Year</label>
          <Select
            value={localFilters.endYear || ''}
            onChange={(e) => handleFilterChange('endYear', e.target.value || undefined)}
          >
            <option value="">All Years</option>
            {filterOptions.endYears.map((year: string) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </div>

        {/* Topics Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Topics</label>
          <Select
            value=""
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                const current = localFilters.topics || [];
                if (!current.includes(value)) {
                  handleFilterChange('topics', [...current, value]);
                }
              }
            }}
          >
            <option value="">Select a topic...</option>
            {filterOptions.topics
              .filter((topic: string) => !localFilters.topics?.includes(topic))
              .map((topic: string) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
          </Select>
        </div>

        {/* Sector Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Sector</label>
          <Select
            value=""
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                const current = localFilters.sector || [];
                if (!current.includes(value)) {
                  handleFilterChange('sector', [...current, value]);
                }
              }
            }}
          >
            <option value="">Select a sector...</option>
            {filterOptions.sectors
              .filter((sector: string) => !localFilters.sector?.includes(sector))
              .map((sector: string) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
          </Select>
        </div>

        {/* Region Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Region</label>
          <Select
            value=""
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                const current = localFilters.region || [];
                if (!current.includes(value)) {
                  handleFilterChange('region', [...current, value]);
                }
              }
            }}
          >
            <option value="">Select a region...</option>
            {filterOptions.regions
              .filter((region: string) => !localFilters.region?.includes(region))
              .map((region: string) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
          </Select>
        </div>

        {/* PEST Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">PEST</label>
          <Select
            value=""
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                const current = localFilters.pestle || [];
                if (!current.includes(value)) {
                  handleFilterChange('pestle', [...current, value]);
                }
              }
            }}
          >
            <option value="">Select a PEST value...</option>
            {filterOptions.pestles
              .filter((pestle: string) => !localFilters.pestle?.includes(pestle))
              .map((pestle: string) => (
                <option key={pestle} value={pestle}>
                  {pestle}
                </option>
              ))}
          </Select>
        </div>

        {/* Source Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Source</label>
          <Select
            value=""
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                const current = localFilters.source || [];
                if (!current.includes(value)) {
                  handleFilterChange('source', [...current, value]);
                }
              }
            }}
          >
            <option value="">Select a source...</option>
            {filterOptions.sources
              .filter((source: string) => !localFilters.source?.includes(source))
              .map((source: string) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
          </Select>
        </div>

        {/* Country Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Country</label>
          <Select
            value=""
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                const current = localFilters.country || [];
                if (!current.includes(value)) {
                  handleFilterChange('country', [...current, value]);
                }
              }
            }}
          >
            <option value="">Select a country...</option>
            {filterOptions.countries
              .filter((country: string) => !localFilters.country?.includes(country))
              .map((country: string) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
          </Select>
        </div>

        {/* City Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">City</label>
          <Select
            value=""
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                const current = localFilters.city || [];
                if (!current.includes(value)) {
                  handleFilterChange('city', [...current, value]);
                }
              }
            }}
          >
            <option value="">Select a city...</option>
            {filterOptions.cities
              .filter((city: string) => !localFilters.city?.includes(city))
              .map((city: string) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </Select>
        </div>

        {/* Active Filters Display */}
        <div className="pt-4 border-t">
          <div className="flex flex-wrap gap-2 mb-4">
            {localFilters.endYear && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Year: {localFilters.endYear}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleFilterChange('endYear', undefined)}
                />
              </Badge>
            )}
            {localFilters.topics?.map((topic) => (
              <Badge key={topic} variant="secondary" className="flex items-center gap-1">
                Topic: {topic}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('topics', topic)}
                />
              </Badge>
            ))}
            {localFilters.sector?.map((sector) => (
              <Badge key={sector} variant="secondary" className="flex items-center gap-1">
                Sector: {sector}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('sector', sector)}
                />
              </Badge>
            ))}
            {localFilters.region?.map((region) => (
              <Badge key={region} variant="secondary" className="flex items-center gap-1">
                Region: {region}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('region', region)}
                />
              </Badge>
            ))}
            {localFilters.pestle?.map((pestle) => (
              <Badge key={pestle} variant="secondary" className="flex items-center gap-1">
                PEST: {pestle}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('pestle', pestle)}
                />
              </Badge>
            ))}
            {localFilters.source?.map((source) => (
              <Badge key={source} variant="secondary" className="flex items-center gap-1">
                Source: {source}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('source', source)}
                />
              </Badge>
            ))}
            {localFilters.country?.map((country) => (
              <Badge key={country} variant="secondary" className="flex items-center gap-1">
                Country: {country}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('country', country)}
                />
              </Badge>
            ))}
            {localFilters.city?.map((city) => (
              <Badge key={city} variant="secondary" className="flex items-center gap-1">
                City: {city}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('city', city)}
                />
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleApplyFilters} className="flex-1">
              Apply Filters
            </Button>
            <Button onClick={handleClearFilters} variant="outline" className="flex-1">
              Clear All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export interface DataPoint {
  end_year: string | null;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string | null;
  impact: string | null;
  added: string;
  published: string;
  country: string;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
  city?: string;
}

export interface FilterOptions {
  endYear?: string;
  topics?: string[];
  sector?: string[];
  region?: string[];
  pestle?: string[];
  source?: string[];
  country?: string[];
  city?: string[];
  swot?: string[];
}

export interface DashboardStats {
  totalRecords: number;
  avgIntensity: number;
  avgLikelihood: number;
  avgRelevance: number;
  countriesCount: number;
  regionsCount: number;
  topicsCount: number;
}

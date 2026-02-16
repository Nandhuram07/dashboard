import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout - please check your connection';
    } else if (error.response) {
      // Server responded with error status
      error.message = error.response.data?.error || `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request made but no response
      error.message = 'No response from server - please check if backend is running';
    }
    return Promise.reject(error);
  }
);

export interface FilterOptions {
  endYear?: string;
  topics?: string[];
  sector?: string[];
  region?: string[];
  pestle?: string[];
  source?: string[];
  country?: string[];
  city?: string[];
}

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
  city?: string | null;
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

const buildParams = (filters?: FilterOptions) => {
  const params: any = {};

  if (filters?.endYear) params.endYear = filters.endYear;
  if (filters?.topics?.length) params.topics = filters.topics.join(',');
  if (filters?.sector?.length) params.sector = filters.sector.join(',');
  if (filters?.region?.length) params.region = filters.region.join(',');
  if (filters?.pestle?.length) params.pestle = filters.pestle.join(',');
  if (filters?.source?.length) params.source = filters.source.join(',');
  if (filters?.country?.length) params.country = filters.country.join(',');
  if (filters?.city?.length) params.city = filters.city.join(',');

  return params;
};


export const dataService = {
  getData: async (filters?: FilterOptions, page = 1, limit = 100) => {
    const params = new URLSearchParams();
    if (filters?.endYear) params.append('endYear', filters.endYear);
    if (filters?.topics?.length) params.append('topics', filters.topics.join(','));
    if (filters?.sector?.length) params.append('sector', filters.sector.join(','));
    if (filters?.region?.length) params.append('region', filters.region.join(','));
    if (filters?.pestle?.length) params.append('pestle', filters.pestle.join(','));
    if (filters?.source?.length) params.append('source', filters.source.join(','));
    if (filters?.country?.length) params.append('country', filters.country.join(','));
    if (filters?.city?.length) params.append('city', filters.city.join(','));
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/data?${params.toString()}`);
    return response.data;
  },

  getStats: async (filters?: FilterOptions) => {
    const params = new URLSearchParams();
    if (filters?.endYear) params.append('endYear', filters.endYear);
    if (filters?.topics?.length) params.append('topics', filters.topics.join(','));
    if (filters?.sector?.length) params.append('sector', filters.sector.join(','));
    if (filters?.region?.length) params.append('region', filters.region.join(','));
    if (filters?.pestle?.length) params.append('pestle', filters.pestle.join(','));
    if (filters?.source?.length) params.append('source', filters.source.join(','));
    if (filters?.country?.length) params.append('country', filters.country.join(','));
    if (filters?.city?.length) params.append('city', filters.city.join(','));

    const response = await api.get(`/stats?${params.toString()}`);
    return response.data;
  },

  getFilterOptions: async () => {
    const response = await api.get('/filter-options');
    return response.data;
  },

  getIntensityByCountry(filters?: FilterOptions) {
    return api.get('/intensity-by-country', {
      params: buildParams(filters),
    });
  },
  
  getLikelihoodByTopic(filters?: FilterOptions) {
    return api.get('/likelihood-by-topic', {
      params: buildParams(filters),
    });
  },
  
  getRelevanceByRegion(filters?: FilterOptions) {
    return api.get('/relevance-by-region', {
      params: buildParams(filters),
    });
  },
  
  getYearDistribution(filters?: FilterOptions) {
    return api.get('/year-distribution', {
      params: buildParams(filters),
    });
  }
  
  };

import { Request, Response } from 'express';
import { DataPointModel } from '../models/DataPoint';
import { FilterOptions, DashboardStats } from '../types';

const buildQueryFromFilters = (req: Request) => {
  const query: any = {};

  if (req.query.endYear) query.end_year = req.query.endYear;

  if (req.query.topics)
    query.topic = { $in: (req.query.topics as string).split(',') };

  if (req.query.sector)
    query.sector = { $in: (req.query.sector as string).split(',') };

  if (req.query.region)
    query.region = { $in: (req.query.region as string).split(',') };

  if (req.query.pestle)
    query.pestle = { $in: (req.query.pestle as string).split(',') };

  if (req.query.source)
    query.source = { $in: (req.query.source as string).split(',') };

  if (req.query.country)
    query.country = { $in: (req.query.country as string).split(',') };

  if (req.query.city)
    query.city = { $in: (req.query.city as string).split(',') };

  return query;
};


export const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters: FilterOptions = {
      endYear: req.query.endYear as string,
      topics: req.query.topics ? (req.query.topics as string).split(',') : undefined,
      sector: req.query.sector ? (req.query.sector as string).split(',') : undefined,
      region: req.query.region ? (req.query.region as string).split(',') : undefined,
      pestle: req.query.pestle ? (req.query.pestle as string).split(',') : undefined,
      source: req.query.source ? (req.query.source as string).split(',') : undefined,
      country: req.query.country ? (req.query.country as string).split(',') : undefined,
      city: req.query.city ? (req.query.city as string).split(',') : undefined,
    };

    const query: any = {};

    if (filters.endYear) {
      query.end_year = filters.endYear;
    }
    if (filters.topics && filters.topics.length > 0) {
      query.topic = { $in: filters.topics };
    }
    if (filters.sector && filters.sector.length > 0) {
      query.sector = { $in: filters.sector };
    }
    if (filters.region && filters.region.length > 0) {
      query.region = { $in: filters.region };
    }
    if (filters.pestle && filters.pestle.length > 0) {
      query.pestle = { $in: filters.pestle };
    }
    if (filters.source && filters.source.length > 0) {
      query.source = { $in: filters.source };
    }
    if (filters.country && filters.country.length > 0) {
      query.country = { $in: filters.country };
    }
    if (filters.city && filters.city.length > 0) {
      query.city = { $in: filters.city };
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 100;
    const skip = (page - 1) * limit;

    const data = await DataPointModel.find(query).skip(skip).limit(limit).lean();
    const total = await DataPointModel.countDocuments(query);

    res.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch data' });
  }
};

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters: FilterOptions = {
      endYear: req.query.endYear as string,
      topics: req.query.topics ? (req.query.topics as string).split(',') : undefined,
      sector: req.query.sector ? (req.query.sector as string).split(',') : undefined,
      region: req.query.region ? (req.query.region as string).split(',') : undefined,
      pestle: req.query.pestle ? (req.query.pestle as string).split(',') : undefined,
      source: req.query.source ? (req.query.source as string).split(',') : undefined,
      country: req.query.country ? (req.query.country as string).split(',') : undefined,
      city: req.query.city ? (req.query.city as string).split(',') : undefined,
    };

    const query: any = {};

    if (filters.endYear) query.end_year = filters.endYear;
    if (filters.topics && filters.topics.length > 0) query.topic = { $in: filters.topics };
    if (filters.sector && filters.sector.length > 0) query.sector = { $in: filters.sector };
    if (filters.region && filters.region.length > 0) query.region = { $in: filters.region };
    if (filters.pestle && filters.pestle.length > 0) query.pestle = { $in: filters.pestle };
    if (filters.source && filters.source.length > 0) query.source = { $in: filters.source };
    if (filters.country && filters.country.length > 0) query.country = { $in: filters.country };
    if (filters.city && filters.city.length > 0) query.city = { $in: filters.city };

    const [totalRecords, avgStats, countriesCount, regionsCount, topicsCount] = await Promise.all([
      DataPointModel.countDocuments(query),
      DataPointModel.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            avgIntensity: { $avg: '$intensity' },
            avgLikelihood: { $avg: '$likelihood' },
            avgRelevance: { $avg: '$relevance' },
          },
        },
      ]),
      DataPointModel.distinct('country', query).then((arr) => arr.length),
      DataPointModel.distinct('region', query).then((arr) => arr.length),
      DataPointModel.distinct('topic', query).then((arr) => arr.length),
    ]);

    const stats: DashboardStats = {
      totalRecords,
      avgIntensity: avgStats[0]?.avgIntensity || 0,
      avgLikelihood: avgStats[0]?.avgLikelihood || 0,
      avgRelevance: avgStats[0]?.avgRelevance || 0,
      countriesCount,
      regionsCount,
      topicsCount,
    };

    res.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
};

// export const getFilterOptions = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const [endYears, topics, sectors, regions, pestles, sources, countries, cities] = await Promise.all([
//       DataPointModel.distinct('end_year').then((arr) =>
//         arr
//           .filter((y) => typeof y === 'string' || typeof y === 'number')
//           .map((y) => String(y))
//           .filter((y) => y.trim() !== '')
//       ),
//       DataPointModel.distinct('topic'),
//       DataPointModel.distinct('sector'),
//       DataPointModel.distinct('region'),
//       DataPointModel.distinct('pestle'),
//       DataPointModel.distinct('source'),
//       DataPointModel.distinct('country'),
//       DataPointModel.distinct('city').then((arr) =>
//         arr
//           .filter((c) => typeof c === 'string')
//           .map((c) => c.trim())
//           .filter(Boolean)
//       ),
//           ]);

//     res.json({
//       success: true,
//       options: {
//         endYears: endYears.sort(),
//         topics: topics.sort(),
//         sectors: sectors.sort(),
//         regions: regions.sort(),
//         pestles: pestles.sort(),
//         sources: sources.sort(),
//         countries: countries.sort(),
//         cities: cities.sort(),
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching filter options:', error);
//     res.status(500).json({ success: false, error: 'Failed to fetch filter options' });
//   }
// };

export const getFilterOptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      endYears,
      topics,
      sectors,
      regions,
      pestles,
      sources,
      countries,
      cities,
    ] = await Promise.all([
      DataPointModel.distinct('end_year').then((arr) =>
        arr
          .filter((y) => typeof y === 'string' || typeof y === 'number')
          .map((y) => String(y))
          .filter((y) => y.trim() !== '')
      ),
      DataPointModel.distinct('topic').then((arr) =>
        arr.filter((t) => typeof t === 'string' && t.trim() !== '')
      ),
      DataPointModel.distinct('sector').then((arr) =>
        arr.filter((s) => typeof s === 'string' && s.trim() !== '')
      ),
      DataPointModel.distinct('region').then((arr) =>
        arr.filter((r) => typeof r === 'string' && r.trim() !== '')
      ),
      DataPointModel.distinct('pestle').then((arr) =>
        arr.filter((p) => typeof p === 'string' && p.trim() !== '')
      ),
      DataPointModel.distinct('source').then((arr) =>
        arr.filter((s) => typeof s === 'string' && s.trim() !== '')
      ),
      DataPointModel.distinct('country').then((arr) =>
        arr.filter((c) => typeof c === 'string' && c.trim() !== '')
      ),
      DataPointModel.distinct('city').then((arr) =>
        arr.filter((c) => typeof c === 'string' && c.trim() !== '')
      ),
    ]);

    res.json({
      success: true,
      options: {
        endYears: endYears.sort(),
        topics: topics.sort(),
        sectors: sectors.sort(),
        regions: regions.sort(),
        pestles: pestles.sort(),
        sources: sources.sort(),
        countries: countries.sort(),
        cities: cities.sort(),
      },
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch filter options' });
  }
};


export const getIntensityByCountry = async (req: Request, res: Response) => {
  try {
    const query = buildQueryFromFilters(req);

    const data = await DataPointModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$country',
          avgIntensity: { $avg: '$intensity' },
          count: { $sum: 1 },
        },
      },
      { $sort: { avgIntensity: -1 } },
      { $limit: 20 },
    ]);

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching intensity by country:', error);
    res.status(500).json({ success: false });
  }
};


export const getLikelihoodByTopic = async (req: Request, res: Response) => {
  try {
    const query = buildQueryFromFilters(req);

    const data = await DataPointModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$topic',
          avgLikelihood: { $avg: '$likelihood' },
          count: { $sum: 1 },
        },
      },
      { $sort: { avgLikelihood: -1 } },
      { $limit: 15 },
    ]);

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching likelihood by topic:', error);
    res.status(500).json({ success: false });
  }
};


export const getRelevanceByRegion = async (req: Request, res: Response) => {
  try {
    const query = buildQueryFromFilters(req);

    const data = await DataPointModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$region',
          avgRelevance: { $avg: '$relevance' },
          count: { $sum: 1 },
        },
      },
      { $sort: { avgRelevance: -1 } },
    ]);

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching relevance by region:', error);
    res.status(500).json({ success: false });
  }
};


export const getYearDistribution = async (req: Request, res: Response) => {
  try {
    const query = buildQueryFromFilters(req);

    const data = await DataPointModel.aggregate([
      { $match: { ...query, end_year: { $nin: [null, ''] } } },
      {
        $group: {
          _id: '$end_year',
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching year distribution:', error);
    res.status(500).json({ success: false });
  }
};


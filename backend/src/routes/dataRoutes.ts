import { Router } from 'express';
import {
  getData,
  getStats,
  getFilterOptions,
  getIntensityByCountry,
  getLikelihoodByTopic,
  getRelevanceByRegion,
  getYearDistribution,
} from '../controllers/dataController';

const router = Router();

router.get('/data', getData);
router.get('/stats', getStats);
router.get('/filter-options', getFilterOptions);
router.get('/intensity-by-country', getIntensityByCountry);
router.get('/likelihood-by-topic', getLikelihoodByTopic);
router.get('/relevance-by-region', getRelevanceByRegion);
router.get('/year-distribution', getYearDistribution);

export default router;

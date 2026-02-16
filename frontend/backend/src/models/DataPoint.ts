import mongoose, { Schema, Document } from 'mongoose';
import { DataPoint as IDataPoint } from '../types';

export interface DataPointDocument extends IDataPoint, Document {}

const DataPointSchema = new Schema<DataPointDocument>(
  {
    end_year: { type: String, default: null, index: true },
    intensity: { type: Number, required: true, index: true },
    sector: { type: String, required: true, index: true },
    topic: { type: String, required: true, index: true },
    insight: { type: String, required: true },
    url: { type: String, required: true },
    region: { type: String, required: true, index: true },
    start_year: { type: String, default: null },
    impact: { type: String, default: null },
    added: { type: String, required: true },
    published: { type: String, required: true },
    country: { type: String, required: true, index: true },
    relevance: { type: Number, required: true, index: true },
    pestle: { type: String, required: true, index: true },
    source: { type: String, required: true, index: true },
    title: { type: String, required: true },
    likelihood: { type: Number, required: true, index: true },
    city: { type: String, default: null, index: true },
  },
  {
    timestamps: false,
  }
);

// Create indexes for better query performance
DataPointSchema.index({ intensity: 1, likelihood: 1, relevance: 1 });
DataPointSchema.index({ country: 1, region: 1 });
DataPointSchema.index({ topic: 1, sector: 1 });

export const DataPointModel = mongoose.model<DataPointDocument>(
  'DataPoint',
  DataPointSchema
);

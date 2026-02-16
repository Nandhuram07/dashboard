import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { DataPointModel } from '../models/DataPoint';
import { DataPoint } from '../types';

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blackcoffer';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await DataPointModel.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Read JSON file - try multiple possible paths
    const possiblePaths = [
      process.env.JSON_DATA_PATH,
      path.join(process.cwd(), '../../Downloads/jsondata.json'),
      path.join(process.cwd(), '../Downloads/jsondata.json'),
      path.join(__dirname, '../../../Downloads/jsondata.json'),
      path.join(process.cwd(), 'jsondata.json'),
      path.join(process.cwd(), '../jsondata.json'),
    ].filter((p) => p && fs.existsSync(p));

    if (possiblePaths.length === 0) {
      throw new Error('Could not find jsondata.json. Please ensure the file exists in Downloads folder or set JSON_DATA_PATH env variable.');
    }

    const jsonPath = possiblePaths[0] as string;
    console.log(`📂 Reading data from: ${jsonPath}`);
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const data: DataPoint[] = JSON.parse(jsonData);

    console.log(`📊 Found ${data.length} records to import`);

    // Transform and insert data
    const transformedData = data.map((item) => ({
      ...item,
      end_year: item.end_year || null,
      start_year: item.start_year || null,
      impact: item.impact || null,
      city: item.city || null,
    }));

    // Insert in batches for better performance
    const batchSize = 1000;
    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize);
      await DataPointModel.insertMany(batch);
      console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(transformedData.length / batchSize)}`);
    }

    console.log(`🎉 Successfully seeded ${transformedData.length} records`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedDatabase();

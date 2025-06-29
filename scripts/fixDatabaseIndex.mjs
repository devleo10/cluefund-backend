// fixDatabaseIndex.mjs
// This script will drop the problematic single-field index on schemeCode

import mongoose from 'mongoose';
import { config } from 'dotenv';

config(); // Load environment variables

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

async function dropIndex() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Get the funds collection
    const db = mongoose.connection.db;
    const collections = await db.listCollections({ name: 'funds' }).toArray();
    
    if (collections.length > 0) {
      // Check if the single-field index exists
      const indexes = await db.collection('funds').indexes();
      const schemeCodeIndex = indexes.find(index => 
        index.name === 'schemeCode_1' || 
        (index.key && Object.keys(index.key).length === 1 && index.key.schemeCode)
      );
      
      if (schemeCodeIndex) {
        console.log('Found problematic index:', schemeCodeIndex.name);
        // Drop the index
        await db.collection('funds').dropIndex(schemeCodeIndex.name);
        console.log('Successfully dropped the index!');
      } else {
        console.log('No problematic single-field index found on schemeCode');
      }
    } else {
      console.log('Funds collection does not exist yet');
    }
    
    console.log('Database index check complete');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

dropIndex();

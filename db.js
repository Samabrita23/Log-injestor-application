// server/db.js

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Update with your MongoDB connection string
const dbName = 'logs';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    console.log('Using cached database instance');
    return Promise.resolve(cachedDb);
  }

  try {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    console.log('Connected to the database');
    const db = client.db(dbName);

    // Ensure indexes for efficient queries
    await db.collection('logs').createIndex({ level: 1 });
    await db.collection('logs').createIndex({ message: 'text' });
    await db.collection('logs').createIndex({ resourceId: 1 });
    await db.collection('logs').createIndex({ timestamp: 1 });
    await db.collection('logs').createIndex({ traceId: 1 });
    await db.collection('logs').createIndex({ spanId: 1 });
    await db.collection('logs').createIndex({ commit: 1 });
    await db.collection('logs').createIndex({ 'metadata.parentResourceId': 1 });

    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = connectToDatabase;

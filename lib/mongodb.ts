import mongoose from 'mongoose';
declare global {
  var mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

let cached = global.mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log('✅ Using existing MongoDB connection.');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('🌐 Attempting to connect to MongoDB...');
    cached.promise = mongoose
      .connect(MONGO_URI as string)
      .then((mongooseInstance) => {
        console.log('✅ MongoDB connection established successfully.');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('❌ Failed to connect to MongoDB:', error.message);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('❌ Error in MongoDB connection:', error);
    throw error;
  }
}

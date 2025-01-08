import mongoose, { ConnectOptions } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI.length) {
  throw new Error('Define the MONGO_URI environment variable (.env.local)');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<any> {
    if (cached.conn) {
      console.log('Using cached MongoDB connection');
      return cached.conn;
    }

    if (!cached.promise) {
        console.log('Creating new MongoDB connection promise');
        const opts: ConnectOptions = {
            bufferCommands: false,
            maxIdleTimeMS: 10000,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 20000,
        };
        cached.promise = mongoose
            .connect(MONGO_URI, opts)
            .then((mongoose) => {
                console.log('Connected to MongoDB successfully');
                return mongoose;
            })
            .catch((err) => {
                console.error('Error connecting to MongoDB:', err);
                throw new Error(String(err));
            });
    }

    try {
        cached.conn = await cached.promise;
        console.log('MongoDB connection established');
    } catch (err) {
        console.error('Error awaiting MongoDB connection promise:', err);
        throw new Error(String(err));
    }

    return cached.conn;
}

export default dbConnect;
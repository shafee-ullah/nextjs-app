import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const uri = process.env.MONGODB_URI;
const dbName = 'nextjs_auth';

let client;
let clientPromise;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection across hot-reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .then(connectedClient => {
        console.log('MongoDB connected successfully');
        return connectedClient;
      })
      .catch(err => {
        console.error('MongoDB connection error:', err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, avoid using a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then(connectedClient => {
      console.log('MongoDB connected successfully');
      return connectedClient;
    });
}

export const getDb = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    // Test the connection
    await db.command({ ping: 1 });
    return db;
  } catch (error) {
    console.error('Failed to get database connection:', error);
    throw new Error('Failed to connect to the database. Please try again later.');
  }
};

export default clientPromise;

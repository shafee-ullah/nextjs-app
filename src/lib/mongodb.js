import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 10000, // 10 seconds timeout
  connectTimeoutMS: 10000, // 10 seconds connection timeout
};

let client;
let clientPromise;

// Connection pooling options
const connectionOptions = {
  ...options,
  maxPoolSize: 10, // Maximum number of connections in the connection pool
  minPoolSize: 1,  // Minimum number of connections in the connection pool
  maxIdleTimeMS: 10000, // Close sockets after 10 seconds of inactivity
  serverSelectionTimeoutMS: 10000, // Time to wait for server selection
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  connectTimeoutMS: 10000, // Time to wait for connection to be established
};

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection across hot-reloads
  if (!global._mongoClientPromise) {
    console.log('Creating new MongoDB client with URI:', 
      uri.replace(/mongodb\+srv:\/\/([^:]+):[^@]+@/, 'mongodb+srv://$1:****@')
    );
    client = new MongoClient(uri, connectionOptions);
    global._mongoClientPromise = client.connect()
      .then(connectedClient => {
        console.log('MongoDB connected successfully');
        return connectedClient;
      })
      .catch(err => {
        console.error('MongoDB connection error:', {
          name: err.name,
          message: err.message,
          code: err.code,
          codeName: err.codeName,
          errorLabels: err.errorLabels,
          stack: err.stack
        });
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, avoid using a global variable
  client = new MongoClient(uri, connectionOptions);
  clientPromise = client.connect()
    .then(connectedClient => {
      console.log('MongoDB connected successfully');
      return connectedClient;
    })
    .catch(err => {
      console.error('MongoDB connection error:', {
        name: err.name,
        message: err.message,
        code: err.code,
        codeName: err.codeName,
        errorLabels: err.errorLabels,
        stack: err.stack
      });
      throw err;
    });
}

// Export a module-scoped MongoClient promise
export const connectToDatabase = async () => {
  try {
    const client = await clientPromise;
    // Explicitly specify the database name 'nextjs_auth'
    const db = client.db('nextjs_auth');
    
    // Test the connection
    await db.command({ ping: 1 });
    console.log('Successfully connected to MongoDB database');
    
    // Create necessary indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to the database. Please check your connection settings.');
  }
};

export default clientPromise;

const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb+srv://nextjs_app:Q0UVmiSgqdzrsrVl@cluster0.8puxff9.mongodb.net/nextjs_auth?retryWrites=true&w=majority';
  
  console.log('Testing MongoDB connection with URI:', uri.replace(/:[^:]*@/, ':***@'));
  
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  });

  try {
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');
    
    const db = client.db();
    console.log('Database name:', db.databaseName);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Try to create a test user
    const users = db.collection('users');
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password:'test',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await users.insertOne(testUser);
    console.log('✅ Test user created:', result.insertedId);
    
  } catch (error) {
    console.error('❌ MongoDB connection error:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error code name:', error.codeName);
    
    if (error.errorResponse) {
      console.error('Error details:', error.errorResponse);
    }
  } finally {
    await client.close();
    process.exit(0);
  }
}

testConnection();

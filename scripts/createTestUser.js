const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createTestUser() {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb+srv://nextjs_app:Q0UVmiSgqdzrsrVl@cluster0.8puxff9.mongodb.net/nextjs_auth?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const users = db.collection('users');
    
    // Check if test user already exists
    const existingUser = await users.findOne({ email: 'test@example.com' });
    
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }
    
    // Create test user
    const hashedPassword = await bcrypt.hash('test123', 10);
    const result = await users.insertOne({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    console.log('Test user created successfully:', result.insertedId);
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await client.close();
  }
}

createTestUser();

import { hash } from 'bcryptjs';
import { getDb } from '@/lib/db';

// Helper function for consistent error responses
const createErrorResponse = (message, status = 500, details = null) => {
  return Response.json(
    { 
      success: false,
      error: message,
      ...(process.env.NODE_ENV === 'development' && { details })
    },
    { status }
  );
};

export async function POST(request) {
  let client;
  try {
    console.log('Registration request received');
    
    // Parse request body with error handling
    let body;
    try {
      body = await request.json();
      console.log('Request body:', JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return createErrorResponse('Invalid request body', 400);
    }
    
    const { name, email, password } = body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !password) {
      console.error('Missing required fields');
      return createErrorResponse('Name, email, and password are required', 400);
    }

    // Validate password
    if (password.length < 6) {
      return createErrorResponse('Password must be at least 6 characters long', 400);
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return createErrorResponse('Please enter a valid email address', 400);
    }

    console.log('Connecting to database...');
    let db;
    try {
      db = await getDb();
      console.log('Successfully connected to MongoDB');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return createErrorResponse('Database connection failed', 500, dbError.message);
    }
    
    console.log('Checking for existing user with email:', email);
    try {
      const existingUser = await db.collection('users').findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        console.error('User already exists:', email);
        return createErrorResponse('User already exists with this email', 400);
      }
    } catch (findError) {
      console.error('Error checking for existing user:', {
        name: findError.name,
        message: findError.message,
        code: findError.code,
        codeName: findError.codeName
      });
      return createErrorResponse('Error checking user existence', 500, findError.message);
    }

    console.log('Hashing password...');
    let hashedPassword;
    try {
      hashedPassword = await hash(password, 12);
    } catch (hashError) {
      console.error('Error hashing password:', hashError);
      return createErrorResponse('Error processing password', 500, hashError.message);
    }

    console.log('Creating new user...');
    let result;
    try {
      result = await db.collection('users').insertOne({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (!result.acknowledged || !result.insertedId) {
        throw new Error('Database operation failed to create user');
      }
      
      console.log('User created successfully with ID:', result.insertedId);
    } catch (insertError) {
      console.error('Error creating user:', {
        name: insertError.name,
        message: insertError.message,
        code: insertError.code,
        codeName: insertError.codeName,
        errorLabels: insertError.errorLabels,
        stack: insertError.stack
      });
      return createErrorResponse('Failed to create user', 500, insertError.message);
    }

    return Response.json(
      { 
        success: true,
        message: 'User created successfully',
        userId: result.insertedId 
      },
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Unexpected registration error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return createErrorResponse('An unexpected error occurred', 500, error.message);
  } finally {
    // Connection is managed by the db utility, no need to close it here
  }
}

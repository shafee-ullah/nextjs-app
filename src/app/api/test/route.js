import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return Response.json({ status: 'success', message: 'Successfully connected to MongoDB' });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return Response.json(
      { status: 'error', message: 'Failed to connect to MongoDB', error: error.message },
      { status: 500 }
    );
  }
}

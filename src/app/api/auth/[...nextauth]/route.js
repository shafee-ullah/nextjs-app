import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDb } from '@/lib/db';
import { compare } from 'bcryptjs';
import { ObjectId } from 'mongodb';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            return null;
          }

          const db = await getDb();
          
          // Find user by email (case-insensitive)
          const user = await db.collection('users').findOne({
            email: { $regex: new RegExp(`^${credentials.email}$`, 'i') }
          });

          if (!user) {
            console.log('No user found with email:', credentials.email);
            return null;
          }

          // Check if user has a password (in case they signed up with OAuth)
          if (!user.password) {
            console.log('No password set for user:', credentials.email);
            return null;
          }

          // Check password
          const isValid = await compare(credentials.password, user.password);
          
          if (!isValid) {
            console.log('Invalid password for user:', credentials.email);
            return null;
          }

          // Return user object if everything is valid
          return {
            id: user._id.toString(),
            email: user.email.toLowerCase(),
            name: user.name,
            role: user.role || 'user' // Default role if not specified
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-nextauth-secret-key',
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      
      // Update token with session data if needed
      if (trigger === 'update' && session) {
        return { ...token, ...session.user };
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

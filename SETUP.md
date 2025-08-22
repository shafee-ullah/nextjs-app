# Next.js E-commerce Setup

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_generate_using_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000

# For production, set these:
# NEXTAUTH_URL=your_production_url
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your MongoDB database and update the connection string in `.env.local`

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- User authentication (register, login, logout)
- Product listing
- Product details
- Protected admin dashboard for adding products
- Responsive design

## Tech Stack

- Next.js 14
- MongoDB
- NextAuth.js
- Tailwind CSS
- React Hook Form
- React Icons

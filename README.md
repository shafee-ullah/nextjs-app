# Next.js E-commerce Application

A modern e-commerce application built with Next.js, featuring user authentication, product management, and a responsive design.

## Features
- User authentication (Register/Login/Logout)
- Product listing and details
- Add products (admin)
- Responsive design for all devices
- Secure API routes

## Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn
- MongoDB Atlas account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shafee-ullah/nextjs-app.git
   cd nextjs-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your MongoDB connection string and other required variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     NEXTAUTH_SECRET=your_nextauth_secret
     NEXTAUTH_URL=http://localhost:3000
     ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Route Summary

### Authentication
- `/login` - User login page
- `/register` - User registration page
- `/api/auth/[...nextauth]` - NextAuth.js authentication API
- `/api/auth/register` - User registration API

### Products
- `/products` - List all products
- `/products/[id]` - View product details
- `/dashboard/add-product` - Add new product (protected)
- `/api/products` - Products API (GET/POST)

### Other
- `/` - Home page
- `/api/test` - Test API endpoint for database connection

## Development

This project uses:
- Next.js 14 with App Router
- MongoDB for database
- NextAuth.js for authentication
- Tailwind CSS for styling

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

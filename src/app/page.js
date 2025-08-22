import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/mongodb';
import Image from 'next/image';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { db } = await connectToDatabase();
  
  // Fetch products from MongoDB
  const products = await db.collection('products').find({}).toArray();
  const isLoading = false;
  const error = null;

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-purple-800 overflow-hidden ">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover Your Perfect Style
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
              Explore our curated collection of premium products designed to elevate your everyday life. Quality meets style in every piece.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:scale-105"
              >
                Shop Now
                <svg
                  className="ml-2 -mr-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              {/* <Link
                href="/about"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                Learn More
              </Link> */}
            </div>
          </div>
        </div>
        {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" /> */}
      </div>

      {/* Categories Section */}
      {/* <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Shop by Category</h2>
            <p className="mt-4 text-lg text-gray-600">Find what you&apos;re looking for in our curated collections</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {['Electronics', 'Fashion', 'Home & Living', 'Beauty'].map((category) => (
              <div key={category} className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-xl bg-gray-200 group-hover:opacity-75">
                  <Image
                    src={`https://source.unsplash.com/random/400x300/?${category.toLowerCase()}`}
                    alt={category}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover object-center"
                    priority
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900">{category}</h3>
                  <p className="mt-1 text-sm text-gray-600">Shop now</p>
                </div>
                <Link href={`/categories/${category.toLowerCase()}`} className="absolute inset-0">
                  <span className="sr-only">View {category}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Featured Products */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-3">
              Featured Collection
            </span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Best Sellers
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 mx-auto">
              Discover our most loved products, handpicked just for you
            </p>
          </div>

          {isLoading ? (
            <div className="mt-16 text-center">
              <div className="inline-flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-lg font-medium text-gray-700">Loading our best products...</span>
              </div>
            </div>
          ) : error ? (
            <div className="mt-16 text-center p-8 bg-red-50 rounded-xl">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-red-800">Something went wrong</h3>
              <p className="mt-2 text-sm text-red-700">{error}</p>
              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Try again
                </button>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="mt-16 text-center p-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No products</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
              <div className="mt-6">
                <Link
                  href="/dashboard/add-product"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  New Product
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 sm:px-0">
              {products.map((product) => (
                <div key={product._id} className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-50">
                        <span className="text-gray-400 text-sm">No image available</span>
                      </div>
                    )}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <button className="w-full bg-white text-gray-900 py-2.5 px-4 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors">
                        Quick View
                      </button>
                    </div> */}
                    {product.isNew && (
                      <span className="absolute top-3 right-3 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">New</span>
                    )}
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2 h-12 flex items-center">
                      <Link href={`/products/${product._id}`} className="hover:text-indigo-600 transition-colors">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price?.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="ml-2 text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                          )}
                        </div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <svg
                              key={rating}
                              className={`h-4 w-4 ${rating <= (product.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 01-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-xs text-gray-500">({product.reviewCount || 24})</span>
                        </div>
                      </div>
                      <Link 
                        href={`/products/${product._id}`}
                        className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View all products
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="mt-20 bg-indigo-700 rounded-2xl overflow-hidden">
        <div className="px-6 py-16 sm:p-16 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to shop?
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-indigo-100">
              Join thousands of satisfied customers who trust us for quality products and exceptional service.
            </p>
          </div>
          <div className="mt-8 flex lg:mt-0 lg:ml-8">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Shop Now
              <svg
                className="ml-3 -mr-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div> */}

      {/* Newsletter Section */}
      <div className="mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gray-100 px-6 py-16 sm:p-16">
            <div className="mx-auto max-w-xl lg:max-w-none">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Stay Updated
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                  Subscribe to our newsletter for the latest products and exclusive offers.
                </p>
              </div>
              <div className="mx-auto mt-8 max-w-xl">
                <form className="sm:flex">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                  <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0 ">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
                <p className="mt-3 text-center text-sm text-gray-500">
                  We care about your data
                  {/* <a href="/privacy" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Privacy Policy
                  </a> */}
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

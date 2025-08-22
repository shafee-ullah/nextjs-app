'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }));
  };

  // Handle image URL validation
  const validateImageUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate image URL
    if (formData.imageUrl && !validateImageUrl(formData.imageUrl)) {
      setError('Please enter a valid image URL');
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        // If no image URL is provided, use a placeholder
        imageUrl: formData.imageUrl || '/placeholder-product.jpg'
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      // Redirect to products page on success
      router.push('/products');
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
          <p className="mt-2 text-sm text-gray-600">Fill in the details below to add a new product</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-black">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-black">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={handleChange}
            />
            <p className="mt-1 text-xs text-gray-500">Leave empty to use a placeholder image</p>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-black">
              Price ($)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-black sm:text-sm">$</span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                id="price"
                name="price"
                required
                className="focus:ring-indigo-500 focus:border-indigo-500 text-black block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => router.push('/products')}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

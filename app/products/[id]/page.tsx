import ProductDetail from '@/components/ProductDetail'
import { getProduct } from '@/lib/api'




export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id);
    if (!product) {
      throw new Error("Product not found");
    }
    return <ProductDetail product={product} />;
  } catch (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-red-500 mb-4">Error</h1>
          <p className="text-gray-700">Failed to load product. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
}

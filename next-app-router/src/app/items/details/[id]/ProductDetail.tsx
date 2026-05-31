import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 p-6 bg-gray-50 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="max-h-[400px] object-contain"
          loading="lazy"
        />
      </div>
      <div className="md:w-1/2 p-6">
        <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
        <p className="text-2xl font-semibold text-green-600 mb-4">
          ${product.price}
        </p>
        <div className="mb-4">
          <span className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm capitalize">
            {product.category}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < Math.floor(product.rating.rate)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </div>
          <span className="ml-2 text-gray-600">
            ({product.rating.count} reviews)
          </span>
        </div>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
}

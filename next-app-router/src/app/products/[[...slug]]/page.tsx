"use client";

import Image from "next/image";
import Link from "next/link";

type Params = {
  params: {
    slug: string[];
  };
};

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

async function getProducts() {
  // fetch data from api external
  const response = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  // fetch data from api internal
  // Cached by default. `force-cache` is the default option and can be ommitted.
  // const response = await fetch("http://localhost:3000/api/products", {
  //   cache: "no-store",
  //   // next: {
  //   //   //revalidate berdasarkan waktu setelah 60 detik
  //   //   // revalidate: 60,
  //   //   //revalidate berdasarkan trigger manual by tags
  //   //   // tags: ["products"],
  //   // },
  // });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

//[[...slug]] = berarti parameter /products/** bisa memiliki banyak parameter & tidak wajib memiliki parameter & bisa menjadi index jika tidak memiliki slug
//[...slug] = berarti parameter /products/** bisa memiliki banyak parameter & tidak memiliki index
//[slug] = berarti parameter /products/** hanya memiliki satu parameter
export default async function ProductPage({ params }: Params) {
  // http://localhost:3000/products/123/321
  const { slug } = params;

  //products from api external
  const products = await getProducts();

  // products from api internal
  // destructuring object (data )+ rename variable (products).
  // const { data: products } = await getProducts();

  return (
    <>
      <h1 className="text-2xl font-semibold">
        {slug ? "Detail Product Page" : "Product Page"}
      </h1>
      <p>
        {slug && (
          <>
            Products : {slug[0]}, {slug[1]}
          </>
        )}
      </p>

      <section className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
        {products.map((product: Product) => (
          <div className="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
            <Link href={`/products/${product.id}`}>
              <Image
                className="rounded-base mb-6"
                src={product.image}
                alt={product.title}
                width={350}
                height={350}
                loading="lazy"
              />
            </Link>
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg
                    className="w-5 h-5 text-fg-yellow"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <svg
                    className="w-5 h-5 text-fg-yellow"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <svg
                    className="w-5 h-5 text-fg-yellow"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <svg
                    className="w-5 h-5 text-fg-yellow"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <svg
                    className="w-5 h-5 text-fg-yellow"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                </div>
                <span className="bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
                  {product.rating.rate} out of 5
                </span>
              </div>
              <a href="#">
                <h5 className="text-xl text-heading font-semibold tracking-tight">
                  {product.title}
                </h5>
              </a>
              <div className="flex items-center justify-between mt-6">
                <span className="text-3xl font-extrabold text-heading">
                  ${product.price}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
                >
                  <svg
                    className="w-4 h-4 me-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

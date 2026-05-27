type Params = {
  params: {
    slug: string[];
  };
};

//[[...slug]] = berarti parameter /products/** bisa memiliki banyak parameter & tidak wajib memiliki parameter & bisa menjadi index jika tidak memiliki slug
//[...slug] = berarti parameter /products/** bisa memiliki banyak parameter & tidak memiliki index
//[slug] = berarti parameter /products/** hanya memiliki satu parameter
export default function ProductPage({ params }: Params) {
  // http://localhost:3000/products/123/321
  const { slug } = params;
  return (
    <>
      <h1>{slug ? "Detail Product Page" : "Product Page"}</h1>
      <p>
        {slug && (
          <>
            Products : {slug[0]}, {slug[1]}
          </>
        )}
      </p>
    </>
  );
}

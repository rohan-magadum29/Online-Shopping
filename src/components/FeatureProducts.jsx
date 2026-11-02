import { useEffect, useState } from "react";
function ProductCard({ product }) {
  const { sku, title, price, thumbnail, badge } = product;

  return (
    <article className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow group-hover:shadow-md">
        <img
          src={thumbnail}
          alt={title}
          width="600"
          height="600"
          loading="lazy"
          className="aspect-square w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105 sm:p-5"
        />
        {badge && (
          <span
            className={`absolute left-2 top-2 rounded px-2 py-1 text-[0.65rem] font-medium leading-none text-white sm:left-3 sm:top-3 sm:text-xs ${badge.color}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      <div className="mt-2 space-y-0.5">
        <p className="text-xs text-gray-500">{sku}</p>
        <h3 className="line-clamp-2 text-sm font-medium text-gray-900 sm:text-base">
          {title}
        </h3>
        <p className="text-xs text-gray-500 sm:text-sm">
          As low as{" "}
          <span className="text-base font-semibold text-secondary sm:text-lg">
            ${price.toFixed(2)}
          </span>
        </p>
      </div>
    </article>
  );
}
const SkeletonLoader = () => {
  return <div className="bg-gray-400 h-30 md:h-70 animate-pulse rounded-md" />;
};
export default function FeaturedProducts({ category }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}?limit=${8}&select=id,title,price,sku,thumbnail`,
        );
        const productsJson = await res.json();
        setProducts(productsJson?.products);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);
  return (
    <section
      aria-labelledby="featured-products-title"
      className="bg-neutral-100 px-4 py-4 md:px-6 md:py-6"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="featured-products-title"
          className="text-center text-xl md:text-2xl lg:text-3xl    font-semibold text-primary"
        >
          Featured Products
        </h2>

        <ul className="mt-6 md:mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5  md:grid-cols-4 md:gap-y-8">
          {!isLoading ? (
            products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))
          ) : (
            <>
              {Array.from({ length: 4 }).map(() => {
                return <SkeletonLoader />;
              })}
            </>
          )}
        </ul>
      </div>
    </section>
  );
}

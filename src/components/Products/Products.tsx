import { getProducts } from "@/api/products";
import { IProduct } from "@/types/products";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";

const Products = async () => {
  const products: IProduct[] = await getProducts();

  const increasedProducts = products.filter(
    (product) => product.today > product.yesterday
  );

  const decreasedProducts = products.filter(
    (product) => product.today < product.yesterday
  );

  return (
    <section className="bg-[#f4f7f3] px-3 py-4 sm:px-5 sm:py-5">
      <div className="mx-auto max-w-[1164px]">
        {/* ================= PRICE INCREASE ================= */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-[15px] text-red-600">
            ▲
          </span>

          <h2 className="text-[18px] font-bold text-gray-900 sm:text-[19px]">
            আজ দাম বেড়েছে
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {increasedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* ================= PRICE DECREASE ================= */}
        <div className="mb-4 mt-5 flex items-center gap-2">
          <span className="text-[15px] text-green-600">
            ▼
          </span>

          <h2 className="text-[18px] font-bold text-gray-900 sm:text-[19px]">
            আজ দাম কমেছে
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decreasedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* ================= ALL PRODUCTS ================= */}
        <ProductList products={products} />
      </div>
    </section>
  );
};

export default Products;
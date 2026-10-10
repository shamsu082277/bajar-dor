
import { getProducts } from "@/api/products";
import { IProduct } from "@/types/products";
import { bnNumber } from "@/utils/number";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const products = await getProducts();

  if (!products.length) return null;

  return (
    <section className="relative w-full overflow-hidden border-y border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1440px] items-stretch">
        {/* Fixed Market Label */}
        <div className="z-10 flex shrink-0 items-center gap-2 bg-slate-900 px-4 py-3 text-white shadow-md sm:px-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>

          <span className="text-xs font-bold tracking-wider sm:text-sm">
            বাজার দর
          </span>
        </div>

        {/* Scrolling Products */}
        <div className="min-w-0 flex-1">
          <MarqueeText
            direction="right"
            pauseOnHover={true}
            duration={20}
          >
            <div className="flex w-max items-center py-3">
              {[...products, ...products].map(
                (product: IProduct, index: number) => {
                  const isUp = product.change?.dir === "up";

                  return (
                    <div
                      key={`${product.id}-${index}`}
                      className="mx-2 flex shrink-0 items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/80 px-4 py-2 transition-colors hover:border-gray-200 hover:bg-gray-100 sm:mx-3"
                    >
                      <span className="text-xl">
                        {product.image}
                      </span>

                      <span className="text-sm font-semibold text-gray-800">
                        {product.nameBn}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${
                          isUp
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <span aria-hidden="true">
                          {isUp ? "▲" : "▼"}
                        </span>

                        {bnNumber(product.change?.pct ?? 0)}%
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </MarqueeText>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
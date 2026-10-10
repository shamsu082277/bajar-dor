"use client";

import Link from "next/link";

interface MarketPrice {
  market: string;
  district: string;
  minPrice: string;
  maxPrice: string;
  price: string;
}

interface Product {
  name: string;
  icon: string;
  unit: string;
  description: string;
  currentPrice: string;
  minPrice: string;
  maxPrice: string;
  change: number;
  category: string;
  categoryHref: string;
  prices: MarketPrice[];
}

const product: Product = {
  name: "নাজির চাল",
  icon: "🍚",
  unit: "প্রতি কেজি",
  description: "চট্টগ্রামের জনপ্রিয় চালের বাজারদর",
  currentPrice: "৭৪",
  minPrice: "৬৬",
  maxPrice: "৮২",
  change: 0,
  category: "চাল",
  categoryHref: "/category/rice",

  prices: [
    {
      market: "খুলনা বাজার",
      district: "ময়মনসিংহ",
      minPrice: "৬৬",
      maxPrice: "৭৩",
      price: "৬৯.৫০",
    },
    {
      market: "শহর বাজার",
      district: "রাজশাহী",
      minPrice: "৬৭",
      maxPrice: "৭৪",
      price: "৭০.৫০",
    },
    {
      market: "বাজারঘাট",
      district: "খুলনা",
      minPrice: "৬৯",
      maxPrice: "৭৫",
      price: "৭১",
    },
    {
      market: "বাজারঘাট বাজার",
      district: "রাজশাহী",
      minPrice: "৬৯",
      maxPrice: "৭৬",
      price: "৭২.৫০",
    },
    {
      market: "চোর বাজার",
      district: "ময়মনসিংহ",
      minPrice: "৬৯",
      maxPrice: "৭৮",
      price: "৭২.৫০",
    },
    {
      market: "আমতলী বাজার",
      district: "চট্টগ্রাম",
      minPrice: "৬৯",
      maxPrice: "৭৮",
      price: "৭৩.৫০",
    },
    {
      market: "ডুমুরিয়া বাজার",
      district: "খুলনা",
      minPrice: "৭০",
      maxPrice: "৭৭",
      price: "৭৩.৫০",
    },
    {
      market: "চৌগাছা বাজার",
      district: "সিলেট",
      minPrice: "৭০",
      maxPrice: "৭৯",
      price: "৭৪.৫০",
    },
    {
      market: "শ্রীনগর বাজার",
      district: "ঢাকা",
      minPrice: "৭২",
      maxPrice: "৭৯",
      price: "৭৫.৫০",
    },
    {
      market: "চট্টগ্রাম বাজার",
      district: "চট্টগ্রাম",
      minPrice: "৭১",
      maxPrice: "৮২",
      price: "৭৬.৫০",
    },
    {
      market: "আমবাজার",
      district: "সিলেট",
      minPrice: "৭২",
      maxPrice: "৮২",
      price: "৭৭",
    },
    {
      market: "কারওয়ান বাজার",
      district: "ঢাকা",
      minPrice: "৭৩",
      maxPrice: "৮২",
      price: "৭৭.৫০",
    },
  ],
};

const ProductDetails = () => {
  const isUp = product.change > 0;
  const isDown = product.change < 0;

  return (
    <main className="min-h-screen bg-[#f4f7f3] px-4 py-5 sm:px-5 lg:py-6">
      <div className="mx-auto max-w-[1164px]">
        {/* ================= BREADCRUMB ================= */}
        <div className="mb-5 flex items-center gap-2 text-[11px] text-gray-500">
          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            হোম
          </Link>

          <span>›</span>

          <Link
            href={product.categoryHref}
            className="transition hover:text-green-700"
          >
            {product.category}
          </Link>

          <span>›</span>

          <span className="text-gray-700">
            {product.name}
          </span>
        </div>

        {/* ================= PRODUCT SUMMARY ================= */}
        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Product */}
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f1f6f1] text-2xl">
                {product.icon}
              </div>

              <div>
                <h1 className="text-[24px] font-bold leading-7 text-gray-900 sm:text-[27px]">
                  {product.name}
                </h1>

                <p className="mt-1 text-[12px] text-gray-500">
                  {product.unit}
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Current Price */}
            <div className="min-w-[84px] rounded-xl bg-[#f1f6f1] px-4 py-3 text-center">
              <p className="text-[10px] text-gray-500">
                আজকের দাম
              </p>

              <p className="mt-1 text-[23px] font-bold leading-6 text-gray-900">
                {product.currentPrice}
              </p>

              <p className="mt-1 text-[10px] text-gray-500">
                টাকা / কেজি
              </p>

              <p className="mt-1 text-[10px] text-gray-500">
                {isUp
                  ? `▲ ${product.change}%`
                  : isDown
                    ? `▼ ${Math.abs(product.change)}%`
                    : "— ০.০%"}
              </p>
            </div>
          </div>
        </section>

        {/* ================= PRICE SUMMARY ================= */}
        <section className="mt-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <h2 className="text-[17px] font-semibold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Minimum */}
            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-[10px] text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-[20px] font-semibold text-green-600">
                {product.minPrice}{" "}
                <span className="text-[11px] font-normal text-gray-600">
                  টাকা
                </span>
              </p>

              <p className="text-[9px] text-gray-400">
                সবচেয়ে কম পাওয়া বাজার
              </p>
            </div>

            {/* Maximum */}
            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-[10px] text-gray-500">
                সর্বাধিক দাম
              </p>

              <p className="mt-1 text-[20px] font-semibold text-red-600">
                {product.maxPrice}{" "}
                <span className="text-[11px] font-normal text-gray-600">
                  টাকা
                </span>
              </p>

              <p className="text-[9px] text-gray-400">
                সবচেয়ে বেশি পাওয়া বাজার
              </p>
            </div>

            {/* Current */}
            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-[10px] text-gray-500">
                গড় দাম
              </p>

              <p className="mt-1 text-[20px] font-semibold text-green-700">
                {product.currentPrice}{" "}
                <span className="text-[11px] font-normal text-gray-600">
                  টাকা
                </span>
              </p>

              <p className="text-[9px] text-gray-400">
                প্রতি কেজি হিসাবে
              </p>
            </div>
          </div>

          {/* ================= MARKET TABLE ================= */}
          <div className="mt-5">
            <h2 className="text-[17px] font-semibold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-white text-gray-600">
                      <th className="px-3 py-2.5 text-left font-medium">
                        বাজার
                      </th>

                      <th className="px-3 py-2.5 text-left font-medium">
                        জেলা
                      </th>

                      <th className="px-3 py-2.5 text-right font-medium">
                        সর্বনিম্ন
                      </th>

                      <th className="px-3 py-2.5 text-right font-medium">
                        সর্বাধিক
                      </th>

                      <th className="px-3 py-2.5 text-right font-medium">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {product.prices.map((item, index) => (
                      <tr
                        key={`${item.market}-${index}`}
                        className="border-t border-gray-200 odd:bg-white even:bg-[#f1f5f1]"
                      >
                        <td className="px-3 py-2.5 text-left font-medium text-gray-800">
                          {item.market}
                        </td>

                        <td className="px-3 py-2.5 text-left text-gray-600">
                          {item.district}
                        </td>

                        <td className="px-3 py-2.5 text-right text-gray-700">
                          {item.minPrice} টাকা
                        </td>

                        <td className="px-3 py-2.5 text-right text-gray-700">
                          {item.maxPrice} টাকা
                        </td>

                        <td className="px-3 py-2.5 text-right font-medium text-gray-900">
                          {item.price} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BACK LINK ================= */}
        <div className="mt-5">
          <Link
            href={product.categoryHref}
            className="inline-flex items-center gap-2 text-[12px] font-medium text-gray-700 transition hover:text-green-700"
          >
            🍚
            <span>সব চাল</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
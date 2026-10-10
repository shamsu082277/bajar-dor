import { getProduct } from "@/api/products";
import {
  priceChangeBn,
  unitBn,
} from "@/types/products";
import { bnNumber } from "@/utils/number";
import Link from "next/link";

interface IProductProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetails = async ({ params }: IProductProps) => {
  const { id } = await params;
  const product = await getProduct(id);

  // ================= PRODUCT NOT FOUND =================
  if (!product) {
    return (
      <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#f4f7f3] px-4 py-10">
        <div className="w-full max-w-[500px] text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[20px] bg-white text-[40px] shadow-sm">
            🛒
          </div>
          <h1 className="mt-6 text-[64px] font-bold leading-none text-green-700">
            ৪০৪
          </h1>
          <h2 className="mt-4 text-[24px] font-bold text-gray-900">
            পণ্যটি পাওয়া যায়নি
          </h2>
          <p className="mx-auto mt-2 max-w-[380px] text-[13px] leading-6 text-gray-500">
            দুঃখিত, আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যায়নি।
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-green-700 px-5 text-[13px] font-medium text-white transition hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  // ================= PRICE CALCULATION =================

  const minPrice = Math.min(
    ...product.markets.map((market) => Number(market.min))
  );

  const maxPrice = Math.max(
    ...product.markets.map((market) => Number(market.max))
  );

  const averagePrice = Math.round(
    (minPrice + maxPrice) / 2
  );

  // ================= PRICE CHANGE =================

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <main className="min-h-screen bg-[#f4f7f3] px-4 py-5 sm:px-5 lg:py-6">
      <div className="mx-auto max-w-[1164px]">

        {/* ================================================= */}
        {/* BREADCRUMB */}
        {/* ================================================= */}

        <div className="mb-5 flex items-center gap-2 text-[11px] text-gray-500">
          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-gray-700">
            {product.nameBn}
          </span>
        </div>

        {/* ================================================= */}
        {/* PRODUCT SUMMARY */}
        {/* ================================================= */}

        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Product Info */}
            <div className="flex items-center gap-3">

              {/* Product Image/Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f1f6f1] text-2xl">
                {product.image}
              </div>

              {/* Product Name */}
              <div>
                <h1 className="text-[24px] font-bold leading-7 text-gray-900 sm:text-[27px]">
                  {product.nameBn}
                </h1>
                <p className="mt-1 text-[12px] text-gray-500">
                  প্রতি {unitBn[product.unit]}{" "}
                  {product.categoryNameBn}
                </p>
                <p className="mt-1 text-[11px] text-gray-500">
                  গতকালের তুলনায় আজ দাম{" "}
                  <span className="font-bold">
                    {priceChangeBn[product.change.dir]}
                  </span>{" "}

                  {product.change.pct !== 0
                    ? `${bnNumber(
                        Math.abs(product.change.pct)
                      )}%`
                    : ""}
                </p>
              </div>
            </div>

            {/* Current Price */}
            <div className="min-w-[100px] rounded-xl bg-[#f1f6f1] px-4 py-3 text-center">
              <p className="text-[10px] text-gray-500">
                আজকের দাম
              </p>

              <p className="mt-1 text-[23px] font-bold leading-6 text-gray-900">
                {bnNumber(product.today)}
              </p>

              <p className="mt-1 text-[10px] text-gray-500">
                টাকা / {unitBn[product.unit]}
              </p>

              {/* Change */}
              <p
                className={`mt-1 text-[10px] font-medium ${
                  isUp
                    ? "text-red-600"
                    : isDown
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {isUp
                  ? `▲ ${bnNumber(
                      Math.abs(product.change.pct)
                    )}%`
                  : isDown
                    ? `▼ ${bnNumber(
                        Math.abs(product.change.pct)
                      )}%`
                    : "— ০.০%"}
              </p>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* PRICE SUMMARY */}
        {/* ================================================= */}

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
                {bnNumber(minPrice)}{" "}
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
                {bnNumber(maxPrice)}{" "}
                <span className="text-[11px] font-normal text-gray-600">
                  টাকা
                </span>
              </p>
              <p className="text-[9px] text-gray-400">
                সবচেয়ে বেশি পাওয়া বাজার
              </p>
            </div>
            {/* Average */}
            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-[10px] text-gray-500">
                গড় দাম
              </p>
              <p className="mt-1 text-[20px] font-semibold text-green-700">
                {bnNumber(averagePrice)}{" "}
                <span className="text-[11px] font-normal text-gray-600">
                  টাকা
                </span>
              </p>
              <p className="text-[9px] text-gray-400">
                প্রতি {unitBn[product.unit]} হিসাবে
              </p>
            </div>
          </div>

          {/* ================================================= */}
          {/* MARKET TABLE */}
          {/* ================================================= */}

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
                    {product.markets.map((market, index) => {
                      const marketAverage =
                        (Number(market.min) +
                          Number(market.max)) /
                        2;

                      return (
                        <tr
                          key={index}
                          className="border-t border-gray-200 odd:bg-white even:bg-[#f1f5f1]"
                        >
                          <td className="px-3 py-2.5 text-left font-medium text-gray-800">
                            {market.name}
                          </td>
                          <td className="px-3 py-2.5 text-left text-gray-600">
                            {market.district}
                          </td>
                          <td className="px-3 py-2.5 text-right text-gray-700">
                            {bnNumber(
                              Number(market.min)
                            )}{" "}
                            টাকা
                          </td>
                          <td className="px-3 py-2.5 text-right text-gray-700">
                            {bnNumber(
                              Number(market.max)
                            )}{" "}
                            টাকা
                          </td>
                          <td className="px-3 py-2.5 text-right font-medium text-gray-900">
                            {bnNumber(marketAverage)} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-2 text-[12px] font-medium text-gray-700 transition hover:text-green-700"
          >
            {product.categoryIcon}

            <span>
              সব {product.categoryNameBn}
            </span>
          </Link>
        </div>

      </div>
    </main>
  );
};

export default ProductDetails;
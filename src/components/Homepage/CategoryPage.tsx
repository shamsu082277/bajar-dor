"use client";

import { useState } from "react";

const products = [
  {
    id: 1,
    name: "স্বর্ণমতি চাল",
    price: "১৪৮",
    change: 5.1,
  },
  {
    id: 2,
    name: "মিনিকেট চাল",
    price: "৯৯",
    change: -3.9,
  },
  {
    id: 3,
    name: "নাজির চাল",
    price: "৭৪",
    change: 0,
  },
  {
    id: 4,
    name: "বাটাম সাইজ চাল",
    price: "৬৬",
    change: 6.4,
  },
];

const CategoryPage = () => {
  const [sort, setSort] = useState("featured");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") {
      return Number(a.price) - Number(b.price);
    }

    if (sort === "high") {
      return Number(b.price) - Number(a.price);
    }

    if (sort === "change") {
      return b.change - a.change;
    }

    return a.id - b.id;
  });

  return (
    <main className="min-h-screen bg-[#f4f7f3] px-4 py-5 sm:px-5 sm:py-6">
      <div className="mx-auto max-w-[1164px]">

        {/* ================= CATEGORY HEADER ================= */}
        <section className="rounded-xl border border-gray-200 bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f5f1] text-2xl">
              🍚
            </div>

            {/* Category Info */}
            <div>
              <h1 className="text-[20px] font-bold leading-6 text-gray-900 sm:text-[22px]">
                চাল
              </h1>

              <p className="mt-1 text-[11px] text-gray-500 sm:text-[12px]">
                ৪টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        {/* ================= SORT BAR ================= */}
        <section className="mt-5 rounded-xl border border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="text-[11px] text-gray-500"
              >
                সাজান
              </label>

              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-8 rounded-lg border border-gray-300 bg-white px-3 text-[11px] text-gray-700 outline-none focus:border-green-600"
              >
                <option value="featured">ফিচার্ড</option>
                <option value="low">কম দাম</option>
                <option value="high">বেশি দাম</option>
                <option value="change">পরিবর্তন</option>
              </select>
            </div>
          </div>
        </section>

        {/* ================= PRODUCT COUNT ================= */}
        <p className="mt-3 text-[11px] text-gray-500">
          মোট ৪টি পণ্য দেখানো হচ্ছে
        </p>

        {/* ================= PRODUCTS ================= */}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => {
            const isUp = product.change > 0;
            const isDown = product.change < 0;

            return (
              <div
                key={product.id}
                className="rounded-xl border border-gray-200 bg-white p-3.5 transition hover:border-green-400 hover:shadow-sm"
              >
                {/* Product */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f5f1] text-xl">
                    🍚
                  </div>

                  <div>
                    <h2 className="text-[15px] font-semibold leading-5 text-gray-900">
                      {product.name}
                    </h2>

                    <p className="mt-0.5 text-[10px] text-gray-500">
                      প্রতি কেজি
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500">
                      আজকের দাম
                    </p>

                    <p className="mt-0.5 text-[17px] font-semibold leading-5 text-gray-900">
                      {product.price}{" "}
                      <span className="text-[11px] font-normal">
                        টাকা
                      </span>
                    </p>
                  </div>

                  {/* Change */}
                  <span
                    className={`rounded-full px-2.5 py-1 text-[9px] ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {isUp
                      ? `▲ ${product.change}%`
                      : isDown
                        ? `▼ ${Math.abs(product.change)}%`
                        : "— ০.০%"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
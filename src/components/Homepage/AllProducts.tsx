"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  icon: string;
  unit: string;
  price: string;
  change: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "স্বর্ণমতি চাল",
    icon: "🍚",
    unit: "প্রতি কেজি",
    price: "১৪৮",
    change: 3.1,
  },
  {
    id: 2,
    name: "মিনিকেট চাল",
    icon: "🍚",
    unit: "প্রতি কেজি",
    price: "৯৯",
    change: 2.9,
  },
  {
    id: 3,
    name: "নাজিরশাইল চাল",
    icon: "🍚",
    unit: "প্রতি কেজি",
    price: "৭৪",
    change: 0,
  },
  {
    id: 4,
    name: "বাটাম সাইজ চাল",
    icon: "🍚",
    unit: "প্রতি কেজি",
    price: "৬৬",
    change: 0.3,
  },
  {
    id: 5,
    name: "মসুর ডাল",
    icon: "🫘",
    unit: "প্রতি কেজি",
    price: "১৪২",
    change: 2.9,
  },
  {
    id: 6,
    name: "মুগ ডাল",
    icon: "🫘",
    unit: "প্রতি কেজি",
    price: "১৬৫",
    change: 0,
  },
  {
    id: 7,
    name: "ছোলা",
    icon: "🫘",
    unit: "প্রতি কেজি",
    price: "১২০",
    change: -2.8,
  },
  {
    id: 8,
    name: "আমন ডাল (খেসারী)",
    icon: "🫘",
    unit: "প্রতি কেজি",
    price: "১৫৬",
    change: 2.6,
  },
  {
    id: 9,
    name: "সরিষার তেল",
    icon: "🫙",
    unit: "প্রতি লিটার",
    price: "১৯২",
    change: 3.1,
  },
  {
    id: 10,
    name: "পাম তেল",
    icon: "🛢️",
    unit: "প্রতি কেজি",
    price: "১৬৮",
    change: -3.6,
  },
  {
    id: 11,
    name: "খানি ভাটা সরিষার তেল",
    icon: "🫙",
    unit: "প্রতি লিটার",
    price: "১৯৫",
    change: 2.8,
  },
  {
    id: 12,
    name: "আলু",
    icon: "🥔",
    unit: "প্রতি কেজি",
    price: "৩০",
    change: -6.2,
  },
];

const toBanglaNumber = (value: number | string) => {
  return String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
};

const ProductCard = ({
  product,
  selected,
  onSelect,
}: {
  product: Product;
  selected: boolean;
  onSelect: () => void;
}) => {
  const isUp = product.change > 0;
  const isDown = product.change < 0;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border bg-white p-4 text-left transition ${
        selected
          ? "border-green-600 shadow-[0_2px_5px_rgba(0,120,60,0.12)]"
          : "border-gray-200 hover:border-green-400 hover:shadow-sm"
      }`}
    >
      {/* Product information */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f3f7f3] text-2xl">
          {product.icon}
        </div>

        {/* Name */}
        <div className="min-w-0">
          <h3 className="truncate text-[17px] font-semibold leading-5 text-gray-900">
            {product.name}
          </h3>

          <p className="mt-1 text-[12px] text-gray-500">
            {product.unit}
          </p>
        </div>
      </div>

      {/* Price section */}
      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-0.5 text-[20px] font-semibold leading-6 text-gray-900">
            {product.price}{" "}
            <span className="text-[13px] font-normal">
              টাকা
            </span>
          </p>
        </div>

        {/* Change */}
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-700"
          }`}
        >
          {isUp && "▲ "}
          {isDown && "▼ "}
          {!isUp && !isDown && "— "}
          {toBanglaNumber(Math.abs(product.change))}%
        </span>
      </div>
    </button>
  );
};

const AllProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(1);
  const [sort, setSort] = useState("featured");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-low") {
      return Number(a.price) - Number(b.price);
    }

    if (sort === "price-high") {
      return Number(b.price) - Number(a.price);
    }

    if (sort === "change-high") {
      return b.change - a.change;
    }

    return a.id - b.id;
  });

  return (
    <section className="bg-[#f4f7f3] px-4 py-8 sm:px-5 lg:py-10">
      <div className="mx-auto max-w-[1164px]">
        {/* ================= HEADER ================= */}
        <div className="mb-5">
          <h2 className="text-[26px] font-bold leading-8 text-gray-900 sm:text-[28px]">
            সব পণ্য
          </h2>

          <div className="mt-4 flex items-center justify-between gap-4">
            {/* Product count */}
            <p className="text-[13px] text-gray-600">
              মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="text-[13px] text-gray-600"
              >
                সাজান
              </label>

              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-8 rounded-lg border border-gray-300 bg-white px-3 text-[12px] text-gray-700 outline-none transition focus:border-green-600"
              >
                <option value="featured">ফিচার্ড</option>
                <option value="price-low">কম দাম</option>
                <option value="price-high">বেশি দাম</option>
                <option value="change-high">বেশি পরিবর্তন</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selected={selectedProduct === product.id}
              onSelect={() => setSelectedProduct(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
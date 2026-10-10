const increasedProducts = [
  {
    id: 1,
    icon: "🧅",
    name: "পেঁয়াজ",
    unit: "প্রতি কেজি",
    price: "৫৪",
    change: "১২.৫%",
  },
  {
    id: 2,
    icon: "🫚",
    name: "আদা",
    unit: "প্রতি কেজি",
    price: "৫৮",
    change: "৯.০%",
  },
  {
    id: 3,
    icon: "🍆",
    name: "বেগুন",
    unit: "প্রতি কেজি",
    price: "৪৪",
    change: "৪.৮%",
  },
  {
    id: 4,
    icon: "🐟",
    name: "রুই মাছ",
    unit: "প্রতি কেজি",
    price: "৪৬",
    change: "৪.৪%",
  },
  {
    id: 5,
    icon: "🥚",
    name: "ডিম",
    unit: "প্রতি ডজন",
    price: "১৫৮",
    change: "৩.৯%",
  },
  {
    id: 6,
    icon: "🧈",
    name: "মাখন (১০০ গ্রাম)",
    unit: "প্রতি পিস",
    price: "১৪৫",
    change: "৩.৬%",
  },
];

const decreasedProducts = [
  {
    id: 1,
    icon: "🌶️",
    name: "কাঁচামরিচ",
    unit: "প্রতি কেজি",
    price: "৯২",
    change: "১২.৮%",
  },
  {
    id: 2,
    icon: "🧄",
    name: "রসুন",
    unit: "প্রতি কেজি",
    price: "১২৫",
    change: "৯.৪%",
  },
  {
    id: 3,
    icon: "🥔",
    name: "আলু",
    unit: "প্রতি কেজি",
    price: "৩০",
    change: "৬.৫%",
  },
  {
    id: 4,
    icon: "🐠",
    name: "কাতলা মাছ",
    unit: "প্রতি কেজি",
    price: "৪৩৫",
    change: "৪.৮%",
  },
  {
    id: 5,
    icon: "🍆",
    name: "হাঁসের মাংস",
    unit: "প্রতি কেজি",
    price: "২৮৫",
    change: "৩.৮%",
  },
  {
    id: 6,
    icon: "🍖",
    name: "খাসির মাংস",
    unit: "প্রতি কেজি",
    price: "১,২৯০",
    change: "৩.০%",
  },
];

interface Product {
  id: number;
  icon: string;
  name: string;
  unit: string;
  price: string;
  change: string;
}

interface PriceCardProps {
  product: Product;
  type: "up" | "down";
}

const PriceCard = ({ product, type }: PriceCardProps) => {
  const isUp = type === "up";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
      {/* Product info */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f3f7f3] text-2xl">
          {product.icon}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[17px] font-semibold leading-5 text-gray-900">
            {product.name}
          </h3>

          <p className="mt-1 text-[12px] leading-4 text-gray-500">
            {product.unit}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="mt-4 flex items-end justify-between gap-3">
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
        <div
          className={`rounded-full px-3 py-1 text-[11px] font-medium ${
            isUp
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-green-600"
          }`}
        >
          {isUp ? "▲" : "▼"} {product.change}
        </div>
      </div>
    </div>
  );
};

const PriceGroup = ({
  title,
  products,
  type,
}: {
  title: string;
  products: Product[];
  type: "up" | "down";
}) => {
  const isUp = type === "up";

  return (
    <section>
      {/* Section heading */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`text-[18px] ${
            isUp ? "text-red-600" : "text-green-600"
          }`}
        >
          {isUp ? "▲" : "▼"}
        </span>

        <h2 className="text-[21px] font-semibold leading-7 text-gray-900">
          {title}
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <PriceCard
            key={product.id}
            product={product}
            type={type}
          />
        ))}
      </div>
    </section>
  );
};

const PriceChanges = () => {
  return (
    <section className="bg-[#f4f7f3] px-4 py-8 sm:px-5 lg:py-10">
      <div className="mx-auto max-w-[1164px] space-y-10">
        {/* Price Increased */}
        <PriceGroup
          title="আজ দাম বেড়েছে"
          products={increasedProducts}
          type="up"
        />

        {/* Price Decreased */}
        <PriceGroup
          title="আজ দাম কমেছে"
          products={decreasedProducts}
          type="down"
        />
      </div>
    </section>
  );
};

export default PriceChanges;
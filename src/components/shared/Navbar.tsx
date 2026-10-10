import { getCategories } from "@/api/category";
import Link from "next/link";

const CategoryNavbar = async () => {
  const categories = await getCategories();

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-[1164px]">
        <div className="scrollbar-hide flex items-center justify-start gap-6 overflow-x-auto px-4 py-2.5 sm:gap-7">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-gray-700 transition hover:text-green-700 sm:text-[14px]"
            >
              <span className="text-[13px]">
                {category.icon}
              </span>

              <span>{category.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNavbar;
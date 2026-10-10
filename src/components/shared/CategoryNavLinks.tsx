"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
id: string;
slug: string;
icon: string;
nameBn: string;
}

interface CategoryNavLinksProps {
categories: Category[];
}

export default function CategoryNavLinks({
categories,
}: CategoryNavLinksProps) {
const pathname = usePathname();

return ( <div className="scrollbar-hide flex items-center justify-start gap-6 overflow-x-auto px-4 py-2.5 sm:gap-7">
{categories.map((category) => {
const href = `/category/${category.slug}`;
    const isActive =
      pathname.replace(/\/+$/, "") === href;

    return (
      <Link
        key={category.id}
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={`flex shrink-0 items-center gap-1.5 rounded-md border-b-2 px-2 py-2 text-[13px] font-medium transition sm:text-[14px] ${
          isActive
            ? "border-green-700 bg-green-50 text-green-800"
            : "border-transparent text-gray-700 hover:bg-green-50 hover:text-green-700"
        }`}
      >
        <span className="text-[13px]">
          {category.icon}
        </span>

        <span>{category.nameBn}</span>
      </Link>
    );
  })}
</div>

);
}

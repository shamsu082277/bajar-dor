import { getCategory } from "@/api/category";
import ProductList from "@/components/Products/ProductList";
import { bnNumber } from "@/utils/number";
import Link from "next/link";

interface ICategoryProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const CategoryDetails = async ({ params }: ICategoryProps) => {
  const { categoryId } = await params;

  const products = await getCategory(categoryId);

  // ================= EMPTY / INVALID CATEGORY =================

  if (!products || products.length === 0) {
    return (
      <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#f4f7f3] px-4 py-10">
        <div className="w-full max-w-[500px] text-center">

          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[20px] bg-white text-[40px] shadow-sm">
            🛒
          </div>

          {/* 404 */}
          <h1 className="mt-6 text-[64px] font-bold leading-none text-green-700">
            ৪০৪
          </h1>

          {/* Title */}
          <h2 className="mt-4 text-[24px] font-bold text-gray-900">
            ক্যাটাগরি পাওয়া যায়নি
          </h2>

          {/* Description */}
          <p className="mx-auto mt-2 max-w-[380px] text-[13px] leading-6 text-gray-500">
            দুঃখিত, আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি পাওয়া যায়নি।
          </p>

          {/* CTA */}
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

  return (
    <main className="min-h-screen bg-[#f4f7f3] px-4 py-5 sm:px-5 sm:py-6">
      <div className="mx-auto max-w-[1164px]">
        {/* ================= CATEGORY HEADER ================= */}
        <section className="mb-5 rounded-[18px] border border-gray-200 bg-white px-5 py-5 sm:px-7">
          <div className="flex items-center gap-4">

            {/* Category Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f5f1] text-[27px]">
              {products[0]?.categoryIcon}
            </div>

            {/* Category Info */}
            <div>
              <h1 className="text-[23px] font-bold leading-7 text-gray-900">
                {products[0]?.categoryNameBn}
              </h1>

              <p className="mt-0.5 text-[12px] text-gray-500">
                {bnNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        {/* ================= PRODUCTS + SORT ================= */}

        <ProductList products={products} showTitle={false} />

      </div>
    </main>
  );
};

export default CategoryDetails;
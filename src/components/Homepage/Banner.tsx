import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="bg-[#f4f7f3] px-4 py-6 sm:px-5 sm:py-8">
      <div className="mx-auto flex max-w-[1164px] flex-col overflow-hidden rounded-[22px] border border-gray-200 bg-white px-5 py-7 sm:px-8 sm:py-9 lg:min-h-[388px] lg:flex-row lg:items-center lg:px-4 lg:py-6">
        
        {/* ================= LEFT CONTENT ================= */}
        <div className="flex-1 lg:pl-0">
          {/* Date */}
          <div className="mb-4 inline-flex rounded-full bg-green-50 px-3 py-1 text-[11px] font-medium text-green-700 sm:text-[12px]">
            বুধবার, ৭ অক্টোবর, ২০২৬
          </div>

          {/* Heading */}
          <h1 className="max-w-[570px] text-[34px] font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-[42px] lg:text-[46px]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-[600px] text-[15px] leading-7 text-gray-600 sm:text-[16px]">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তৃতিতে, গত, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <Link
            href="#products"
            className="mt-6 inline-flex rounded-md bg-green-700 px-5 py-2.5 text-[15px] font-semibold text-white shadow-[0_3px_5px_rgba(0,0,0,0.2)] transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="mt-8 flex flex-1 items-center justify-center lg:mt-0 lg:justify-end">
          <Image
            src="/images/bazar-hero.png"
            alt="বাজারের পণ্যের ঝুড়ি"
            width={360}
            height={300}
            priority
            className="h-auto w-[230px] object-contain sm:w-[280px] lg:mr-12 lg:w-[330px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
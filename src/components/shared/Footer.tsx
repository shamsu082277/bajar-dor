const Footer = () => {
  return (
    <footer className="w-full">
      {/* Footer content */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex min-h-[58px] max-w-[1164px] items-center justify-between gap-6 px-4 py-3 text-[11px] text-gray-500 sm:px-5 sm:text-[12px]">
          {/* Left text */}
          <p className="leading-5">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          {/* Right text */}
          <p className="text-right leading-5">
            সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
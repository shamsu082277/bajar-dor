const CategoryLoading = () => {
  return (
    <main className="min-h-[calc(100vh-68px)] bg-[#f4f7f3] px-3 py-6 sm:px-5">
      <div className="mx-auto max-w-[1164px]">
        {/* Title Skeleton */}
        <div className="mb-5">
          <div className="h-8 w-36 animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[16px] border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200" />

                <div className="flex-1">
                  {/* Name */}
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

                  {/* Description */}
                  <div className="mt-2 h-3 w-28 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoryLoading;
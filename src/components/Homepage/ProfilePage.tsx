const ProfilePage = () => {
  return (
    <main className="min-h-[calc(100vh-68px)] bg-[#f4f7f3] px-4 py-6 sm:px-5 sm:py-8">
      <div className="mx-auto max-w-[1130px]">

        {/* Page Header */}
        <div className="mb-5">
          <h1 className="text-[24px] font-bold leading-8 text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-[12px] text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Card */}
        <section className="rounded-xl border border-gray-200 bg-white px-5 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* User */}
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                <span className="text-xl font-semibold text-gray-500">
                  R
                </span>
              </div>

              {/* User Info */}
              <div>
                <h2 className="text-[17px] font-semibold leading-5 text-gray-900">
                  Rezwan Ahmed
                </h2>

                <p className="mt-1 text-[12px] text-gray-500">
                  rezwanahmed@gmail.com
                </p>
              </div>
            </div>

            {/* Sign Out */}
            <button
              type="button"
              className="w-fit rounded-lg border border-red-400 px-4 py-2 text-[12px] font-medium text-red-500 transition hover:bg-red-50"
            >
              ← সাইন আউট
            </button>
          </div>
        </section>

        {/* Update Card */}
        <section className="mt-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">

          <h2 className="text-[17px] font-semibold text-gray-900">
            তথ্য আপডেট
          </h2>

          <div className="mt-4 rounded-lg border border-gray-200 p-4 sm:p-5">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-[12px] font-medium text-gray-700"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                defaultValue="Shamsu Uddin"
                className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-gray-900 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

            {/* Update Button */}
            <button
              type="button"
              className="mt-3 h-10 w-full rounded-lg bg-green-700 text-[13px] font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              আপডেট
            </button>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ProfilePage;
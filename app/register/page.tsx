export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 px-4 py-6 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-blue-100 sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Membership Registration Form</h1>
        <p className="mt-2 text-sm text-slate-600">
          Please fill in the required details below.
        </p>

        <form className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-medium">First Name</span>
              <input
                type="text"
                name="firstName"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                required
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="font-medium">Last Name</span>
              <input
                type="text"
                name="lastName"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                required
              />
            </label>

            <label className="space-y-2 text-sm sm:col-span-2">
              <span className="font-medium">Email Address</span>
              <input
                type="email"
                name="email"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                required
              />
            </label>

            <label className="space-y-2 text-sm sm:col-span-2">
              <span className="font-medium">Phone Number</span>
              <input
                type="tel"
                name="phone"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                inputMode="numeric"
                pattern="09[0-9]{9}"
                minLength={11}
                maxLength={11}
                placeholder="09xxxxxxxxx"
                title="Phone number must be in the format 09xxxxxxxxx"
                required
              />
            </label>

            <label className="space-y-2 text-sm sm:col-span-2">
              <span className="font-medium">Course, Year, and Section</span>
              <input
                type="text"
                name="courseYearSection"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                placeholder="e.g. BSCpE 2-5"
                required
              />
            </label>

            <label className="space-y-2 text-sm sm:col-span-2">
              <span className="font-medium">Membership Type</span>
              <select
                name="membershipType"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select membership type
                </option>
                <option value="executive">Executive</option>
                <option value="lead">Lead</option>
                <option value="member">Member</option>
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-md bg-sky-600 px-5 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            Submit Registration
          </button>
        </form>
      </main>
    </div>
  );
}

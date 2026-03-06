"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CybersecurityLeadPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [position, setPosition] = useState<"lead" | "co-lead" | "">("");
  const [canSubmit, setCanSubmit] = useState(false);

  const refreshCanSubmit = () => {
    setTimeout(() => {
      setCanSubmit(formRef.current?.checkValidity() ?? false);
    }, 0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/register/technology-department/cybersecurity-lead/submit");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 px-4 py-6 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-blue-100 sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Registration - Cybersecurity Lead / Co-Lead</h1>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          The Cybersecurity Department focuses on ensuring the security of devices and code while adhering to security best practices. Members will represent the organization in upcoming Capture-the-Flag (CTF) events, engage in hands-on activities focusing on exploiting vulnerabilities, building security tools, and supporting projects through vulnerability assessments and bug bounty initiatives.
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          <span className="font-semibold">Note: The application for lead and co-lead will require an interview for the position, in the case wherein you are not accepted as lead or co-lead, you will automatically be recruited as a cadet instead.</span>
        </p>

        <form
          ref={formRef}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          onInput={refreshCanSubmit}
          onChange={refreshCanSubmit}
        >
          <fieldset className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/70 p-4">
            <legend className="px-2 text-sm font-semibold">
              What position do you want to apply for? <span className="text-red-600">*</span>
            </legend>

            <div className="space-y-2 text-sm text-slate-700">
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="radio"
                  name="cybersecurityPosition"
                  value="lead"
                  className="mt-1"
                  checked={position === "lead"}
                  onChange={() => setPosition("lead")}
                  required
                />
                <span>Cybersecurity Lead</span>
              </label>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="radio"
                  name="cybersecurityPosition"
                  value="co-lead"
                  className="mt-1"
                  checked={position === "co-lead"}
                  onChange={() => setPosition("co-lead")}
                  required
                />
                <span>Cybersecurity Co-Lead</span>
              </label>
            </div>

            {position === "lead" && (
              <section className="rounded-lg border border-sky-200 bg-white p-4 text-sm text-slate-700">
                <h2 className="font-semibold text-slate-900">Cybersecurity Lead Responsibilities:</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Guide the team through practical security challenges and organize CTF training.</li>
                  <li>Support projects by conducting security reviews and creating a secure codebase.</li>
                  <li>Ensure team readiness for cybersecurity competitions.</li>
                </ul>

                <label className="mt-4 block space-y-2">
                  <span className="font-medium">
                    How do you expect to lead the Cybersecurity Department if we were to choose you as a lead? <span className="text-red-600">*</span>
                  </span>
                  <textarea
                    name="cybersecurityLeadExpectation"
                    className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                    required={position === "lead"}
                  />
                </label>

                <label className="mt-4 block space-y-2">
                  <span className="font-medium">What relevant certifications do you have? N/A if None</span>
                  <textarea
                    name="cybersecurityLeadCertifications"
                    className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  />
                </label>
              </section>
            )}

            {position === "co-lead" && (
              <section className="rounded-lg border border-sky-200 bg-white p-4 text-sm text-slate-700">
                <h2 className="font-semibold text-slate-900">Cybersecurity Co-Lead Responsibilities:</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Support the Lead in guiding the team through practical security challenges and CTF training.</li>
                  <li>Assist in project security reviews and help maintain a secure codebase.</li>
                  <li>Help ensure team readiness for cybersecurity competitions and department activities.</li>
                </ul>

                <label className="mt-4 block space-y-2">
                  <span className="font-medium">
                    How do you expect to lead the Cybersecurity Department if we were to choose you as a co-lead? <span className="text-red-600">*</span>
                  </span>
                  <textarea
                    name="cybersecurityCoLeadExpectation"
                    className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                    required={position === "co-lead"}
                  />
                </label>

                <label className="mt-4 block space-y-2">
                  <span className="font-medium">What relevant certifications do you have? N/A if None</span>
                  <textarea
                    name="cybersecurityCoLeadCertifications"
                    className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  />
                </label>
              </section>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                onClick={() => router.push("/register/technology-department")}
              >
                Previous
              </button>

              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-md bg-sky-600 px-5 text-sm font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                disabled={!canSubmit}
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
}

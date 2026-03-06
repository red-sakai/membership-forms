"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type AdministrativeRoleOption =
  | "Compliance Officer"
  | "Meeting & Documentation Officer"
  | "Liaison Officer";

const ADMINISTRATIVE_ROLE_OPTIONS: readonly AdministrativeRoleOption[] = [
  "Compliance Officer",
  "Meeting & Documentation Officer",
  "Liaison Officer",
];

export default function AdministrativeDepartmentPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedRole, setSelectedRole] = useState<AdministrativeRoleOption | "">("");
  const [canSubmit, setCanSubmit] = useState(false);

  const refreshCanSubmit = () => {
    setTimeout(() => {
      setCanSubmit(formRef.current?.checkValidity() ?? false);
    }, 0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    router.push("/register/administrative-department/submit");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 px-4 py-6 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-blue-100 sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Registration - Administrative Department</h1>

        <p className="mt-4 text-sm leading-6 text-slate-700">
          The Administrative Department manages CNCP&apos;s official papers, records, and governance workflows.
          This department ensures that documents are accurate, timely, and aligned with organizational and
          institutional requirements. Through structured documentation, compliance checks, and formal coordination
          with partners and offices, the team helps maintain operational continuity, accountability, and trust.
        </p>

        <section className="mt-6 space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <h2 className="text-base font-semibold text-slate-900">Administrative Roles</h2>
          <p>
            <span className="font-semibold text-slate-900">Compliance Officer:</span> The Compliance Officer
            ensures that all organizational activities adhere to established policies, regulations, and ethical
            standards. They review procedures, evaluate compliance with internal and external requirements, and
            recommend improvements to enhance accountability and integrity. Through consistent monitoring and
            guidance, the officer upholds transparency and promotes responsible governance within the organization.
          </p>
          <p>
            <span className="font-semibold text-slate-900">Meeting &amp; Documentation Officer:</span> The
            Meeting &amp; Documentation Officer ensures the smooth flow of leadership operations by managing
            official communications and meeting records. They are responsible for preparing agendas, documenting
            minutes, and maintaining the accuracy of official correspondences. Through organized and timely
            documentation, the officer supports informed decision-making and promotes transparency within the
            organization&apos;s leadership processes.
          </p>
          <p>
            <span className="font-semibold text-slate-900">Liaison Officer:</span> The Liaison Officer
            facilitates effective communication and coordination between the organization and external authorities.
            They handle the delivery, retrieval, and processing of official documents, ensuring accuracy,
            confidentiality, and timeliness. By maintaining strong professional connections with university
            offices, partners, and other institutions, the Liaison Officer upholds the organization&apos;s
            credibility and ensures smooth administrative correspondence.
          </p>
        </section>

        <form
          ref={formRef}
          className="mt-6 space-y-4 text-sm"
          onSubmit={handleSubmit}
          onInput={refreshCanSubmit}
          onChange={refreshCanSubmit}
        >
          <fieldset className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/70 p-4 sm:col-span-2">
            <legend className="px-2 text-sm font-semibold">
              What role would you like to apply for? <span className="text-red-600">*</span>
            </legend>

            {ADMINISTRATIVE_ROLE_OPTIONS.map((role) => (
              <label key={role} className="flex items-start gap-3 text-sm">
                <input
                  type="radio"
                  name="administrativeRole"
                  value={role}
                  className="mt-1"
                  checked={selectedRole === role}
                  onChange={() => setSelectedRole(role)}
                  required
                />
                <span>{role}</span>
              </label>
            ))}
          </fieldset>

          {selectedRole && (
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2">
              <p className="text-sm font-medium text-slate-900">
                These questions are intended to assess your readiness for administrative responsibilities.
              </p>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">Why are you interested in applying for the {selectedRole} position? <span className="text-red-600">*</span></span>
                <textarea
                  name="administrativeMotivation"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">Describe an experience where you handled documents, records, or formal coordination. What process did you follow to stay accurate and organized? <span className="text-red-600">*</span></span>
                <textarea
                  name="administrativeExperience"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">How would you handle confidential information and ensure compliance with policies while working under deadlines? <span className="text-red-600">*</span></span>
                <textarea
                  name="administrativeConfidentiality"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">What improvements would you suggest to make CNCP&apos;s administrative workflows more efficient and transparent? <span className="text-red-600">*</span></span>
                <textarea
                  name="administrativeImprovements"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>
            </section>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              onClick={() => router.push("/register")}
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
        </form>
      </main>
    </div>
  );
}

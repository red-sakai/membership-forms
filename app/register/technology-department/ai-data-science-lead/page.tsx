"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { createSupabasePublicClient } from "@/lib/supabase";

const COOKIE_PREFIX = "registration_";

const getRegistrationCookieValue = (key: string) => {
  if (typeof document === "undefined") {
    return "";
  }

  const cookies = new Map(
    document.cookie
      .split("; ")
      .filter(Boolean)
      .map((cookieItem) => {
        const [rawName, ...rawValue] = cookieItem.split("=");
        return [decodeURIComponent(rawName), decodeURIComponent(rawValue.join("="))] as const;
      }),
  );

  return cookies.get(`${COOKIE_PREFIX}${key}`) ?? "";
};

export default function AIDataScienceLeadPage() {
  const router = useRouter();
  const supabase = createSupabasePublicClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [position, setPosition] = useState<"lead" | "co-lead" | "">("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const refreshCanSubmit = () => {
    setTimeout(() => {
      setCanSubmit(formRef.current?.checkValidity() ?? false);
    }, 0);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    setSubmitError(null);

    const firstName = getRegistrationCookieValue("firstName");
    const lastName = getRegistrationCookieValue("lastName");
    const email = getRegistrationCookieValue("email");
    const fullName = `${firstName} ${lastName}`.trim();

    if (!firstName || !lastName || !email) {
      setSubmitError("Missing personal information. Please complete the Personal Information page first.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const expectationAnswer = String(
      formData.get(position === "lead" ? "aiDataScienceLeadExpectation" : "aiDataScienceCoLeadExpectation") ?? "",
    );
    const certificationsAnswer = String(
      formData.get(position === "lead" ? "aiDataScienceLeadCertifications" : "aiDataScienceCoLeadCertifications") ?? "",
    );
    const technologyExpectations = getRegistrationCookieValue("technologyExpectations");
    const technologySuggestions = getRegistrationCookieValue("technologySuggestions");

    setIsSubmitting(true);

    const { error } = await supabase.from("registration_technology_lead_colead").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      technology_department: "AI & Data Science",
      applying_as: position,
      expectation_answer: expectationAnswer,
      certifications_answer: certificationsAnswer === "" ? null : certificationsAnswer,
      extra_answers: {
        technology_expectations: technologyExpectations,
        technology_suggestions: technologySuggestions,
      },
    });

    if (error) {
      setIsSubmitting(false);
      setSubmitError(error.message);
      return;
    }

    const { error: interviewError } = await supabase.from("to_be_interviewed").insert({
      name: fullName,
      email,
      department: "Technology",
      team: "AI & Data Science",
      role: position === "lead" ? "Lead" : "Co-Lead",
      status: "pending",
    });

    if (interviewError) {
      setIsSubmitting(false);
      setSubmitError(interviewError.message);
      return;
    }

    setIsSubmitting(false);
    router.push("/register/technology-department/ai-data-science-lead/submit");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 px-4 py-6 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-blue-100 sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Registration - AI &amp; Data Science Lead / Co-Lead</h1>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          The AI &amp; Data Science Department empowers members to derive insights from data and explore machine learning and artificial intelligence applications. Members will gain experience in data collection, analysis, and model building using tools like Python, SQL, and Excel. This lead emphasizes ethical data handling, data governance, and storytelling through data visualization, preparing members for internal presentations and competitions where they represent CISCO NetConnect in data-driven initiatives.
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
                  name="aiDataSciencePosition"
                  value="lead"
                  className="mt-1"
                  checked={position === "lead"}
                  onChange={() => setPosition("lead")}
                  required
                />
                <span>AI &amp; Data Science Lead</span>
              </label>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="radio"
                  name="aiDataSciencePosition"
                  value="co-lead"
                  className="mt-1"
                  checked={position === "co-lead"}
                  onChange={() => setPosition("co-lead")}
                  required
                />
                <span>AI &amp; Data Science Co-Lead</span>
              </label>
            </div>

            {position === "lead" && (
              <section className="rounded-lg border border-sky-200 bg-white p-4 text-sm text-slate-700">
                <h2 className="font-semibold text-slate-900">AI &amp; Data Science Lead Responsibilities:</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Provide mentorship in data analytics and machine learning.</li>
                  <li>Lead data-driven projects and organize data storytelling sessions.</li>
                  <li>Ensure the department’s data initiatives align with organizational goals and promote data literacy.</li>
                </ul>

                <label className="block space-y-2">
                  <span className="font-medium">
                    How do you expect to lead the AI &amp; Data Science Department if we were to choose you as a lead? <span className="text-red-600">*</span>
                  </span>
                  <textarea
                    name="aiDataScienceLeadExpectation"
                    className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                    required={position === "lead"}
                  />
                </label>

                <label className="mt-4 block space-y-2">
                  <span className="font-medium">What relevant certifications do you have? N/A if None</span>
                  <textarea
                    name="aiDataScienceLeadCertifications"
                    className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  />
                </label>
              </section>
            )}

            {position === "co-lead" && (
              <section className="rounded-lg border border-sky-200 bg-white p-4 text-sm text-slate-700">
                <h2 className="font-semibold text-slate-900">AI &amp; Data Science Co-Lead Responsibilities:</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Support the Lead in mentoring members in data analytics and machine learning.</li>
                  <li>Assist in coordinating data-driven projects and facilitating data storytelling sessions.</li>
                  <li>Help align department data initiatives with organizational goals while promoting data literacy.</li>
                </ul>

                <label className="block space-y-2">
                  <span className="font-medium">
                    How do you expect to lead the AI &amp; Data Science Department if we were to choose you as a co-lead? <span className="text-red-600">*</span>
                  </span>
                  <textarea
                    name="aiDataScienceCoLeadExpectation"
                    className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                    required={position === "co-lead"}
                  />
                </label>

                <label className="mt-4 block space-y-2">
                  <span className="font-medium">What relevant certifications do you have? N/A if None</span>
                  <textarea
                    name="aiDataScienceCoLeadCertifications"
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
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Submit"}
              </button>
            </div>

            {submitError && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {submitError}
              </p>
            )}
          </fieldset>
        </form>
      </main>
    </div>
  );
}

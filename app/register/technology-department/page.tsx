"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { createSupabasePublicClient } from "@/lib/supabase";

const COOKIE_PREFIX = "registration_";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type PersonalCookieValues = {
  firstName: string;
  lastName: string;
  email: string;
};

const getSavedValuesFromCookies = () => {
  if (typeof document === "undefined") {
    return new Map<string, string>();
  }

  return new Map(
    document.cookie
      .split("; ")
      .filter(Boolean)
      .map((cookieItem) => {
        const [rawName, ...rawValue] = cookieItem.split("=");
        return [decodeURIComponent(rawName), decodeURIComponent(rawValue.join("="))] as const;
      }),
  );
};

const getPersonalInfoFromCookies = (): PersonalCookieValues => {
  const cookieMap = getSavedValuesFromCookies();

  return {
    firstName: cookieMap.get(`${COOKIE_PREFIX}firstName`) ?? "",
    lastName: cookieMap.get(`${COOKIE_PREFIX}lastName`) ?? "",
    email: cookieMap.get(`${COOKIE_PREFIX}email`) ?? "",
  };
};

const saveFieldToCookie = (field: string, value: string) => {
  document.cookie = `${encodeURIComponent(`${COOKIE_PREFIX}${field}`)}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
};

export default function TechnologyDepartmentPage() {
  const router = useRouter();
  const supabase = createSupabasePublicClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [chosenDepartment, setChosenDepartment] = useState("");
  const [technologyTrack, setTechnologyTrack] = useState("");
  const [canProceed, setCanProceed] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refreshCanProceed = () => {
    setTimeout(() => {
      setCanProceed(formRef.current?.checkValidity() ?? false);
    }, 0);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    setSubmitError(null);

    const formData = new FormData(event.currentTarget);
    const expectations = String(formData.get("expectations") ?? "");
    const suggestions = String(formData.get("suggestions") ?? "");

    saveFieldToCookie("technologyDepartment", chosenDepartment);
    saveFieldToCookie("technologyTrack", technologyTrack);
    saveFieldToCookie("technologyExpectations", expectations);
    saveFieldToCookie("technologySuggestions", suggestions);

    const personalInfo = getPersonalInfoFromCookies();

    if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email) {
      setSubmitError("Missing personal information. Please complete the Personal Information page first.");
      return;
    }

    setIsSubmitting(true);

    const { error: insertError } = await supabase
      .from("registration_technology_department")
      .insert({
        first_name: personalInfo.firstName,
        last_name: personalInfo.lastName,
        email: personalInfo.email,
        technology_department: chosenDepartment,
        expectations,
        suggestions,
        application_role: "cadet",
      });

    if (insertError) {
      setIsSubmitting(false);
      setSubmitError(insertError.message);
      return;
    }

    setIsSubmitting(false);
    router.push("/register/technology-department/submit");
  };

  const handleNextClick = () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }

    const committeeMemberRouteByDepartment: Record<string, string> = {
      Cybersecurity: "/register/technology-department/cybersecurity-lead",
      Networking: "/register/technology-department/networking-lead",
      "AI & Data Science": "/register/technology-department/ai-data-science-lead",
      Programming: "/register/technology-department/programming-lead",
      "OS & IT": "/register/technology-department/os-it-lead",
    };

    const nextRoute =
      committeeMemberRouteByDepartment[chosenDepartment] ??
      "/register/technology-department/committee-member";

    router.push(nextRoute);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 px-4 py-6 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-blue-100 sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Registration - Technology Department</h1>

        <p className="mt-4 text-sm leading-6 text-slate-700">
          The Technology Department is responsible for driving technical excellence and innovation within CNCP. It consists of four key areas: Cybersecurity, Networking, AI & Data Science, and Programming. The department focuses on providing mentorship, managing projects, and organizing hands-on learning experiences. Members are encouraged to apply their skills in real-world scenarios, such as cybersecurity competitions, networking events, and data-driven projects, while gaining valuable leadership experience and exposure to industry practices.
        </p>

        <section className="mt-6">
          <h2 className="text-base font-semibold text-slate-900">What’s in it for you?</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
            <li>Learn different technologies in different departments</li>
            <li>Join events</li>
            <li>Expand your network</li>
            <li>Collaborate with members</li>
            <li>Access to resources</li>
            <li>Portfolio building</li>
            <li>Innovative environment</li>
          </ul>
        </section>

        <section className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
          <p>Below is an overview of each area within the technology department.</p>

          <p>
            <span className="font-semibold text-slate-900">Cybersecurity:</span> focuses on ensuring the security of devices and code by adhering to security best practices. Members will represent the organization in upcoming Capture-the-Flag (CTF) events, engage in hands-on activities focused on exploiting vulnerabilities, building security tools, and supporting projects through vulnerability assessments and bug bounty initiatives.
          </p>

          <p>
            <span className="font-semibold text-slate-900">AI &amp; Data Science:</span> focuses on analyzing data within the organization to solve problems, improve systems, and support KPIs. Members will gain hands-on experience with data analytics tools and explore the fundamentals of machine learning.
          </p>

          <p>
            <span className="font-semibold text-slate-900">Networking:</span> builds foundational knowledge of the OSI and TCP/IP models to understand how data travels through a network. Members will gain practical experience configuring network devices and implementing security protocols.
          </p>

          <p>
            <span className="font-semibold text-slate-900">Programming:</span> develops skills in various programming languages and frameworks, focusing on creating software solutions and supporting other technical projects.
          </p>

          <p>
            <span className="font-semibold text-slate-900">OS &amp; IT:</span> focuses on building members’ foundational skills in computer systems, hardware, and operating environments. This department provides practical and technical learning experiences essential for future system administrators, IT specialists, and network engineers.
          </p>

          <p>Refer to our primer for a detailed view of the roles and responsibilities.</p>
        </section>

        <form
          ref={formRef}
          className="mt-6 space-y-2 text-sm"
          onSubmit={handleSubmit}
          onInput={refreshCanProceed}
          onChange={refreshCanProceed}
        >
          <label className="space-y-2 text-sm sm:col-span-2">
            <span className="font-medium">Which technology department do you want to apply to? <span className="text-red-600">*</span></span>
            <select
              name="technologyDepartment"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
              required
              value={chosenDepartment}
              onChange={(event) => setChosenDepartment(event.currentTarget.value)}
            >
              <option value="" disabled>
                Select technology department
              </option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Networking">Networking</option>
              <option value="AI & Data Science">AI & Data Science</option>
              <option value="Programming">Programming</option>
              <option value="OS & IT">OS & IT</option>
            </select>
          </label>

          <label className="mt-4 block space-y-2 text-sm sm:col-span-2">
            <span className="font-medium">What are your expectations? <span className="text-red-600">*</span></span>
            <textarea
              name="expectations"
              className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
              required
            />
          </label>

          <label className="mt-4 block space-y-2 text-sm sm:col-span-2">
            <span className="font-medium">What are your suggestions for us to meet your expectations? <span className="text-red-600">*</span></span>
            <textarea
              name="suggestions"
              className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
              required
            />
          </label>

          <fieldset className="mt-4 space-y-2 rounded-md border border-slate-200 p-3 sm:col-span-2">
            <legend className="px-1 text-sm font-medium">
              Would you like to apply as a committee member or join as {chosenDepartment || "{{ chosen_department }}"} cadet? <span className="text-red-600">*</span>
            </legend>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="technologyTrack"
                value="committee-member"
                required
                checked={technologyTrack === "committee-member"}
                onChange={(event) => setTechnologyTrack(event.currentTarget.value)}
              />
              Apply as {chosenDepartment || "{{ chosen_department }}"} Lead or Co-Lead
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="technologyTrack"
                value="cadet"
                checked={technologyTrack === "cadet"}
                onChange={(event) => setTechnologyTrack(event.currentTarget.value)}
              />
              Join as {chosenDepartment || "{{ chosen_department }}"} cadet
            </label>
          </fieldset>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              onClick={() => router.push("/register")}
            >
              Previous
            </button>

            <button
              type={technologyTrack === "committee-member" ? "button" : "submit"}
              className="inline-flex h-11 items-center justify-center rounded-md bg-sky-600 px-5 text-sm font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              onClick={technologyTrack === "committee-member" ? handleNextClick : undefined}
              disabled={!canProceed || isSubmitting}
            >
              {technologyTrack === "committee-member" ? "Next" : isSubmitting ? "Saving..." : "Submit"}
            </button>
          </div>

          {submitError && (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {submitError}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}

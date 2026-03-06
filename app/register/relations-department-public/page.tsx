"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { createSupabasePublicClient } from "@/lib/supabase";

type PublicRelationsTeamOption =
  | "Organization Partnership Team"
  | "Community Partnership Team"
  | "Partnership Compliance Team";

const ROLE_OPTIONS_BY_TEAM: Record<PublicRelationsTeamOption, readonly string[]> = {
  "Organization Partnership Team": [
    "Organization Coordinators",
    "Sponsorship Coordinators",
  ],
  "Community Partnership Team": [
    "Academic Collaborator",
    "Student Organization Collaborator",
  ],
  "Partnership Compliance Team": [
    "Agreement Reviewer Team",
    "Compliance Monitoring Team",
    "Commitment Fulfillment Team",
  ],
};

const COOKIE_PREFIX = "registration_";

const publicQuestionFieldNames = [
  "organizationPartnershipQuestion1",
  "organizationPartnershipQuestion2",
  "organizationPartnershipQuestion3",
  "communityPartnershipQuestion1",
  "communityPartnershipQuestion2",
  "communityPartnershipQuestion3",
  "partnershipComplianceQuestion1",
  "partnershipComplianceQuestion2",
] as const;

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

export default function RelationsDepartmentPublicPage() {
  const router = useRouter();
  const supabase = createSupabasePublicClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedTeam, setSelectedTeam] = useState<PublicRelationsTeamOption | "">("");
  const [selectedRole, setSelectedRole] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const roleOptions = selectedTeam ? ROLE_OPTIONS_BY_TEAM[selectedTeam] : [];

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

    const firstName = getRegistrationCookieValue("firstName");
    const lastName = getRegistrationCookieValue("lastName");
    const email = getRegistrationCookieValue("email");

    if (!firstName || !lastName || !email) {
      setSubmitError("Missing personal information. Please complete the Personal Information page first.");
      return;
    }

    if (!selectedTeam || !selectedRole) {
      setSubmitError("Please select both team and role before submitting.");
      return;
    }

    setSubmitError(null);

    const formData = new FormData(event.currentTarget);
    const questionAnswers: Record<string, string> = {};

    publicQuestionFieldNames.forEach((fieldName) => {
      const value = String(formData.get(fieldName) ?? "").trim();

      if (value !== "") {
        questionAnswers[fieldName] = value;
      }
    });

    setIsSubmitting(true);

    const { error } = await supabase.from("registration_relations_public_department").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      team: selectedTeam,
      application_role: selectedRole,
      question_answers: questionAnswers,
    });

    if (error) {
      setIsSubmitting(false);
      setSubmitError(error.message);
      return;
    }

    setIsSubmitting(false);

    router.push("/register/relations-department-public/submit");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 px-4 py-6 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-blue-100 sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Registration - Relations Department: Public</h1>

        <p className="mt-4 text-sm leading-6 text-slate-700">
          The Public Relations Committee is dedicated to building and strengthening mutually beneficial
          collaborations that align with the organization&apos;s goals. This committee identifies and nurtures
          strategic partnerships, facilitates communication with external organizations, and ensures the
          successful execution of joint initiatives. This mission aligns with the Chief Public Relations Officer
          (CPRO) role in designing sustainable strategies that enhance resource-sharing, foster long-term
          alliances, and expand the organization&apos;s reach and impact through cooperative efforts.
        </p>

        <form
          ref={formRef}
          className="mt-6 space-y-4 text-sm"
          onSubmit={handleSubmit}
          onInput={refreshCanSubmit}
          onChange={refreshCanSubmit}
        >
          <label className="block space-y-2 sm:col-span-2">
            <span className="font-medium">What team do you want to apply to in Relations Department: Public? <span className="text-red-600">*</span></span>
            <select
              name="publicRelationsTeam"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
              required
              value={selectedTeam}
              onChange={(event) => {
                setSelectedTeam(event.currentTarget.value as PublicRelationsTeamOption | "");
                setSelectedRole("");
              }}
            >
              <option value="" disabled>
                Select team
              </option>
              <option value="Organization Partnership Team">Organization Partnership Team</option>
              <option value="Community Partnership Team">Community Partnership Team</option>
              <option value="Partnership Compliance Team">Partnership Compliance Team</option>
            </select>
          </label>

          {selectedTeam === "Organization Partnership Team" && (
            <section className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <h2 className="text-base font-semibold text-slate-900">Organization Partnership Team</h2>
              <p>
                This team builds partnerships with industry and organization leaders, focusing on mutual growth
                and securing sponsorships to support the organization&apos;s activities. By connecting members with
                influential leaders, this team creates valuable learning and career opportunities that enhance the
                organization&apos;s reputation and resources.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Organization Coordinators:</span> Fosters alliances with
                industry leaders and professional organizations to create mutual growth opportunities. These
                partnerships are designed to provide members with valuable insights and connections within their
                fields.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Sponsorship Coordinators:</span> Secures sponsorships from
                industry partners to support vital programs and organizational events. The team actively manages
                sponsorship relationships to ensure both parties receive optimal value.
              </p>
            </section>
          )}

          {selectedTeam === "Community Partnership Team" && (
            <section className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <h2 className="text-base font-semibold text-slate-900">Community Partnership Team</h2>
              <p>
                This team forges collaborations with academic institutions and student organizations, focusing on
                academic partnerships, student engagement, and community outreach. These initiatives support
                professional development, educational growth, and inclusive community-building, enriching the
                organization&apos;s network and impact.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Academic Collaborator:</span> Establishes partnerships with
                academic institutions to provide members with enriched educational resources and experiences. This
                includes organizing workshops, lectures, and access to learning materials that support members&apos;
                professional growth.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Student Organization Collaborator:</span> Works
                collaboratively with other student groups to build a supportive, unified network across campus. By
                leading joint projects and events, this team creates opportunities for shared learning and social
                engagement.
              </p>
            </section>
          )}

          {selectedTeam === "Partnership Compliance Team" && (
            <section className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <h2 className="text-base font-semibold text-slate-900">Partnership Compliance Team</h2>
              <p>
                Ensures that all partnerships adhere to the organization&apos;s standards, ethical guidelines, and
                regulatory requirements. This team monitors partnership agreements, evaluates compliance, and
                addresses any issues to safeguard the organization&apos;s reputation and maintain trust with
                stakeholders.
              </p>
              <p className="font-semibold text-slate-900">Agreement Reviewer Team</p>
              <p>
                Conducts thorough evaluations of partnership agreements to ensure they align with the
                organization&apos;s standards and values. This process safeguards the organization&apos;s interests while
                promoting clear expectations between parties.
              </p>
              <p className="font-semibold text-slate-900">Compliance Monitoring Team</p>
              <p>
                Actively oversees partnerships to ensure compliance with organizational policies and agreed-upon
                terms. The team addresses any issues or discrepancies to uphold the organization&apos;s integrity.
                Monitoring ensures that all partnerships operate within set guidelines and ethical standards.
              </p>
              <p className="font-semibold text-slate-900">Commitment Fulfillment Team</p>
              <p>
                Ensures that all commitments made within partnerships are met to foster trust and mutual success.
                This involves tracking deliverables and timelines to uphold the organization&apos;s reputation.
                Fulfillment efforts strengthen long-term partnerships by demonstrating reliability and
                accountability.
              </p>
            </section>
          )}

          {selectedTeam && (
            <fieldset className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/70 p-4 sm:col-span-2">
              <legend className="px-2 text-sm font-semibold">
                Which role would you like to apply for? <span className="text-red-600">*</span>
              </legend>

              {roleOptions.map((role) => (
                <label key={role} className="flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="publicRelationsRole"
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
          )}

          {selectedTeam === "Organization Partnership Team" && selectedRole && (
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2">
              <p className="text-sm font-medium text-slate-900">
                These questions are intended to give us a general sense of your interest and experience. For applicants who qualify, a follow-up interview will be scheduled to get to know you even better.
              </p>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">What factors should we consider when identifying and evaluating potential organizational partners? <span className="text-red-600">*</span></span>
                <textarea
                  name="organizationPartnershipQuestion1"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">How do we contribute to measuring the success and impact of our existing partnerships? <span className="text-red-600">*</span></span>
                <textarea
                  name="organizationPartnershipQuestion2"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">What challenges do you observe in securing sustainable, long-term partnerships, and how can we help address them? <span className="text-red-600">*</span></span>
                <textarea
                  name="organizationPartnershipQuestion3"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>
            </section>
          )}

          {selectedTeam === "Community Partnership Team" && selectedRole && (
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2">
              <p className="text-sm font-medium text-slate-900">
                These questions are intended to give us a general sense of your interest and experience. For applicants who qualify, a follow-up interview will be scheduled to get to know you even better.
              </p>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">Which community groups should we focus on, and how can we help achieve our key goals with each? <span className="text-red-600">*</span></span>
                <textarea
                  name="communityPartnershipQuestion1"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">How do we ensure our efforts align with the needs of the communities we serve? <span className="text-red-600">*</span></span>
                <textarea
                  name="communityPartnershipQuestion2"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">What feedback can we gather to evaluate the success of our community partnerships? <span className="text-red-600">*</span></span>
                <textarea
                  name="communityPartnershipQuestion3"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>
            </section>
          )}

          {selectedTeam === "Partnership Compliance Team" && selectedRole && (
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2">
              <p className="text-sm font-medium text-slate-900">
                These questions are intended to give us a general sense of your interest and experience. For applicants who qualify, a follow-up interview will be scheduled to get to know you even better.
              </p>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">What compliance standards should we prioritize for partnerships, and how often should we review them? <span className="text-red-600">*</span></span>
                <textarea
                  name="partnershipComplianceQuestion1"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">How can we support handling partnerships that don&apos;t meet compliance requirements, and what improvements can we suggest for this process? <span className="text-red-600">*</span></span>
                <textarea
                  name="partnershipComplianceQuestion2"
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
        </form>
      </main>
    </div>
  );
}

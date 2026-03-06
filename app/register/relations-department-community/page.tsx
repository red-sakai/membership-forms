"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type CommunityRelationsTeamOption =
  | "Member Engagement Team"
  | "Member Relations and Support Team";

const ROLE_OPTIONS_BY_TEAM: Record<CommunityRelationsTeamOption, readonly string[]> = {
  "Member Engagement Team": [
    "Engagement Coordinators",
    "Internal Communications Officers",
    "Volunteer Coordinators",
  ],
  "Member Relations and Support Team": [
    "Member Support Officers",
    "Feedback and Engagement Officers",
    "Culture and Inclusivity Officers",
    "Recognition and Motivation Officers",
  ],
};

export default function RelationsDepartmentCommunityPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedTeam, setSelectedTeam] = useState<CommunityRelationsTeamOption | "">("");
  const [selectedRole, setSelectedRole] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const roleOptions = selectedTeam ? ROLE_OPTIONS_BY_TEAM[selectedTeam] : [];

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

    router.push("/register/relations-department-community/submit");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 px-4 py-6 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-blue-100 sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Registration - Relations Department: Community</h1>

        <p className="mt-4 text-sm leading-6 text-slate-700">
          The Community Relations Committee focuses on promoting a positive image within the organization,
          facilitating strong internal communication, and ensuring active involvement of all members. This aligns
          with the Chief Community Relations Officer&apos;s (CCRO) mission to design and implement initiatives that
          cater to the needs of members while fostering community engagement and inclusivity.
        </p>

        <form
          ref={formRef}
          className="mt-6 space-y-4 text-sm"
          onSubmit={handleSubmit}
          onInput={refreshCanSubmit}
          onChange={refreshCanSubmit}
        >
          <label className="block space-y-2 sm:col-span-2">
            <span className="font-medium">What team do you want to be in? <span className="text-red-600">*</span></span>
            <select
              name="communityRelationsTeam"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
              required
              value={selectedTeam}
              onChange={(event) => {
                setSelectedTeam(event.currentTarget.value as CommunityRelationsTeamOption | "");
                setSelectedRole("");
              }}
            >
              <option value="" disabled>
                Select team
              </option>
              <option value="Member Engagement Team">Member Engagement Team</option>
              <option value="Member Relations and Support Team">Member Relations and Support Team</option>
            </select>
          </label>

          {selectedTeam === "Member Engagement Team" && (
            <section className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <h2 className="text-base font-semibold text-slate-900">Member Engagement Team</h2>
              <p>
                This team is dedicated to organizing activities and initiatives that enhance member engagement and
                create a strong sense of community within the organization.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Engagement Coordinators:</span> Plan and execute
                internal events, such as social mixers, team-building exercises, and skill-sharing workshops,
                designed to encourage participation and strengthen member connections.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Internal Communications Officers:</span> Ensure clear
                and consistent communication across all internal channels, managing newsletters, announcements, and
                updates to keep members informed and engaged.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Volunteer Coordinators:</span> Encourage and manage
                member participation in volunteer activities within the organization to help build a culture of
                giving back.
              </p>
            </section>
          )}

          {selectedTeam === "Member Relations and Support Team" && (
            <section className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <h2 className="text-base font-semibold text-slate-900">Member Relations and Support Team</h2>
              <p>
                Focuses on maintaining strong relationships with members and ensuring they feel supported, valued,
                and included within the organization.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Member Support Officers:</span> Provide assistance to
                members, answer queries, help new members acclimate, and guide them on how to get involved in
                organizational activities.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Feedback and Engagement Officers:</span> Collect member
                feedback through surveys or discussions, track satisfaction levels, and suggest improvements for
                member engagement activities.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Culture and Inclusivity Officers:</span> Ensure that all
                internal activities and communications reflect the organization&apos;s values of inclusivity, respect,
                and diversity.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Recognition and Motivation Officers:</span> Develop and
                implement programs to recognize member achievements, celebrate milestones, and encourage active
                participation in community-building activities.
              </p>
            </section>
          )}

          {selectedTeam && (
            <fieldset className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/70 p-4 sm:col-span-2">
              <legend className="px-2 text-sm font-semibold">
                What role do you want to apply for in the team? <span className="text-red-600">*</span>
              </legend>

              {roleOptions.map((role) => (
                <label key={role} className="flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="communityRelationsRole"
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

          {selectedTeam === "Member Engagement Team" && selectedRole && (
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2">
              <p className="text-sm font-medium text-slate-900">
                Note: These questions are intended to give us a general sense of your interest and experience. For applicants who qualify, a follow-up interview will be scheduled to get to know you even better.
              </p>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">Why are you interested in applying for the Member Engagement Team? <span className="text-red-600">*</span></span>
                <textarea
                  name="memberEngagementQuestion1"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">How do you ensure clear and effective communication with all members? <span className="text-red-600">*</span></span>
                <textarea
                  name="memberEngagementQuestion2"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">If a member went above and beyond in a project or event, how would you recognize their effort in a way that makes them feel appreciated? <span className="text-red-600">*</span></span>
                <textarea
                  name="memberEngagementQuestion3"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>
            </section>
          )}

          {selectedTeam === "Member Relations and Support Team" && selectedRole && (
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2">
              <p className="text-sm font-medium text-slate-900">
                Note: These questions are intended to give us a general sense of your interest and experience. For applicants who qualify, a follow-up interview will be scheduled to get to know you even better.
              </p>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">Why are you interested in applying for the Member Relations and Support Team? <span className="text-red-600">*</span></span>
                <textarea
                  name="memberRelationsSupportQuestion1"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">Have you experienced where you managed a team/groupings before? Share how you manage. <span className="text-red-600">*</span></span>
                <textarea
                  name="memberRelationsSupportQuestion2"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">How do you handle conflicts or concerns from members about feeling disconnected or unsupported? <span className="text-red-600">*</span></span>
                <textarea
                  name="memberRelationsSupportQuestion3"
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

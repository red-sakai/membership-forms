"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type MarketingTeamOption = "Content Management Team" | "Content Creation Team";

const ROLE_OPTIONS_BY_TEAM: Record<MarketingTeamOption, readonly string[]> = {
  "Content Management Team": [
    "Caption Writer",
    "Engagement & Statistics Analyst",
    "Content Strategist",
    "Social Media Manager",
  ],
  "Content Creation Team": ["Video Director", "Photographer", "Videographer"],
};

export default function MarketingDepartmentPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedTeam, setSelectedTeam] = useState<MarketingTeamOption | "">("");
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

    router.push("/register/marketing-department/submit");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 px-4 py-6 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-blue-100 sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Registration - Marketing Department</h1>

        <p className="mt-4 text-sm leading-6 text-slate-700">
          The Marketing Department is responsible for strategizing and executing initiatives that drive brand
          awareness, customer engagement, and market growth. They ensure that CNCP&apos;s brand message is
          consistent, engaging, and effectively targeted to our audiences.
        </p>

        <p className="mt-4 text-sm leading-6 text-slate-700">
          Below is an overview of each role within the Content Management and Content Creation teams. Make sure
          to review the responsibilities to find the best match for your skills and interests.
        </p>

        <form
          ref={formRef}
          className="mt-6 space-y-4 text-sm"
          onSubmit={handleSubmit}
          onInput={refreshCanSubmit}
          onChange={refreshCanSubmit}
        >
          <label className="block space-y-2 sm:col-span-2">
            <span className="font-medium">What team do you want to join in the Marketing Department? <span className="text-red-600">*</span></span>
            <select
              name="marketingTeam"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
              required
              value={selectedTeam}
              onChange={(event) => {
                setSelectedTeam(event.currentTarget.value as MarketingTeamOption | "");
                setSelectedRole("");
              }}
            >
              <option value="" disabled>
                Select team
              </option>
              <option value="Content Management Team">Content Management Team</option>
              <option value="Content Creation Team">Content Creation Team</option>
            </select>
          </label>

          {selectedTeam === "Content Management Team" && (
            <section className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <h2 className="text-base font-semibold text-slate-900">Content Management Team</h2>
              <p>
                Content Management Team is responsible for content production, distribution, and performance.
                They ensure that all published material aligns with the brand&apos;s vision, voice, and
                objectives while resonating with CNCP&apos;s audience. They craft messages, track engagement,
                and optimize future campaigns.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Caption Writer:</span> Crafts concise and
                engaging captions tailored for social media platforms, reflecting the brand&apos;s voice and
                encouraging interaction.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Engagement &amp; Statistics Analyst:</span>
                Tracks and analyzes engagement metrics to evaluate content performance and optimize future
                campaigns.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Content Strategist:</span> Brainstorms and
                develops content ideas, focusing on effective messaging, titles, taglines, and other key
                elements to boost engagement.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Social Media Manager:</span> Manages social
                media presence, including planning, scheduling, and publishing content, while monitoring
                interactions and responding to inquiries.
              </p>
            </section>
          )}

          {selectedTeam === "Content Creation Team" && (
            <section className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <h2 className="text-base font-semibold text-slate-900">Content Creation Team</h2>
              <p>
                Content Creation Team focuses on visuals and multimedia content, producing photos, videos, and
                other creative assets that enhance CNCP&apos;s identity. They ensure the content is visually
                appealing, aligns with the brand&apos;s aesthetics, and supports the overall marketing strategy.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Video Director:</span> Oversees the creative
                direction and storytelling aspects of video content.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Photographer:</span> Captures high-quality
                images for digital and print media, enhancing the brand&apos;s visual presence.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Videographer:</span> Shoots videos for social
                media platforms, including video snippets, reels, and full-length promotional videos.
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
                    name="marketingRole"
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

          {selectedRole && (
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2">
              <p className="text-sm font-medium text-slate-900">
                These questions are the same regardless of the role you apply for.
              </p>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">Why are you interested in joining the CNCP Marketing Committee, and what motivates you to apply for this specific position? <span className="text-red-600">*</span></span>
                <textarea
                  name="marketingInterestMotivation"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">Describe your experience and skills that make you a strong candidate for this role. Include any relevant roles or projects you have worked with. (if applicable) <span className="text-red-600">*</span></span>
                <textarea
                  name="marketingExperienceAndSkills"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">How do you handle feedback on your work, and how do you approach collaboration within a team? <span className="text-red-600">*</span></span>
                <textarea
                  name="marketingFeedbackAndCollaboration"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">Link to Relevant Works or Sample Projects. If you have any links to work that showcase your skills related to the position you&apos;re applying for, we&apos;d love to see that! (e.g., sample captions, visual projects or professional shots and videos)</span>
                <textarea
                  name="marketingRelevantWorksLinks"
                  className="min-h-20 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  placeholder="https://..."
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

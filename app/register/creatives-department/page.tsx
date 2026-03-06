"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { createSupabasePublicClient } from "@/lib/supabase";

type TeamOption = "Graphic Design Team" | "Multimedia Team";

const ROLE_OPTIONS_BY_TEAM: Record<TeamOption, readonly string[]> = {
  "Graphic Design Team": ["Graphic Designer", "Illustrator"],
  "Multimedia Team": ["Photo Editors", "Video Editors", "Animators"],
};

const SOFTWARE_OPTIONS = [
  "Adobe Photoshop",
  "Adobe Lightroom",
  "Adobe Premiere Pro",
  "Adobe After Effects",
  "Sony Vegas Pro",
  "Canva",
  "Figma",
] as const;

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

export default function CreativesDepartmentPage() {
  const router = useRouter();
  const supabase = createSupabasePublicClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamOption | "">("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);
  const [otherSoftwareChecked, setOtherSoftwareChecked] = useState(false);
  const [otherSoftwareText, setOtherSoftwareText] = useState("");
  const [softwareError, setSoftwareError] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const roleOptions = selectedTeam ? ROLE_OPTIONS_BY_TEAM[selectedTeam] : [];

  const refreshCanSubmit = () => {
    setTimeout(() => {
      const form = formRef.current;

      if (!form) {
        setCanSubmit(false);
        return;
      }

      const checkedSoftwareCount = form.querySelectorAll('input[name="creativeSoftware"]:checked').length;
      const otherSoftwareCheckbox = form.elements.namedItem("creativeSoftwareOtherChecked") as HTMLInputElement | null;
      const hasSoftwareSelection = checkedSoftwareCount > 0 || Boolean(otherSoftwareCheckbox?.checked);
      const isFormValid = form.checkValidity();

      setCanSubmit(isFormValid && hasSoftwareSelection);
    }, 0);
  };

  const handleTeamChange = (nextTeam: string) => {
    setSelectedTeam(nextTeam as TeamOption | "");
    setSelectedRole("");
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleSoftwareToggle = (software: string) => {
    setSelectedSoftware((previous) => {
      if (previous.includes(software)) {
        return previous.filter((item) => item !== software);
      }

      return [...previous, software];
    });

    setSoftwareError("");
  };

  const handleOtherSoftwareToggle = () => {
    setOtherSoftwareChecked((previous) => {
      const nextValue = !previous;

      if (!nextValue) {
        setOtherSoftwareText("");
      }

      return nextValue;
    });
    setSoftwareError("");
  };

  const selectedSoftwareJson = JSON.stringify([
    ...selectedSoftware,
    ...(otherSoftwareChecked
      ? [otherSoftwareText.trim() ? `Other: ${otherSoftwareText.trim()}` : "Other"]
      : []),
  ]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    if (selectedSoftware.length === 0 && !otherSoftwareChecked) {
      setSoftwareError("Please select at least one software option.");
      return;
    }

    setSoftwareError("");

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
    const questionAnswers = {
      creative_interest_motivation: String(formData.get("creativeInterestMotivation") ?? ""),
      creative_experience: String(formData.get("creativeExperience") ?? ""),
      creative_achievements: String(formData.get("creativeAchievements") ?? ""),
      creative_work_samples_link: String(formData.get("creativeWorkSamplesLink") ?? ""),
      creative_eportfolio_link: String(formData.get("creativeEportfolioLink") ?? ""),
      creative_software: JSON.parse(String(formData.get("creativeSoftwareJson") ?? "[]")),
    };

    setIsSubmitting(true);

    const { error } = await supabase.from("registration_creatives_department").insert({
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

    router.push("/register/creatives-department/submit");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 px-4 py-6 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-blue-100 sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Registration - Creatives Department</h1>

        <p className="mt-4 text-sm leading-6 text-slate-700">
          CNCP&apos;s Creative Committee is responsible for enhancing our organization&apos;s presence and
          communication efforts to reach and engage both internal and external audiences. This committee creates
          visually appealing digital and print materials such as social media graphics, presentations, and
          advertisements.
        </p>

        <p className="mt-4 text-sm leading-6 text-slate-700">
          The Creative Committee handles publication and graphic design tasks and also edits captured media such
          as photos and videos. The committee has two teams: Graphic Design Team and Multimedia Team.
        </p>

        <section className="mt-6 space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <h2 className="text-base font-semibold text-slate-900">Graphic Design Team</h2>
          <p>
            This team is tasked in designing and producing graphic and print materials such as infographics,
            announcement posts, and advertisements that can boost our social media presence and entice viewers.
            There are two roles within this team: Graphic Designers and Illustrators.
          </p>
          <p>
            <span className="font-semibold text-slate-900">Graphic Designers:</span> are responsible for creating visually
            appealing layouts that combine typography, color, and other design elements to produce cohesive and
            impactful materials. They work closely with the team to ensure brand consistency and elevate the look of
            infographics, posts, and advertisements.
          </p>
          <p>
            <span className="font-semibold text-slate-900">Illustrators:</span> focus on crafting custom visual elements such
            as mascots, sketches, or unique illustrations that enhance and personalize the overall design. Their work
            adds a creative and memorable touch to our materials, making them stand out and resonate with our audience.
          </p>
        </section>

        <section className="mt-4 space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <h2 className="text-base font-semibold text-slate-900">Multimedia Team</h2>
          <p>
            This team is tasked in editing and manipulating captured media such as photos and videos. There are
            three roles within this team: Photo Editors, Video Editors, and Animators.
          </p>
          <p>
            <span className="font-semibold text-slate-900">Photo Editors:</span> focus on enhancing and retouching photos to
            ensure they are visually striking and align with our brand&apos;s aesthetic. They adjust colors, lighting,
            and details to create polished, high-quality images for our media.
          </p>
          <p>
            <span className="font-semibold text-slate-900">Video Editors:</span> handle the post-production process of
            videos, from cutting and sequencing clips to adding effects, audio, and graphics. Their work brings our
            captured footage to life, creating engaging video content for our audience.
          </p>
          <p>
            <span className="font-semibold text-slate-900">Animators:</span> specialize in developing animated elements that
            add dynamic, motion-based visuals to our projects. They create animations that can complement video
            content or stand alone as engaging digital assets.
          </p>
        </section>

        <form ref={formRef} className="mt-6 space-y-4 text-sm" onSubmit={handleSubmit} onInput={refreshCanSubmit} onChange={refreshCanSubmit}>
          <input type="hidden" name="creativeSoftwareJson" value={selectedSoftwareJson} />

          <label className="block space-y-2 sm:col-span-2">
            <span className="font-medium">What team do you want to apply for? <span className="text-red-600">*</span></span>
            <select
              name="creativeTeam"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
              required
              value={selectedTeam}
              onChange={(event) => handleTeamChange(event.currentTarget.value)}
            >
              <option value="" disabled>
                Select team
              </option>
              <option value="Graphic Design Team">Graphic Design Team</option>
              <option value="Multimedia Team">Multimedia Team</option>
            </select>
          </label>

          {selectedTeam && (
            <fieldset className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/70 p-4 sm:col-span-2">
              <legend className="px-2 text-sm font-semibold">
                Which role do you want to apply for? <span className="text-red-600">*</span>
              </legend>

              {roleOptions.map((role) => (
                <label key={role} className="flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="creativeRole"
                    value={role}
                    className="mt-1"
                    checked={selectedRole === role}
                    onChange={() => handleRoleChange(role)}
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
                <span className="font-medium">Why are you interested in joining the CNCP Creatives Committee, and what motivates you to apply for this specific position? <span className="text-red-600">*</span></span>
                <textarea
                  name="creativeInterestMotivation"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">How many years of experience do you have in the Creative field? Have you had any previous roles related to Multimedia Editing? <span className="text-red-600">*</span></span>
                <textarea
                  name="creativeExperience"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">Please share your notable achievements and experiences in the field, including skills or projects you&apos;re proud of. <span className="text-red-600">*</span></span>
                <textarea
                  name="creativeAchievements"
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">Please share a link to a compiled folder of your previous creative works (Google Drive, OneDrive, etc.). <span className="text-red-600">*</span></span>
                <input
                  type="url"
                  name="creativeWorkSamplesLink"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  placeholder="https://..."
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">If you have an e-portfolio, please share the link here.</span>
                <input
                  type="url"
                  name="creativeEportfolioLink"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                  placeholder="https://..."
                />
              </label>

              <fieldset className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/70 p-4">
                <legend className="px-2 text-sm font-semibold">
                  What photo and/or video editing software/s do you use? Check all that applies: <span className="text-red-600">*</span>
                </legend>

                {SOFTWARE_OPTIONS.map((software) => (
                  <label key={software} className="flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      name="creativeSoftware"
                      value={software}
                      className="mt-1"
                      checked={selectedSoftware.includes(software)}
                      onChange={() => handleSoftwareToggle(software)}
                    />
                    <span>{software}</span>
                  </label>
                ))}

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    name="creativeSoftwareOtherChecked"
                    value="Other"
                    className="mt-1"
                    checked={otherSoftwareChecked}
                    onChange={handleOtherSoftwareToggle}
                  />
                  <span>Other</span>
                </label>

                {otherSoftwareChecked && (
                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Please specify other software <span className="text-red-600">*</span></span>
                    <input
                      type="text"
                      name="creativeSoftwareOther"
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required={otherSoftwareChecked}
                      value={otherSoftwareText}
                      onChange={(event) => setOtherSoftwareText(event.currentTarget.value)}
                    />
                  </label>
                )}

                {softwareError && <p className="text-xs text-red-600">{softwareError}</p>}
              </fieldset>
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

"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function OperationsDepartmentPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [operationsCommittee, setOperationsCommittee] = useState("");
  const [programsRole, setProgramsRole] = useState("");
  const [operationsRole, setOperationsRole] = useState("");
  const [mediaDocumentationRole, setMediaDocumentationRole] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const refreshCanSubmit = () => {
    setTimeout(() => {
      setCanSubmit(formRef.current?.checkValidity() ?? false);
    }, 0);
  };

  const handleOperationsRoleChange = (selectedRole: string) => {
    setOperationsRole(selectedRole);

    if (selectedRole !== "Media Documentation Coordinator") {
      setMediaDocumentationRole("");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    router.push("/register/operations-department/submit");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 px-4 py-6 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-blue-100 sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Registration - Operations Department</h1>

        <p className="mt-4 text-sm leading-6 text-slate-700">
          The Operations Department is the backbone of organizational logistics and event execution. We oversee
          every step of the operational process, ensuring smooth planning and implementation of events conducted
          within the organization. This team ensures CNCP&apos;s events run efficiently, delivering a seamless,
          professional, and engaging experience for attendees and team members.
        </p>

        <section className="mt-6">
          <h2 className="text-base font-semibold text-slate-900">What&apos;s in it for you?</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
            <li>Hands-on experience in project and event operations</li>
            <li>Exposure to planning, coordination, and documentation workflows</li>
            <li>Opportunities to lead initiatives and improve team systems</li>
            <li>Development of communication and organizational skills</li>
          </ul>
        </section>

        <form
          ref={formRef}
          className="mt-6 space-y-2 text-sm"
          onSubmit={handleSubmit}
          onInput={refreshCanSubmit}
          onChange={refreshCanSubmit}
        >
          <label className="mt-4 block space-y-2 text-sm sm:col-span-2">
            <span className="font-medium">Which committee do you want to apply for in the Operations Department? <span className="text-red-600">*</span></span>
            <select
              name="operationsCommittee"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
              required
              value={operationsCommittee}
              onChange={(event) => {
                const selectedCommittee = event.currentTarget.value;
                setOperationsCommittee(selectedCommittee);

                if (selectedCommittee !== "Programs Committee") {
                  setProgramsRole("");
                }

                if (selectedCommittee !== "Operations Committee") {
                  setOperationsRole("");
                  setMediaDocumentationRole("");
                }
              }}
            >
              <option value="" disabled>
                Select committee
              </option>
              <option value="Programs Committee">Programs Committee</option>
              <option value="Operations Committee">Operations Committee</option>
            </select>
          </label>

          {operationsCommittee === "Programs Committee" && (
            <section className="mt-4 space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <h2 className="text-base font-semibold text-slate-900">Programs Committee</h2>
              <p>
                The Programs Committee is dedicated to planning, developing, and executing the organization&apos;s
                events and initiatives. This committee focuses on designing programs that align with
                organizational goals. The Programs Committee collaborates closely with other teams to ensure each
                event is not only well-organized but also impactful.
              </p>
              <p>
                <span className="font-semibold text-slate-900">a. Program Managers</span>
                <br />
                Plan, coordinate, and oversee specific programs or events within the organization. They are
                expected to develop program objectives, manage timelines, and ensure the successful execution of
                their assigned tasks.
              </p>
              <p>
                <span className="font-semibold text-slate-900">b. Hosts</span>
                <br />
                Host the event, managing the flow and engaging with attendees. Responsible for presenting
                content, facilitating discussions, and ensuring the event runs smoothly.
              </p>
              <p>
                <span className="font-semibold text-slate-900">c. Host Coordinators</span>
                <br />
                Coordinate with hosts and assist in writing scripts for the event. Ensure that hosts are
                well-prepared and that the script aligns with the event&apos;s objectives and schedule.
              </p>
              <p>
                <span className="font-semibold text-slate-900">d. Technical Coordinators</span>
                <br />
                Oversee technical aspects of events, including AV equipment, live streaming, and other technical
                requirements. Ensure all technical systems are functioning correctly and troubleshoot any issues
                that arise.
              </p>

              <fieldset className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/70 p-4">
                <legend className="px-2 text-sm font-semibold">Which role do you want to apply for? <span className="text-red-600">*</span></legend>

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="programsRole"
                    value="Program Manager"
                    className="mt-1"
                    checked={programsRole === "Program Manager"}
                    onChange={() => setProgramsRole("Program Manager")}
                    required
                  />
                  <span>Program Manager (requires interview)</span>
                </label>

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="programsRole"
                    value="Host"
                    className="mt-1"
                    checked={programsRole === "Host"}
                    onChange={() => setProgramsRole("Host")}
                    required
                  />
                  <span>Host</span>
                </label>

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="programsRole"
                    value="Host Coordinator"
                    className="mt-1"
                    checked={programsRole === "Host Coordinator"}
                    onChange={() => setProgramsRole("Host Coordinator")}
                    required
                  />
                  <span>Host Coordinator</span>
                </label>

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="programsRole"
                    value="Technical Coordinator"
                    className="mt-1"
                    checked={programsRole === "Technical Coordinator"}
                    onChange={() => setProgramsRole("Technical Coordinator")}
                    required
                  />
                  <span>Technical Coordinator</span>
                </label>
              </fieldset>

              {programsRole === "Program Manager" && (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Do you have any experience with this role? If so, please describe your relevant background. If you have no experience, please put &quot;N/A&quot; and proceed to the next question. <span className="text-red-600">*</span></span>
                    <textarea
                      name="programManagerExperience"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Since we&apos;re still students, how do you prioritize and manage multiple tasks, events, or projects at once? What tools or methods do you use to stay organized and handle concurrent responsibilities? <span className="text-red-600">*</span></span>
                    <textarea
                      name="programManagerTaskManagement"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Describe a situation where you had to adapt an event plan or timeline unexpectedly. How did you handle it? <span className="text-red-600">*</span></span>
                    <textarea
                      name="programManagerAdaptability"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Describe a time when you had to work closely with other teams to execute a successful event. What was your approach to collaboration? <span className="text-red-600">*</span></span>
                    <textarea
                      name="programManagerCollaboration"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>
                </div>
              )}

              {programsRole === "Host" && (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Do you have any experience with this role? If so, please describe your relevant background. If you have no experience, please put &quot;N/A&quot; and proceed to the next question. <span className="text-red-600">*</span></span>
                    <textarea
                      name="hostExperience"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">How would you handle an unexpected interruption or technical issue while hosting an event? <span className="text-red-600">*</span></span>
                    <textarea
                      name="hostInterruptionHandling"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">How would you manage an unresponsive or disengaged audience to keep them involved in the event? <span className="text-red-600">*</span></span>
                    <textarea
                      name="hostAudienceEngagement"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Describe a time when you had to manage nerves or unexpected situations while speaking in front of an audience. <span className="text-red-600">*</span></span>
                    <textarea
                      name="hostComposure"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>
                </div>
              )}

              {programsRole === "Host Coordinator" && (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Do you have any experience with this role? If so, please describe your relevant background. If you have no experience, please put &quot;N/A&quot; and proceed to the next question. <span className="text-red-600">*</span></span>
                    <textarea
                      name="hostCoordinatorExperience"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">How do you handle last-minute changes to scripts or event plans with the hosts? <span className="text-red-600">*</span></span>
                    <textarea
                      name="hostCoordinatorLastMinuteChanges"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Describe how you&apos;d adjust the script or timing if an unexpected issue caused a delay during the event. <span className="text-red-600">*</span></span>
                    <textarea
                      name="hostCoordinatorDelayAdjustment"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Describe your approach to creating scripts that are engaging and easy for hosts to follow. <span className="text-red-600">*</span></span>
                    <textarea
                      name="hostCoordinatorScriptApproach"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>
                </div>
              )}

              {programsRole === "Technical Coordinator" && (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Do you have any experience with this role? If so, please describe your experience with setting up and managing AV equipment or other technical requirements for events. If you have no experience, please put &quot;N/A&quot; and proceed to the next question. <span className="text-red-600">*</span></span>
                    <textarea
                      name="technicalCoordinatorExperience"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">What event management, AV equipment, or live-streaming platforms (e.g., Zoom, OBS, Facebook Live) are you most comfortable using, and to what extent have you worked with them for coordinating or managing events? <span className="text-red-600">*</span></span>
                    <textarea
                      name="technicalCoordinatorPlatforms"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">How would you handle an unexpected failure with live-streaming software or internet connectivity during a critical part of an event? <span className="text-red-600">*</span></span>
                    <textarea
                      name="technicalCoordinatorFailureHandling"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">In situations where team members have different approaches to solving a technical issue, how do you facilitate consensus and ensure the team stays on track? <span className="text-red-600">*</span></span>
                    <textarea
                      name="technicalCoordinatorConsensus"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>
                </div>
              )}
            </section>
          )}

          {operationsCommittee === "Operations Committee" && (
            <section className="mt-4 space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <h2 className="text-base font-semibold text-slate-900">Operations Committee</h2>
              <p>
                The Operations Committee ensures the smooth execution of all logistical aspects of the
                organization&apos;s events and activities. This committee oversees essential functions such as
                event setup, technical requirements, and guest management, coordinating with various teams to
                align operational support with event goals. The Operations Committee is essential in
                transforming strategic plans into well-executed events and handling the on-the-ground details
                that bring the organization&apos;s programs to life.
              </p>
              <p>
                <span className="font-semibold text-slate-900">a. Operations Managers</span>
                <br />
                Supervise the various teams within the operations committee, ensuring tasks and responsibilities
                are clearly defined and executed efficiently. Coordinate with other committees to align
                operational activities with organizational goals.
              </p>
              <p>
                <span className="font-semibold text-slate-900">b. Logistics and Resource Coordinator</span>
                <br />
                They are responsible for managing the logistical aspects of events, ensuring the smooth setup,
                transportation, and handling of equipment. They oversee the coordination of resources, manage
                the flow of materials, and ensure that all necessary items are available and in place for the
                event.
              </p>
              <p>
                <span className="font-semibold text-slate-900">c. Ushering and Guest Coordinator</span>
                <br />
                They manage the team of ushers, ensuring that guests are seated efficiently and that crowd
                control is maintained throughout the event. They are responsible for creating a welcoming
                environment for attendees, guiding them to their designated areas, and assisting with any
                seating or movement issues.
              </p>
              <p>
                <span className="font-semibold text-slate-900">d. Registration and Access Coordinators</span>
                <br />
                Handle event registration processes, including managing guest lists and ensuring proper access
                control. Oversee check-in procedures and assist with any registration-related issues.
              </p>
              <p>
                <span className="font-semibold text-slate-900">e. Media Documentation Coordinators</span>
              </p>
              <p className="ml-4">
                <span className="font-semibold text-slate-900">e.1. Photo Documentation Coordinator</span>
                <br />
                Capture visual documentation of events, including photos of key moments, attendees, and
                activities. Ensure high-quality images are taken and appropriately archived for future use.
              </p>
              <p className="ml-4">
                <span className="font-semibold text-slate-900">e.2. Video Documentation Coordinator</span>
                <br />
                Record video footage of events, including speeches, presentations, and activities. Film
                polished professional content for promotional and archival purposes.
              </p>

              <fieldset className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/70 p-4">
                <legend className="px-2 text-sm font-semibold">Which role do you want to apply for? <span className="text-red-600">*</span></legend>

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="operationsRole"
                    value="Operations Manager"
                    className="mt-1"
                    checked={operationsRole === "Operations Manager"}
                    onChange={() => handleOperationsRoleChange("Operations Manager")}
                    required
                  />
                  <span>Operations Manager (requires interview)</span>
                </label>

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="operationsRole"
                    value="Logistics and Resource Coordinator"
                    className="mt-1"
                    checked={operationsRole === "Logistics and Resource Coordinator"}
                    onChange={() => handleOperationsRoleChange("Logistics and Resource Coordinator")}
                    required
                  />
                  <span>Logistics and Resource Coordinator</span>
                </label>

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="operationsRole"
                    value="Ushering and Guest Coordinator"
                    className="mt-1"
                    checked={operationsRole === "Ushering and Guest Coordinator"}
                    onChange={() => handleOperationsRoleChange("Ushering and Guest Coordinator")}
                    required
                  />
                  <span>Ushering and Guest Coordinator</span>
                </label>

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="operationsRole"
                    value="Registration and Access Coordinator"
                    className="mt-1"
                    checked={operationsRole === "Registration and Access Coordinator"}
                    onChange={() => handleOperationsRoleChange("Registration and Access Coordinator")}
                    required
                  />
                  <span>Registration and Access Coordinator</span>
                </label>

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="operationsRole"
                    value="Media Documentation Coordinator"
                    className="mt-1"
                    checked={operationsRole === "Media Documentation Coordinator"}
                    onChange={() => handleOperationsRoleChange("Media Documentation Coordinator")}
                    required
                  />
                  <span>Media Documentation Coordinator</span>
                </label>
              </fieldset>

              {operationsRole === "Media Documentation Coordinator" && (
                <fieldset className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/70 p-4">
                  <legend className="px-2 text-sm font-semibold">What type of role in Media Documentation Coordinator do you want to apply for? <span className="text-red-600">*</span></legend>

                  <label className="flex items-start gap-3 text-sm">
                    <input
                      type="radio"
                      name="mediaDocumentationRole"
                      value="Photo Documentation Coordinator"
                      className="mt-1"
                      checked={mediaDocumentationRole === "Photo Documentation Coordinator"}
                      onChange={() => setMediaDocumentationRole("Photo Documentation Coordinator")}
                      required
                    />
                    <span>Photo Documentation Coordinator</span>
                  </label>

                  <label className="flex items-start gap-3 text-sm">
                    <input
                      type="radio"
                      name="mediaDocumentationRole"
                      value="Video Documentation Coordinator"
                      className="mt-1"
                      checked={mediaDocumentationRole === "Video Documentation Coordinator"}
                      onChange={() => setMediaDocumentationRole("Video Documentation Coordinator")}
                      required
                    />
                    <span>Video Documentation Coordinator</span>
                  </label>
                </fieldset>
              )}

              {operationsRole === "Operations Manager" && (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Do you have any experience with this role? If so, please describe your relevant background. If you have no experience, please put &quot;N/A&quot; and proceed to the next question. <span className="text-red-600">*</span></span>
                    <textarea
                      name="operationsManagerExperience"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Operations Managers often need to communicate and coordinate with different committees. How would you ensure clear and effective communication across teams? <span className="text-red-600">*</span></span>
                    <textarea
                      name="operationsManagerCommunication"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Describe a situation where you faced a challenge in a project or task. How did you handle it, and what was the outcome? <span className="text-red-600">*</span></span>
                    <textarea
                      name="operationsManagerChallenge"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">In your opinion, what is the biggest challenge an Operations Manager might face in a student organization, and how would you address it? <span className="text-red-600">*</span></span>
                    <textarea
                      name="operationsManagerBiggestChallenge"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>
                </div>
              )}

              {operationsRole === "Logistics and Resource Coordinator" && (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Do you have any experience with this role? If so, please describe your relevant background. If you have no experience, please put &quot;N/A&quot; and proceed to the next question. <span className="text-red-600">*</span></span>
                    <textarea
                      name="logisticsCoordinatorExperience"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">If you were tasked with overseeing the setup of an event, what would your initial checklist look like? What items or tasks would you prioritize? <span className="text-red-600">*</span></span>
                    <textarea
                      name="logisticsCoordinatorChecklist"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">How would you go about planning the transportation and setup of equipment for an event? What factors would you consider to ensure everything arrives safely and on time? <span className="text-red-600">*</span></span>
                    <textarea
                      name="logisticsCoordinatorTransportPlanning"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">What would you do if you noticed that the event flow was being disrupted by an unforeseen issue? How would you quickly adjust to keep things running smoothly? <span className="text-red-600">*</span></span>
                    <textarea
                      name="logisticsCoordinatorIssueHandling"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>
                </div>
              )}

              {operationsRole === "Ushering and Guest Coordinator" && (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Do you have any experience with this role? If so, please describe your relevant background. If you have no experience, please put &quot;N/A&quot; and proceed to the next question. <span className="text-red-600">*</span></span>
                    <textarea
                      name="usheringCoordinatorExperience"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">In your view, what does it mean to create a welcoming environment for event attendees? What steps would you take to make guests feel comfortable? <span className="text-red-600">*</span></span>
                    <textarea
                      name="usheringCoordinatorWelcomingEnvironment"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">What would you do if a guest had a specific question or request that you couldn&apos;t answer right away? <span className="text-red-600">*</span></span>
                    <textarea
                      name="usheringCoordinatorQuestionHandling"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Sometimes guests may have complaints or concerns. How would you communicate with them to help resolve their issues and keep a positive environment? <span className="text-red-600">*</span></span>
                    <textarea
                      name="usheringCoordinatorComplaintHandling"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>
                </div>
              )}

              {operationsRole === "Registration and Access Coordinator" && (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Do you have any experience with this role? If so, please describe your relevant background. If you have no experience, please put &quot;N/A&quot; and proceed to the next question. <span className="text-red-600">*</span></span>
                    <textarea
                      name="registrationCoordinatorExperience"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Describe a time when you managed a list or kept track of people (like an attendance list or guest list). How did you ensure accuracy? <span className="text-red-600">*</span></span>
                    <textarea
                      name="registrationCoordinatorListManagement"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">If a guest&apos;s name is not on the registration list but they insist they&apos;ve registered, how would you handle this situation? <span className="text-red-600">*</span></span>
                    <textarea
                      name="registrationCoordinatorGuestIssueHandling"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">How would you approach organizing and preparing a guest list before an event? What steps would you take to make sure it&apos;s complete and up to date? <span className="text-red-600">*</span></span>
                    <textarea
                      name="registrationCoordinatorGuestListPreparation"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>
                </div>
              )}

              {mediaDocumentationRole === "Photo Documentation Coordinator" && (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Do you have any experience with this role? If so, please describe your relevant background. If you have no experience, please put &quot;N/A&quot; and proceed to the next question. <span className="text-red-600">*</span></span>
                    <textarea
                      name="photoDocumentationExperience"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Do you have your own camera or video documentation equipment that you&apos;d be comfortable using for event documentation if you&apos;re selected for this role? <span className="text-red-600">*</span></span>
                    <textarea
                      name="photoDocumentationEquipment"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Describe a time when you had to capture an important moment quickly. How did you make sure you didn&apos;t miss it? <span className="text-red-600">*</span></span>
                    <textarea
                      name="photoDocumentationQuickCapture"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">How do you ensure that the photos you capture are of high quality? What factors do you consider before taking and selecting images? <span className="text-red-600">*</span></span>
                    <textarea
                      name="photoDocumentationQuality"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Are you flexible to assist with Video Documentation tasks when needed, in addition to your role as a Photo Documentation Coordinator? <span className="text-red-600">*</span></span>
                    <textarea
                      name="photoDocumentationFlexibility"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>
                </div>
              )}

              {mediaDocumentationRole === "Video Documentation Coordinator" && (
                <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Do you have any experience with this role? If so, please describe your relevant background. If you have no experience, please put &quot;N/A&quot; and proceed to the next question. <span className="text-red-600">*</span></span>
                    <textarea
                      name="videoDocumentationExperience"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Do you have your own camera or video documentation equipment that you&apos;d be comfortable using for event documentation if you&apos;re selected for this role? <span className="text-red-600">*</span></span>
                    <textarea
                      name="videoDocumentationEquipment"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">When filming an event, how do you prioritize what to record to ensure all essential moments are captured? <span className="text-red-600">*</span></span>
                    <textarea
                      name="videoDocumentationPrioritization"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">How do you prepare in advance for recording an event? What steps would you take to ensure you&apos;re ready for various scenarios? <span className="text-red-600">*</span></span>
                    <textarea
                      name="videoDocumentationPreparation"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="font-medium">Are you flexible to assist with Photo Documentation tasks when needed, in addition to your role as a Video Documentation Coordinator? <span className="text-red-600">*</span></span>
                    <textarea
                      name="videoDocumentationFlexibility"
                      className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                      required
                    />
                  </label>
                </div>
              )}
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

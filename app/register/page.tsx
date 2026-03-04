"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^09\d{9}$/, "Phone number must be in the format 09xxxxxxxxx"),
  courseYearSection: z
    .string()
    .trim()
    .regex(/^(BS|BA|AB)/i, "Course, year, and section must start with BS, BA, or AB"),
  membershipType: z.string().trim().min(1, "Membership type is required"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormValues, string>>>({});

  const validateField = (field: keyof RegisterFormValues, value: string) => {
    const result = registerSchema.shape[field].safeParse(value);

    setErrors((previous) => ({
      ...previous,
      [field]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  };

  const handleFieldBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = event.currentTarget.name as keyof RegisterFormValues;
    validateField(field, event.currentTarget.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    const values = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      courseYearSection: String(formData.get("courseYearSection") ?? ""),
      membershipType: String(formData.get("membershipType") ?? ""),
    };

    const result = registerSchema.safeParse(values);

    if (!result.success) {
      event.preventDefault();
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        firstName: fieldErrors.firstName?.[0],
        lastName: fieldErrors.lastName?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        courseYearSection: fieldErrors.courseYearSection?.[0],
        membershipType: fieldErrors.membershipType?.[0],
      });
      return;
    }

    setErrors({});
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 px-4 py-6 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-blue-100 sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Membership Registration Form</h1>
        <p className="mt-2 text-sm text-slate-600">
          Please fill in the required details below.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-medium">First Name <span className="text-red-600">*</span></span>
              <input
                type="text"
                name="firstName"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                onBlur={handleFieldBlur}
                required
              />
              {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
            </label>

            <label className="space-y-2 text-sm">
              <span className="font-medium">Last Name <span className="text-red-600">*</span></span>
              <input
                type="text"
                name="lastName"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                onBlur={handleFieldBlur}
                required
              />
              {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
            </label>

            <label className="space-y-2 text-sm sm:col-span-2">
              <span className="font-medium">Email Address <span className="text-red-600">*</span></span>
              <input
                type="email"
                name="email"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                onBlur={handleFieldBlur}
                required
              />
              {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
            </label>

            <label className="space-y-2 text-sm sm:col-span-2">
              <span className="font-medium">Phone Number <span className="text-red-600">*</span></span>
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
                onBlur={handleFieldBlur}
                required
              />
              {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
            </label>

            <label className="space-y-2 text-sm sm:col-span-2">
              <span className="font-medium">Course, Year, and Section <span className="text-red-600">*</span></span>
              <input
                type="text"
                name="courseYearSection"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                placeholder="e.g. BSCpE 2-5"
                onBlur={handleFieldBlur}
                required
              />
              {errors.courseYearSection && <p className="text-xs text-red-600">{errors.courseYearSection}</p>}
            </label>

            <label className="space-y-2 text-sm sm:col-span-2">
              <span className="font-medium">Membership Type <span className="text-red-600">*</span></span>
              <select
                name="membershipType"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
                required
                defaultValue=""
                onBlur={handleFieldBlur}
              >
                <option value="" disabled>
                  Select membership type
                </option>
                <option value="executive">Executive</option>
                <option value="lead">Lead</option>
                <option value="member">Member</option>
              </select>
              {errors.membershipType && <p className="text-xs text-red-600">{errors.membershipType}</p>}
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

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useWizardStore } from "../store/use-wizard-store";
import { ArrowRight, Phone, Mail, User } from "lucide-react";

// --- Validation Schema ---
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(8, "Phone number must be valid (at least 8 digits)"),
  email: z.string().email("Please enter a valid email address"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function StepContact() {
  const { contact, setContact, setStep } = useWizardStore();

  // Initialize Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact, // Pre-fill with stored data
  });

  // Update form if store changes (hydration fix)
  useEffect(() => {
    setValue("name", contact.name);
    setValue("phone", contact.phone);
    setValue("email", contact.email);
  }, [contact, setValue]);

  // Handle Form Submission
  const onSubmit = (data: ContactFormValues) => {
    setContact(data); // Save to Store
    setStep(2);       // Move to Next Step
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Let's start with the basics</h2>
        <p className="text-gray-500">We need this to confirm your booking via WhatsApp.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              {...register("name")}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
              placeholder="e.g. Mahmoud Mansouri"
            />
          </div>
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone Number (WhatsApp)</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              {...register("phone")}
              type="tel"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
              placeholder="e.g. 50 123 456"
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
              placeholder="e.g. mahmoud@example.com"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-cyan-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition-all hover:scale-[1.02] hover:bg-cyan-700 hover:shadow-xl"
        >
          Continue to Property Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}
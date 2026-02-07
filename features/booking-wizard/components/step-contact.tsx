"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useWizardStore } from "../store/use-wizard-store";
import { ArrowRight, Phone, Mail, User } from "lucide-react";

// --- Validation Schema (France Context) ---
const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  // Regex for French numbers (starts with 0, followed by 9 digits, allowing optional spaces/dots)
  // Accepts: 0612345678, 06 12 34 56 78, 07.12.34.56.78
  phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Numéro invalide (ex: 06 12 34 56 78)"),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
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
    defaultValues: contact,
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
        <h2 className="text-2xl font-bold text-gray-900">Vos coordonnées</h2>
        <p className="text-gray-500">Nous vous appellerons à ce numéro pour établir le devis.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nom et Prénom</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              {...register("name")}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
              placeholder="ex: Thomas Martin"
            />
          </div>
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Phone Field (French Format) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Numéro de mobile</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              {...register("phone")}
              type="tel"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
              placeholder="ex: 06 12 34 56 78"
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Adresse E-mail</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
              placeholder="ex: thomas@exemple.fr"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-cyan-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition-all hover:scale-[1.02] hover:bg-cyan-700 hover:shadow-xl"
        >
          Suivant
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}
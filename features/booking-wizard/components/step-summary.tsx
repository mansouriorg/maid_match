"use client";

import { useWizardStore } from "../store/use-wizard-store";
import { ArrowLeft, CheckCircle2, MapPin, Calendar, Phone, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StepSummary() {
  const { contact, property, schedule, setStep, reset } = useWizardStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper maps for translation
  const typeLabels: Record<string, string> = {
    apartment: "Appartement",
    villa: "Villa",
    studio: "Studio",
  };

  const frequencyLabels: Record<string, string> = {
    "one-time": "Une seule fois",
    "weekly": "Hebdomadaire",
    "bi-weekly": "Bi-mensuel",
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    // Simulate API Call (Wait 1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real app, you would POST data to your backend here
    // const payload = { contact, property, schedule };
    // await fetch('/api/request', { method: 'POST', body: JSON.stringify(payload) });

    console.log("Booking Request Sent!", { contact, property, schedule });
    
    // Clear store and redirect to success page
    reset();
    router.push("/success");
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
      
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Récapitulatif</h2>
        <p className="text-gray-500">Veuillez vérifier vos informations. Nous vous contacterons pour finaliser le prix.</p>
      </div>

      {/* --- Card 1: Service Details --- */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 space-y-4">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-gray-900 capitalize">
                    Ménage {typeLabels[property.type] || property.type}
                </h3>
                <p className="text-sm text-gray-500">
                    {property.rooms} Pièces, {property.bathrooms} Salles de bain
                </p>
            </div>
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700 uppercase">
                {frequencyLabels[schedule.frequency] || schedule.frequency}
            </span>
        </div>
        
        <div className="h-px bg-gray-200" />
        
        <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="h-4 w-4 text-cyan-600" />
                <span className="capitalize">
                  {schedule.date 
                    ? schedule.date.toLocaleDateString("fr-FR", { weekday: 'long', month: 'long', day: 'numeric' })
                    : "Date non sélectionnée"
                  } 
                  {schedule.timeSlot && ` — ${schedule.timeSlot}`}
                </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-4 w-4 text-cyan-600" />
                <span className="truncate max-w-[250px]">
                    {property.address || "Adresse non fournie"}
                </span>
            </div>
             <div className="flex items-center gap-3 text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                <span>Contact : {contact.name} ({contact.phone})</span>
            </div>
        </div>
      </div>

      {/* --- Card 2: Quote Info (Replaces Price Breakdown) --- */}
      <div className="rounded-2xl border border-cyan-100 bg-cyan-50/50 p-5 flex gap-4 items-start">
         <div className="mt-1 flex-shrink-0 rounded-full bg-cyan-100 p-2 text-cyan-600">
            <Phone className="h-5 w-5" />
         </div>
         <div className="space-y-1">
            <h4 className="font-bold text-cyan-900">Dernière étape : Devis par téléphone</h4>
            <p className="text-sm text-cyan-800 leading-relaxed">
                Chaque logement étant unique, nous ne calculons pas le prix automatiquement. 
                Notre équipe vous appellera au <strong>{contact.phone}</strong> très rapidement pour discuter de vos besoins et vous donner le meilleur tarif.
            </p>
         </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={() => setStep(3)}
          disabled={isSubmitting}
          className="flex flex-1 items-center justify-center rounded-full border border-gray-200 py-3.5 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </button>
        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="flex flex-[2] items-center justify-center rounded-full bg-cyan-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition-all hover:bg-cyan-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              Envoyer la demande
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
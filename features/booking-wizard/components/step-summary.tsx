"use client";

import { useWizardStore } from "../store/use-wizard-store";
import { api } from "@/lib/api"; 
import { ArrowLeft, CheckCircle2, MapPin, Calendar, Phone, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StepSummary() {
  const { contact, property, schedule, setStep, reset } = useWizardStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- HELPER MAPS ---
  const typeLabels: Record<string, string> = {
    apartment: "Appartement",
    villa: "Maison",
    studio: "Studio",
  };

  const frequencyLabels: Record<string, string> = {
    "one-time": "Une seule fois",
    "weekly": "Hebdomadaire",
    "bi-weekly": "Bi-mensuel",
  };

  const cleaningTypeLabels: Record<string, string> = {
    standard: "Nettoyage Classique",
    deep: "Grand Ménage (Deep Clean)",
  };

  const extraLabels: Record<string, string> = {
    ironing: "Repassage",
    pets: "Animaux sur place",
    keys: "Clés au gardien",
  };

  // --- LOGIC FOR DATE DISPLAY ---
  const renderDate = () => {
    if (!schedule.startDate) return "Date non sélectionnée";
    
    // We safely create a date object because of the check above
    const start = new Date(schedule.startDate).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long' });
    
    if (schedule.endDate) {
        const end = new Date(schedule.endDate).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long' });
        return `Du ${start} au ${end}`;
    }
    return new Date(schedule.startDate).toLocaleDateString("fr-FR", { weekday: 'long', day: 'numeric', month: 'long' });
  };

  // --- API SUBMISSION LOGIC ---
  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);

    // FIX: Explicitly check if startDate is null before using it
    if (!schedule.startDate) {
        setError("Veuillez sélectionner une date de début.");
        setIsSubmitting(false);
        return;
    }

    try {
      // 1. Merge Date and Time
      // TypeScript now knows schedule.startDate is not null here
      const combinedDate = new Date(schedule.startDate);
      
      // Extract the hour (e.g. "14:00" -> 14)
      const startHour = parseInt(schedule.startTime.split(':')[0]); 
      combinedDate.setHours(startHour, 0, 0, 0);

      // 2. Calculate Duration
      const duration = Math.max(1, parseInt(schedule.endTime) - parseInt(schedule.startTime));

      // 3. Construct Payload
      const payload = {
        customerName: contact.name,
        customerEmail: contact.email,
        customerPhone: contact.phone,
        
        address: property.address,
        propertyType: property.type,
        rooms: property.rooms,
        bathrooms: property.bathrooms,
        cleaningType: property.cleaningType,
        hasSupplies: property.hasSupplies,
        extras: property.extras || [],
        
        startTime: combinedDate.toISOString(),
        durationHours: duration,
        frequency: schedule.frequency,
        
        status: "REQUESTED"
      };

      // 4. Send Request
      await api.post("/service-requests", payload);

      // 5. Success
      console.log("Booking Success");
      reset();
      router.push("/success");

    } catch (err: any) {
      console.error("Submission error:", err);
      setError(
        err.response?.data?.message || 
        "Une erreur est survenue lors de l'envoi. Veuillez vérifier votre connexion."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
      
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-slate-900">Récapitulatif</h2>
        <p className="text-slate-500">Vérifiez les détails avant l'envoi. Nous vous appellerons pour le devis.</p>
      </div>

      {/* ERROR BANNER */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 animate-in fade-in zoom-in-95">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="font-medium">{error}</span>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-5">
        
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    {cleaningTypeLabels[property.cleaningType] || "Nettoyage"} 
                    {property.cleaningType === 'deep' && <Sparkles className="h-4 w-4 text-indigo-500" />}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                    {typeLabels[property.type]} • {property.rooms} Pièces • {property.bathrooms} SDB
                </p>
            </div>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 uppercase tracking-wide">
                {frequencyLabels[schedule.frequency]}
            </span>
        </div>
        
        <div className="h-px bg-slate-100" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className={`rounded-lg p-3 text-sm font-medium border ${!property.hasSupplies ? 'bg-orange-50 border-orange-100 text-orange-800' : 'bg-emerald-50 border-emerald-100 text-emerald-800'}`}>
                {property.hasSupplies ? (
                    <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4"/> Matériel fourni par le client</span>
                ) : (
                    <span className="flex items-center gap-2"><AlertCircle className="h-4 w-4"/> Apporter produits de nettoyage</span>
                )}
            </div>

            {property.extras && property.extras.length > 0 && (
                 <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-sm text-slate-700 flex flex-wrap gap-2 items-center">
                    <span className="font-bold text-xs text-slate-400 uppercase mr-1">Options:</span>
                    {property.extras.map(extra => (
                        <span key={extra} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white border border-slate-200 text-slate-700">
                            {extraLabels[extra] || extra}
                        </span>
                    ))}
                 </div>
            )}
        </div>
        
        <div className="h-px bg-slate-100" />
        
        <div className="space-y-3 text-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <div className="flex items-center gap-3 text-slate-700">
                    <Calendar className="h-4 w-4 text-teal-600 flex-shrink-0" />
                    <span className="capitalize font-semibold">
                      {renderDate()}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                    <span className="text-slate-300 hidden sm:inline">|</span>
                    <span className="font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                        {schedule.startTime} - {schedule.endTime}
                    </span>
                </div>
            </div>
            
            <div className="flex items-center gap-3 text-slate-700">
                <MapPin className="h-4 w-4 text-teal-600 flex-shrink-0" />
                <span className="truncate max-w-[250px]">
                    {property.address || "Adresse non fournie"}
                </span>
            </div>
             <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0" />
                <span>Contact : <span className="font-semibold">{contact.name}</span> ({contact.phone})</span>
            </div>
        </div>
      </div>

      <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5 flex gap-4 items-start">
         <div className="mt-1 flex-shrink-0 rounded-full bg-teal-100 p-2 text-teal-600">
            <Phone className="h-5 w-5" />
         </div>
         <div className="space-y-1">
            <h4 className="font-bold text-teal-900">Dernière étape : Devis par téléphone</h4>
            <p className="text-sm text-teal-800 leading-relaxed">
                Notre équipe vous appellera au <strong>{contact.phone}</strong> très rapidement pour valider les dates et le tarif.
            </p>
         </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={() => setStep(3)}
          disabled={isSubmitting}
          className="flex flex-1 items-center justify-center rounded-full border border-slate-200 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </button>
        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="group flex flex-[2] items-center justify-center rounded-full bg-teal-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-200 transition-all hover:bg-teal-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              Envoyer la demande
              <CheckCircle2 className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
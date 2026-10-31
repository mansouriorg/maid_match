"use client";

import { parisWallTimeToIso, ymdOf } from "../../../lib/time";

import { useWizardStore } from "../store/use-wizard-store";
import { api } from "@/lib/api"; 
import { ArrowLeft, CheckCircle2, MapPin, Calendar, Loader2, Sparkles, AlertCircle, Receipt } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function StepSummary() {
  // NOUVEAU : On récupère getDurationHours du store
  const { contact, property, schedule, setStep, reset, getDurationHours } = useWizardStore();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // The price estimate from the API, with the choices it was computed for
  const [quote, setQuote] = useState<{ key: string; total: number | null } | null>(null);

  // --- HELPER MAPS ---
  const typeLabels: Record<string, string> = {
    apartment: "Appartement",
    villa: "Maison",
    studio: "Studio",
  };

  const frequencyLabels: Record<string, string> = {
    "one-time": "Une seule fois",
    "weekly": "Hebdomadaire",
    "bi-weekly": "Toutes les 2 semaines",
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

  // --- PRICE ESTIMATE FROM THE API ---
  // The API computes it with the same formula and hourly rate as the price
  // saved with the booking, so the two always match.
  const durationForQuote = getDurationHours();
  const extrasKey = (property.extras ?? []).join(",");
  const quoteKey = [property.cleaningType, durationForQuote, property.hasSupplies, extrasKey].join("|");
  useEffect(() => {
    let active = true;
    api
      .post("/service-requests/quote", {
        cleaningType: property.cleaningType,
        durationHours: durationForQuote,
        hasSupplies: property.hasSupplies,
        extras: extrasKey === "" ? [] : extrasKey.split(","),
      })
      .then((res) => {
        if (active) {
          const total = res.data?.totalPrice;
          setQuote({ key: quoteKey, total: typeof total === "number" ? total : null });
        }
      })
      .catch(() => {
        // The API cannot be reached: the price is confirmed later by the team.
        if (active) {
          setQuote({ key: quoteKey, total: null });
        }
      });
    return () => {
      active = false;
    };
  }, [quoteKey, property.cleaningType, property.hasSupplies, durationForQuote, extrasKey]);
  const isLoadingPrice = quote === null || quote.key !== quoteKey;
  const estimate = quote !== null && quote.key === quoteKey ? quote.total : null;

  // --- LOGIC FOR DATE DISPLAY ---
  const renderDate = () => {
    if (!schedule.startDate) return "Date non sélectionnée";
    
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

    if (!schedule.startDate) {
        setError("Veuillez sélectionner une date de début.");
        setIsSubmitting(false);
        return;
    }

    try {
      // The day and the hour are Paris time, wherever the visitor is (lib/time.ts).
      const combinedDate = new Date(
        parisWallTimeToIso(ymdOf(schedule.startDate), schedule.startTime),
      );

      // On utilise maintenant notre fonction du store plutôt que le calcul manuel
      const duration = getDurationHours();

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
        // The last day the customer is available (sent only when a period was chosen).
        endDate: schedule.endDate
          ? parisWallTimeToIso(ymdOf(schedule.endDate), schedule.startTime)
          : undefined,
        durationHours: duration,
        frequency: schedule.frequency,
        
        status: "REQUESTED"
      };

      await api.post("/service-requests", payload);

      reset();
      router.push("/success");

    } catch (caught) {
      const err = caught as {
        message?: string;
        response?: { status?: number; data?: { message?: string } };
      };
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
        <p className="text-slate-500">Vérifiez les détails et l&rsquo;estimation du tarif avant de valider.</p>
      </div>

      {/* ERROR BANNER */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 animate-in fade-in zoom-in-95">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="font-medium">{error}</span>
        </div>
      )}

      {/* DÉTAILS DE LA PRESTATION */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-5">
        
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    {cleaningTypeLabels[property.cleaningType] || "Nettoyage"} 
                    {property.cleaningType === 'deep' && <Sparkles className="h-4 w-4 text-teal-600" />}
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
                    <span className="font-bold text-xs text-slate-500 uppercase mr-1">Options:</span>
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
                    <Calendar className="h-4 w-4 text-teal-700 flex-shrink-0" />
                    <span className="capitalize font-semibold">
                      {renderDate()}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                    <span className="text-slate-300 hidden sm:inline">|</span>
                    <span className="font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                        {schedule.startTime} - {schedule.endTime} ({getDurationHours()}h)
                    </span>
                </div>
            </div>
            
            <div className="flex items-center gap-3 text-slate-700">
                <MapPin className="h-4 w-4 text-teal-700 flex-shrink-0" />
                <span className="truncate max-w-[250px]">
                    {property.address || "Adresse non fournie"}
                </span>
            </div>
        </div>
      </div>

      {/* NOUVEAU : CARTE DU DEVIS DYNAMIQUE */}
      <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
         <div className="flex items-center gap-4 w-full sm:w-auto">
             <div className="flex-shrink-0 rounded-full bg-teal-100 p-3 text-teal-700">
                <Receipt className="h-6 w-6" />
             </div>
             <div>
                <h4 className="font-bold text-teal-900 text-lg">Estimation du devis</h4>
                <p className="text-sm text-teal-800">
                    Calculé selon le tarif actuel de l&rsquo;entreprise
                </p>
             </div>
         </div>
         
         <div className="bg-white px-6 py-3 rounded-xl border border-teal-100 shadow-sm w-full sm:w-auto text-center sm:text-right">
             {isLoadingPrice ? (
                 <Loader2 className="h-6 w-6 animate-spin text-teal-700 mx-auto sm:ml-auto sm:mr-0" />
             ) : (
                 <div className="text-3xl font-extrabold text-teal-700">
                    {estimate === null ? <span className="text-base font-semibold">Prix confirm&eacute; par l&rsquo;&eacute;quipe</span> : <>{estimate} <span className="text-lg font-bold text-teal-700">&euro;</span></>}
                 </div>
             )}
         </div>
      </div>

      {/* BOUTONS D'ACTION */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={() => setStep(3)}
          disabled={isSubmitting}
          className="flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </button>
        <button
          onClick={handleConfirm}
          disabled={isSubmitting || isLoadingPrice}
          className="group flex flex-[2] items-center justify-center rounded-full bg-teal-700 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-200 transition-all hover:bg-teal-800 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              Confirmer la réservation
              <CheckCircle2 className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
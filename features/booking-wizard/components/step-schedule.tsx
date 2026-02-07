"use client";

import { useWizardStore } from "../store/use-wizard-store";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

export default function StepSchedule() {
  const { schedule, setSchedule, setStep } = useWizardStore();

  // Generate next 5 days for the calendar
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i + 1); // Start from tomorrow
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  
  // Broader time slots translated to French
  const timeSlots = [
    "Matin (08h - 12h)", 
    "Après-midi (12h - 16h)", 
    "Soir (16h - 20h)"
  ];

  const handleNext = () => {
    if (!schedule.date) {
      alert("Veuillez sélectionner une date.");
      return;
    }
    setStep(4);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Quand devons-nous passer ?</h2>
        <p className="text-gray-500">Choisissez une date et votre créneau horaire préféré.</p>
      </div>

      {/* --- Frequency Selection (Clean Version - No Discount Badges) --- */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { id: "one-time", label: "Une seule fois" },
          { id: "weekly", label: "Hebdomadaire" },
          { id: "bi-weekly", label: "Bi-mensuel" },
        ].map((option) => {
          const isSelected = schedule.frequency === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setSchedule({ ...schedule, frequency: option.id as any })}
              className={`
                flex items-center justify-center rounded-xl border p-4 transition-all
                ${isSelected 
                  ? "border-cyan-500 bg-cyan-50 text-cyan-700 ring-2 ring-cyan-500" 
                  : "border-gray-200 bg-white text-gray-600 hover:border-cyan-200"
                }
              `}
            >
              <span className="font-bold">{option.label}</span>
            </button>
          );
        })}
      </div>

      <div className="h-px bg-gray-100" />

      {/* --- Date Selection --- */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Calendar className="h-4 w-4 text-cyan-600" />
          Choisir une date
        </label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {dates.map((date) => {
            const isSelected = schedule.date?.toDateString() === date.toDateString();
            return (
              <button
                key={date.toISOString()}
                onClick={() => setSchedule({ ...schedule, date: date })}
                className={`
                  flex flex-col items-center justify-center rounded-xl border py-3 transition-all
                  ${isSelected
                    ? "border-cyan-500 bg-cyan-600 text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-600 hover:border-cyan-300 hover:bg-cyan-50"
                  }
                `}
              >
                <span className="text-xs font-medium opacity-80 capitalize">
                  {/* Changed to French Locale */}
                  {date.toLocaleDateString("fr-FR", { weekday: "short" })}
                </span>
                <span className="text-lg font-bold">
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- Time Selection --- */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Clock className="h-4 w-4 text-cyan-600" />
          Heure préférée
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {timeSlots.map((time) => {
            const isSelected = schedule.timeSlot === time;
            return (
              <button
                key={time}
                onClick={() => setSchedule({ ...schedule, timeSlot: time })}
                className={`
                  rounded-lg border py-3 text-sm font-medium transition-all
                  ${isSelected
                    ? "border-cyan-500 bg-cyan-100 text-cyan-900 ring-1 ring-cyan-500"
                    : "border-gray-200 bg-white text-gray-600 hover:border-cyan-300"
                  }
                `}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- Navigation --- */}
      <div className="flex gap-4 pt-6">
        <button
          onClick={() => setStep(2)}
          className="flex flex-1 items-center justify-center rounded-full border border-gray-200 py-3.5 text-sm font-bold text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </button>
        <button
          onClick={handleNext}
          className="group flex flex-[2] items-center justify-center rounded-full bg-cyan-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition-all hover:bg-cyan-700 hover:shadow-xl"
        >
          Vérifier la demande
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
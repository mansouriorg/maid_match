"use client";

import { useWizardStore } from "../store/use-wizard-store";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { useState } from "react";

export default function StepSchedule() {
  const { schedule, setSchedule, setStep } = useWizardStore();
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i + 1);
      date.setHours(0, 0, 0, 0); // Reset time for clean comparison
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  
  // Generate hours from 07:00 to 22:00
  const hours = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 7; 
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // --- Date Range Logic ---
  const handleDateClick = (clickedDate: Date) => {
    setScheduleError(null);
    const start = schedule.startDate ? new Date(schedule.startDate) : null;
    const end = schedule.endDate ? new Date(schedule.endDate) : null;

    // Case 1: Nothing selected OR Range already full (Reset)
    if (!start || (start && end)) {
      setSchedule({ ...schedule, startDate: clickedDate, endDate: null });
      return;
    }

    // Case 2: Clicked after start -> Set End
    if (clickedDate > start) {
      setSchedule({ ...schedule, endDate: clickedDate });
      return;
    }

    // Case 3: Clicked before start -> New Start
    setSchedule({ ...schedule, startDate: clickedDate, endDate: null });
  };

  const getDateStatus = (date: Date) => {
    const time = date.getTime();
    const start = schedule.startDate ? new Date(schedule.startDate).setHours(0,0,0,0) : null;
    const end = schedule.endDate ? new Date(schedule.endDate).setHours(0,0,0,0) : null;

    if (time === start || time === end) return "selected";
    if (start && end && time > start && time < end) return "in-range";
    return "default";
  };

  const handleNext = () => {
    // 1. Date Validation
    if (!schedule.startDate) {
      setScheduleError("Veuillez sélectionner au moins une date de début.");
      return;
    }

    // 2. Time Validation (End must be after Start)
    const startHour = parseInt(schedule.startTime.split(':')[0]);
    const endHour = parseInt(schedule.endTime.split(':')[0]);

    if (endHour <= startHour) {
        setScheduleError("L'heure de fin doit être après l'heure de début.");
        return;
    }

    setStep(4);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
      
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Vos disponibilités</h2>
        <p className="text-slate-500">Sélectionnez vos dates et horaires précis.</p>
      </div>

      {/* --- Frequency --- */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { id: "one-time", label: "Une seule fois" },
          { id: "weekly", label: "Hebdomadaire" },
          { id: "bi-weekly", label: "Toutes les 2 semaines" },
        ].map((option) => {
          const isSelected = schedule.frequency === option.id;
          return (
            <button
              key={option.id}
              aria-pressed={schedule.frequency === option.id}
              onClick={() => setSchedule({ ...schedule, frequency: option.id as typeof schedule.frequency })}
              className={`
                flex items-center justify-center rounded-xl border p-4 transition-all
                ${isSelected 
                  ? "border-teal-600 bg-teal-50 text-teal-800 ring-2 ring-teal-600" 
                  : "border-slate-200 bg-white text-slate-600 hover:border-teal-200"
                }
              `}
            >
              <span className="font-bold">{option.label}</span>
            </button>
          );
        })}
      </div>

      <div className="h-px bg-slate-100" />

      {/* --- Date Selection (Range) --- */}
      <div className="space-y-3">
        <label className="flex items-center justify-between text-sm font-medium text-slate-700">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-teal-700" />
            Sélectionnez les dates
          </div>
          <span className="text-xs text-teal-700 bg-teal-50 px-2 py-1 rounded-full">
            {schedule.endDate ? "Période définie" : (schedule.startDate ? "Sélectionnez la fin" : "Sélectionnez une date")}
          </span>
        </label>
        
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7">
          {dates.map((date) => {
            const status = getDateStatus(date);
            
            let className = "border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:bg-teal-50"; 
            if (status === "selected") {
              className = "border-teal-600 bg-teal-700 text-white shadow-md ring-2 ring-teal-200";
            } else if (status === "in-range") {
              className = "border-teal-200 bg-teal-50 text-teal-800";
            }

            return (
              <button
                key={date.toISOString()}
                aria-pressed={getDateStatus(date) === "selected"}
                aria-label={date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                onClick={() => handleDateClick(date)}
                className={`
                  flex flex-col items-center justify-center rounded-xl border py-3 transition-all
                  ${className}
                `}
              >
                <span className={`text-xs font-medium capitalize ${status === 'selected' ? 'opacity-100' : 'opacity-60'}`}>
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

      {/* --- Time Selection (Precise Hours) --- */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Clock className="h-4 w-4 text-teal-700" />
          Créneau horaire
        </label>
        
        <div className="flex items-center gap-4">
            {/* Start Time */}
            <div className="flex-1 space-y-1">
                <span className="text-xs text-slate-500 font-bold uppercase">De</span>
                <div className="relative">
                    <select
                        aria-label={"Heure de d\u00e9but"}
                        value={schedule.startTime}
                        onChange={(e) => {
                          setScheduleError(null);
                          setSchedule({ ...schedule, startTime: e.target.value });
                        }}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 font-bold text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    >
                        {hours.map((h) => (
                            <option key={`start-${h}`} value={h}>{h}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="pt-5 text-slate-500">
                <ArrowRight className="h-5 w-5" />
            </div>

            {/* End Time */}
            <div className="flex-1 space-y-1">
                <span className="text-xs text-slate-500 font-bold uppercase">À</span>
                <div className="relative">
                    <select
                        aria-label={"Heure de fin"}
                        value={schedule.endTime}
                        onChange={(e) => {
                          setScheduleError(null);
                          setSchedule({ ...schedule, endTime: e.target.value });
                        }}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 font-bold text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    >
                        {hours.map((h) => (
                            <option key={`end-${h}`} value={h}>{h}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <p className="text-xs text-slate-500">
           Durée estimée : {Math.max(0, parseInt(schedule.endTime) - parseInt(schedule.startTime))} heures
        </p>
      </div>

      {scheduleError && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {scheduleError}
        </p>
      )}

      {/* --- Navigation --- */}
      <div className="flex gap-4 pt-6">
        <button
          onClick={() => setStep(2)}
          className="flex flex-1 items-center justify-center rounded-full border border-slate-200 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </button>
        <button
          onClick={handleNext}
          className="group flex flex-[2] items-center justify-center rounded-full bg-teal-700 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-200 transition-all hover:bg-teal-800 hover:shadow-xl"
        >
          Vérifier la demande
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
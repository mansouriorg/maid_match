"use client";

import { useWizardStore } from "../store/use-wizard-store";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

export default function StepSchedule() {
  const { schedule, setSchedule, setStep } = useWizardStore();

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
      alert("Veuillez sélectionner au moins une date de début.");
      return;
    }

    // 2. Time Validation (End must be after Start)
    const startHour = parseInt(schedule.startTime.split(':')[0]);
    const endHour = parseInt(schedule.endTime.split(':')[0]);

    if (endHour <= startHour) {
        alert("L'heure de fin doit être après l'heure de début.");
        return;
    }

    setStep(4);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Vos disponibilités</h2>
        <p className="text-gray-500">Sélectionnez vos dates et horaires précis.</p>
      </div>

      {/* --- Frequency --- */}
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

      {/* --- Date Selection (Range) --- */}
      <div className="space-y-3">
        <label className="flex items-center justify-between text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-cyan-600" />
            Sélectionnez les dates
          </div>
          <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full">
            {schedule.endDate ? "Période définie" : (schedule.startDate ? "Sélectionnez la fin" : "Sélectionnez une date")}
          </span>
        </label>
        
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7">
          {dates.map((date) => {
            const status = getDateStatus(date);
            
            let className = "border-gray-200 bg-white text-gray-600 hover:border-cyan-300 hover:bg-cyan-50"; 
            if (status === "selected") {
              className = "border-cyan-500 bg-cyan-600 text-white shadow-md ring-2 ring-cyan-200";
            } else if (status === "in-range") {
              className = "border-cyan-200 bg-cyan-100 text-cyan-800";
            }

            return (
              <button
                key={date.toISOString()}
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
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Clock className="h-4 w-4 text-cyan-600" />
          Créneau horaire
        </label>
        
        <div className="flex items-center gap-4">
            {/* Start Time */}
            <div className="flex-1 space-y-1">
                <span className="text-xs text-gray-500 font-bold uppercase">De</span>
                <div className="relative">
                    <select
                        value={schedule.startTime}
                        onChange={(e) => setSchedule({ ...schedule, startTime: e.target.value })}
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-4 pr-10 font-bold text-gray-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    >
                        {hours.map((h) => (
                            <option key={`start-${h}`} value={h}>{h}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="pt-5 text-gray-400">
                <ArrowRight className="h-5 w-5" />
            </div>

            {/* End Time */}
            <div className="flex-1 space-y-1">
                <span className="text-xs text-gray-500 font-bold uppercase">À</span>
                <div className="relative">
                    <select
                        value={schedule.endTime}
                        onChange={(e) => setSchedule({ ...schedule, endTime: e.target.value })}
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-4 pr-10 font-bold text-gray-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    >
                        {hours.map((h) => (
                            <option key={`end-${h}`} value={h}>{h}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <p className="text-xs text-gray-400">
           Durée estimée : {Math.max(0, parseInt(schedule.endTime) - parseInt(schedule.startTime))} heures
        </p>
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
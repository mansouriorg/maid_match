"use client";

import { useEffect, useState } from "react";
import { useWizardStore } from "../../features/booking-wizard/store/use-wizard-store";
import { Check } from "lucide-react";

// Import Step Components
// Note: Adjusted imports to relative paths to ensure they work with your folder structure
import StepContact from "../../features/booking-wizard/components/step-contact";
import StepProperty from "../../features/booking-wizard/components/step-property";
import StepSchedule from "../../features/booking-wizard/components/step-schedule";
import StepSummary from "../../features/booking-wizard/components/step-summary";

export default function BookingWizardPage() {
  // Use Zustand store
  const { step, setStep } = useWizardStore();
  
  // Prevent hydration mismatch (Next.js server vs client state)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid flicker on load

  // Configuration
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  // French Labels
  const stepsLabels = [
    "Contact",
    "Logement",
    "Planning",
    "Validation"
  ];

  // Helper to render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepContact />;
      case 2:
        return <StepProperty />;
      case 3:
        return <StepSchedule />;
      case 4:
        return <StepSummary />;
      default:
        return <StepContact />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* --- PROGRESS BAR --- */}
      <div className="space-y-4">
        <div className="flex justify-between text-sm font-medium text-gray-500">
          <span>Étape {step} sur {totalSteps}</span>
          <span className="text-cyan-600">{Math.round(progress)}% complété</span>
        </div>
        
        {/* The Track */}
        <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
          {/* The Fill */}
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-teal-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Indicators (Visual Bubbles) */}
        <div className="flex justify-between px-2">
          {stepsLabels.map((label, index) => {
            const stepNum = index + 1;
            const isCompleted = step > stepNum;
            const isCurrent = step === stepNum;

            return (
              <div key={label} className="flex flex-col items-center gap-2">
                <div 
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300
                    ${isCompleted ? "border-cyan-500 bg-cyan-500 text-white" : ""}
                    ${isCurrent ? "border-cyan-500 bg-white text-cyan-600 shadow-md ring-4 ring-cyan-100" : ""}
                    ${!isCompleted && !isCurrent ? "border-gray-200 bg-white text-gray-300" : ""}
                  `}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{stepNum}</span>}
                </div>
                <span className={`text-xs font-medium ${isCurrent ? 'text-cyan-700' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- THE CURRENT STEP CONTENT --- */}
      <div className="min-h-[400px] rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 md:p-8">
        {renderStep()}
      </div>

    </div>
  );
}
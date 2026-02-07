"use client";

import { useWizardStore } from "../store/use-wizard-store";
import { ArrowLeft, CheckCircle2, MapPin, Calendar, Phone, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StepSummary() {
  const { contact, property, schedule, setStep, reset } = useWizardStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        <h2 className="text-2xl font-bold text-gray-900">Review Request</h2>
        <p className="text-gray-500">Please review your details. We will contact you to finalize the price.</p>
      </div>

      {/* --- Card 1: Service Details --- */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 space-y-4">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-gray-900 capitalize">
                    {property.type} Cleaning
                </h3>
                <p className="text-sm text-gray-500">
                    {property.rooms} Bedrooms, {property.bathrooms} Bathrooms
                </p>
            </div>
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700 uppercase">
                {schedule.frequency}
            </span>
        </div>
        
        <div className="h-px bg-gray-200" />
        
        <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="h-4 w-4 text-cyan-600" />
                <span>
                  {schedule.date 
                    ? schedule.date.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })
                    : "Date not selected"
                  } 
                  {schedule.timeSlot && ` — ${schedule.timeSlot}`}
                </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-4 w-4 text-cyan-600" />
                <span className="truncate max-w-[250px]">
                    {property.address || "Address not provided"}
                </span>
            </div>
             <div className="flex items-center gap-3 text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                <span>Contact: {contact.name} ({contact.phone})</span>
            </div>
        </div>
      </div>

      {/* --- Card 2: Quote Info (Replaces Price Breakdown) --- */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 flex gap-4 items-start">
         <div className="mt-1 flex-shrink-0 rounded-full bg-blue-100 p-2 text-blue-600">
            <Phone className="h-5 w-5" />
         </div>
         <div className="space-y-1">
            <h4 className="font-bold text-blue-900">Final Step: Quote Confirmation</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
                Since every home is unique, we do not calculate the price automatically. 
                Our team will call you at <strong>{contact.phone}</strong> shortly to discuss your needs and give you the best quote.
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
          Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="flex flex-[2] items-center justify-center rounded-full bg-cyan-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition-all hover:bg-cyan-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Request...
            </>
          ) : (
            <>
              Submit Request
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
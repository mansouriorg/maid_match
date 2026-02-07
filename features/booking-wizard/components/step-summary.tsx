"use client";

import { useWizardStore } from "../store/use-wizard-store";
import { ArrowLeft, CheckCircle2, MapPin, Calendar, CreditCard, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StepSummary() {
  const { contact, property, schedule, setStep, reset } = useWizardStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simple Price Calculation Logic
  const basePrice = 50; // Base visit fee
  const roomPrice = 20;
  const bathroomPrice = 15;
  const totalPrice = basePrice + (property.rooms * roomPrice) + (property.bathrooms * bathroomPrice);
  
  // Apply discount if weekly
  const finalPrice = schedule.frequency === 'weekly' ? totalPrice * 0.8 : totalPrice;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    // Simulate API Call (Wait 1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real app, you would POST data to your backend here
    // await fetch('/api/bookings', { method: 'POST', body: JSON.stringify({...}) })

    console.log("Booking Confirmed!", { contact, property, schedule, finalPrice });
    
    // Clear store and redirect
    reset();
    router.push("/success");
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
      
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Summary</h2>
        <p className="text-gray-500">Please review your details before confirming.</p>
      </div>

      {/* --- Card 1: Service Details --- */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 space-y-4">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-gray-900">{property.type === 'villa' ? 'Villa' : 'Apartment'} Cleaning</h3>
                <p className="text-sm text-gray-500">{property.rooms} Bedrooms, {property.bathrooms} Bathrooms</p>
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
                  {schedule.date?.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })} at {schedule.timeSlot}
                </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-4 w-4 text-cyan-600" />
                <span className="truncate max-w-[250px]">{property.address || "Address not provided"}</span>
            </div>
             <div className="flex items-center gap-3 text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                <span>Contact: {contact.name} ({contact.phone})</span>
            </div>
        </div>
      </div>

      {/* --- Card 2: Price Breakdown --- */}
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-5">
         <div className="flex justify-between text-sm mb-2 text-gray-600">
            <span>Service Fee ({property.rooms} BR, {property.bathrooms} Bath)</span>
            <span>${totalPrice}</span>
         </div>
         {schedule.frequency === 'weekly' && (
            <div className="flex justify-between text-sm mb-2 text-green-600">
                <span>Weekly Discount (20%)</span>
                <span>-${(totalPrice - finalPrice).toFixed(0)}</span>
            </div>
         )}
         <div className="h-px bg-gray-100 my-3" />
         <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">Total Estimated</span>
            <span className="text-2xl font-extrabold text-cyan-600">${finalPrice.toFixed(0)}</span>
         </div>
         <p className="mt-2 text-xs text-gray-400 text-center">
            You pay only after the cleaning is done.
         </p>
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
              Processing...
            </>
          ) : (
            <>
              Confirm & Book
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
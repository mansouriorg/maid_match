"use client";

import { useWizardStore } from "../store/use-wizard-store";
import { ArrowLeft, ArrowRight, Home, Building2, LayoutGrid, MapPin, Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function StepProperty() {
  const { property, setProperty, setStep } = useWizardStore();
  
  // Local state for address (synced to store on change)
  const [address, setAddress] = useState(property.address);

  const handleNext = () => {
    if (!address) {
      alert("Veuillez entrer votre adresse ou ville.");
      return;
    }
    setProperty({ ...property, address }); // Ensure address is saved
    setStep(3);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Parlez-nous de votre logement</h2>
        <p className="text-gray-500">Cela nous aide à estimer la durée du ménage.</p>
      </div>

      <div className="space-y-8">
        
        {/* --- Property Type Selection --- */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "apartment", label: "Appartement", icon: Building2 },
            { id: "villa", label: "Villa", icon: Home },
            { id: "studio", label: "Studio", icon: LayoutGrid },
          ].map((type) => {
            const isSelected = property.type === type.id;
            const Icon = type.icon;
            
            return (
              <button
                key={type.id}
                onClick={() => setProperty({ ...property, type: type.id as any })}
                className={`
                  flex flex-col items-center justify-center gap-3 rounded-2xl border p-4 transition-all
                  ${isSelected 
                    ? "border-cyan-500 bg-cyan-50 text-cyan-700 ring-2 ring-cyan-500 ring-offset-2" 
                    : "border-gray-200 bg-white text-gray-500 hover:border-cyan-200 hover:bg-gray-50"
                  }
                `}
              >
                <Icon className={`h-8 w-8 ${isSelected ? "fill-cyan-200" : ""}`} />
                <span className="text-sm font-bold">{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* --- Room Counters --- */}
        <div className="space-y-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
          {/* Bedrooms */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900">Chambres / Pièces</p>
              <p className="text-xs text-gray-500">Salon inclus</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setProperty({ ...property, rooms: Math.max(1, property.rooms - 1) })}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-colors hover:bg-cyan-50 hover:text-cyan-600"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-4 text-center font-bold text-gray-900">{property.rooms}</span>
              <button 
                onClick={() => setProperty({ ...property, rooms: property.rooms + 1 })}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-colors hover:bg-cyan-50 hover:text-cyan-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200" />

          {/* Bathrooms */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900">Salles de bain</p>
              <p className="text-xs text-gray-500">Cuisine incluse</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setProperty({ ...property, bathrooms: Math.max(1, property.bathrooms - 1) })}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-colors hover:bg-cyan-50 hover:text-cyan-600"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-4 text-center font-bold text-gray-900">{property.bathrooms}</span>
              <button 
                onClick={() => setProperty({ ...property, bathrooms: property.bathrooms + 1 })}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-colors hover:bg-cyan-50 hover:text-cyan-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Location Input --- */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Où habitez-vous ?</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-cyan-600" />
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setProperty({ ...property, address: e.target.value });
              }}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-gray-900 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              placeholder="Ville, Quartier ou Adresse précise"
            />
          </div>
          <p className="text-xs text-gray-400">Nous couvrons actuellement votre zone.</p>
        </div>

        {/* --- Navigation Buttons --- */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => setStep(1)}
            className="flex flex-1 items-center justify-center rounded-full border border-gray-200 py-3.5 text-sm font-bold text-gray-600 hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </button>
          <button
            onClick={handleNext}
            className="group flex flex-[2] items-center justify-center rounded-full bg-cyan-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition-all hover:bg-cyan-700 hover:shadow-xl"
          >
            Continuer vers le Planning
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
}
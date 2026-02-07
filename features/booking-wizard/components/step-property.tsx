"use client";

import { useWizardStore } from "../store/use-wizard-store";
import { 
  ArrowLeft, ArrowRight, Home, Building2, LayoutGrid, MapPin, 
  Minus, Plus, Shirt, SprayCan, Cat, Key
} from "lucide-react";
import { useState } from "react";

export default function StepProperty() {
  const { property, setProperty, setStep } = useWizardStore();
  
  // Local state for address (synced to store on change)
  const [address, setAddress] = useState(property.address);

  // Helper to toggle items in the extras array
  const toggleExtra = (key: string) => {
    const currentExtras = property.extras || [];
    if (currentExtras.includes(key)) {
      setProperty({ ...property, extras: currentExtras.filter((k) => k !== key) });
    } else {
      setProperty({ ...property, extras: [...currentExtras, key] });
    }
  };

  const handleNext = () => {
    if (!address) {
      alert("Veuillez entrer votre adresse complète.");
      return;
    }
    setProperty({ ...property, address }); // Ensure address is saved
    setStep(3);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Votre logement</h2>
        <p className="text-gray-500">Détaillez vos besoins pour un devis précis.</p>
      </div>

      <div className="space-y-8">
        
        {/* --- 1. TYPE DE BIEN --- */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-900">Type de bien</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "apartment", label: "Appartement", icon: Building2 },
              { id: "villa", label: "Maison", icon: Home },
              { id: "studio", label: "Studio", icon: LayoutGrid },
            ].map((type) => {
              const isSelected = property.type === type.id;
              const Icon = type.icon;
              
              return (
                <button
                  key={type.id}
                  onClick={() => setProperty({ ...property, type: type.id as any })}
                  className={`
                    flex flex-col items-center justify-center gap-2 rounded-xl border p-3 transition-all
                    ${isSelected 
                      ? "border-cyan-500 bg-cyan-50 text-cyan-700 ring-2 ring-cyan-500 ring-offset-1" 
                      : "border-gray-200 bg-white text-gray-500 hover:border-cyan-200 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon className={`h-6 w-6 ${isSelected ? "fill-cyan-200" : ""}`} />
                  <span className="text-xs font-bold">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- 2. COMPTEURS (Pièces & SDB) --- */}
        <div className="flex gap-4">
            {/* Bedrooms/Rooms */}
            <div className="flex-1 rounded-xl border border-gray-200 p-3 flex flex-col items-center justify-center gap-3">
                <span className="text-xs font-bold text-gray-500 uppercase">Pièces</span>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setProperty({ ...property, rooms: Math.max(1, property.rooms - 1) })}
                        className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 font-bold transition-colors"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-bold text-xl w-6 text-center">{property.rooms}</span>
                    <button 
                        onClick={() => setProperty({ ...property, rooms: property.rooms + 1 })}
                        className="h-8 w-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center hover:bg-cyan-200 font-bold transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Bathrooms */}
            <div className="flex-1 rounded-xl border border-gray-200 p-3 flex flex-col items-center justify-center gap-3">
                <span className="text-xs font-bold text-gray-500 uppercase">SDB</span>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setProperty({ ...property, bathrooms: Math.max(1, property.bathrooms - 1) })}
                        className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 font-bold transition-colors"
                    >
                         <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-bold text-xl w-6 text-center">{property.bathrooms}</span>
                    <button 
                        onClick={() => setProperty({ ...property, bathrooms: property.bathrooms + 1 })}
                        className="h-8 w-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center hover:bg-cyan-200 font-bold transition-colors"
                    >
                         <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>

        {/* --- 3. TYPE DE PRESTATION (Standard vs Deep Clean) --- */}
        <div className="space-y-3">
             <label className="text-sm font-bold text-gray-900">Type de prestation</label>
             <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => setProperty({ ...property, cleaningType: 'standard' })}
                    className={`text-left p-3 rounded-xl border transition-all ${
                        property.cleaningType === 'standard' ? 'border-cyan-500 bg-cyan-50 ring-1 ring-cyan-500' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                    <div className="font-bold text-sm text-gray-900">✨ Classique</div>
                    <div className="text-xs text-gray-500 mt-1">Entretien courant, sols et poussière.</div>
                </button>
                <button
                    onClick={() => setProperty({ ...property, cleaningType: 'deep' })}
                    className={`text-left p-3 rounded-xl border transition-all ${
                        property.cleaningType === 'deep' ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                    <div className="font-bold text-sm text-gray-900">🧼 Grand Ménage</div>
                    <div className="text-xs text-gray-500 mt-1">État des lieux, vitres, placards.</div>
                </button>
             </div>
        </div>

        {/* --- 4. OPTIONS & EXTRAS (Realistic French Needs) --- */}
        <div className="space-y-3">
            <label className="text-sm font-bold text-gray-900">Options & Accès</label>
            <div className="grid grid-cols-2 gap-3">
                {/* Repassage */}
                <button 
                    onClick={() => toggleExtra('ironing')}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        property.extras?.includes('ironing') ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200'
                    }`}
                >
                    <Shirt className="h-5 w-5 text-cyan-600" />
                    <span className="text-sm font-medium">Repassage</span>
                </button>

                {/* Produits / Matériel (Negative Logic: Select if you DO NOT have supplies) */}
                <button 
                    onClick={() => setProperty({ ...property, hasSupplies: !property.hasSupplies })}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        !property.hasSupplies ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                    }`}
                >
                    <SprayCan className={`h-5 w-5 ${!property.hasSupplies ? 'text-orange-600' : 'text-gray-400'}`} />
                    <div className="text-left leading-none">
                        <span className="text-sm font-medium">Apporter produits</span>
                        <div className="text-[10px] text-gray-500 mt-1">Si vous n'avez rien</div>
                    </div>
                </button>

                {/* Animaux */}
                <button 
                    onClick={() => toggleExtra('pets')}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        property.extras?.includes('pets') ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200'
                    }`}
                >
                    <Cat className="h-5 w-5 text-cyan-600" />
                    <span className="text-sm font-medium">Animaux</span>
                </button>

                {/* Clés (Concierge) */}
                <button 
                    onClick={() => toggleExtra('keys')}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        property.extras?.includes('keys') ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200'
                    }`}
                >
                    <Key className="h-5 w-5 text-cyan-600" />
                    <div className="text-left leading-none">
                        <span className="text-sm font-medium">Clés au Gardien</span>
                    </div>
                </button>
            </div>
        </div>

        {/* --- 5. LOCATION INPUT --- */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900">Adresse</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-cyan-600" />
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setProperty({ ...property, address: e.target.value });
              }}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-gray-900 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              placeholder="ex: 12 Rue de Rivoli, 75004 Paris"
            />
          </div>
          <p className="text-xs text-gray-400">Nous vérifions la disponibilité dans votre arrondissement.</p>
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
            Suivant
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
}
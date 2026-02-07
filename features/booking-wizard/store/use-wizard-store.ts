import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the shape of the data we are collecting
interface BookingData {
  step: number;
  contact: {
    name: string;
    phone: string; // WhatsApp preference
    email: string;
  };
  property: {
    type: 'apartment' | 'villa' | 'studio';
    rooms: number;
    bathrooms: number;
    address: string;
    lat: number | null; // For the map pin
    lng: number | null;

    // --- NEW FIELDS ADDED HERE ---
    cleaningType: 'standard' | 'deep'; // Classique vs Grand Ménage
    hasSupplies: boolean; // Est-ce que le client a le matériel ?
    extras: string[]; // ['ironing', 'pets', 'keys']
  };
  schedule: {
    date: Date | null;
    timeSlot: string;
    frequency: 'one-time' | 'weekly' | 'bi-weekly';
  };
}

interface WizardState extends BookingData {
  setStep: (step: number) => void;
  // Use Partial<...> so we can update just one field at a time if needed
  setContact: (contact: Partial<BookingData['contact']>) => void;
  setProperty: (property: Partial<BookingData['property']>) => void;
  setSchedule: (schedule: Partial<BookingData['schedule']>) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      // Initial State
      step: 1,
      contact: { name: '', phone: '', email: '' },
      property: { 
        type: 'apartment', 
        rooms: 2, 
        bathrooms: 1, 
        address: '', 
        lat: null, 
        lng: null,
        
        // Default values for the new fields
        cleaningType: 'standard',
        hasSupplies: true, // We assume most people have basic supplies
        extras: [] 
      },
      schedule: { date: null, timeSlot: 'Matin (08h - 12h)', frequency: 'one-time' },

      // Actions
      setStep: (step) => set({ step }),
      setContact: (contact) => set((state) => ({ contact: { ...state.contact, ...contact } })),
      setProperty: (property) => set((state) => ({ property: { ...state.property, ...property } })),
      setSchedule: (schedule) => set((state) => ({ schedule: { ...state.schedule, ...schedule } })),
      
      // Reset Code (Resets everything to default)
      reset: () => set({ 
        step: 1,
        contact: { name: '', phone: '', email: '' },
        property: { 
          type: 'apartment', 
          rooms: 2, 
          bathrooms: 1, 
          address: '', 
          lat: null, 
          lng: null,
          cleaningType: 'standard',
          hasSupplies: true,
          extras: [] 
        },
        schedule: { date: null, timeSlot: 'Matin (08h - 12h)', frequency: 'one-time' },
      }),
    }),
    {
      name: 'maid-match-storage', // Key for localStorage (persists on refresh)
    }
  )
);
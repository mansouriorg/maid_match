import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the shape of the data we are collecting
interface BookingData {
  step: number;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  property: {
    type: 'apartment' | 'villa' | 'studio';
    rooms: number;
    bathrooms: number;
    address: string;
    lat: number | null;
    lng: number | null;
    
    // Customization fields
    cleaningType: 'standard' | 'deep';
    hasSupplies: boolean;
    extras: string[];
  };
  schedule: {
    startDate: Date | null;
    endDate: Date | null; // Can be null if only 1 day is selected
    
    // --- UPDATED: PRECISE TIME RANGE ---
    startTime: string; // e.g. "09:00"
    endTime: string;   // e.g. "13:00"
    
    frequency: 'one-time' | 'weekly' | 'bi-weekly';
  };
}

interface WizardState extends BookingData {
  setStep: (step: number) => void;
  // Use Partial<...> so we can update just one field at a time
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
        cleaningType: 'standard',
        hasSupplies: true,
        extras: [] 
      },
      // Updated Schedule State with Start/End times
      schedule: { 
        startDate: null, 
        endDate: null, 
        startTime: '09:00', // Default start
        endTime: '13:00',   // Default end (4 hours standard)
        frequency: 'one-time' 
      },

      // Actions
      setStep: (step) => set({ step }),
      setContact: (contact) => set((state) => ({ contact: { ...state.contact, ...contact } })),
      setProperty: (property) => set((state) => ({ property: { ...state.property, ...property } })),
      setSchedule: (schedule) => set((state) => ({ schedule: { ...state.schedule, ...schedule } })),
      
      // Reset Code
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
        schedule: { 
          startDate: null, 
          endDate: null, 
          startTime: '09:00', 
          endTime: '13:00', 
          frequency: 'one-time' 
        },
      }),
    }),
    {
      name: 'maid-match-storage', // Key for localStorage
    }
  )
);
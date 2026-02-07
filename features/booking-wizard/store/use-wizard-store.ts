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
  };
  schedule: {
    date: Date | null;
    timeSlot: string;
    frequency: 'one-time' | 'weekly' | 'bi-weekly';
  };
}

interface WizardState extends BookingData {
  setStep: (step: number) => void;
  setContact: (contact: BookingData['contact']) => void;
  setProperty: (property: BookingData['property']) => void;
  setSchedule: (schedule: BookingData['schedule']) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      // Initial State
      step: 1,
      contact: { name: '', phone: '', email: '' },
      property: { type: 'apartment', rooms: 2, bathrooms: 1, address: '', lat: null, lng: null },
      schedule: { date: null, timeSlot: '09:00', frequency: 'one-time' },

      // Actions
      setStep: (step) => set({ step }),
      setContact: (contact) => set((state) => ({ contact: { ...state.contact, ...contact } })),
      setProperty: (property) => set((state) => ({ property: { ...state.property, ...property } })),
      setSchedule: (schedule) => set((state) => ({ schedule: { ...state.schedule, ...schedule } })),
      reset: () => set({ step: 1 }), // Reset form
    }),
    {
      name: 'maid-match-storage', // Key for localStorage (persists on refresh)
    }
  )
);
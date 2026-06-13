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
    
    // --- PRECISE TIME RANGE ---
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
  
  // NOUVEAU : Fonction utilitaire pour le calcul du prix et l'envoi au backend
  getDurationHours: () => number;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
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
      
      // NOUVEAU : Calcule automatiquement la différence entre startTime et endTime
      getDurationHours: () => {
        const { startTime, endTime } = get().schedule;
        if (!startTime || !endTime) return 0;
        
        // Convertir "09:30" en heures décimales (ex: 9.5)
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);
        
        const startInDecimal = startHour + (startMin / 60);
        const endInDecimal = endHour + (endMin / 60);
        
        const duration = endInDecimal - startInDecimal;
        return duration > 0 ? duration : 0; // Sécurité pour éviter les nombres négatifs
      },

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
import { create } from 'zustand';

interface RecommendationFormState {
  symptoms: string;
  budget: { min: number; max: number };
  selectedState: string;
  age: number;
  setSymptoms: (symptoms: string) => void;
  setBudget: (budget: { min: number; max: number }) => void;
  setSelectedState: (state: string) => void;
  setAge: (age: number) => void;
  reset: () => void;
}

export const useRecommendationFormStore = create<RecommendationFormState>((set) => ({
  symptoms: '',
  budget: { min: 200, max: 1000 },
  selectedState: '',
  age: 0,
  setAge: (age) => set({ age }),
  setSymptoms: (symptoms) => set({ symptoms }),
  setBudget: (budget) => set({ budget }),
  setSelectedState: (selectedState) => set({ selectedState }),
  reset: () => set({ symptoms: '', budget: { min: 200, max: 1000 }, selectedState: '', age: 0 }),
}));

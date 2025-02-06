import { create } from "zustand";

interface FormData {
  prefix: string;
  brief_description: string;
  links: string[];
  photo_link: string;
  description: string;
  budget_range: number[];
  schedule: string;
  location: string;
  languages: string[];
  speciality: string;
  subspecialities: string[];
  specialist_id: string;
  experience: number;
  category: string;
}

interface FormState {
  data: FormData;
  step: number;
  setStep: (step: number) => void;
  setPrefix: (prefix: string) => void;
  setBriefDesc: (desc: string) => void;
  setLinks: (links: string) => void;
  setPhoto: (photo_link: string) => void;
  setDescription: (description: string) => void;
  setBudgetRange: (budget_range: number[]) => void;
  setSchedule: (schedule: string) => void;
  setLocation: (location: string) => void;
  setLanguages: (languages: string) => void;
  setSpeciality: (speciality: string) => void;
  setSubspecialities: (subspecialities: string) => void;
  setExperience: (experience: number) => void;
  setCategory: (category: string) => void;
}

const useFormState = create<FormState>((set) => ({
  data: {
    prefix: "",
    brief_description: "",
    links: [],
    photo_link: "",
    description: "",
    budget_range: [],
    schedule: "",
    location: "",
    languages: [],
    speciality: "",
    subspecialities: [],
    specialist_id: "",
    experience: 0,
    category: "",
  },
  setPrefix: (prefix: string) => set((state) => ({ data: {...state.data, prefix }})),
  setBriefDesc: (desc: string) => set((state) => ({ data: {...state.data, brief_description: desc }})),
  setLinks: (link: string) => set((state) => ({ data: {...state.data, links: [...state.data.links, link] }})),
  setPhoto: (photo_link: string) => set((state) => ({ data: {...state.data, photo_link }})),
  setDescription: (description: string) => set((state) => ({ data: {...state.data, description }})),
  setBudgetRange: (budget_range: number[]) => set((state) => ({ data: {...state.data, budget_range }})),
  setSchedule: (schedule: string) => set((state) => ({ data: {...state.data, schedule }})),
  setLocation: (location: string) => set((state) => ({ data: {...state.data, location }})),
  setLanguages: (language: string) => set((state) => ({ data: {...state.data, languages: [...state.data.languages, language] }})),
  setSpeciality: (speciality: string) => set((state) => ({ data: {...state.data, speciality }})),
  setSubspecialities: (subspeciality: string) => set((state) => ({ data: {...state.data, subspecialities: [...state.data.subspecialities, subspeciality] }})),
  setExperience: (experience: number) => set((state) => ({ data: {...state.data, experience }})),
  setCategory: (category: string) => set((state) => ({ data: {...state.data, category }})),
  step: 1,
  setStep: (step: number) => set((state) => ({ step: step })),
}));

export default useFormState;

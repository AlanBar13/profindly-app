import { create } from "zustand";
import { CreateSpecialist } from "@/models/Specialist";


interface FormState {
  data: CreateSpecialist;
  setPrefix: (prefix: string) => void;
  setBriefDesc: (desc: string) => void;
  setLinks: (links: string) => void;
  setPhoto: (photo_link: string) => void;
  setDescription: (description: string) => void;
  setBudgetRange: (budget_range: number[]) => void;
  setSchedule: (schedule: string) => void;
  setLocation: (location: string) => void;
  setLanguages: (languages: string) => void;
  setSpeciality: (speciality: string[]) => void;
  setSubspecialities: (subspecialities: string[]) => void;
  setSpecialistId: (specialist_id: string[]) => void;
  setExperience: (experience: number) => void;
  setCategory: (category: string) => void;
  addExperience: () => void;
  removeExperience: () => void;
}

const useFormState = create<FormState>((set) => ({
  data: {
    prefix: "none",
    brief_description: "",
    links: [],
    photo_link: "",
    description: "",
    budget_range: [],
    schedule: "",
    location: "",
    languages: [],
    speciality: [],
    subspecialities: [],
    specialist_id: [],
    experience: 0,
    category: "",
  },
  setPrefix: (prefix: string) => set((state) => ({ data: {...state.data, prefix }})),
  setBriefDesc: (brief_description: string) => set((state) => ({ data: {...state.data, brief_description }})),
  setLinks: (link: string) => set((state) => ({ data: {...state.data, links: [...state.data.links, link] }})),
  setPhoto: (photo_link: string) => set((state) => ({ data: {...state.data, photo_link }})),
  setDescription: (description: string) => set((state) => ({ data: {...state.data, description }})),
  setBudgetRange: (budget_range: number[]) => set((state) => ({ data: {...state.data, budget_range }})),
  setSchedule: (schedule: string) => set((state) => ({ data: {...state.data, schedule }})),
  setLocation: (location: string) => set((state) => ({ data: {...state.data, location }})),
  setLanguages: (language: string) => set((state) => ({ data: {...state.data, languages: [...state.data.languages, language] }})),
  setSpeciality: (speciality: string[]) => set((state) => ({ data: {...state.data, speciality }})),
  setSubspecialities: (subspecialities: string[]) => set((state) => ({ data: {...state.data, subspecialities }})),
  setExperience: (experience: number) => set((state) => ({ data: {...state.data, experience }})),
  setCategory: (category: string) => set((state) => ({ data: {...state.data, category }})),
  setSpecialistId: (specialist_id: string[]) => set((state) => ({ data: {...state.data, specialist_id }})),
  addExperience: () => set((state) => ({ data: {...state.data, experience: state.data.experience + 1 } })),
  removeExperience: () => set((state) => ({ data: {...state.data, experience: state.data.experience - 1 } })),
}));

export default useFormState;

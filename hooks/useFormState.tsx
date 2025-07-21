import { create } from "zustand";
import { CreateSpecialist } from "@/models/Specialist";


interface FormState {
  data: CreateSpecialist;
  setPrefix: (prefix: string) => void;
  setBriefDesc: (desc: string) => void;
  setLinks: (links: string) => void;
  setPhoto: (photoLink: string) => void;
  setDescription: (description: string) => void;
  setBudgetRange: (budgetRange: number[]) => void;
  setSchedule: (schedule: string) => void;
  setLocation: (location: string) => void;
  setLanguages: (languages: string) => void;
  setSpeciality: (speciality: string[]) => void;
  setSubspecialities: (subspecialities: string[]) => void;
  setSpecialistId: (specialistId: string[]) => void;
  setExperience: (experience: number) => void;
  setCategory: (category: string) => void;
  addExperience: () => void;
  removeExperience: () => void;
}

const useFormState = create<FormState>((set) => ({
  data: {
    prefix: "none",
    briefDescription: "",
    links: [],
    photoLink: "",
    description: "",
    budgetRange: [],
    schedule: "",
    location: "",
    languages: [],
    speciality: [],
    subspecialities: [],
    specialistId: [],
    experience: 0,
    category: "",
  },
  setPrefix: (prefix: string) => set((state) => ({ data: {...state.data, prefix }})),
  setBriefDesc: (briefDescription: string) => set((state) => ({ data: {...state.data, briefDescription }})),
  setLinks: (link: string) => set((state) => ({ data: {...state.data, links: [...state.data.links, link] }})),
  setPhoto: (photoLink: string) => set((state) => ({ data: {...state.data, photoLink }})),
  setDescription: (description: string) => set((state) => ({ data: {...state.data, description }})),
  setBudgetRange: (budgetRange: number[]) => set((state) => ({ data: {...state.data, budgetRange }})),
  setSchedule: (schedule: string) => set((state) => ({ data: {...state.data, schedule }})),
  setLocation: (location: string) => set((state) => ({ data: {...state.data, location }})),
  setLanguages: (language: string) => set((state) => ({ data: {...state.data, languages: [...state.data.languages, language] }})),
  setSpeciality: (speciality: string[]) => set((state) => ({ data: {...state.data, speciality }})),
  setSubspecialities: (subspecialities: string[]) => set((state) => ({ data: {...state.data, subspecialities }})),
  setExperience: (experience: number) => set((state) => ({ data: {...state.data, experience }})),
  setCategory: (category: string) => set((state) => ({ data: {...state.data, category }})),
  setSpecialistId: (specialistId: string[]) => set((state) => ({ data: {...state.data, specialistId }})),
  addExperience: () => set((state) => ({ data: {...state.data, experience: state.data.experience + 1 } })),
  removeExperience: () => set((state) => ({ data: {...state.data, experience: state.data.experience - 1 } })),
}));

export default useFormState;

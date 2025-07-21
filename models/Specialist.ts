import { Service } from "./Service";
import { MinimalUser, User } from "./User";

export interface Specialist {
  id: number;
  prefix: string;
  briefDescription: string;
  photoLink: string;
  description: string;
  links: string[];
  budgetRange: number[];
  schedule: string;
  location: string;
  languages: string[];
  speciality: string[];
  subspecialities: string[];
  specialistId: string[];
  experience: number;
  rating?: number;
  reviews: string[];
  category: string;
  user: User;
  services?: Service[];
}

export interface CreateSpecialist extends Omit<Specialist, "id" | "rating" | "reviews" | "user"> {}

export interface SpecialistPhotoResponse {
  isPublic: boolean
  key: string
  url: string
}
import { User } from "./User";

export interface Specialist {
  _id: string;
  prefix: string;
  brief_description: string;
  photo_link: string;
  description: string;
  links: string[];
  budget_range: number[];
  schedule: string;
  location: string;
  languages: string[];
  speciality: string[];
  subspecialities: string[];
  specialist_id: string[];
  experience: number;
  rating?: number;
  reviews: string[];
  category: string;
  user: User;
  service?: string;
}

export interface CreateSpecialist extends Omit<Specialist, "_id" | "rating" | "reviews" | "user"> {}

export interface SpecialistPhotoResponse {
  isPublic: boolean
  key: string
  url: string
}
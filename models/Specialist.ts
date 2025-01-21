import { User } from "./User";

export interface Specialist {
  _id: string;
  prefix: string;
  brief_description: string;
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
  user: User;
}

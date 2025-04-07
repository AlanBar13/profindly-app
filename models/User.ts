export enum UserRole {
  user = "user",
  patient = "patient",
  specialist = "specialist",
}

export interface User {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  gender: string;
  preferred_language?: string;
  preferred_location?: string;
  notificationToken?: string;
  role: UserRole;
  login_type: string;
  auth_id: string;
  specialist?: string;
}

export interface MinimalUser {
  _id: string;
  name: string;
  lastname: string;
  notificationToken?: string;
}

export interface CreateUserData extends Omit<User, "_id" | "role"> {}

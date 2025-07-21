export enum UserRole {
  user = "user",
  patient = "patient",
  specialist = "specialist",
}

export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  gender: string;
  preferredLanguage?: string;
  preferredLocation?: string;
  notificationToken?: string;
  role: UserRole;
  loginType: string;
  authId: string;
  specialist?: string;
}

export interface MinimalUser {
  id: number;
  name: string;
  lastname: string;
  notificationToken?: string;
}

export interface CreateUserData extends Omit<User, "id" | "role"> {}

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
  role: UserRole;
  login_type: string;
  auth_id: string;
}

export interface CreateUserData extends Omit<User, "_id" | "role"> {}

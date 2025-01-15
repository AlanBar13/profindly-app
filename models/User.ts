export enum UserRole {
  user = "user",
  patient = "patient",
  specialist = "specialist",
}

export interface User {
  name: string;
  lastname: string;
  email: string;
  role: UserRole;
  login_type: string;
  auth_id: string;
}

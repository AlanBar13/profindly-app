import { User, UserRole } from "@/models/User";
import { create } from "zustand";

interface ProfileState {
  user: User;
  setUser: (user: User) => void;
  unsetUser: () => void;
}

const defaultUser: User = {
  name: "",
  lastname: "",
  email: "",
  gender: "",
  role: UserRole.user,
  login_type: "",
  auth_id: "",
  _id: "",
};

const useProfile = create<ProfileState>((set) => ({
  user: defaultUser,
  setUser: (user: User) => set((state) => ({ user })),
  unsetUser: () => set((state) => ({ user: defaultUser })),
}));

export default useProfile;

import { api } from "@/lib/apiClient";
import { User } from "@/models/User";

export async function createUser(data: User): Promise<User> {
  return (await api.post<User>("/users", data)).data;
}

export async function getUserProfile(token: string | null) {
  const res = await api.get<User>("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

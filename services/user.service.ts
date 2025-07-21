import { api } from "@/lib/apiClient";
import { User, CreateUserData } from "@/models/User";

export async function createUser(data: CreateUserData): Promise<User> {
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

export async function updateUserNotificationToken(
  userId: string,
  notificationToken: string,
  token: string | null
) {
  const res = await api.patch<User>(
    `/users/${userId}`,
    {
      notificationToken,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

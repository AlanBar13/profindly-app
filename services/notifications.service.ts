import { api } from "@/lib/apiClient";
import { Notification } from '@/models/Notifications'

export const getNotifications = async (token: string | null) => {
  const res = await api.get<Notification[]>(`/notifications/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteNotification = async (id: string) => {
  const res = await api.delete(`/notifications/${id}`);

  return res.data;
};

export const getNotification = async (id: string, token: string | null) => {
  const res = await api.get<Notification>(`/notifications/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const notificationMarkAsRead = async (id:string, token: string | null) => {
  const res = await api.patch(`/notifications/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
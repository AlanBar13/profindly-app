import { api } from "@/lib/apiClient";
import { BookingsResponse } from "@/models/Booking";
import { AxiosError } from "axios";

export const getBookings = async (token: string | null) => {
  try {
    const response = await api.get<BookingsResponse[]>(`/bookings/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    return [] as BookingsResponse[];
  }
};

export const deleteBooking = async (token: string | null, id: string) => {
  const response = await api.delete(`/bookings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


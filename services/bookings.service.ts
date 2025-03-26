import { api } from "@/lib/apiClient";
import {
  Booking,
  BookingSlot,
  BookingsResponse,
  CreateBooking,
} from "@/models/Booking";
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

export const acceptBooking = async (token: string | null, id: string) => {
  const response = await api.patch<Booking>(
    `/bookings/${id}`,
    {
      status: "booked",
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const cancelBooking = async (token: string | null, id: string, fromToken: string) => {
  const response = await api.patch<Booking>(
    `/bookings/${id}`,
    {
      status: "cancelled",
      fromToken
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export async function getSpecialistScheduleByDate(id: string, date: string) {
  const res = await api.get<BookingSlot[]>(
    `/bookings/available?serviceId=${id}&date=${date}`
  );
  return res.data;
}

export async function createBooking(
  booking: CreateBooking,
  token: string | null
) {
  const res = await api.post<Booking>("/bookings", booking, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

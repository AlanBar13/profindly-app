import { api } from "@/lib/apiClient";
import { Booking, BookingSlot, CreateBooking } from "@/models/Booking";
import { Specialist } from "@/models/Specialist";

export async function getAllSpecialists() {
  const res = await api.get<Specialist[]>("/specialists");

  return res.data;
}

export async function getSpecialistById(id: string) {
  const res = await api.get<Specialist>(`/specialists/${id}`);

  return res.data;
}

export async function autocompleteSpecialist(query: string, field: string) {
  const res = await api.get<string[]>(
    `/specialists/autocomplete?query=${query}&field=${field}`
  );

  return res.data;
}

export async function getSpecialistService(id: string) {
  const res = await api.get<string>(`/services/specialist/${id}`);
  console.log("service", res.data);
  return res.data;
}

export async function getSpecialistScheduleByDate(id: string, date: string) {
  const res = await api.get<BookingSlot[]>(
    `/bookings/available?serviceId=${id}&date=${date}`
  );
  console.log("bookings called at", new Date().toISOString());
  return res.data;
}

export async function createBooking(booking: CreateBooking) {
  const res = await api.post<Booking>("/bookings", booking);
  return res.data;
}

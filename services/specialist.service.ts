import { api } from "@/lib/apiClient";
import { Booking, BookingSlot, CreateBooking } from "@/models/Booking";
import { Specialist } from "@/models/Specialist";

export async function getSpecialists(category?: string) {
  const res = await api.get<Specialist[]>(`/specialists${category !== "none" ? `?category=${category}` : ""}`);
  return res.data;
}

export async function getSpecialistsSearch(speciality?: string, location?: string, years?: string) {
  let url = `/specialists?`;
  if (speciality !== undefined && speciality !== "") {
    url += `speciality=${encodeURIComponent(speciality)}&`;
  }
  if (location !== undefined && location !== "") {
    url += `location=${encodeURIComponent(location)}&`;
  }
  if (years !== undefined && years !== "") {
    url += `years=${encodeURIComponent(years)}&`;
  }
  // remove last &
  url = url.slice(0, -1);
  console.log("url", url);
  const res = await api.get<Specialist[]>(url);
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

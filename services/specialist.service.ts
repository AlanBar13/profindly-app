import { api } from "@/lib/apiClient";
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
  const res = await api.get<string[]>(`/specialists/autocomplete?query=${query}&field=${field}`);

  return res.data;
}

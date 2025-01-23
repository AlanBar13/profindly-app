import { Specialist } from "@/models/Specialist";
import { AxiosInstance } from "axios";

export class SpecialistService {
  private _api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this._api = api;
  }

  async getAll() {
    const res = await this._api.get<Specialist[]>("/specialists");

    return res.data;
  }

  async getById(id: string) {
    const res = await this._api.get<Specialist>(`/specialists/${id}`);

    return res.data;
  }

  async autocomplete(query: string, field: string) {
    const res = await this._api.get<string[]>(`/specialists/autocomplete?query=${query}&field=${field}`);

    return res.data;
  }
}

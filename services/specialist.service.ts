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
}

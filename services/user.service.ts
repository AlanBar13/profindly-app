import { User } from "@/models/User";
import { AxiosInstance } from "axios";

export class UserService {
  private _api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this._api = api;
  }

  async create(data: User): Promise<User> {
    return (await this._api.post<User>("/users", data)).data;
  }

  async getProfile(token: string | null) {
    const res = await this._api.get<User>("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }
}

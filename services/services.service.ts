import { api } from "@/lib/apiClient";
import { Service } from "@/models/Service";

export const createService = async (service: Service, token: string | null) => {
    const res = await api.post<Service>("/services", service, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export const getService = async (token: string | null) => {
    const res = await api.get<Service | null>("/services/specialist", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}
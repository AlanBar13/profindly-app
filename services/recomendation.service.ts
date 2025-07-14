import { api } from "@/lib/apiClient";
import { RecomendationRequest, RecomendationResponse } from "@/models/Recomendation";
import { AxiosError } from "axios";

export const getRecomendations = async (token: string | null, request: RecomendationRequest) => {
  try {
    const response = await api.post<RecomendationResponse>(`/matching`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    return null;
  }
};

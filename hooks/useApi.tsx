import { useContext, createContext, PropsWithChildren } from "react";
import { api } from "@/lib/apiClient";
import { ApiService } from "@/services/api.service";
import { SpecialistService } from "@/services/specialist.service";
import { UserService } from "@/services/user.service";

const ApiContext = createContext<ApiService | null>(null);

const ApiProvider = ({ children }: PropsWithChildren) => {
  const specialistService = new SpecialistService(api);
  const userService = new UserService(api);
  const apiService = new ApiService(specialistService, userService);

  return (
    <ApiContext.Provider value={apiService}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;

export const useApi = () => {
  const apiContext = useContext(ApiContext);
  if (!apiContext) {
    throw new Error("useApi has to be used within <ApiProvider>");
  }

  return apiContext;
};

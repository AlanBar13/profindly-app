import { SpecialistService } from "./specialist.service";
import { UserService } from "./user.service";

export class ApiService {
  public specialist: SpecialistService;
  public user: UserService;

  constructor(specialistService: SpecialistService, userService: UserService) {
    this.specialist = specialistService;
    this.user = userService;
  }
}

import { Service } from "./Service";
import { Specialist } from "./Specialist";
import { User } from "./User";

export interface Booking {
  _id: string;
  bookDate: string;
  client: string;
  endTime: string;
  service: string;
  startTime: string;
  status: string;
}

export interface CreateBooking extends Omit<Booking, "_id"> {}

export interface BookingSlot {
  start: string;
  end: string;
}

export interface Slot {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  slots: BookingSlot[];
}

export interface ServiceSpecialist {
  _id: string;
  label: string;
  specialist: Specialist;
  price?: number;
  location?: string;
}

export interface BookingsResponse {
  _id: string;
  bookDate: string;
  client: string;
  endTime: string;
  service: ServiceSpecialist;
  startTime: string;
  status: string;
}
